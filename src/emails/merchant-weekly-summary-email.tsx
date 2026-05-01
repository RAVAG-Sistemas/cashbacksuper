import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailCta,
  EmailMetricGrid,
  EmailPanel,
  emailStyles,
} from "@/emails/components";
import { formatCurrency } from "@/lib/money";

type MerchantWeeklySummaryEmailProps = {
  storeName: string;
  generatedCashback: number;
  redeemedCashback: number;
  activeCustomers: number;
  dashboardUrl?: string;
};

export function MerchantWeeklySummaryEmail({
  storeName,
  generatedCashback,
  redeemedCashback,
  activeCustomers,
  dashboardUrl = "https://cashbacksuper.com.br/dashboard",
}: MerchantWeeklySummaryEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Resumo semanal da ${storeName} no Cashback Super.`}
      eyebrowText="Resumo semanal"
      title={`${storeName}: sua semana de cashback em numeros.`}
    >
      <Text style={emailStyles.text}>
        Seu programa continuou criando motivos para clientes voltarem. Veja os principais numeros.
      </Text>
      <EmailMetricGrid
        items={[
          { label: "Cashback gerado", value: formatCurrency(generatedCashback) },
          { label: "Resgates realizados", value: formatCurrency(redeemedCashback) },
          { label: "Clientes ativos no programa", value: String(activeCustomers) },
        ]}
      />
      <EmailPanel title="Leitura rapida da semana">
        <Text style={{ ...emailStyles.text, margin: 0 }}>
          Quanto mais claro o retorno do programa, mais facil fica manter a equipe engajada no
          caixa e transformar saldo em nova visita.
        </Text>
      </EmailPanel>
      <EmailCta href={dashboardUrl} label="Abrir painel" />
    </CashbackEmailShell>
  );
}
