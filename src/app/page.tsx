import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cashback Super",
  description: "Painel de cashback para lojistas.",
};

export default function Home() {
  redirect("/dashboard");
}
