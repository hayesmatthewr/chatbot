"use client";

import { useState } from "react";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Placeholder } from "./Placeholder";

const PLANS = [
  { id: "4-week", name: "4 Week Supply", detail: "Subscribe & save 15%", price: "$49" },
  {
    id: "12-week",
    name: "12 Week Supply",
    detail: "Subscribe & save 20%",
    price: "$129",
    badge: "Best Value",
  },
] as const;

export function ProductHero() {
  const [plan, setPlan] = useState<(typeof PLANS)[number]["id"]>("12-week");

  return (
    <section id="top" className="bg-background py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-8">
        <Placeholder label="Product photography" photo className="aspect-square w-full" />

        <div>
          <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-[10.5px] font-bold tracking-[0.06em] text-accent-foreground uppercase">
            Bestseller
          </span>
          <h1 className="mt-4 text-[2.25rem] leading-[1.1] font-extrabold tracking-tight text-foreground sm:text-[2.6rem]">
            Daily Cellular Protection
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-secondary">
            Nature&apos;s most potent antioxidant, clinically validated to
            support skin, eyes, energy, and whole-body resilience —
            formulated with 12 mg of the most studied natural astaxanthin.*
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-foreground">$129</span>
            <span className="text-[13px] text-muted-foreground">
              12 week supply · subscribe and save 20%
            </span>
          </div>

          <div className="mt-6 flex gap-5">
            <a href="#ingredient" className="cursor-pointer text-[13px] font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-accent">
              Ingredients
            </a>
            <a href="#mechanism" className="cursor-pointer text-[13px] font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-accent">
              How It Works
            </a>
          </div>

          <div className="mt-7">
            <span className="font-[family-name:var(--font-lifework-red-mono)] text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
              Purchase Options
            </span>

            <div className="mt-3 flex flex-col gap-2.5" role="radiogroup" aria-label="Purchase options">
              {PLANS.map((p) => {
                const selected = plan === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPlan(p.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-sm border bg-card px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      selected ? "border-primary" : "border-border hover:border-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected ? "border-primary" : "border-border"
                        }`}
                      >
                        {selected && <span className="size-2 rounded-full bg-primary" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{p.name}</span>
                          {"badge" in p && p.badge && (
                            <span className="rounded-sm bg-accent px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-accent-foreground uppercase">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{p.detail}</span>
                      </div>
                    </div>
                    <span className="text-base font-semibold text-foreground">{p.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="mt-5 w-full cursor-pointer rounded-sm bg-primary py-3.5 text-[13.5px] font-bold tracking-[0.02em] text-primary-foreground uppercase transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start Your Lifework
          </button>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5" /> Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" /> 30-Day Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="size-3.5" /> Pause or Cancel Anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
