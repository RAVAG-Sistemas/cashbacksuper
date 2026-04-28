import { AlertCircle, CheckCircle2 } from "lucide-react";

import type { LookupState, MutationState } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  state: MutationState | LookupState;
};

export function ActionFeedback({ state }: Props) {
  if (state.status === "idle" || !state.message) {
    return null;
  }

  const isSuccess = state.status === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <Alert
      className={
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-red-200 bg-red-50 text-red-950"
      }
    >
      <Icon className="size-4" />
      <AlertTitle>{isSuccess ? "Tudo certo" : "Ajuste necessario"}</AlertTitle>
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}
