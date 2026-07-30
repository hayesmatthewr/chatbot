"use client";

import { usePageState } from "../PageState";
import { NutritionLabelIcon, ScienceIcon, StarRating } from "../icons";

const FEATURES = [
  "Breaks down 6 major food groups",
  "Helps reduce bloating",
  "Promotes nutrient absorption",
];

export function ProductInfo() {
  const { openSheet } = usePageState();

  return (
    <div>
      <h1 className="mt-2.5 text-[33px] leading-[1.04] font-semibold tracking-[-0.025em] text-[#16160f]">
        Digestive Enzymes
      </h1>
      <div className="mt-1 text-[19px] font-normal tracking-[-0.01em] text-[#6d6d65]">
        16 Diverse Enzymes + Probiotics &amp; Prebiotics
      </div>

      <div className="mt-4 flex items-center gap-2 text-[13px]">
        <StarRating rating={4.6} className="text-[#16160f]" />
        <span className="font-medium text-[#3a3a33]">4.6 · 60,000+ five-star reviews</span>
      </div>

      <div className="mt-4 inline-flex items-center rounded-[9px] bg-[#CA133D] px-[18px] py-[11px] font-semibold text-[11px] tracking-[0.05em] text-white">
        #1 PROBIOTIC &amp; ENZYME BRAND IN THE US<sup className="ml-px text-[0.58em] leading-none font-normal">*</sup>
      </div>

      <p className="mt-5 text-[15.5px] leading-[1.6] text-[#3a3a33]">
        Enjoy the foods you love without feeling heavy or bloated. One capsule at mealtime
        provides 16 diverse enzymes + probiotics and prebiotics.
        <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
      </p>

      <div className="mt-5.5 flex flex-col gap-2.5">
        {FEATURES.map((f) => (
          <div key={f} className="flex items-center gap-2.5 text-sm text-[#16160f]">
            <span className="h-[15px] w-[3px] shrink-0 rounded-sm bg-[#CA133D]" />
            <span>
              {f}
              <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2.5">
        <button
          type="button"
          onClick={() => openSheet("supp-facts")}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#cfcec7] bg-white px-3 py-3 font-semibold text-[13px] text-[#16160f] transition-colors hover:border-[#16160f] active:bg-[#f7f6f2]"
        >
          <NutritionLabelIcon />
          Nutrition Label
        </button>
        <button
          type="button"
          onClick={() => openSheet("science")}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#cfcec7] bg-white px-3 py-3 font-semibold text-[13px] text-[#16160f] transition-colors hover:border-[#16160f] active:bg-[#f7f6f2]"
        >
          <ScienceIcon />
          The Science
        </button>
      </div>
    </div>
  );
}
