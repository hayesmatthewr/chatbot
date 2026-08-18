"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Placeholder } from "./Placeholder";

const FILTERS = ["All", "Skin", "Eyes", "Recovery", "Healthy Aging", "Daily Routine"];

export function ReviewsSection() {
  const [active, setActive] = useState("All");

  return (
    <section id="reviews" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            What members are noticing.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Real feedback from people making cellular protection part of
            their daily routine.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <span className="flex text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-accent" />
            ))}
          </span>
          <span className="font-mono text-muted-foreground">
            [Rating] from [Review Count] verified customers
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                active === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-secondary hover:border-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Placeholder key={i} label="Video review" aspect="aspect-[3/4] w-full" />
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Placeholder
              key={i}
              label="Verified customer review"
              aspect="aspect-[4/3] w-full sm:aspect-auto sm:h-32"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
