"use client";

import { useActionState } from "react";
import { Search, WalletCards } from "lucide-react";

import { lookupBalanceAction, type LookupState } from "@/app/actions";
import { ActionFeedback } from "@/components/action-feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/money";

const initialState: LookupState = {
  status: "idle",
  message: "",
  results: [],
};

type Props = {
  initialQuery?: string;
};

export function BalanceSearch({ initialQuery }: Props) {
  const [state, action, pending] = useActionState(lookupBalanceAction, initialState);

  return (
    <div className="w-full max-w-3xl space-y-5">
      <Card className="rounded-[14px] border-[#dddddd] shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <WalletCards className="size-5 text-[#ff385c]" />
            Consultar saldo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query">CPF ou codigo do cartao</Label>
              <div className="flex gap-2">
                <Input
                  id="query"
                  name="query"
                  defaultValue={initialQuery}
                  placeholder="000.000.000-00 ou CS-000123"
                  className="h-12"
                  required
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={pending}
                  className="size-12 shrink-0 rounded-full bg-[#ff385c] text-white hover:bg-[#e00b41]"
                  aria-label="Buscar saldo"
                >
                  <Search className="size-5" />
                </Button>
              </div>
            </div>
            <ActionFeedback state={state} />
          </form>
        </CardContent>
      </Card>

      {state.results.map((result) => (
        <Card key={`${result.storeName}-${result.customerName}`} className="rounded-[14px] border-[#dddddd] shadow-sm">
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[#6a6a6a]">{result.storeName}</p>
                <CardTitle className="mt-1 text-2xl">{result.customerName}</CardTitle>
              </div>
              {result.cardCode ? <Badge className="rounded-full">{result.cardCode}</Badge> : null}
            </div>
            <div>
              <p className="text-sm text-[#6a6a6a]">Saldo disponivel</p>
              <p className="text-4xl font-semibold text-[#222222]">{formatCurrency(result.balance)}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.transactions.length === 0 ? (
                <p className="text-sm text-[#6a6a6a]">Nenhuma movimentacao encontrada.</p>
              ) : (
                result.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 border-t border-[#ebebeb] pt-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {transaction.description ?? (transaction.type === "credit" ? "Cashback" : "Resgate")}
                      </p>
                      <p className="text-xs text-[#6a6a6a]">
                        {new Intl.DateTimeFormat("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(new Date(transaction.createdAt))}
                      </p>
                    </div>
                    <p
                      className={
                        transaction.type === "credit"
                          ? "font-semibold text-emerald-700"
                          : "font-semibold text-[#c13515]"
                      }
                    >
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
