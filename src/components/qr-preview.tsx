"use client";

import { QRCodeSVG } from "qrcode.react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  url?: string;
};

export function QrPreview({ url }: Props) {
  if (!url) {
    return (
      <div className="flex min-h-44 items-center justify-center rounded-[14px] border border-dashed border-[#dddddd] bg-[#f7f7f7] px-6 text-center text-sm text-[#6a6a6a]">
        Cadastre um cliente para gerar o acesso rapido ao saldo.
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-[#dddddd] bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-[#ebebeb]">
          <QRCodeSVG value={url} size={116} level="M" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <p className="break-all text-sm text-[#3f3f3f]">{url}</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            Abrir consulta
          </a>
        </div>
      </div>
    </div>
  );
}
