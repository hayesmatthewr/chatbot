"use client";

import { useState } from "react";
import { RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { FadeUp } from "@/components/amicro/fade-up";
import { MagneticWrap } from "@/components/amicro/magnetic-wrap";
import { Placeholder } from "./Placeholder";

const PLANS = [
  {
    id: "4-week",
    name: "4 Week Supply",
    detail: "Subscribe & save 15%",
    price: "$49",
  },
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
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Placeholder label="Product image carousel" aspect="aspect-square w-full" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Placeholder key={i} label={`0${i + 1}`} aspect="aspect-square" />
            ))}
          </div>
        </div>

        <div>
          <FadeUp duration={0.7}>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Daily Cellular Protection
            </h1>
          </FadeUp>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="font-semibold text-foreground">4.5</span>
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-accent" />
              ))}
            </span>
            <span className="text-muted-foreground">4,100 Reviews</span>
          </div>

          <span className="mt-4 inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold tracking-wide text-secondary uppercase">
            85+ Human Clinical Studies
          </span>

          <p className="mt-5 text-base leading-relaxed text-secondary">
            Nature&apos;s most potent antioxidant, refined for modern oxidative
            stress: skin, eyes, energy, recovery, and whole-body resilience,
            from the most clinically studied natural astaxanthin.*
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="#ingredient"
              className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
            >
              Ingredients
            </a>
            <a
              href="#mechanism"
              className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
            >
              How It Works
            </a>
          </div>

          <div className="mt-8">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Purchase Options
            </span>

            <div className="mt-3 flex flex-col gap-3" role="radiogroup" aria-label="Purchase options">
              {PLANS.map((p) => {
                const selected = plan === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPlan(p.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      selected
                        ? "border-foreground bg-card"
                        : "border-border bg-card hover:border-secondary"
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
                          <span className="text-sm font-semibold text-foreground">{p.name}</span>
                          {"badge" in p && p.badge && (
                            <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-primary-foreground uppercase">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{p.detail}</span>
                      </div>
                    </div>
                    <span className="text-base font-bold text-foreground">{p.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <MagneticWrap className="mt-5 block w-full" range={80} strength={0.15}>
            <button
              type="button"
              className="w-full cursor-pointer rounded-lg bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start Your Lifework
            </button>
          </MagneticWrap>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground sm:justify-start">
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5" />
              Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" />
              30-Day Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="size-3.5" />
              Pause or Cancel Anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
