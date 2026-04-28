"use client";

import { useActionState } from "react";
import { LockKeyhole, Mail } from "lucide-react";

import { signInAction, signUpAction, type MutationState } from "@/app/actions";
import { ActionFeedback } from "@/components/action-feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: MutationState = { status: "idle", message: "" };

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [state, action, pending] = useActionState(
    mode === "login" ? signInAction : signUpAction,
    initialState,
  );

  return (
    <Card className="w-full max-w-md rounded-[14px] border-[#dddddd] shadow-sm">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Entrar como lojista" : "Criar acesso"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6a6a6a]" />
              <Input id="email" name="email" type="email" className="pl-9" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6a6a6a]" />
              <Input id="password" name="password" type="password" className="pl-9" required />
            </div>
          </div>
          <ActionFeedback state={state} />
          <Button
            type="submit"
            disabled={pending}
            className="h-12 w-full rounded-full bg-[#ff385c] text-white hover:bg-[#e00b41]"
          >
            {pending ? "Enviando..." : mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
