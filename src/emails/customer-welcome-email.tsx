import { Text } from "@react-email/components";

import {
  CashbackEmailShell,
  EmailBulletList,
  EmailCta,
  EmailPanel,
  emailStyles,
} from "@/emails/components";

type CustomerWelcomeEmailProps = {
  customerName: string;
  storeName: string;
  balanceUrl?: string;
};

export function CustomerWelcomeEmail({
  customerName,
  storeName,
  balanceUrl = "https://cashbacksuper.com.br/consulta",
}: CustomerWelcomeEmailProps) {
  return (
    <CashbackEmailShell
      preview={`Seu cadastro na ${storeName} foi concluido com sucesso.`}
      eyebrowText="Bem-vindo ao programa"
      title={`${customerName}, seu cadastro na ${storeName} ja esta ativo.`}
    >
      <Text style={emailStyles.text}>
        A partir de agora suas compras podem gerar cashback para usar nas proximas visitas.
      </Text>
      <EmailPanel title="Como funciona">
        <EmailBulletList
          items={[
            "Compre normalmente na loja participante.",
            "Receba cashback sempre que a compra for registrada.",
            "Consulte saldo e extrato quando quiser.",
          ]}
        />
      </EmailPanel>
      <EmailCta href={balanceUrl} label="Consultar meu saldo" />
    </CashbackEmailShell>
  );
}
