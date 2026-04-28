import { redirect } from "next/navigation";

import { DashboardClient } from "@/components/dashboard-client";
import { demoCards, demoCustomers, demoStore, demoTransactions } from "@/lib/demo-data";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    return (
      <DashboardClient
        envReady={false}
        store={demoStore}
        customers={demoCustomers}
        cards={demoCards}
        transactions={demoTransactions}
        userEmail={null}
      />
    );
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
    return (
      <DashboardClient
        envReady
        store={null}
        customers={[]}
        cards={[]}
        transactions={[]}
        userEmail={userData.user?.email}
      />
    );
  }

  const [{ data: customers }, { data: cards }, { data: transactions }] = await Promise.all([
    supabase
      .from("customers")
      .select("*")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false }),
    supabase.from("cards").select("*").eq("store_id", store.id).order("created_at", { ascending: false }),
    supabase
      .from("transactions")
      .select("*")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <DashboardClient
      envReady
      store={store}
      customers={customers ?? []}
      cards={cards ?? []}
      transactions={transactions ?? []}
      userEmail={userData.user?.email}
    />
  );
}
