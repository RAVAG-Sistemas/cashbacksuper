export type BillingPlan = {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  monthlyTransactionLimit: number | null;
  operatorLimit: number | null;
};

export const billingPlans: BillingPlan[] = [
  {
    slug: "essencial",
    name: "Essencial",
    description: "Para lojas iniciando o programa de cashback com operacao enxuta.",
    priceCents: 9900,
    monthlyTransactionLimit: 500,
    operatorLimit: 2,
  },
  {
    slug: "profissional",
    name: "Profissional",
    description: "Para operacao com equipe, relatorios e acompanhamento mais frequente.",
    priceCents: 19900,
    monthlyTransactionLimit: 3000,
    operatorLimit: 8,
  },
  {
    slug: "escala",
    name: "Escala",
    description: "Para lojas com alto volume, mais operadores e rotina de crescimento.",
    priceCents: 39900,
    monthlyTransactionLimit: null,
    operatorLimit: null,
  },
];

export function getBillingPlanBySlug(slug: string) {
  return billingPlans.find((plan) => plan.slug === slug) ?? null;
}
