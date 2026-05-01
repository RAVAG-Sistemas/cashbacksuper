import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  getMercadoPagoAuthorizedPayment,
  getMercadoPagoSubscription,
  mapMercadoPagoInvoiceStatus,
  mapMercadoPagoSubscriptionStatus,
  verifyMercadoPagoWebhookSignature,
} from "@/lib/mercado-pago";

type WebhookPayload = {
  id?: string | number;
  type?: string;
  action?: string;
  data?: {
    id?: string | number;
  };
};

function readDataId(request: NextRequest, payload: WebhookPayload) {
  const queryDataId = request.nextUrl.searchParams.get("data.id");
  const payloadDataId = payload.data?.id ? String(payload.data.id) : null;
  const payloadId = payload.id ? String(payload.id) : null;

  return queryDataId ?? payloadDataId ?? payloadId;
}

export async function POST(request: NextRequest) {
  const payload = ((await request.json().catch(() => null)) ?? {}) as WebhookPayload;
  const dataId = readDataId(request, payload);
  const eventType = payload.type ?? request.nextUrl.searchParams.get("type") ?? null;
  const action = payload.action ?? null;

  if (!dataId) {
    return NextResponse.json({ received: false, reason: "missing_data_id" }, { status: 400 });
  }

  const signatureOk = verifyMercadoPagoWebhookSignature({
    dataId,
    xRequestId: request.headers.get("x-request-id"),
    xSignature: request.headers.get("x-signature"),
  });

  if (!signatureOk) {
    return NextResponse.json({ received: false, reason: "invalid_signature" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  const { error: insertError } = await admin.from("webhook_events").insert({
    provider: "mercado_pago",
    external_event_id: String(payload.id ?? dataId),
    event_type: action ?? eventType,
    payload: payload,
  });

  if (insertError && !insertError.message.toLowerCase().includes("duplicate")) {
    return NextResponse.json({ received: false, reason: "persistence_failed" }, { status: 500 });
  }

  if (insertError) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    if (eventType === "subscription_preapproval") {
      const subscription = await getMercadoPagoSubscription(dataId);
      const storeId = String(subscription.external_reference ?? "");

      if (storeId) {
        const { data: localSubscription } = await admin
          .from("subscriptions")
          .select("*")
          .eq("store_id", storeId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (localSubscription) {
          await admin
            .from("subscriptions")
            .update({
              mercado_pago_preapproval_id: subscription.id,
              status: mapMercadoPagoSubscriptionStatus(subscription.status),
              current_period_start: subscription.date_created ?? localSubscription.current_period_start,
              current_period_end: subscription.next_payment_date ?? localSubscription.current_period_end,
              updated_at: new Date().toISOString(),
            })
            .eq("id", localSubscription.id);
        }
      }
    }

    if (eventType === "subscription_authorized_payment") {
      const invoice = await getMercadoPagoAuthorizedPayment(dataId);
      const amount = Number(invoice.transaction_amount ?? 0);

      const { data: localSubscription } = await admin
        .from("subscriptions")
        .select("*")
        .eq("mercado_pago_preapproval_id", request.nextUrl.searchParams.get("preapproval_id") ?? "")
        .limit(1)
        .maybeSingle();

      if (localSubscription) {
        await admin.from("invoices").upsert(
          {
            store_id: localSubscription.store_id,
            subscription_id: localSubscription.id,
            status: mapMercadoPagoInvoiceStatus(invoice.status),
            amount_cents: Math.round(amount * 100),
            currency: invoice.currency_id ?? "BRL",
            mercado_pago_payment_id: String(invoice.id),
            paid_at:
              mapMercadoPagoInvoiceStatus(invoice.status) === "paid"
                ? invoice.last_modified ?? invoice.date_created ?? null
                : null,
          },
          { onConflict: "mercado_pago_payment_id" },
        );
      }
    }

    await admin
      .from("webhook_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("provider", "mercado_pago")
      .eq("external_event_id", String(payload.id ?? dataId));
  } catch (error) {
    return NextResponse.json(
      {
        received: false,
        reason: error instanceof Error ? error.message : "processing_failed",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true, type: eventType, action });
}
