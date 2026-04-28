import Link from "next/link";

import { BalanceSearch } from "@/components/balance-search";

type PageProps = {
  searchParams: Promise<{
    cpf?: string;
    cartao?: string;
  }>;
};

export default async function ConsultaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialQuery = params.cartao ?? params.cpf;

  return (
    <main className="min-h-svh bg-[#f7f7f7] px-4 py-8 text-[#222222] sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <header className="w-full max-w-3xl space-y-3 text-center">
          <Link href="/" className="text-sm font-semibold text-[#ff385c]">
            CASHBACK SUPER
          </Link>
          <h1 className="text-3xl font-semibold">Saldo de cashback</h1>
          <p className="mx-auto max-w-xl text-sm text-[#6a6a6a]">
            Consulte pelo CPF ou pelo codigo impresso no cartao PVC.
          </p>
        </header>
        <BalanceSearch initialQuery={initialQuery} />
      </div>
    </main>
  );
}
