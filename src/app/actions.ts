"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { assertValidCpf, onlyDigits } from "@/lib/cpf";
import { hasSupabaseEnv } from "@/lib/env";
import { formatCurrency } from "@/lib/money";
import { generateBalanceUrl, slugify } from "@/lib/qr";
import { getEmailFrom, getResend } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type MutationState = {
  status: "idle" | "success" | "error";
  message: string;
  qrUrl?: string;
};

export type BalanceResult = {
  storeName: string;
  customerName: string;
  balance: number;
  cardCode?: string | null;
  transactions: Array<{
    id: string;
    type: "credit" | "debit";
    amount: number;
    purchaseAmount: number | null;
    description: string | null;
    createdAt: string;
  }>;
};

export type LookupState = {
  status: "idle" | "success" | "error";
  message: string;
  results: BalanceResult[];
};

const idleMutation: MutationState = { status: "idle", message: "" };

const authSchema = z.object({
  email: z.string().email("Digite um e-mail valido."),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
});

const storeSchema = z.object({
  name: z.string().min(2, "Digite o nome da loja."),
  cashbackPercentage: z.coerce
    .number()
    .min(0, "Use uma porcentagem maior ou igual a 0.")
    .max(100, "Use uma porcentagem de ate 100."),
});

const customerSchema = z.object({
  storeId: z.string().uuid("Loja invalida."),
  name: z.string().min(2, "Digite o nome do cliente."),
  cpf: z.string().min(11, "Digite o CPF."),
  phone: z.string().optional(),
  email: z.string().email("E-mail invalido.").optional().or(z.literal("")),
  cardCode: z.string().optional(),
});

const purchaseSchema = z.object({
  customerId: z.string().uuid("Cliente invalido."),
  purchaseAmount: z.coerce.number().positive("Digite um valor de compra positivo."),
  description: z.string().optional(),
  sku: z.string().optional(),
});

const redeemSchema = z.object({
  customerId: z.string().uuid("Cliente invalido."),
  amount: z.coerce.number().positive("Digite um valor de resgate positivo."),
  description: z.string().optional(),
});

function parseMoneyInput(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return NaN;
  }

  return Number(value.replace(/\./g, "").replace(",", "."));
}

function cleanOptional(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function mutationError(error: unknown): MutationState {
  return {
    status: "error",
    message: error instanceof Error ? error.message : "Nao foi possivel concluir a acao.",
  };
}

function assertSupabaseConfigured() {
  if (!hasSupabaseEnv()) {
    throw new Error("O painel esta quase pronto. Ative sua loja para liberar esta acao.");
  }
}

async function getAuthenticatedContext() {
  assertSupabaseConfigured();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId) {
    throw new Error("Entre com uma conta de lojista para continuar.");
  }

  return { supabase, userId };
}

async function sendCashbackEmail(input: {
  to: string | null;
  customerName: string;
  storeName: string;
  cashbackAmount: number;
  totalBalance: number;
}) {
  const resend = getResend();

  if (!resend || !input.to) {
    return;
  }

  await resend.emails.send({
    from: getEmailFrom(),
    to: input.to,
    subject: `Voce ganhou ${formatCurrency(input.cashbackAmount)} de cashback`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#222">
        <h1 style="font-size:22px">Cashback liberado</h1>
        <p>Ola ${input.customerName}, voce acabou de ganhar <strong>${formatCurrency(
          input.cashbackAmount,
        )}</strong> de cashback na ${input.storeName}.</p>
        <p>Seu saldo total agora e <strong>${formatCurrency(input.totalBalance)}</strong>.</p>
      </div>
    `,
  });
}

export async function signInAction(
  _state: MutationState,
  formData: FormData,
): Promise<MutationState> {
  try {
    assertSupabaseConfigured();
    const parsed = authSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(parsed);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    return mutationError(error);
  }

  redirect("/dashboard");
}

export async function signUpAction(
  _state: MutationState,
  formData: FormData,
): Promise<MutationState> {
  try {
    assertSupabaseConfigured();
    const parsed = authSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp(parsed);

    if (error) {
      throw new Error(error.message);
    }

    return {
      status: "success",
      message: "Conta criada. Confira seu e-mail para concluir o acesso, se solicitado.",
    } satisfies MutationState;
  } catch (error) {
    return mutationError(error);
  }
}

export async function signOutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}

export async function createStoreAction(
  _state: MutationState,
  formData: FormData,
): Promise<MutationState> {
  try {
    const { supabase, userId } = await getAuthenticatedContext();
    const parsed = storeSchema.parse({
      name: formData.get("name"),
      cashbackPercentage: parseMoneyInput(formData.get("cashbackPercentage")),
    });
    const slug = slugify(parsed.name);

    const { error } = await supabase.from("stores").insert({
      owner_id: userId,
      name: parsed.name,
      slug: slug || `loja-${Date.now()}`,
      cashback_percentage: parsed.cashbackPercentage,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    return { status: "success", message: "Loja criada com sucesso." } satisfies MutationState;
  } catch (error) {
    return mutationError(error);
  }
}

export async function updateStoreAction(
  _state: MutationState,
  formData: FormData,
): Promise<MutationState> {
  try {
    const { supabase } = await getAuthenticatedContext();
    const parsed = storeSchema.parse({
      name: formData.get("name"),
      cashbackPercentage: parseMoneyInput(formData.get("cashbackPercentage")),
    });
    const storeId = String(formData.get("storeId") ?? "");

    const { error } = await supabase
      .from("stores")
      .update({
        name: parsed.name,
        cashback_percentage: parsed.cashbackPercentage,
      })
      .eq("id", storeId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    return { status: "success", message: "Configuracao da loja atualizada." };
  } catch (error) {
    return mutationError(error);
  }
}

export async function registerCustomerAction(
  _state: MutationState,
  formData: FormData,
): Promise<MutationState> {
  try {
    const { supabase } = await getAuthenticatedContext();
    const parsed = customerSchema.parse({
      storeId: formData.get("storeId"),
      name: formData.get("name"),
      cpf: formData.get("cpf"),
      phone: cleanOptional(formData.get("phone")),
      email: cleanOptional(formData.get("email")),
      cardCode: cleanOptional(formData.get("cardCode")),
    });
    const cpfDigits = assertValidCpf(parsed.cpf);
    const cardCode = parsed.cardCode?.trim().toUpperCase();

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        store_id: parsed.storeId,
        cpf_digits: cpfDigits,
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email || null,
      })
      .select()
      .single();

    if (customerError) {
      throw new Error(customerError.message);
    }

    if (cardCode) {
      const { error: cardError } = await supabase.from("cards").insert({
        store_id: parsed.storeId,
        customer_id: customer.id,
        code: cardCode,
        status: "active",
        activated_at: new Date().toISOString(),
      });

      if (cardError) {
        throw new Error(cardError.message);
      }
    }

    revalidatePath("/dashboard");

    return {
      status: "success",
      message: `${parsed.name} cadastrado com sucesso.`,
      qrUrl: generateBalanceUrl({ cardCode, cpf: cpfDigits }),
    } satisfies MutationState;
  } catch (error) {
    return mutationError(error);
  }
}

export async function registerPurchaseAction(
  _state: MutationState,
  formData: FormData,
): Promise<MutationState> {
  try {
    const { supabase } = await getAuthenticatedContext();
    const parsed = purchaseSchema.parse({
      customerId: formData.get("customerId"),
      purchaseAmount: parseMoneyInput(formData.get("purchaseAmount")),
      description: cleanOptional(formData.get("description")),
      sku: cleanOptional(formData.get("sku")),
    });

    const { data: transaction, error } = await supabase.rpc("register_purchase", {
      p_customer_id: parsed.customerId,
      p_purchase_amount: parsed.purchaseAmount,
      p_description: parsed.description ?? null,
      p_sku: parsed.sku ?? null,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { data: customer } = await supabase
      .from("customers")
      .select("name,email,cashback_balance,store_id")
      .eq("id", parsed.customerId)
      .single();

    const { data: store } = customer
      ? await supabase.from("stores").select("name").eq("id", customer.store_id).single()
      : { data: null };

    if (transaction && customer && store) {
      await sendCashbackEmail({
        to: customer.email,
        customerName: customer.name,
        storeName: store.name,
        cashbackAmount: transaction.amount,
        totalBalance: customer.cashback_balance,
      });
    }

    revalidatePath("/dashboard");

    return {
      status: "success",
      message: `Compra registrada. Cashback gerado: ${formatCurrency(transaction?.amount ?? 0)}.`,
    } satisfies MutationState;
  } catch (error) {
    return mutationError(error);
  }
}

export async function redeemCashbackAction(
  _state: MutationState,
  formData: FormData,
): Promise<MutationState> {
  try {
    const { supabase } = await getAuthenticatedContext();
    const parsed = redeemSchema.parse({
      customerId: formData.get("customerId"),
      amount: parseMoneyInput(formData.get("amount")),
      description: cleanOptional(formData.get("description")),
    });

    const { data: transaction, error } = await supabase.rpc("redeem_cashback", {
      p_customer_id: parsed.customerId,
      p_amount: parsed.amount,
      p_description: parsed.description ?? "Resgate no caixa",
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/dashboard");

    return {
      status: "success",
      message: `Resgate aprovado: ${formatCurrency(transaction?.amount ?? parsed.amount)}.`,
    } satisfies MutationState;
  } catch (error) {
    return mutationError(error);
  }
}

async function getResultForCustomer(customerId: string, cardCode?: string | null) {
  const admin = getSupabaseAdmin();
  const { data: customer, error: customerError } = await admin
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .single();

  if (customerError || !customer) {
    return null;
  }

  const [{ data: store }, { data: transactions }] = await Promise.all([
    admin.from("stores").select("name").eq("id", customer.store_id).single(),
    admin
      .from("transactions")
      .select("id,type,amount,purchase_amount,description,created_at")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  return {
    storeName: store?.name ?? "Loja",
    customerName: customer.name,
    balance: customer.cashback_balance,
    cardCode,
    transactions:
      transactions?.map((transaction) => ({
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        purchaseAmount: transaction.purchase_amount,
        description: transaction.description,
        createdAt: transaction.created_at,
      })) ?? [],
  } satisfies BalanceResult;
}

export async function lookupBalanceAction(
  _state: LookupState,
  formData: FormData,
): Promise<LookupState> {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !hasSupabaseEnv()) {
      throw new Error("A consulta de saldo ainda nao esta liberada para esta loja.");
    }

    const query = String(formData.get("query") ?? "").trim();

    if (query.length < 4) {
      throw new Error("Digite um CPF ou codigo de cartao valido.");
    }

    const admin = getSupabaseAdmin();
    const digits = onlyDigits(query);
    const results: BalanceResult[] = [];

    if (digits.length === 11) {
      const cpfDigits = assertValidCpf(digits);
      const { data: customers, error } = await admin
        .from("customers")
        .select("id")
        .eq("cpf_digits", cpfDigits)
        .limit(5);

      if (error) {
        throw new Error(error.message);
      }

      for (const customer of customers ?? []) {
        const result = await getResultForCustomer(customer.id);
        if (result) {
          results.push(result);
        }
      }
    } else {
      const cardCode = query.toUpperCase();
      const { data: card, error } = await admin
        .from("cards")
        .select("customer_id,code")
        .eq("code", cardCode)
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (card?.customer_id) {
        const result = await getResultForCustomer(card.customer_id, card.code);
        if (result) {
          results.push(result);
        }
      }
    }

    if (results.length === 0) {
      return {
        status: "error",
        message: "Nao encontramos saldo para esse documento ou cartao.",
        results: [],
      } satisfies LookupState;
    }

    return {
      status: "success",
      message: "Saldo encontrado.",
      results,
    } satisfies LookupState;
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Nao foi possivel consultar o saldo.",
      results: [],
    } satisfies LookupState;
  }
}

export { idleMutation };
