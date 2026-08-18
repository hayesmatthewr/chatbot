"use client";

import { useState } from "react";
import { Placeholder } from "./Placeholder";

const FILTERS = ["All", "Skin", "Eyes", "Recovery", "Healthy Aging", "Daily Routine"];

export function ReviewsSection() {
  const [active, setActive] = useState("All");

  return (
    <section id="reviews" className="border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
              The Feedback
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
              What members are noticing.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-secondary">
              Real feedback from people making cellular protection part of
              their daily routine.
            </p>
          </div>
          <div className="font-[family-name:var(--font-lifework-red-mono)] text-[12px] text-muted-foreground sm:text-right">
            [Rating] from [Review Count]
            <br />
            verified customers
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2 border-b border-border pb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`cursor-pointer text-[12.5px] font-semibold tracking-[0.04em] uppercase underline-offset-[10px] transition-colors duration-200 ${
                active === f ? "text-foreground underline decoration-accent decoration-2" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Placeholder key={i} label="Video review" className="aspect-[3/4] w-full" />
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Placeholder key={i} label="Verified customer review" className="h-32 w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
