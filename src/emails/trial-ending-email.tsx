import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailBulletList,
  EmailCta,
  EmailMetricGrid,
  EmailPanel,
  emailStyles,
} from "@/emails/components";

type TrialEndingEmailProps = {
  storeName: string;
  daysLeft: number;
  dashboardUrl?: string;
};

export function TrialEndingEmail({
  storeName,
  daysLeft,
  dashboardUrl = "https://cashbacksuper.com.br/dashboard/assinatura",
}: TrialEndingEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Seu periodo de avaliacao termina em ${daysLeft} dias.`}
      eyebrowText="Trial terminando"
      title={`${storeName}, seu periodo de avaliacao esta chegando ao fim.`}
    >
      <Text style={emailStyles.text}>
        Falta pouco para encerrar sua avaliacao. Vale a pena garantir que a operacao continue sem
        pausa no caixa.
      </Text>
      <EmailMetricGrid items={[{ label: "Dias restantes", value: String(daysLeft) }]} />
      <EmailPanel title="Antes do trial acabar">
        <EmailBulletList
          items={[
            "Revise seu plano ideal.",
            "Confirme a forma de pagamento.",
            "Mantenha o time operando sem interrupcao.",
          ]}
        />
      </EmailPanel>
      <EmailCta href={dashboardUrl} label="Ver assinatura" />
    </CashbackEmailShell>
  );
}
