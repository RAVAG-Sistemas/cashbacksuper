import { DashboardSectionPage } from "@/components/dashboard-section-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function CartoesDashboardPage() {
  const data = await getDashboardData();
  const customerById = new Map(data.customers.map((customer) => [customer.id, customer]));

  return (
    <DashboardSectionPage
      activeHref="/dashboard/cartoes"
      eyebrow="Cartoes e QR Code"
      title="Controle dos cartoes fisicos, codigos de consulta e status de ativacao."
      description="A tela ja puxa os cartoes existentes e prepara o caminho para suspensao, reemissao e novos formatos de identificador."
      cta={{ href: "/consulta", label: "Ver consulta publica" }}
      highlights={[
        {
          title: `${data.cards.length} cartoes cadastrados`,
          description: "Leitura atual do ambiente real ou da base exemplo.",
        },
        {
          title: "Status ativo/inativo/perdido",
          description: "A modelagem ja suporta governanca completa do cartao fisico.",
        },
        {
          title: "QR Code pronto",
          description: "Ja existe geracao de URL de consulta para cada cliente.",
        },
        {
          title: "Crescimento futuro",
          description: "A estrutura aceita NFC e outros identificadores sem reescrever a base.",
        },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.cards.map((card) => (
          <Card key={card.id} className="rounded-[18px] border-[#dddddd] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between gap-3 text-lg">
                <span>{card.code}</span>
                <Badge className="rounded-full bg-[#fff0f3] text-[#ff385c]">{card.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[#6a6a6a]">
              <p>Cliente: {customerById.get(card.customer_id ?? "")?.name ?? "Nao vinculado"}</p>
              <p>
                Ativado em{" "}
                {card.activated_at
                  ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
                      new Date(card.activated_at),
                    )
                  : "aguardando ativacao"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardSectionPage>
  );
}
