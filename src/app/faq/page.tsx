import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { MarketingFooter, MarketingHeader, PageHero } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "FAQ | Cashback Super",
  description: "Perguntas frequentes sobre o Cashback Super para lojistas.",
};

const questions = [
  {
    q: "O Cashback Super funciona para qualquer tipo de loja?",
    a: "Sim. Ele foi pensado para comercio local, mercados, lojas de bairro, saloes, restaurantes, prestadores de servico e operacoes que querem incentivar recompra.",
  },
  {
    q: "O cliente precisa baixar aplicativo?",
    a: "Nao. O cliente consulta o saldo por CPF ou pelo codigo do cartao, direto em uma pagina simples.",
  },
  {
    q: "Posso escolher a porcentagem de cashback?",
    a: "Sim. Cada loja define o percentual ideal para sua margem e campanha.",
  },
  {
    q: "Como funciona o cartao fisico?",
    a: "A loja informa o codigo do cartao no cadastro do cliente. Depois, o cliente pode usar esse codigo para consultar o saldo.",
  },
  {
    q: "A equipe do caixa consegue usar no celular?",
    a: "Sim. O painel foi desenhado mobile-first, com botoes grandes e fluxos curtos para uso em celular ou tablet.",
  },
  {
    q: "O cliente recebe aviso quando ganha cashback?",
    a: "A loja pode enviar notificacoes por e-mail quando uma compra gera cashback, reforcando o retorno do cliente.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-svh bg-white text-[#222222]">
      <MarketingHeader />
      <PageHero
        eyebrow="Perguntas frequentes"
        title="Tudo que o lojista precisa saber antes de comecar."
        description="Respostas diretas sobre operacao, clientes, cartoes, saldo e resgate no caixa."
      />

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-4">
          {questions.map((item) => (
            <details key={item.q} className="group rounded-[14px] border border-[#dddddd] bg-white p-5 open:shadow-[0_18px_50px_rgba(0,0,0,.06)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.q}
                <ChevronRight className="size-5 shrink-0 text-[#ff385c] transition group-open:rotate-90" />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6a6a6a]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-5 py-14 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-[#ff385c]">Ainda tem duvida?</p>
            <h2 className="mt-3 text-3xl font-semibold">Fale com a equipe e veja o painel pronto.</h2>
          </div>
          <Link href="/contato" className="rounded-full bg-[#ff385c] px-6 py-3 font-semibold text-white transition hover:bg-[#e00b41]">
            Falar com especialista
          </Link>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
