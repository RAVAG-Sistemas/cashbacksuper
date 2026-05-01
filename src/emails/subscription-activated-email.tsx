import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailCta,
  EmailMetricGrid,
  EmailPanel,
  emailStyles,
} from "@/emails/components";

type SubscriptionActivatedEmailProps = {
  storeName: string;
  planName: string;
  billingUrl?: string;
};

export function SubscriptionActivatedEmail({
  storeName,
  planName,
  billingUrl = "https://cashbacksuper.com.br/dashboard/assinatura",
}: SubscriptionActivatedEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Seu plano ${planName} ja esta ativo.`}
      eyebrowText="Assinatura ativa"
      title={`${storeName}, sua assinatura foi ativada com sucesso.`}
    >
      <Text style={emailStyles.text}>
        Agora sua loja segue operando com o plano contratado e pronta para continuar crescendo.
      </Text>
      <EmailMetricGrid items={[{ label: "Plano ativo", value: planName }]} />
      <EmailPanel title="A partir daqui">
        <Text style={{ ...emailStyles.text, margin: 0 }}>
          Use o painel para acompanhar clientes, transacoes, saldo em aberto e a evolucao do
          programa na rotina da loja.
        </Text>
      </EmailPanel>
      <EmailCta href={billingUrl} label="Ver minha assinatura" />
    </CashbackEmailShell>
  );
}
