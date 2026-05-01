import { DashboardSectionPage } from "@/components/dashboard-section-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDashboardData } from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function TransacoesDashboardPage() {
  const data = await getDashboardData();
  const customerById = new Map(data.customers.map((customer) => [customer.id, customer]));

  return (
    <DashboardSectionPage
      activeHref="/dashboard/transacoes"
      eyebrow="Transacoes e resgates"
      title="Uma central financeira para acompanhar creditos, debitos e retorno gerado."
      description="A tabela abaixo ja nasce com dados do sistema atual e esta pronta para ganhar filtros por periodo, cliente, CPF e operador."
      cta={{ href: "/dashboard", label: "Registrar compra" }}
      highlights={[
        {
          title: `${data.transactions.length} movimentacoes lidas`,
          description: "A tela ja reflete o extrato real ou a base demo da operacao.",
        },
        {
          title: "Proxima etapa: filtros server-side",
          description: "A estrutura esta pronta para crescer com paginação e busca.",
        },
        {
          title: "Ligacao com notificacoes",
          description: "Cada transacao pode virar e-mail, WhatsApp e auditoria.",
        },
        {
          title: "Resumos financeiros",
          description: "Credito e debito poderao alimentar relatorios e billing.",
        },
      ]}
    >
      <Card className="rounded-[18px] border-[#dddddd] shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descricao</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{customerById.get(transaction.customer_id)?.name ?? "Cliente"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.type === "credit" ? "secondary" : "outline"}
                        className="rounded-full"
                      >
                        {transaction.type === "credit" ? "Credito" : "Debito"}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.description ?? "Sem descricao"}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(transaction.created_at))}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardSectionPage>
  );
}
