import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Mail, MessageCircle, Phone } from "lucide-react";

import { MarketingFooter, MarketingHeader, PageHero } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Contato | Cashback Super",
  description: "Fale com a equipe do Cashback Super.",
};

export default function ContatoPage() {
  return (
    <main className="min-h-svh bg-white text-[#222222]">
      <MarketingHeader />
      <PageHero
        eyebrow="Fale conosco"
        title="Vamos montar uma experiencia de cashback bonita para sua loja."
        description="Conte um pouco sobre sua operacao e veja como colocar o Cashback Super para funcionar no caixa."
      />

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-[24px] bg-[#f7f7f7] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Atendimento para lojistas</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#6a6a6a]">
              No primeiro contato, alinhamos tipo de loja, volume de clientes, percentual de cashback e melhor fluxo para sua equipe usar sem travar o atendimento.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [MessageCircle, "WhatsApp", "Resposta rapida para conhecer o produto."],
                [Mail, "E-mail", "Ideal para propostas e materiais."],
                [CalendarCheck, "Apresentacao", "Uma conversa curta para ver o painel."],
                [Phone, "Implantacao", "Apoio para sua equipe comecar bem."],
              ].map(([Icon, title, text]) => {
                const DisplayIcon = Icon as typeof MessageCircle;
                return (
                  <div key={title as string} className="rounded-[14px] bg-white p-4">
                    <DisplayIcon className="size-6 text-[#ff385c]" />
                    <p className="mt-4 font-semibold">{title as string}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[24px] border border-[#dddddd] p-6 sm:p-8">
            <p className="text-sm font-semibold text-[#ff385c]">Comece agora</p>
            <h2 className="mt-3 text-3xl font-semibold">Acesse o painel e veja a experiencia.</h2>
            <p className="mt-4 leading-7 text-[#6a6a6a]">
              O produto ja tem painel, consulta de saldo, fluxo de compra e resgate.
            </p>
            <div className="mt-8 space-y-3">
              <Link href="/dashboard" className="flex h-12 items-center justify-center rounded-full bg-[#ff385c] font-semibold text-white transition hover:bg-[#e00b41]">
                Abrir painel
              </Link>
              <Link href="/consulta" className="flex h-12 items-center justify-center rounded-full bg-[#f7f7f7] font-semibold text-[#222222] transition hover:bg-[#ebebeb]">
                Ver consulta do cliente
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
