import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailCta,
  EmailMetricGrid,
  EmailPanel,
  emailStyles,
} from "@/emails/components";
import { formatCurrency } from "@/lib/money";

type CashbackExpiringEmailProps = {
  customerName: string;
  storeName: string;
  expiringAmount: number;
  expiresAt: string;
  balanceUrl?: string;
};

export function CashbackExpiringEmail({
  customerName,
  storeName,
  expiringAmount,
  expiresAt,
  balanceUrl = "https://cashbacksuper.com.br/consulta",
}: CashbackExpiringEmailProps) {
  return (
    <CashbackEmailShell
      preview={`${formatCurrency(expiringAmount)} expiram em breve na ${storeName}.`}
      eyebrowText="Saldo expirando"
      title={`${customerName}, ainda da tempo de usar seu cashback.`}
    >
      <Text style={emailStyles.text}>
        Uma parte do seu saldo na {storeName} expira em breve. Volte a loja e aproveite esse
        beneficio antes do prazo.
      </Text>
      <EmailMetricGrid
        items={[
          { label: "Valor prestes a expirar", value: formatCurrency(expiringAmount) },
          { label: "Prazo final", value: expiresAt },
        ]}
      />
      <EmailPanel title="Por que agir agora">
        <Text style={{ ...emailStyles.text, margin: 0 }}>
          Esse lembrete existe para ajudar voce a nao perder um beneficio que ja e seu.
        </Text>
      </EmailPanel>
      <EmailCta href={balanceUrl} label="Ver meu saldo" />
    </CashbackEmailShell>
  );
}
