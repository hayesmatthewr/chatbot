"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/lifework/Placeholder";
import { StarIcon } from "@/components/lifework/icons";

const FILTERS = ["All", "Skin", "Eyes", "Recovery", "Healthy Aging", "Daily Routine"] as const;

const VIDEO_REVIEWS = [
  { benefit: "Skin" },
  { benefit: "Eyes" },
  { benefit: "Recovery" },
  { benefit: "Healthy Aging" },
] as const;

type WrittenReview = {
  benefit: "Skin" | "Eyes" | "Recovery" | "Energy" | "Healthy Aging" | "Other";
  duration: "<1 month" | "1–3 months" | "3+ months";
};

const WRITTEN_REVIEWS: WrittenReview[] = [
  { benefit: "Skin", duration: "1–3 months" },
  { benefit: "Eyes", duration: "3+ months" },
  { benefit: "Recovery", duration: "<1 month" },
  { benefit: "Energy", duration: "3+ months" },
  { benefit: "Healthy Aging", duration: "1–3 months" },
  { benefit: "Other", duration: "<1 month" },
];

function StarRow() {
  return (
    <div className="flex items-center gap-0.5 text-[var(--lifework-red)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </div>
  );
}

function PlayGlyph() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm">
        <div
          className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[var(--lifework-ink)]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function VideoReviewCard({ benefit }: { benefit: string }) {
  return (
    <div className="w-[220px] shrink-0 snap-start sm:w-[240px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl">
        <Placeholder className="h-full w-full" label={`Video review — ${benefit} category`} />
        <PlayGlyph />
      </div>
      <p className="mt-3 text-sm text-[var(--lifework-ink-soft)]">[verified customer review]</p>
    </div>
  );
}

function WrittenReviewCard({ benefit, duration }: WrittenReview) {
  return (
    <div className="rounded-2xl border border-[var(--lifework-line)] bg-white p-6">
      <StarRow />
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--lifework-ink)]">
        [verified customer review]
      </p>
      <div className="mt-5 space-y-1 border-t border-[var(--lifework-line)] pt-4 text-xs text-[var(--lifework-ink-faint)]">
        <p>Primary benefit: {benefit}</p>
        <p>Used Lifework for {duration}</p>
      </div>
    </div>
  );
}

export function CustomerResults() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
          MEMBER RESULTS
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-[40px]">
          The Long Game, reported back.
        </h2>

        <div className="mt-5 flex items-center gap-2">
          <StarRow />
          <p className="text-sm text-[var(--lifework-ink-soft)]">
            [dynamic rating] from [dynamic review count] verified customers
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeFilter === filter
                  ? "bg-[var(--lifework-red)] text-white"
                  : "border border-[var(--lifework-line)] text-[var(--lifework-ink-soft)] hover:text-[var(--lifework-ink)]"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
          {VIDEO_REVIEWS.map((video, i) => (
            <VideoReviewCard key={i} benefit={video.benefit} />
          ))}
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WRITTEN_REVIEWS.map((review, i) => (
            <WrittenReviewCard key={i} benefit={review.benefit} duration={review.duration} />
          ))}
        </div>
      </div>
    </section>
  );
}
