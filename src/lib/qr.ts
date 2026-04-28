import { getPublicAppUrl } from "@/lib/env";

type BalanceUrlInput = {
  cardCode?: string | null;
  cpf?: string | null;
};

export function generateBalanceUrl({ cardCode, cpf }: BalanceUrlInput) {
  const url = new URL("/consulta", getPublicAppUrl());

  if (cardCode) {
    url.searchParams.set("cartao", cardCode);
  } else if (cpf) {
    url.searchParams.set("cpf", cpf);
  }

  return url.toString();
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
