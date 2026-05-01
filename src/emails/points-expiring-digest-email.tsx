import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailBulletList,
  EmailCta,
  EmailMetricGrid,
  EmailPanel,
  emailStyles,
} from "@/emails/components";
import { formatCurrency } from "@/lib/money";

type PointsExpiringDigestEmailProps = {
  storeName: string;
  customersAffected: number;
  expiringAmount: number;
  dashboardUrl?: string;
};

export function PointsExpiringDigestEmail({
  storeName,
  customersAffected,
  expiringAmount,
  dashboardUrl = "https://cashbacksuper.com.br/dashboard/clientes",
}: PointsExpiringDigestEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Clientes da ${storeName} tem saldo perto de expirar.`}
      eyebrowText="Oportunidade de reativacao"
      title={`${storeName}, ha clientes prontos para voltar a comprar.`}
    >
      <Text style={emailStyles.text}>
        Seu programa tem saldo perto de expirar, o que abre uma janela excelente para reativar
        clientes e puxar novas visitas.
      </Text>
      <EmailMetricGrid
        items={[
          { label: "Clientes impactados", value: String(customersAffected) },
          { label: "Saldo perto de expirar", value: formatCurrency(expiringAmount) },
        ]}
      />
      <EmailPanel title="Como aproveitar esse momento">
        <EmailBulletList
          items={[
            "Dispare lembretes por e-mail ou WhatsApp.",
            "Oriente a equipe a falar do saldo no caixa.",
            "Use a urgencia para trazer clientes de volta ainda nesta semana.",
          ]}
        />
      </EmailPanel>
      <EmailCta href={dashboardUrl} label="Abrir clientes" />
    </CashbackEmailShell>
  );
}
