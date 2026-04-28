import type { Database } from "@/lib/database.types";

export type Store = Database["public"]["Tables"]["stores"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Card = Database["public"]["Tables"]["cards"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

export const demoStore: Store = {
  id: "11111111-1111-4111-8111-111111111111",
  owner_id: "00000000-0000-4000-8000-000000000000",
  name: "Mercado Aurora",
  slug: "mercado-aurora",
  cashback_percentage: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const demoCustomers: Customer[] = [
  {
    id: "22222222-2222-4222-8222-222222222222",
    store_id: demoStore.id,
    cpf_digits: "12345678909",
    name: "Maria Oliveira",
    phone: "(11) 99999-0101",
    email: "maria@example.com",
    cashback_balance: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    store_id: demoStore.id,
    cpf_digits: "98765432100",
    name: "Joao Santos",
    phone: "(11) 98888-0202",
    email: "joao@example.com",
    cashback_balance: 8.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const demoCards: Card[] = [
  {
    id: "44444444-4444-4444-8444-444444444444",
    store_id: demoStore.id,
    customer_id: demoCustomers[0].id,
    code: "CS-0001",
    status: "active",
    activated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const demoTransactions: Transaction[] = [
  {
    id: "55555555-5555-4555-8555-555555555555",
    store_id: demoStore.id,
    customer_id: demoCustomers[0].id,
    type: "credit",
    purchase_amount: 100,
    amount: 5,
    description: "Compra no caixa 01",
    sku: "CESTA-01",
    created_by: demoStore.owner_id,
    created_at: new Date().toISOString(),
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    store_id: demoStore.id,
    customer_id: demoCustomers[0].id,
    type: "debit",
    purchase_amount: null,
    amount: 10,
    description: "Resgate parcial",
    sku: null,
    created_by: demoStore.owner_id,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "77777777-7777-4777-8777-777777777777",
    store_id: demoStore.id,
    customer_id: demoCustomers[1].id,
    type: "credit",
    purchase_amount: 170,
    amount: 8.5,
    description: "Compra com cartao fisico",
    sku: null,
    created_by: demoStore.owner_id,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];
