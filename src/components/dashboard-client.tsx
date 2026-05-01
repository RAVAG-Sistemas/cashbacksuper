"use client";

import { useActionState, useMemo } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  CreditCard,
  LogOut,
  Plus,
  QrCode,
  ReceiptText,
  Settings2,
  UserRoundPlus,
} from "lucide-react";

import {
  createStoreAction,
  registerCustomerAction,
  registerPurchaseAction,
  redeemCashbackAction,
  signOutAction,
  updateStoreAction,
  type MutationState,
} from "@/app/actions";
import { ActionFeedback } from "@/components/action-feedback";
import { QrPreview } from "@/components/qr-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { dashboardNavItems } from "@/lib/dashboard-nav";
import type { Card as StoreCard, Customer, Store, Transaction } from "@/lib/demo-data";
import { formatCurrency, formatPercent } from "@/lib/money";

type Props = {
  envReady: boolean;
  store: Store | null;
  customers: Customer[];
  cards: StoreCard[];
  transactions: Transaction[];
  userEmail?: string | null;
};

const initialState: MutationState = { status: "idle", message: "" };

function SelectCustomer({
  customers,
  name,
  id,
}: {
  customers: Customer[];
  name: string;
  id: string;
}) {
  return (
    <select
      id={id}
      name={name}
      required
      className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <option value="">Selecione</option>
      {customers.map((customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name} - {formatCurrency(customer.cashback_balance)}
        </option>
      ))}
    </select>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-[14px] border border-[#ebebeb] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#6a6a6a]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#222222]">{value}</p>
      <p className="mt-1 text-sm text-[#6a6a6a]">{detail}</p>
    </div>
  );
}

export function DashboardClient({
  envReady,
  store,
  customers,
  cards,
  transactions,
  userEmail,
}: Props) {
  const [storeState, storeAction, storePending] = useActionState(
    store ? updateStoreAction : createStoreAction,
    initialState,
  );
  const [customerState, customerAction, customerPending] = useActionState(
    registerCustomerAction,
    initialState,
  );
  const [purchaseState, purchaseAction, purchasePending] = useActionState(
    registerPurchaseAction,
    initialState,
  );
  const [redeemState, redeemAction, redeemPending] = useActionState(
    redeemCashbackAction,
    initialState,
  );

  const cardByCustomer = useMemo(() => {
    return new Map(cards.map((card) => [card.customer_id, card.code]));
  }, [cards]);

  const customerById = useMemo(() => {
    return new Map(customers.map((customer) => [customer.id, customer]));
  }, [customers]);

  const totalGenerated = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const openBalance = customers.reduce((total, customer) => total + customer.cashback_balance, 0);
  const redeemed = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="min-h-svh bg-[#f7f7f7] text-[#222222]">
      <header className="sticky top-0 z-20 border-b border-[#ebebeb] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#ff385c] text-white">
                <BadgeDollarSign className="size-5" />
              </div>
              <div>
                <p className="text-base font-semibold">CASHBACK SUPER</p>
                <p className="text-xs text-[#6a6a6a]">
                  {store ? store.name : "Configure sua primeira loja"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden rounded-full sm:inline-flex">
              {envReady ? userEmail ?? "Lojista" : "Painel pronto"}
            </Badge>
            <form action={signOutAction}>
              <Button variant="outline" size="icon" className="rounded-full" aria-label="Sair">
                <LogOut className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <nav className="grid gap-2 rounded-[18px] border border-[#dddddd] bg-white p-2 shadow-sm">
            {dashboardNavItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/dashboard";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "rounded-[14px] bg-[#fff0f3] p-3 text-[#ff385c]"
                      : "rounded-[14px] p-3 text-[#6a6a6a] transition hover:bg-[#f7f7f7] hover:text-[#222222]"
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="truncate text-xs opacity-80">{item.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat
                label="Cashback gerado"
                value={formatCurrency(totalGenerated)}
                detail={`${formatPercent(store?.cashback_percentage ?? 5)} por compra`}
              />
              <Stat
                label="Saldo em aberto"
                value={formatCurrency(openBalance)}
                detail={`${customers.length} clientes ativos`}
              />
              <Stat
                label="Resgatado"
                value={formatCurrency(redeemed)}
                detail="Debitos registrados no caixa"
              />
            </div>

            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid h-auto w-full grid-cols-2 rounded-full bg-white p-1 sm:grid-cols-4">
                <TabsTrigger value="customer" className="rounded-full">
                  <UserRoundPlus className="mr-2 size-4" />
                  Cliente
                </TabsTrigger>
                <TabsTrigger value="purchase" className="rounded-full">
                  <ReceiptText className="mr-2 size-4" />
                  Compra
                </TabsTrigger>
                <TabsTrigger value="redeem" className="rounded-full">
                  <CreditCard className="mr-2 size-4" />
                  Resgate
                </TabsTrigger>
                <TabsTrigger value="store" className="rounded-full">
                  <Settings2 className="mr-2 size-4" />
                  Loja
                </TabsTrigger>
              </TabsList>

            <TabsContent value="customer" className="mt-4">
              <Card className="rounded-[14px] border-[#dddddd] shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Plus className="size-5 text-[#ff385c]" />
                    Cadastro de cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <form action={customerAction} className="space-y-4">
                    <fieldset disabled={!envReady || !store || customerPending} className="space-y-4">
                      <input type="hidden" name="storeId" value={store?.id ?? ""} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input id="name" name="name" placeholder="Maria Oliveira" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <Input id="cpf" name="cpf" inputMode="numeric" placeholder="000.000.000-00" required />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input id="phone" name="phone" placeholder="(11) 99999-0000" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input id="email" name="email" type="email" placeholder="cliente@email.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCode">ID do cartao PVC</Label>
                        <Input id="cardCode" name="cardCode" placeholder="CS-000123" />
                      </div>
                      <Button
                        type="submit"
                        className="h-12 rounded-full bg-[#ff385c] px-6 text-white hover:bg-[#e00b41]"
                      >
                        {customerPending ? "Cadastrando..." : "Cadastrar cliente"}
                      </Button>
                    </fieldset>
                    <ActionFeedback state={customerState} />
                  </form>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <QrCode className="size-4 text-[#ff385c]" />
                      URL de consulta
                    </div>
                    <QrPreview url={customerState.qrUrl} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchase" className="mt-4">
              <Card className="rounded-[14px] border-[#dddddd] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Registrar compra</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action={purchaseAction} className="space-y-4">
                    <fieldset disabled={!envReady || customers.length === 0 || purchasePending} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="purchaseCustomerId">Cliente</Label>
                          <SelectCustomer customers={customers} id="purchaseCustomerId" name="customerId" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="purchaseAmount">Valor da compra</Label>
                          <Input id="purchaseAmount" name="purchaseAmount" inputMode="decimal" placeholder="100,00" required />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="sku">SKU ou referencia</Label>
                          <Input id="sku" name="sku" placeholder="CESTA-01" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Descricao</Label>
                          <Input id="description" name="description" placeholder="Compra no caixa 02" />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="h-12 rounded-full bg-[#ff385c] px-6 text-white hover:bg-[#e00b41]"
                      >
                        {purchasePending ? "Registrando..." : "Gerar cashback"}
                      </Button>
                    </fieldset>
                    <ActionFeedback state={purchaseState} />
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="redeem" className="mt-4">
              <Card className="rounded-[14px] border-[#dddddd] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Abater cashback</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action={redeemAction} className="space-y-4">
                    <fieldset disabled={!envReady || customers.length === 0 || redeemPending} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="redeemCustomerId">Cliente</Label>
                          <SelectCustomer customers={customers} id="redeemCustomerId" name="customerId" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Valor do resgate</Label>
                          <Input id="amount" name="amount" inputMode="decimal" placeholder="10,00" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="redeemDescription">Observacao</Label>
                        <Textarea id="redeemDescription" name="description" placeholder="Abatimento na compra atual" />
                      </div>
                      <Button
                        type="submit"
                        className="h-12 rounded-full bg-[#ff385c] px-6 text-white hover:bg-[#e00b41]"
                      >
                        {redeemPending ? "Validando..." : "Aprovar resgate"}
                      </Button>
                    </fieldset>
                    <ActionFeedback state={redeemState} />
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="store" className="mt-4">
              <Card className="rounded-[14px] border-[#dddddd] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Configuracao da loja</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action={storeAction} className="space-y-4">
                    <fieldset disabled={!envReady || storePending} className="space-y-4">
                      <input type="hidden" name="storeId" value={store?.id ?? ""} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="storeName">Nome da loja</Label>
                          <Input id="storeName" name="name" defaultValue={store?.name ?? ""} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cashbackPercentage">Cashback (%)</Label>
                          <Input
                            id="cashbackPercentage"
                            name="cashbackPercentage"
                            inputMode="decimal"
                            defaultValue={store?.cashback_percentage ?? 5}
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="h-12 rounded-full bg-[#ff385c] px-6 text-white hover:bg-[#e00b41]"
                      >
                        {storePending ? "Salvando..." : store ? "Salvar configuracao" : "Criar loja"}
                      </Button>
                    </fieldset>
                    <ActionFeedback state={storeState} />
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </section>

          <aside className="space-y-6">
          <Card className="rounded-[14px] border-[#dddddd] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Clientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customers.length === 0 ? (
                <p className="text-sm text-[#6a6a6a]">Nenhum cliente cadastrado ainda.</p>
              ) : (
                <div className="space-y-3">
                  {customers.map((customer) => (
                    <div key={customer.id} className="rounded-xl border border-[#ebebeb] p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{customer.name}</p>
                          <p className="text-xs text-[#6a6a6a]">
                            {cardByCustomer.get(customer.id) ?? "Sem cartao"} · CPF final{" "}
                            {customer.cpf_digits.slice(-2)}
                          </p>
                        </div>
                        <Badge className="rounded-full bg-[#222222] text-white">
                          {formatCurrency(customer.cashback_balance)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[14px] border-[#dddddd] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Extrato recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-[#ebebeb]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-sm text-[#6a6a6a]">
                          Sem movimentacoes.
                        </TableCell>
                      </TableRow>
                    ) : (
                      transactions.slice(0, 8).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="max-w-28 truncate">
                            {customerById.get(transaction.customer_id)?.name ?? "Cliente"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={transaction.type === "credit" ? "secondary" : "outline"}
                              className="rounded-full"
                            >
                              {transaction.type === "credit" ? "Credito" : "Debito"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {transaction.type === "credit" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <Separator className="my-4" />
              <p className="text-xs text-[#6a6a6a]">
                Movimentacoes recentes para acompanhar creditos e resgates do caixa.
              </p>
            </CardContent>
          </Card>
          </aside>
        </main>
      </div>
    </div>
  );
}
