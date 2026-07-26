"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronIcon } from "@/components/im8/product/icons";

type AccordionItem = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const ITEMS: AccordionItem[] = [
  {
    id: "ingredients",
    title: "Ingredients",
    body: (
      <>
        <p>
          Designed for cellular longevity, this advanced formula targets all 12 hallmarks of
          aging with five synergistic complexes. Our NMN NAD+ Energy Booster, Cellular
          Foundation Builder, Cellular Protection Activator, Metabolic AMPK/SIRT1 Activator,
          and Cellular Renewal Activator work together to enhance mitochondrial function,
          promote autophagy, and deliver comprehensive age-defying benefits in one delicious
          daily drink.*
        </p>
        <a
          href="#supplement-facts"
          className="mt-3 inline-block text-[13px] font-semibold text-[#50000B] underline underline-offset-2"
        >
          View Supplement Facts →
        </a>
      </>
    ),
  },
  {
    id: "how-to-enjoy",
    title: "How to Enjoy",
    body: (
      <p>
        Mix one scoop with 8-10 oz of cold water each morning, or blend into your favorite
        smoothie for an extra boost of daily longevity support.
      </p>
    ),
  },
  {
    id: "tasting-notes",
    title: "Tasting Notes",
    body: (
      <p>
        A light, refreshing citrus-berry profile with a smooth finish — formulated to taste
        as good as it makes you feel.
      </p>
    ),
  },
];

/**
 * Simple single-open accordion. "Ingredients" starts expanded per spec;
 * the other two rows are header-only until opened.
 */
export function IngredientsAccordion() {
  const [openId, setOpenId] = useState<string | null>("ingredients");

  return (
    <div className="flex flex-col divide-y divide-black/10 border-y border-black/10">
      {ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-[15px] font-medium text-[#1a1a1a]">{item.title}</span>
              <ChevronIcon
                className={cn(
                  "h-4 w-4 shrink-0 text-[#50000B] transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="pb-5 text-[13.5px] leading-relaxed text-black/70">{item.body}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
