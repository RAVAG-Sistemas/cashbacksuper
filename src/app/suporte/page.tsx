import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, LifeBuoy, MessageCircle, ShieldCheck, WalletCards } from "lucide-react";

import { MarketingFooter, MarketingHeader, PageHero } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Suporte | Cashback Super",
  description: "Central de suporte para lojistas que usam o Cashback Super.",
};

const channels = [
  {
    icon: MessageCircle,
    title: "Atendimento comercial",
    text: "Fale com nossa equipe para conhecer planos, implantacao e melhores praticas.",
    href: "/contato",
    cta: "Falar agora",
  },
  {
    icon: WalletCards,
    title: "Ajuda para lojistas",
    text: "Orientacoes para cadastrar clientes, registrar compras e realizar resgates.",
    href: "/faq",
    cta: "Ver perguntas",
  },
  {
    icon: ShieldCheck,
    title: "Conta e acesso",
    text: "Suporte para entrada no painel, recuperacao de acesso e operacao da equipe.",
    href: "/login",
    cta: "Entrar no painel",
  },
];

export default function SuportePage() {
  return (
    <main className="min-h-svh bg-white text-[#222222]">
      <MarketingHeader />
      <PageHero
        eyebrow="Central de suporte"
        title="Ajuda clara para sua loja vender com cashback sem complicacao."
        description="Encontre respostas rapidas, acesse o painel ou fale com nossa equipe para colocar seu programa para rodar."
      />

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {channels.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[14px] border border-[#dddddd] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,.08)]"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#ff385c] text-white">
                  <Icon className="size-6" />
                </div>
                <h2 className="mt-6 text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#6a6a6a]">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff385c]">
                  {item.cta}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-semibold text-[#ff385c]">Como ajudamos</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              Implantacao com foco no caixa da loja.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Configuracao da loja e percentual de cashback",
              "Cadastro de clientes e ativacao de cartoes",
              "Rotina de compra, credito e resgate",
              "Consulta de saldo por QR Code",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-[14px] bg-white p-4">
                <Clock3 className="mt-0.5 size-5 shrink-0 text-[#ff385c]" />
                <p className="text-sm font-medium leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[24px] bg-[#222222] p-8 text-white md:flex-row md:items-center">
          <div>
            <LifeBuoy className="size-8 text-[#ff8aa0]" />
            <h2 className="mt-4 text-3xl font-semibold">Precisa colocar uma loja no ar?</h2>
            <p className="mt-2 text-white/72">Nossa equipe te ajuda a sair do zero com uma operacao bonita e simples.</p>
          </div>
          <Link href="/contato" className="rounded-full bg-[#ff385c] px-6 py-3 font-semibold text-white transition hover:bg-[#e00b41]">
            Solicitar atendimento
          </Link>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
