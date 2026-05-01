import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, LogOut } from "lucide-react";

import { signOutAction } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardBrand, dashboardNavItems } from "@/lib/dashboard-nav";

type DashboardSectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  activeHref: string;
  children?: ReactNode;
  highlights: Array<{
    title: string;
    description: string;
  }>;
  cta?: {
    href: string;
    label: string;
  };
};

export function DashboardSectionPage({
  eyebrow,
  title,
  description,
  activeHref,
  children,
  highlights,
  cta,
}: DashboardSectionPageProps) {
  const BrandIcon = dashboardBrand.icon;

  return (
    <div className="min-h-svh bg-[#f7f7f7] text-[#222222]">
      <header className="sticky top-0 z-20 border-b border-[#ebebeb] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#ff385c] text-white">
              <BrandIcon className="size-5" />
            </span>
            <span className="font-semibold">{dashboardBrand.name}</span>
          </Link>
          <form action={signOutAction}>
            <Button variant="outline" size="icon" className="rounded-full" aria-label="Sair">
              <LogOut className="size-4" />
            </Button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <nav className="grid gap-2 rounded-[18px] border border-[#dddddd] bg-white p-2 shadow-sm">
            {dashboardNavItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === activeHref;
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

        <main className="space-y-6">
          <section className="rounded-[24px] bg-[#222222] p-6 text-white shadow-sm sm:p-8">
            <Badge className="rounded-full bg-[#ff385c] text-white">{eyebrow}</Badge>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight">{title}</h1>
            <p className="mt-3 max-w-2xl leading-7 text-white/72">{description}</p>
            {cta ? (
              <Link
                href={cta.href}
                className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#ff385c] px-4 text-sm font-medium text-white transition hover:bg-[#e00b41]"
              >
                {cta.label}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            ) : null}
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <Card key={item.title} className="rounded-[18px] border-[#dddddd] shadow-sm">
                <CardContent className="p-5">
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {children ? <section>{children}</section> : null}
        </main>
      </div>
    </div>
  );
}
