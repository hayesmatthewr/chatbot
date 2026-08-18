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

const SPECS = [
  ["Dose", "12 mg astaxanthin"],
  ["Format", "1 softgel daily"],
  ["Evidence", "85+ human studies"],
  ["Rating", "4.5 / 5 · 4,100 reviews"],
];

export function ProductHero() {
  const [plan, setPlan] = useState<(typeof PLANS)[number]["id"]>("12-week");

  return (
    <section id="top" className="bg-background py-12 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <Placeholder label="Product image carousel" wash className="aspect-[4/5] w-full" />
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
            {SPECS.map(([label, value]) => (
              <div key={label}>
                <dt className="font-[family-name:var(--font-lifework-red-mono)] text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">
                  {label}
                </dt>
                <dd className="mt-1 text-[13.5px] font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
            Daily Cellular Protection
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2.6rem] leading-[1.05] font-medium text-foreground sm:text-[3.1rem]">
            Protection, distilled to one softgel.
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-secondary">
            Nature&apos;s most potent antioxidant, refined for modern oxidative
            stress: skin, eyes, energy, recovery, and whole-body resilience,
            from the most clinically studied natural astaxanthin.*
          </p>

          <div className="mt-6 flex gap-6 border-y border-border py-3">
            <a
              href="#ingredient"
              className="cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase decoration-accent underline-offset-4 hover:underline"
            >
              Ingredients
            </a>
            <a
              href="#mechanism"
              className="cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase decoration-accent underline-offset-4 hover:underline"
            >
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
                            <span className="rounded-sm bg-accent px-1.5 py-0.5 font-[family-name:var(--font-lifework-red-mono)] text-[9px] font-medium tracking-wide text-accent-foreground uppercase">
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
            className="mt-5 w-full cursor-pointer rounded-sm bg-primary py-3.5 text-[13.5px] font-semibold tracking-[0.03em] text-primary-foreground uppercase transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start Your Lifework
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] font-medium text-muted-foreground sm:justify-start">
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
