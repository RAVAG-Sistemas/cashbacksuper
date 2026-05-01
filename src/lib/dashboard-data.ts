import { redirect } from "next/navigation";

import { demoCards, demoCustomers, demoStore, demoTransactions } from "@/lib/demo-data";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export type DashboardData = {
  envReady: boolean;
  store: typeof demoStore | null;
  customers: typeof demoCustomers;
  cards: typeof demoCards;
  transactions: typeof demoTransactions;
  userEmail: string | null;
  isDemo: boolean;
};

export async function getDashboardData(): Promise<DashboardData> {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      store: demoStore,
      customers: demoCustomers,
      cards: demoCards,
      transactions: demoTransactions,
      userEmail: null,
      isDemo: true,
    };
  }

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (!userId) {
    redirect("/login");
  }

  const { data: userData } = await supabase.auth.getUser();
  const { data: stores } = await supabase
    .from("stores")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: true })
    .limit(1);

  const store = stores?.[0] ?? null;

  if (!store) {
    return {
      envReady: true,
      store: null,
      customers: [],
      cards: [],
      transactions: [],
      userEmail: userData.user?.email ?? null,
      isDemo: false,
    };
  }

  const [{ data: customers }, { data: cards }, { data: transactions }] = await Promise.all([
    supabase
      .from("customers")
      .select("*")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("cards")
      .select("*")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("transactions")
      .select("*")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  return {
    envReady: true,
    store,
    customers: customers ?? [],
    cards: cards ?? [],
    transactions: transactions ?? [],
    userEmail: userData.user?.email ?? null,
    isDemo: false,
  };
}
