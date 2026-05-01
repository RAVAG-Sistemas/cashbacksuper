import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailCta,
  EmailMetricGrid,
  EmailPanel,
  emailStyles,
} from "@/emails/components";
import { formatCurrency } from "@/lib/money";

type CashbackRedeemedEmailProps = {
  customerName: string;
  storeName: string;
  redeemedAmount: number;
  remainingBalance: number;
  balanceUrl?: string;
};

export function CashbackRedeemedEmail({
  customerName,
  storeName,
  redeemedAmount,
  remainingBalance,
  balanceUrl = "https://cashbacksuper.com.br/consulta",
}: CashbackRedeemedEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Seu cashback foi usado com sucesso na ${storeName}.`}
      eyebrowText="Resgate confirmado"
      title={`${customerName}, seu cashback foi usado com sucesso.`}
    >
      <Text style={emailStyles.text}>
        O valor foi abatido na sua compra na {storeName} e seu extrato ja esta atualizado.
      </Text>
      <EmailMetricGrid
        items={[
          { label: "Valor resgatado", value: formatCurrency(redeemedAmount) },
          { label: "Saldo restante", value: formatCurrency(remainingBalance) },
        ]}
      />
      <EmailPanel title="Tudo certo no caixa">
        <Text style={{ ...emailStyles.text, margin: 0 }}>
          Transparencia ajuda o cliente a confiar mais no programa e voltar a usar o beneficio.
        </Text>
      </EmailPanel>
      <EmailCta href={balanceUrl} label="Abrir meu extrato" />
    </CashbackEmailShell>
  );
}
