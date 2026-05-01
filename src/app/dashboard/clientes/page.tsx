import { DashboardSectionPage } from "@/components/dashboard-section-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function ClientesDashboardPage() {
  const data = await getDashboardData();

  return (
    <DashboardSectionPage
      activeHref="/dashboard/clientes"
      eyebrow="Gestao de clientes"
      title="Clientes, saldos e historico em uma tela preparada para operacao diaria."
      description="A partir daqui a operacao pode evoluir para busca, filtros, detalhe do cliente e trilha de consentimento, sem perder a simplicidade no caixa."
      cta={{ href: "/dashboard", label: "Cadastrar cliente" }}
      highlights={[
        {
          title: `${data.customers.length} clientes no programa`,
          description: "A contagem atual ja e real quando o Supabase estiver conectado.",
        },
        {
          title: "Saldo total em aberto",
          description: formatCurrency(
            data.customers.reduce((total, customer) => total + customer.cashback_balance, 0),
          ),
        },
        {
          title: "Tela pronta para detalhe individual",
          description: "Cada cliente podera ganhar pagina propria com extrato e cartoes.",
        },
        {
          title: data.isDemo ? "Modo demonstracao ativo" : "Dados sincronizados",
          description: data.isDemo
            ? "A tela esta usando a base exemplo enquanto o ambiente real nao foi ligado."
            : "A leitura desta pagina ja reflete os clientes reais da loja.",
        },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.customers.map((customer) => (
          <Card key={customer.id} className="rounded-[18px] border-[#dddddd] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-start justify-between gap-3 text-lg">
                <span className="truncate">{customer.name}</span>
                <Badge className="rounded-full bg-[#222222] text-white">
                  {formatCurrency(customer.cashback_balance)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[#6a6a6a]">
              <p>CPF final {customer.cpf_digits.slice(-4)}</p>
              <p>{customer.phone ?? "Telefone nao informado"}</p>
              <p className="truncate">{customer.email ?? "E-mail nao informado"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardSectionPage>
  );
}
