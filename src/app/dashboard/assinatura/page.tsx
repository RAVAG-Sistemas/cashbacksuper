import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSectionPage } from "@/components/dashboard-section-page";
import { SubscriptionPlans } from "@/components/subscription-plans";
import { billingPlans } from "@/lib/billing-plans";
import { getDashboardData } from "@/lib/dashboard-data";
import { hasMercadoPagoEnv, hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AssinaturaDashboardPage() {
  const data = await getDashboardData();
  let currentPlanSlug: string | null = null;
  let currentStatus: string | null = null;
  let invoices: Array<{
    id: string;
    status: string;
    amount_cents: number;
    created_at: string;
  }> = [];

  if (hasSupabaseEnv() && data.store) {
    const supabase = await createClient();
    const [{ data: subscriptions }, { data: plans }, { data: invoicesData }] = await Promise.all([
      supabase
        .from("subscriptions")
        .select("*")
        .eq("store_id", data.store.id)
        .order("created_at", { ascending: false })
        .limit(1),
      supabase.from("plans").select("*").eq("is_active", true).order("price_cents", { ascending: true }),
      supabase
        .from("invoices")
        .select("id,status,amount_cents,created_at")
        .eq("store_id", data.store.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    const subscription = subscriptions?.[0];
    const currentPlan = plans?.find((plan) => plan.id === subscription?.plan_id);

    currentPlanSlug = currentPlan?.slug ?? null;
    currentStatus = subscription?.status ?? null;
    invoices = invoicesData ?? [];
  }

  const billingReady = hasSupabaseEnv() && hasMercadoPagoEnv() && Boolean(data.store);

  return (
    <DashboardSectionPage
      activeHref="/dashboard/assinatura"
      eyebrow="Billing"
      title="Assinaturas e cobrancas preparadas para um fluxo real com Mercado Pago."
      description="A partir daqui o lojista pode escolher um plano, abrir o checkout e acompanhar o estado da assinatura com mais cara de SaaS real."
      highlights={[
        {
          title: billingReady ? "Checkout de assinatura liberado" : "Ambiente de cobranca em preparacao",
          description: billingReady
            ? "O botao abaixo ja pode abrir o checkout do Mercado Pago em teste."
            : "Falta ambiente completo para abrir a assinatura real da loja.",
        },
        {
          title: currentStatus ? `Status atual: ${currentStatus}` : "Nenhuma assinatura ativa ainda",
          description: currentStatus
            ? "O painel passa a refletir a evolucao da assinatura conforme os eventos chegam."
            : "A primeira assinatura criada vai inaugurar o fluxo de billing desta loja.",
        },
        {
          title: "Webhook com idempotencia",
          description: "Os eventos recebidos sao armazenados para evitar retrabalho e duplicidade.",
        },
        {
          title: "Base pronta para trial e cobranca",
          description: "Planos, subscriptions, invoices e templates de e-mail ja conversam entre si.",
        },
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
        <div className="space-y-4">
          <SubscriptionPlans
            plans={billingPlans}
            billingReady={billingReady}
            currentPlanSlug={currentPlanSlug}
            currentStatus={currentStatus}
          />
        </div>

        <div className="space-y-4">
          <Card className="rounded-[18px] border-[#dddddd] shadow-sm">
            <CardHeader>
              <CardTitle>Assinatura atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#6a6a6a]">
              <div className="flex items-center justify-between gap-3">
                <span>Plano</span>
                <span className="font-medium text-[#222222]">
                  {currentPlanSlug
                    ? billingPlans.find((plan) => plan.slug === currentPlanSlug)?.name ?? currentPlanSlug
                    : "Sem assinatura"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Status</span>
                <Badge className="rounded-full bg-[#f3f4f6] text-[#222222] hover:bg-[#f3f4f6]">
                  {currentStatus ?? "Aguardando"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-[#dddddd] shadow-sm">
            <CardHeader>
              <CardTitle>Faturas recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-[14px] border border-[#e9eaec] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{invoice.id.slice(0, 8).toUpperCase()}</p>
                      <Badge className="rounded-full bg-[#f3f4f6] text-[#222222] hover:bg-[#f3f4f6]">
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-[#6a6a6a]">
                      {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
                        new Date(invoice.created_at),
                      )}
                    </p>
                    <p className="mt-2 font-semibold">{formatCurrency(invoice.amount_cents / 100)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#6a6a6a]">
                  As faturas vao aparecer aqui assim que a assinatura comecar a trafegar eventos.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardSectionPage>
  );
}
