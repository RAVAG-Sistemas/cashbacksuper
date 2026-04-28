import type { Metadata } from "next";

import { MarketingFooter, MarketingHeader, PageHero } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Privacidade | Cashback Super",
  description: "Politica de privacidade do Cashback Super.",
};

const sections = [
  ["Dados usados na operacao", "O sistema pode utilizar nome, CPF, telefone, e-mail, codigo de cartao e historico de saldo para permitir cadastro, consulta e resgate de cashback."],
  ["Finalidade", "Esses dados ajudam a identificar o cliente, exibir saldo, registrar movimentacoes e enviar comunicacoes relacionadas ao beneficio."],
  ["Seguranca", "O acesso do lojista e protegido, e as informacoes devem ser usadas apenas para a operacao do programa de cashback."],
  ["Direitos do cliente", "Clientes podem solicitar atualizacao, correcao ou exclusao de dados diretamente com a loja responsavel pelo programa."],
];

export default function PrivacidadePage() {
  return (
    <main className="min-h-svh bg-white text-[#222222]">
      <MarketingHeader />
      <PageHero
        eyebrow="Privacidade"
        title="Dados tratados com clareza para apoiar o relacionamento da loja."
        description="A politica resume quais informacoes podem ser usadas e para que servem dentro da experiencia de cashback."
      />
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          {sections.map(([title, text]) => (
            <div key={title} className="rounded-[14px] border border-[#dddddd] p-5">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-[#6a6a6a]">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
