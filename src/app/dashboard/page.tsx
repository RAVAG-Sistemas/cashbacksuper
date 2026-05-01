import { DashboardClient } from "@/components/dashboard-client";
import { getDashboardData } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <DashboardClient
      envReady={data.envReady}
      store={data.store}
      customers={data.customers}
      cards={data.cards}
      transactions={data.transactions}
      userEmail={data.userEmail}
    />
  );
}
