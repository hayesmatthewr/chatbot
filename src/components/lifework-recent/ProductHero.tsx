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
    <section id="top" className="bg-background py-10 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Placeholder label="Product photography" className="aspect-square w-full" />

        <div>
          <h1 className="text-[24px] leading-[1.2] font-medium tracking-tight text-foreground">
            Daily Cellular Protection
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-[22px] text-secondary">
            Nature&apos;s most potent antioxidant, refined for modern oxidative
            stress: skin, eyes, energy, recovery, and whole-body resilience,
            from the most clinically studied natural astaxanthin.*
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="flex h-7 items-center rounded-full bg-muted px-2 text-[13px] text-foreground">
              85+ Human Clinical Studies
            </span>
            <span className="flex h-7 items-center rounded-full bg-muted px-2 text-[13px] text-foreground">
              4.5 · 4,100 Reviews
            </span>
          </div>

          <div className="mt-4 flex gap-1">
            <a
              href="#ingredient"
              className="flex h-7 cursor-pointer items-center rounded-full px-2 text-[13px] text-foreground transition-colors duration-200 hover:bg-muted"
            >
              Ingredients
            </a>
            <a
              href="#mechanism"
              className="flex h-7 cursor-pointer items-center rounded-full px-2 text-[13px] text-foreground transition-colors duration-200 hover:bg-muted"
            >
              How It Works
            </a>
          </div>

          <div className="mt-6">
            <span className="text-[12px] font-medium tracking-tight text-muted-foreground">
              Purchase Options
            </span>

            <div className="mt-2 flex flex-col gap-2" role="radiogroup" aria-label="Purchase options">
              {PLANS.map((p) => {
                const selected = plan === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPlan(p.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-[16px] border bg-card px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                      selected ? "border-foreground" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected ? "border-foreground" : "border-border"
                        }`}
                      >
                        {selected && <span className="size-2 rounded-full bg-foreground" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-foreground">{p.name}</span>
                          {"badge" in p && p.badge && (
                            <span className="flex h-5 items-center rounded-full bg-primary px-2 text-[11px] text-primary-foreground">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[13px] text-muted-foreground">{p.detail}</span>
                      </div>
                    </div>
                    <span className="text-[15px] font-medium text-foreground">{p.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-primary text-[13px] font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Start Your Lifework
          </button>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Truck className="size-3.5" /> Free Shipping
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5" /> 30-Day Guarantee
            </span>
            <span className="flex items-center gap-1">
              <RotateCcw className="size-3.5" /> Pause or Cancel Anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
