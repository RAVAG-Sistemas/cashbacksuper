import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeDollarSign,
  Check,
  ChevronRight,
  CreditCard,
  QrCode,
  ReceiptText,
  Sparkles,
  Store,
  WalletCards,
} from "lucide-react";
import { MarketingFooter, MarketingHeader } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Cashback Super | Cashback pronto para sua loja",
  description:
    "Uma experiencia simples para cadastrar clientes, gerar cashback e trazer compradores de volta.",
};

const heroImage =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2200&q=85";

const proofItems = [
  "Cliente cadastrado em segundos",
  "Saldo visivel por CPF ou cartao",
  "Resgate rapido no caixa",
];

const flow = [
  {
    icon: Store,
    title: "Venda",
    text: "A atendente registra o valor da compra no caixa.",
  },
  {
    icon: BadgeDollarSign,
    title: "Credite",
    text: "O cashback entra no saldo do cliente na hora.",
  },
  {
    icon: WalletCards,
    title: "Traga de volta",
    text: "O cliente consulta o saldo e volta para usar o beneficio.",
  },
];

export default function Home() {
  return (
    <main className="min-h-svh bg-white text-[#222222]">
      <section
        className="relative min-h-[88svh] overflow-hidden bg-[#111111] text-white"
      >
        <Image
          src={heroImage}
          alt="Atendimento no caixa de uma loja"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] opacity-78"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.74)_0%,rgba(0,0,0,.55)_46%,rgba(0,0,0,.16)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_18%_50%,rgba(0,0,0,.36),transparent_48%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
        <MarketingHeader variant="dark" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:pb-20 lg:pt-20">
          <div className="max-w-2xl animate-[cs-rise-fast_.45s_ease-out_both]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/18 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-[#ff385c]" />
              Cashback pronto para vender mais
            </p>
            <h1 className="text-5xl font-semibold leading-[1.04] tracking-normal text-white drop-shadow-[0_2px_18px_rgba(0,0,0,.32)]">
              Faça seu cliente voltar para comprar de novo.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,.28)]">
              Um painel simples para cadastrar clientes, liberar cashback e transformar cada
              compra em retorno para sua loja.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#ff385c] px-7 font-semibold text-white shadow-[0_18px_45px_rgba(255,56,92,.35)] transition hover:scale-[1.02] hover:bg-[#e00b41]"
              >
                Comecar agora
                <ChevronRight className="size-5" />
              </Link>
              <Link
                href="/consulta"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white/14 px-7 font-semibold text-white backdrop-blur transition hover:bg-white/22"
              >
                Ver consulta do cliente
              </Link>
            </div>
          </div>

          <div className="animate-[cs-float-in_.9s_ease-out_.15s_both]">
            <div className="rounded-[28px] bg-white p-4 text-[#222222] shadow-[0_30px_90px_rgba(0,0,0,.32)]">
              <div className="rounded-[20px] bg-[#f7f7f7] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6a6a6a]">Saldo de Maria</p>
                    <p className="mt-1 text-4xl font-semibold">R$ 25,00</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#ff385c] text-white">
                    <WalletCards className="size-6" />
                  </div>
                </div>
                <div className="mt-6 rounded-[18px] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compra registrada</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                      +R$ 5,00
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#ebebeb]">
                    <div className="h-full w-3/4 animate-[cs-grow_1.2s_ease-out_.6s_both] rounded-full bg-[#ff385c]" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {proofItems.map((item) => (
                    <div key={item} className="rounded-[16px] bg-white p-3 text-xs font-medium">
                      <Check className="mb-2 size-4 text-[#ff385c]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="border-b border-[#ebebeb] bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="animate-[cs-rise_linear_both] [animation-timeline:view()] [animation-range:entry_0%_cover_32%]">
            <p className="text-sm font-semibold text-[#ff385c]">Mais retorno por compra</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">
              Cashback bonito para o cliente, facil para o caixa.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Cadastro rapido", "CPF, contato e cartao fisico em um unico fluxo."],
              ["Saldo sempre claro", "O cliente consulta sem baixar aplicativo."],
              ["Resgate sem atrito", "A loja abate o valor e segue a venda."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[14px] border border-[#dddddd] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(0,0,0,.08)]"
              >
                <p className="font-semibold">{title}</p>
                <p className="mt-3 text-sm leading-6 text-[#6a6a6a]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fluxo" className="bg-[#f7f7f7] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 border-b border-[#dddddd] pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-[#ff385c]">Do caixa ao retorno</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight">
                Tres momentos para criar uma rotina de recompra.
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#222222] px-6 font-semibold text-white transition hover:scale-[1.02]"
            >
              Abrir painel
              <ChevronRight className="size-5" />
            </Link>
          </div>

          <div className="grid gap-8 py-10 lg:grid-cols-3">
            {flow.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="animate-[cs-rise_linear_both] [animation-timeline:view()] [animation-range:entry_0%_cover_36%]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-white text-[#ff385c] shadow-sm">
                    <Icon className="size-6" />
                  </div>
                  <p className="mt-6 text-2xl font-semibold">{item.title}</p>
                  <p className="mt-3 max-w-sm leading-7 text-[#6a6a6a]">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_18px_60px_rgba(0,0,0,.08)] lg:grid-cols-2">
            <div className="min-h-72 bg-[url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center" />
            <div className="p-8 sm:p-10">
              <QrCode className="size-9 text-[#ff385c]" />
              <h3 className="mt-5 text-3xl font-semibold">O cartao vira lembranca de voltar.</h3>
              <p className="mt-4 leading-7 text-[#6a6a6a]">
                O QR Code leva direto para a consulta de saldo. Simples, direto e com cara de
                beneficio real.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#f7f7f7] px-4 py-2 text-sm font-medium">
                  Cartao PVC
                </span>
                <span className="rounded-full bg-[#f7f7f7] px-4 py-2 text-sm font-medium">
                  CPF
                </span>
                <span className="rounded-full bg-[#f7f7f7] px-4 py-2 text-sm font-medium">
                  Saldo instantaneo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="text-sm font-semibold text-[#ff385c]">Pronto para loja de verdade</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight">
              Comece pequeno, pareca grande desde o primeiro atendimento.
            </h2>
          </div>
          <div className="space-y-3">
            {[
              [ReceiptText, "Registro de compra"],
              [CreditCard, "Resgate no caixa"],
              [QrCode, "Consulta por QR Code"],
            ].map(([Icon, text]) => {
              const DisplayIcon = Icon as typeof ReceiptText;
              return (
                <div key={text as string} className="flex items-center gap-3 rounded-full bg-[#f7f7f7] p-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white text-[#ff385c]">
                    <DisplayIcon className="size-5" />
                  </span>
                  <span className="font-medium">{text as string}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#222222] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-[#ff8aa0]">CASHBACK SUPER</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight">
              Seu programa de cashback pode entrar no ar hoje.
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#ff385c] px-7 font-semibold text-white transition hover:scale-[1.02] hover:bg-[#e00b41]"
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
