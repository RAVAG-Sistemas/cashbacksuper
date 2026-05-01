import { ShieldCheck, Store, UserRound, WalletCards } from "lucide-react";

import { DashboardSectionPage } from "@/components/dashboard-section-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/dashboard-data";

const teamRoles = [
  {
    icon: WalletCards,
    title: "Operador de caixa",
    description: "Registra compras e resgates com foco total na agilidade do atendimento.",
    access: ["Cadastro rapido", "Compra", "Resgate"],
  },
  {
    icon: UserRound,
    title: "Gerente",
    description: "Acompanha clientes, historico e desempenho sem encostar em cobranca.",
    access: ["Clientes", "Extrato", "Cartoes"],
  },
  {
    icon: Store,
    title: "Dono da loja",
    description: "Controla regras do programa, configuracoes e crescimento da operacao.",
    access: ["Configuracoes", "Equipe", "Assinatura"],
  },
];

export const dynamic = "force-dynamic";

export default async function EquipeDashboardPage() {
  const data = await getDashboardData();

  return (
    <DashboardSectionPage
      activeHref="/dashboard/equipe"
      eyebrow="Equipe e operadores"
      title="Permissoes separadas para dono, gerente e caixa, com estrutura pronta para crescer."
      description="A tela organiza como o time vai operar o programa de cashback sem misturar tarefas de atendimento, analise e cobranca."
      highlights={[
        {
          title: "Modelo de acesso definido",
          description: "Ja existe uma hierarquia clara para o futuro RBAC do produto.",
        },
        {
          title: `${data.customers.length} clientes para acompanhar`,
          description: "A equipe ganha contexto imediato sobre o tamanho da base atendida.",
        },
        {
          title: `${data.transactions.length} movimentacoes recentes`,
          description: "Esses dados alimentam as permissoes e a rotina operacional do time.",
        },
        {
          title: data.isDemo ? "Simulacao pronta para apresentar" : "Base pronta para operacao real",
          description: data.isDemo
            ? "Mesmo sem ambiente conectado, a experiencia ja demonstra um SaaS maduro."
            : "Com Supabase ativo, esta navegacao ja acompanha a loja em producao.",
        },
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
        <Card className="rounded-[18px] border-[#dddddd] shadow-sm">
          <CardHeader>
            <CardTitle>Papeis do time</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {teamRoles.map((role) => {
              const Icon = role.icon;

              return (
                <div key={role.title} className="rounded-[16px] border border-[#e9eaec] p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-10 items-center justify-center rounded-full bg-[#fff0f3] text-[#ff385c]">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{role.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">{role.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {role.access.map((item) => (
                          <Badge key={item} className="rounded-full bg-[#f3f4f6] text-[#222222] hover:bg-[#f3f4f6]">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="rounded-[18px] border-[#dddddd] shadow-sm">
          <CardHeader>
            <CardTitle>Estado da operacao</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[16px] border border-[#e9eaec] p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#eef7f2] text-[#18794e]">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">Convites internos</p>
                  <p className="text-sm text-[#6a6a6a]">Pronto para virar fluxo de convite por e-mail.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#e9eaec] p-4 text-sm text-[#6a6a6a]">
              <p className="font-medium text-[#222222]">Proximas evolucoes naturais</p>
              <ul className="mt-3 space-y-2">
                <li>Convite de operadores com aceite individual.</li>
                <li>Permissoes finas por pagina e por acao.</li>
                <li>Auditoria de quem registrou cada venda ou resgate.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardSectionPage>
  );
}
