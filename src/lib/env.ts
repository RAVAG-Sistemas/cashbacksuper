export function getPublicAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
}

export function hasMercadoPagoEnv() {
  return Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN);
}

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export function getSupabaseBrowserConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "O painel esta quase pronto. Ative sua loja para continuar.",
    );
  }

  return { url, key };
}

export function getSupabaseAdminConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("A consulta de saldo ainda nao esta liberada para esta loja.");
  }

  return { url, serviceRoleKey };
}

export function getMercadoPagoConfig() {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
  const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;

  if (!accessToken) {
    throw new Error("A assinatura ainda nao esta liberada para esta loja.");
  }

  return { accessToken, publicKey, webhookSecret };
}
