"use client";

import { useState } from "react";
import { Placeholder } from "./Placeholder";

const FILTERS = ["All", "Skin", "Eyes", "Recovery", "Healthy Aging", "Daily Routine"];

export function ReviewsSection() {
  const [active, setActive] = useState("All");

  return (
    <section id="reviews" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
              What members are noticing.
            </h2>
            <p className="mt-3 text-[15px] leading-[22px] text-secondary">
              Real feedback from people making cellular protection part of
              their daily routine.
            </p>
          </div>
          <span className="text-[13px] text-muted-foreground">
            [Rating] from [Review Count] verified customers
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 sm:gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`flex h-9 cursor-pointer items-center rounded-full px-3 text-[12px] font-medium transition-colors duration-200 sm:h-7 ${
                active === f ? "bg-primary text-primary-foreground" : "bg-muted text-secondary hover:bg-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Placeholder key={i} label="Video review" className="aspect-[3/4] w-full" />
          ))}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Placeholder key={i} label="Verified customer review" className="h-32 w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
