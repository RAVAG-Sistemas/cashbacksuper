import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  CreditCard,
  QrCode,
  ReceiptText,
  Sparkles,
} from "lucide-react";

import { MarketingFooter, MarketingHeader } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Cashback Super | Cashback pronto para sua loja",
  description:
    "Uma experiencia simples para cadastrar clientes, gerar cashback e trazer compradores de volta.",
};

const benefits = [
  {
    title: "Cadastro rapido",
    text: "CPF, contato e cartao fisico em um unico fluxo.",
    image: "/brand-assets/benefit-register.png",
  },
  {
    title: "Saldo sempre claro",
    text: "O cliente consulta sem baixar aplicativo.",
    image: "/brand-assets/benefit-balance.png",
  },
  {
    title: "Resgate sem atrito",
    text: "A loja abate o valor e segue a venda.",
    image: "/brand-assets/benefit-redeem.png",
  },
];

const moments = [
  {
    title: "Venda",
    text: "A atendente registra o valor da compra no caixa.",
    image: "/brand-assets/moment-sale.png",
  },
  {
    title: "Credito",
    text: "O cashback entra no saldo do cliente na hora.",
    image: "/brand-assets/moment-credit.png",
  },
  {
    title: "Traga de volta",
    text: "O cliente consulta o saldo e volta para usar o beneficio.",
    image: "/brand-assets/moment-return.png",
  },
];

const proofItems = [
  "Cliente cadastrado",
  "Saldo visivel na hora",
  "Resgate rapido",
];

export default function Home() {
  return (
    <main className="min-h-svh bg-white text-[#1e1e1e]">
      <MarketingHeader />

      <section className="relative overflow-hidden border-b border-[#e9eaec] bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="animate-[cs-rise-fast_.45s_ease-out_both]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fff0f3] px-4 py-2 text-sm font-semibold text-[#ff2d55]">
              <Sparkles className="size-4" />
              Cashback pronto para vender mais
            </p>
            <h1 className="text-5xl font-semibold leading-[1.03] tracking-normal">
              Seu cliente volta. <span className="text-[#ff2d55]">Voce ganha.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-[#6b7280]">
              Cashback simples para lojas que querem vender mais e fazer o cliente voltar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#ff2d55] px-7 font-semibold text-white shadow-[0_18px_45px_rgba(255,45,85,.28)] transition hover:scale-[1.02] hover:bg-[#e51f47]"
              >
                Comecar agora
                <ChevronRight className="size-5" />
              </Link>
              <Link
                href="/consulta"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#f3f4f6] px-7 font-semibold text-[#1e1e1e] transition hover:bg-[#e9eaec]"
              >
                Ver consulta do cliente
              </Link>
            </div>
          </div>

          <div className="relative animate-[cs-float-in_.7s_ease-out_.1s_both]">
            <Image
              src="/brand-assets/hero-shopper.png"
              alt="Cliente recebendo cashback no caixa"
              width={637}
              height={305}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section id="beneficios" className="border-b border-[#e9eaec] bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#ff2d55]">Beneficios principais</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">
              Um programa de fidelidade que parece grande desde o primeiro dia.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((item) => (
              <article
                key={item.title}
                className="group rounded-[14px] border border-[#e9eaec] bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(30,30,30,.08)]"
              >
                <div className="flex min-h-56 items-end justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={295}
                    height={225}
                    className="h-auto max-h-56 w-auto transition group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-60 text-sm leading-6 text-[#6b7280]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fluxo" className="bg-[#f3f4f6] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 border-b border-[#dfe1e5] pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-[#ff2d55]">Momentos da recompra</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight">
                Do caixa ao retorno, tudo fica facil de entender.
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1e1e1e] px-6 font-semibold text-white transition hover:scale-[1.02]"
            >
              Abrir painel
              <ChevronRight className="size-5" />
            </Link>
          </div>

          <div className="grid gap-5 py-10 lg:grid-cols-3">
            {moments.map((item) => (
              <article key={item.title} className="rounded-[14px] bg-white p-5 text-center shadow-sm">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={275}
                  height={220}
                  className="mx-auto h-auto max-h-48 w-auto"
                />
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-64 text-sm leading-6 text-[#6b7280]">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="grid overflow-hidden rounded-[24px] border border-[#e9eaec] bg-white lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <p className="text-sm font-semibold text-[#ff2d55]">Cartao que lembra de voltar</p>
              <h3 className="mt-3 max-w-md text-3xl font-semibold leading-tight">
                Um beneficio fisico, simples e memoravel.
              </h3>
              <p className="mt-4 max-w-md leading-7 text-[#6b7280]">
                O cartao vira lembrete de retorno e a consulta por QR Code deixa o saldo sempre a
                mao.
              </p>
              <div className="mt-7 space-y-3">
                {["Cartao PVC", "CPF", "Saldo instantaneo"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold">
                    <span className="flex size-6 items-center justify-center rounded-full border border-[#ff6b85] text-[#ff2d55]">
                      <Check className="size-4" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid items-center gap-6 border-t border-[#e9eaec] bg-[#fbfbfc] p-8 lg:border-l lg:border-t-0">
              <Image
                src="/brand-assets/cashback-card.png"
                alt="Cartao Cashback Super"
                width={235}
                height={143}
                className="mx-auto h-auto w-full max-w-72 rotate-[-4deg] drop-shadow-[0_24px_35px_rgba(255,45,85,.18)]"
              />
              <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-2">
                {proofItems.map((item) => (
                  <div key={item} className="rounded-[14px] bg-white p-3 text-center text-xs font-semibold shadow-sm">
                    <Check className="mx-auto mb-2 size-4 text-[#ff2d55]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <p className="text-sm font-semibold text-[#ff2d55]">Fluxo simples para sua loja</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight">
              Comece pequeno, pareca grande desde o primeiro atendimento.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [ReceiptText, "Registro de compra"],
                [CreditCard, "Resgate no caixa"],
                [QrCode, "Consulta por QR Code"],
              ].map(([Icon, text]) => {
                const DisplayIcon = Icon as typeof ReceiptText;
                return (
                  <div key={text as string} className="rounded-[14px] bg-[#f3f4f6] p-4">
                    <DisplayIcon className="size-5 text-[#ff2d55]" />
                    <p className="mt-3 text-sm font-semibold">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <Image
            src="/brand-assets/shop-front.png"
            alt="Loja usando Cashback Super"
            width={225}
            height={143}
            className="mx-auto h-auto w-full max-w-sm"
          />
        </div>
      </section>

      <section className="border-y border-[#e9eaec] bg-[#fbfbfc] px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["/brand-assets/extra-growth.png", "Cresca recorrencia", "Acompanhe clientes voltando mais vezes."],
            ["/brand-assets/extra-happy.png", "Crie momentos bons", "O cliente sente que ganhou algo de verdade."],
            ["/brand-assets/extra-piggy.png", "Valor percebido", "Cashback simples de entender e facil de usar."],
          ].map(([image, title, text]) => (
            <div key={title} className="rounded-[14px] bg-white p-5 text-center shadow-sm">
              <Image src={image} alt={title} width={210} height={150} className="mx-auto h-32 w-auto" />
              <p className="mt-4 font-semibold">{title}</p>
              <p className="mx-auto mt-2 max-w-64 text-sm leading-6 text-[#6b7280]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#1e1e1e] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-[#ff6b85]">CASHBACK SUPER</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight">
              Seu programa de cashback pode entrar no ar hoje.
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#ff2d55] px-7 font-semibold text-white transition hover:scale-[1.02] hover:bg-[#e51f47]"
          >
            Ver painel pronto
            <ChevronRight className="size-5" />
          </Link>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
