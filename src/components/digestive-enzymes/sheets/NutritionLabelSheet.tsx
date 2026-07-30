import Image from "next/image";
import { BottomSheet } from "./BottomSheet";

export function NutritionLabelSheet() {
  return (
    <BottomSheet id="supp-facts" eyebrow="Digestive Enzymes">
      <div className="text-[30px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#16160f]">
        Nutrition Label
      </div>
      <Image
        src="/images/digestive-enzymes/nutrition-label.jpg"
        alt="Digestive Enzymes Supplement Facts panel"
        width={452}
        height={626}
        className="mt-4 block h-auto w-full rounded-[10px] border border-[#e9e8e2]"
      />
      <div className="mt-6.5 rounded-[14px] bg-[#f7f6f2] p-4.5">
        <h4 className="font-semibold text-[11px] tracking-[0.08em] text-[#16160f] uppercase">
          How to take
        </h4>
        <p className="mt-2 text-[15px] leading-[1.5] text-[#3a3a33] italic">
          Take 1 capsule with your meal, right before or during eating. For everyday support,
          take it with every meal.
          <sup className="ml-px text-[0.58em] leading-none font-normal not-italic">‡</sup>
        </p>
      </div>
      <div className="mt-5.5 text-[11px] leading-[1.5] text-[#9d9d94]">
        <sup className="mr-px text-[0.58em] leading-none font-normal">‡</sup>These statements
        have not been evaluated by the FDA. This product is not intended to diagnose, treat,
        cure, or prevent any disease. Full ingredient amounts appear on the bottle label.
      </div>
    </BottomSheet>
  );
}
