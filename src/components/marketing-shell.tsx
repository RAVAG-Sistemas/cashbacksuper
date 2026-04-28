import Link from "next/link";
import { BadgeDollarSign, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#fluxo", label: "Como funciona" },
  { href: "/faq", label: "FAQ" },
  { href: "/suporte", label: "Suporte" },
];

const footerGroups = [
  {
    title: "Produto",
    links: [
      { href: "/", label: "Home" },
      { href: "/#beneficios", label: "Beneficios" },
      { href: "/#fluxo", label: "Como funciona" },
      { href: "/consulta", label: "Consulta de saldo" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { href: "/suporte", label: "Central de suporte" },
      { href: "/faq", label: "Perguntas frequentes" },
      { href: "/contato", label: "Falar com especialista" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/termos", label: "Termos de uso" },
      { href: "/privacidade", label: "Privacidade" },
      { href: "/login", label: "Area do lojista" },
    ],
  },
];

export function MarketingHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <header
      className={
        isDark
          ? "relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-white sm:px-8"
          : "sticky top-0 z-30 border-b border-[#ebebeb] bg-white/92 px-5 py-4 text-[#222222] backdrop-blur sm:px-8"
      }
    >
      <div className={isDark ? "flex w-full items-center justify-between" : "mx-auto flex w-full max-w-7xl items-center justify-between"}>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#ff385c] text-white">
            <BadgeDollarSign className="size-5" />
          </span>
          CASHBACK SUPER
        </Link>
        <nav className={isDark ? "hidden items-center gap-6 text-sm font-medium text-white/85 md:flex" : "hidden items-center gap-6 text-sm font-medium text-[#6a6a6a] md:flex"}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={isDark ? "transition hover:text-white" : "transition hover:text-[#222222]"}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className={isDark ? "rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#222222] shadow-sm transition hover:scale-[1.02]" : "rounded-full bg-[#222222] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"}
        >
          Entrar
        </Link>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-[#ebebeb] bg-white px-5 py-12 text-[#222222] sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#ff385c] text-white">
              <BadgeDollarSign className="size-5" />
            </span>
            CASHBACK SUPER
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#6a6a6a]">
            Cashback simples para lojas que querem vender mais e fazer o cliente voltar.
          </p>
          <Link
            href="/contato"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff385c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e00b41]"
          >
            Falar com especialista
            <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="font-semibold">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-[#6a6a6a] transition hover:text-[#222222]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#ebebeb] pt-6 text-sm text-[#6a6a6a]">
        © 2026 Cashback Super. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-[#f7f7f7] px-5 py-16 text-[#222222] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-[#ff385c]">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#6a6a6a]">{description}</p>
      </div>
    </section>
  );
}
