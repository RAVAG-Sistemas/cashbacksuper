import { Bell, Building2, Percent, Sparkles } from "lucide-react";

import { DashboardSectionPage } from "@/components/dashboard-section-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/dashboard-data";
import { formatPercent } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function ConfiguracoesDashboardPage() {
  const data = await getDashboardData();
  const cashbackPercentage = data.store?.cashback_percentage ?? 5;

  return (
    <DashboardSectionPage
      activeHref="/dashboard/configuracoes"
      eyebrow="Configuracoes da loja"
      title="Regras comerciais, identidade da loja e canais de contato em um unico lugar."
      description="A configuracao agora conversa com os dados da loja e abre caminho para expiracao de saldo, marca propria e automacoes."
      cta={{ href: "/dashboard", label: "Editar dados da loja" }}
      highlights={[
        {
          title: "Cashback padrao ativo",
          description: formatPercent(cashbackPercentage),
        },
        {
          title: data.store?.name ?? "Loja pronta para configuracao",
          description: data.store
            ? "A operacao principal ja esta identificada dentro do sistema."
            : "Assim que a loja for criada, esta area passa a refletir os dados reais.",
        },
        {
          title: "Base para expiracao e campanhas",
          description: "O proximo passo e transformar configuracao em automacao de retorno.",
        },
        {
          title: data.isDemo ? "Apresentacao premium" : "Painel conectado",
          description: data.isDemo
            ? "Mesmo em modo demonstracao, a experiencia ja mostra o produto pronto."
            : "A loja pode usar esta tela como centro de governanca da operacao.",
        },
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
        <Card className="rounded-[18px] border-[#dddddd] shadow-sm">
          <CardHeader>
            <CardTitle>Resumo da configuracao</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[16px] border border-[#e9eaec] p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#fff0f3] text-[#ff385c]">
                  <Percent className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">Cashback padrao</p>
                  <p className="text-sm text-[#6a6a6a]">{formatPercent(cashbackPercentage)} por compra validada.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#e9eaec] p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#222222]">
                  <Building2 className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">Identidade da loja</p>
                  <p className="text-sm text-[#6a6a6a]">{data.store?.name ?? "Nome da loja pendente"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#e9eaec] p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#fff7ed] text-[#b45309]">
                  <Bell className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">Notificacoes</p>
                  <p className="text-sm text-[#6a6a6a]">Preparado para e-mail e alertas de expiracao.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#e9eaec] p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#eef7f2] text-[#18794e]">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">Marca propria</p>
                  <p className="text-sm text-[#6a6a6a]">Pronto para logo, cores e experiencia mais personalizada.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[18px] border-[#dddddd] shadow-sm">
          <CardHeader>
            <CardTitle>Proximas ativacoes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Prazo de expiracao de saldo por loja.",
              "Preferencia de notificacao por canal.",
              "Personalizacao da consulta publica do cliente.",
            ].map((item) => (
              <div key={item} className="rounded-[14px] border border-[#e9eaec] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#222222]">{item}</p>
                  <Badge className="rounded-full bg-[#f3f4f6] text-[#222222] hover:bg-[#f3f4f6]">
                    Em breve
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardSectionPage>
  );
}
