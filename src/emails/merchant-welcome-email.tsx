import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailBulletList,
  EmailCta,
  EmailPanel,
  emailStyles,
} from "@/emails/components";

type MerchantWelcomeEmailProps = {
  ownerName: string;
  storeName: string;
  dashboardUrl?: string;
};

export function MerchantWelcomeEmail({
  ownerName,
  storeName,
  dashboardUrl = "https://cashbacksuper.com.br/dashboard",
}: MerchantWelcomeEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Sua loja ${storeName} entrou no ar no Cashback Super.`}
      eyebrowText="Boas-vindas"
      title={`${ownerName}, sua loja ${storeName} ja pode vender com cashback.`}
    >
      <Text style={emailStyles.text}>
        O painel esta pronto para cadastrar clientes, registrar compras e transformar retorno em
        rotina da operacao.
      </Text>
      <EmailPanel title="Primeiros passos recomendados">
        <EmailBulletList
          items={[
            "Configure a porcentagem padrao de cashback.",
            "Cadastre sua equipe ou comece direto pelo caixa.",
            "Ative os primeiros clientes e acompanhe o saldo gerado.",
          ]}
        />
      </EmailPanel>
      <EmailCta href={dashboardUrl} label="Abrir meu painel" />
    </CashbackEmailShell>
  );
}
