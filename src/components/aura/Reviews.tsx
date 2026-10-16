"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { rating, reviewDistribution, reviewFilters, reviews } from "./content";
import { Reveal } from "./Reveal";
import { Stars } from "./Stars";

const INITIAL = 3;

export function Reviews() {
  const [filter, setFilter] = useState<(typeof reviewFilters)[number]>("All");
  const [expanded, setExpanded] = useState(false);
  const filtered = reviews.filter((r) => filter === "All" || r.tag === filter);
  const shown = expanded ? filtered : filtered.slice(0, INITIAL);
  const hidden = filtered.length - INITIAL;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-16 py-20 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:grid-cols-12 md:gap-8 md:px-8">
        <Reveal className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <h2 id="reviews-title" className="text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em]">
              Customer Reviews
            </h2>
            <p className="mt-6 flex items-end gap-3">
              <span className="text-[clamp(64px,7vw,104px)] leading-[0.85] font-bold tracking-[-0.04em] text-aura-red tabular-nums">{rating.score}</span>
              <span className="pb-1 text-[16px]">
                <Stars />
                <span className="mt-1 block">out of 5 · {rating.count} reviews</span>
              </span>
            </p>
            <dl className="mt-8 flex flex-col gap-2">
              {reviewDistribution.map((d) => (
                <div key={d.stars} className="flex items-center gap-3 text-[15px] tabular-nums">
                  <dt className="w-8">{d.stars}★</dt>
                  <dd className="flex flex-1 items-center gap-3">
                    <span className="h-2.5 flex-1 rounded-full bg-aura-step">
                      <span className="block h-full rounded-full bg-aura-red" style={{ width: `${d.pct}%` }} />
                    </span>
                    <span className="w-9 text-right">{d.pct}%</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="min-w-0 md:col-span-7 md:col-start-6">
          <div role="group" aria-label="Filter reviews" className="aura-no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
            {reviewFilters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  setExpanded(false);
                }}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2.5 text-[15px] font-bold transition-colors",
                  filter === f ? "bg-aura-ink text-white" : "bg-aura-step hover:bg-[#dededa]",
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {shown.map((r) => (
              <li key={r.headline} className="rounded-[28px] bg-aura-paper p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
                  <Stars size={14} />
                  <span className="flex items-center gap-1 font-medium">
                    <BadgeCheck className="size-4 text-aura-red" aria-hidden /> Verified buyer
                  </span>
                  <span className="rounded-full bg-aura-step px-2.5 py-0.5">{r.tag}</span>
                </div>
                <h3 className="mt-3 text-[22px] leading-[1.2] font-bold tracking-[-0.015em]">{r.headline}</h3>
                <p className="mt-2 max-w-[60ch] text-[17px] leading-[1.55]">{r.body}</p>
                <p className="mt-4 text-[15px] text-aura-muted">{r.reviewer}</p>
              </li>
            ))}
            {filtered.length === 0 && <li className="rounded-[28px] bg-aura-paper p-8 text-[17px]">No reviews in this category yet.</li>}
          </ul>

          {hidden > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="mt-6 rounded-full bg-aura-ink px-7 py-3.5 text-[16px] font-bold text-white transition-[transform,background-color] hover:bg-aura-red active:scale-95"
            >
              {expanded ? "Show fewer reviews" : `Show more reviews (${hidden})`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
