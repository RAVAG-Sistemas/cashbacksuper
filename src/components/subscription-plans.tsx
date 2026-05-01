"use client";

import { useActionState } from "react";
import { Check, CreditCard, LoaderCircle } from "lucide-react";

import { createSubscriptionCheckoutAction, type MutationState } from "@/app/actions";
import { ActionFeedback } from "@/components/action-feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BillingPlan } from "@/lib/billing-plans";
import { formatCurrency } from "@/lib/money";

const initialState: MutationState = { status: "idle", message: "" };

type SubscriptionPlansProps = {
  plans: BillingPlan[];
  billingReady: boolean;
  currentPlanSlug?: string | null;
  currentStatus?: string | null;
};

export function SubscriptionPlans({
  plans,
  billingReady,
  currentPlanSlug,
  currentStatus,
}: SubscriptionPlansProps) {
  const [state, formAction, pending] = useActionState(createSubscriptionCheckoutAction, initialState);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = currentPlanSlug === plan.slug;

          return (
            <Card key={plan.slug} className="rounded-[18px] border-[#dddddd] shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{plan.name}</CardTitle>
                  {isCurrent ? (
                    <Badge className="rounded-full bg-[#eef7f2] text-[#18794e]">Plano atual</Badge>
                  ) : null}
                </div>
                <p className="text-3xl font-semibold">{formatCurrency(plan.priceCents / 100)}</p>
                <p className="text-sm leading-6 text-[#6a6a6a]">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-[#6a6a6a]">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-[#ff385c]" />
                    <span>
                      {plan.monthlyTransactionLimit
                        ? `${plan.monthlyTransactionLimit} movimentacoes por mes`
                        : "Movimentacoes ilimitadas"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-[#ff385c]" />
                    <span>
                      {plan.operatorLimit ? `${plan.operatorLimit} operadores` : "Operadores ilimitados"}
                    </span>
                  </div>
                </div>

                <form action={formAction}>
                  <input type="hidden" name="planSlug" value={plan.slug} />
                  <Button
                    type="submit"
                    className="h-11 w-full rounded-full bg-[#ff385c] text-white hover:bg-[#e00b41]"
                    disabled={!billingReady || pending}
                  >
                    {pending ? (
                      <>
                        <LoaderCircle className="mr-2 size-4 animate-spin" />
                        Abrindo checkout...
                      </>
                    ) : isCurrent && currentStatus === "active" ? (
                      "Gerenciar assinatura"
                    ) : (
                      <>
                        <CreditCard className="mr-2 size-4" />
                        Assinar com Mercado Pago
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!billingReady ? (
        <p className="text-sm text-[#6a6a6a]">
          Configure Supabase e Mercado Pago para liberar a assinatura real desta loja.
        </p>
      ) : null}

      <ActionFeedback state={state} />
    </div>
  );
}
