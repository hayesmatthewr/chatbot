"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Placeholder } from "@/components/im8/Placeholder";

interface Hallmark {
  title: string;
  description: string;
}

const hallmarks: Hallmark[] = [
  { title: "Genomic Instability", description: "DNA damage accumulation over time" },
  { title: "Telomere Attrition", description: "Shortening of protective chromosome caps" },
  { title: "Epigenetic Alterations", description: "Changes in gene expression patterns" },
  { title: "Loss of Proteostasis", description: "Protein misfolding and aggregation" },
  { title: "Disabled Macroautophagy", description: "Impaired cellular self-cleaning" },
  {
    title: "Deregulated Nutrient Sensing",
    description: "Impaired cellular energy detection",
  },
  { title: "Mitochondrial Dysfunction", description: "Cellular powerhouse deterioration" },
  { title: "Cellular Senescence", description: "Accumulation of zombie cells" },
  { title: "Stem Cell Exhaustion", description: "Decline in tissue regeneration" },
  {
    title: "Altered Intercellular Communication",
    description: "Disrupted cell signaling",
  },
  { title: "Chronic Inflammation", description: "Persistent low-grade inflammation" },
  { title: "Dysbiosis", description: "Gut microbiome imbalance" },
];

export function HallmarksCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCards(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-hallmark-card]");
    const cardWidth = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * cardWidth * 3, behavior: "smooth" });
  }

  return (
    <section className="bg-[#F6F1EA] py-16 px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#50000B]"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          The Only Supplement That Targets 12 Hallmarks of Aging
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-neutral-600">
          Comprehensive longevity support targeting all biological pathways of aging, as
          defined by the landmark 2023 Cell journal review
        </p>
      </div>

      <div className="relative mt-14 sm:mt-16">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {hallmarks.map((hallmark) => (
            <div
              key={hallmark.title}
              data-hallmark-card
              className="flex w-[220px] shrink-0 snap-start flex-col items-start rounded-xl border border-neutral-200 bg-white p-6"
            >
              <Placeholder className="h-12 w-12 rounded" />
              <p className="mt-4 font-bold text-[#50000B]">{hallmark.title}</p>
              <p className="mt-1 text-sm text-neutral-500">{hallmark.description}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll hallmarks left"
          onClick={() => scrollByCards(-1)}
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white p-2 shadow-sm hover:bg-neutral-50 sm:flex"
        >
          <ChevronLeft className="h-5 w-5 text-[#50000B]" />
        </button>
        <button
          type="button"
          aria-label="Scroll hallmarks right"
          onClick={() => scrollByCards(1)}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white p-2 shadow-sm hover:bg-neutral-50 sm:flex"
        >
          <ChevronRight className="h-5 w-5 text-[#50000B]" />
        </button>
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[#50000B]">
        IM8 Daily Ultimate Longevity is the only supplement formulated to comprehensively
        address all 12 hallmarks with clinically-dosed bioactive compounds
      </p>
    </section>
  );
}
