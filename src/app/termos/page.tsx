import type { Metadata } from "next";

import { MarketingFooter, MarketingHeader, PageHero } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Termos de uso | Cashback Super",
  description: "Termos de uso do Cashback Super.",
};

const sections = [
  ["Uso do servico", "O Cashback Super oferece ferramentas para lojistas cadastrarem clientes, registrarem compras, concederem cashback e acompanharem resgates."],
  ["Responsabilidade da loja", "A loja define regras comerciais, porcentagens, comunicacao com clientes e condicoes de uso do beneficio em sua operacao."],
  ["Saldo e resgate", "Os saldos exibidos representam beneficios concedidos pela loja. O resgate depende das regras praticadas por cada estabelecimento."],
  ["Disponibilidade", "Trabalhamos para manter o servico estavel e simples de usar, mas melhorias, manutencoes e ajustes podem ocorrer ao longo do tempo."],
];

export default function TermosPage() {
  return (
    <main className="min-h-svh bg-white text-[#222222]">
      <MarketingHeader />
      <PageHero
        eyebrow="Termos de uso"
        title="Regras simples para uma operacao transparente."
        description="Este resumo organiza as condicoes gerais de uso do Cashback Super para lojistas e clientes."
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
