import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailCta,
  EmailPanel,
  EmailMetricGrid,
  emailStyles,
} from "@/emails/components";
import { formatCurrency } from "@/lib/money";

type PaymentFailedEmailProps = {
  storeName: string;
  invoiceReference: string;
  amount: number;
  billingUrl?: string;
};

export function PaymentFailedEmail({
  storeName,
  invoiceReference,
  amount,
  billingUrl = "https://cashbacksuper.com.br/dashboard/assinatura",
}: PaymentFailedEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Nao foi possivel concluir a cobranca da sua assinatura.`}
      eyebrowText="Pagamento nao concluido"
      title={`${storeName}, precisamos atualizar sua cobranca.`}
    >
      <Text style={emailStyles.text}>
        Tentamos processar a renovacao da sua assinatura, mas a cobranca nao foi concluida.
      </Text>
      <EmailMetricGrid
        items={[
          { label: "Fatura", value: invoiceReference },
          { label: "Valor", value: formatCurrency(amount) },
        ]}
      />
      <EmailPanel title="Como regularizar">
        <Text style={{ ...emailStyles.text, margin: 0 }}>
          Atualize sua forma de pagamento para manter o painel, os registros e a operacao da loja
          funcionando normalmente.
        </Text>
      </EmailPanel>
      <EmailCta href={billingUrl} label="Atualizar pagamento" />
    </CashbackEmailShell>
  );
}
