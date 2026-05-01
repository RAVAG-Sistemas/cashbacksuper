import crypto from "node:crypto";

import { getMercadoPagoConfig, getPublicAppUrl } from "@/lib/env";

type MercadoPagoSubscriptionPayload = {
  reason: string;
  externalReference: string;
  payerEmail: string;
  amount: number;
};

type MercadoPagoSubscriptionResponse = {
  id: string;
  init_point: string | null;
  status: string | null;
  external_reference?: string | number | null;
  next_payment_date?: string | null;
  date_created?: string | null;
  auto_recurring?: {
    transaction_amount?: number | string | null;
    frequency?: number | null;
    frequency_type?: string | null;
    currency_id?: string | null;
  } | null;
};

type MercadoPagoAuthorizedPaymentResponse = {
  id: string | number;
  status?: string | null;
  reason?: string | null;
  date_created?: string | null;
  last_modified?: string | null;
  transaction_amount?: number | string | null;
  currency_id?: string | null;
};

async function mercadoPagoFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const { accessToken } = getMercadoPagoConfig();
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Mercado Pago respondeu ${response.status}: ${errorBody || "sem detalhes"}`);
  }

  return response.json() as Promise<T>;
}

export async function createMercadoPagoSubscription(
  input: MercadoPagoSubscriptionPayload,
): Promise<MercadoPagoSubscriptionResponse> {
  const appUrl = getPublicAppUrl();
  const startDate = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  return mercadoPagoFetch<MercadoPagoSubscriptionResponse>("/preapproval", {
    method: "POST",
    body: JSON.stringify({
      reason: input.reason,
      external_reference: input.externalReference,
      payer_email: input.payerEmail,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        start_date: startDate,
        transaction_amount: Number(input.amount.toFixed(2)),
        currency_id: "BRL",
      },
      back_url: `${appUrl}/dashboard/assinatura`,
      notification_url: `${appUrl}/api/mercado-pago/webhook?source_news=webhooks`,
    }),
  });
}

export async function getMercadoPagoSubscription(id: string) {
  return mercadoPagoFetch<MercadoPagoSubscriptionResponse>(`/preapproval/${id}`);
}

export async function getMercadoPagoAuthorizedPayment(id: string) {
  return mercadoPagoFetch<MercadoPagoAuthorizedPaymentResponse>(`/authorized_payments/${id}`);
}

export function mapMercadoPagoSubscriptionStatus(status: string | null | undefined) {
  switch (status) {
    case "authorized":
      return "active" as const;
    case "paused":
      return "paused" as const;
    case "cancelled":
    case "canceled":
      return "canceled" as const;
    case "pending":
    default:
      return "trialing" as const;
  }
}

export function mapMercadoPagoInvoiceStatus(status: string | null | undefined) {
  switch (status) {
    case "approved":
    case "authorized":
      return "paid" as const;
    case "cancelled":
    case "canceled":
      return "void" as const;
    case "rejected":
      return "failed" as const;
    default:
      return "pending" as const;
  }
}

export function verifyMercadoPagoWebhookSignature(input: {
  dataId: string;
  xRequestId: string | null;
  xSignature: string | null;
}) {
  const { webhookSecret } = getMercadoPagoConfig();

  if (!webhookSecret) {
    return true;
  }

  if (!input.xRequestId || !input.xSignature) {
    return false;
  }

  const parts = input.xSignature.split(",");
  let ts = "";
  let v1 = "";

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (!key || !value) continue;
    const normalizedKey = key.trim();
    const normalizedValue = value.trim();

    if (normalizedKey === "ts") ts = normalizedValue;
    if (normalizedKey === "v1") v1 = normalizedValue;
  }

  if (!ts || !v1) {
    return false;
  }

  const manifest = `id:${input.dataId};request-id:${input.xRequestId};ts:${ts};`;
  const digest = crypto.createHmac("sha256", webhookSecret).update(manifest).digest("hex");

  return digest === v1;
}
