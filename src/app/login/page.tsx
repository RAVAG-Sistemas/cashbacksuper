import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f7f7f7] px-4 py-10 text-[#222222]">
      <div className="w-full max-w-md space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-[#ff385c]">CASHBACK SUPER</p>
          <h1 className="text-3xl font-semibold">Painel do lojista</h1>
          <p className="text-sm text-[#6a6a6a]">
            Entre para acompanhar clientes, compras, saldos e resgates.
          </p>
        </div>
        <AuthForm mode="login" />
        <div className="text-center text-sm text-[#6a6a6a]">
          <Link href="/consulta" className="font-medium text-[#222222] underline underline-offset-4">
            Consultar saldo de cliente
          </Link>
        </div>
      </div>
    </main>
  );
}
