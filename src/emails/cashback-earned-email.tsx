import { Section, Text } from "@react-email/components";

import { CashbackEmailShell, EmailCta, EmailMetricGrid, emailStyles } from "@/emails/components";
import { formatCurrency } from "@/lib/money";

type CashbackEarnedEmailProps = {
  customerName: string;
  storeName: string;
  cashbackAmount: number;
  totalBalance: number;
  balanceUrl?: string;
};

export function CashbackEarnedEmail({
  customerName,
  storeName,
  cashbackAmount,
  totalBalance,
  balanceUrl = "https://cashbacksuper.com.br/consulta",
}: CashbackEarnedEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Voce ganhou ${formatCurrency(cashbackAmount)} de cashback na ${storeName}.`}
      eyebrowText="Cashback liberado"
      title={`${customerName}, seu cashback acabou de cair.`}
    >
      <Text style={emailStyles.text}>
        Sua compra na {storeName} gerou um novo beneficio para usar na proxima visita.
      </Text>
      <EmailMetricGrid
        items={[
          { label: "Cashback ganho agora", value: formatCurrency(cashbackAmount) },
          { label: "Saldo total disponivel", value: formatCurrency(totalBalance) },
        ]}
      />
      <Section style={{ ...emailStyles.panel, marginTop: "14px" }}>
        <Text style={emailStyles.panelTitle}>O que voce pode fazer agora</Text>
        <Text style={{ ...emailStyles.text, margin: 0 }}>
          Consulte seu saldo, acompanhe seu extrato e use esse valor na sua proxima compra.
        </Text>
      </Section>
      <EmailCta href={balanceUrl} label="Consultar meu saldo" />
    </CashbackEmailShell>
  );
}
