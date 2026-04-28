export function toCentsInput(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return NaN;
  }

  const normalized = value.replace(/\./g, "").replace(",", ".");
  return Number(normalized);
}

export function formatCurrency(value: number | null | undefined) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value ?? 0);
}

export function formatPercent(value: number | null | undefined) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format((value ?? 0) / 100);
}
