import { ProductGallery } from "@/components/im8/product/ProductGallery";
import { PlanPicker } from "@/components/im8/product/PlanPicker";
import { IngredientsAccordion } from "@/components/im8/product/IngredientsAccordion";
import { TransformationProgram } from "@/components/im8/product/TransformationProgram";
import { CheckIcon } from "@/components/im8/product/icons";

const FEATURE_BADGES = [
  "600mg of Cellular Protection Activator per serving",
  "310mg NAD+ Energy Booster per serving",
  "Restore cellular energy and activate autophagy",
  "90-day money-back guarantee",
];

const TRUST_ROW = [
  { icon: "🛡️", label: "90-Day Money Back" },
  { icon: "🚚", label: "Free Shipping" },
  { icon: "⏸️", label: "Cancel Anytime" },
];

/**
 * Product page hero: two-column layout with the image gallery placeholder
 * on the left and all purchase-decision content (copy, badges, plan
 * picker, transformation program upsell, ingredients accordion) on the
 * right. Server component — interactivity lives in the client
 * sub-components it composes.
 */
export function ProductHero() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8">
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[14px]">
              <span className="text-[#50000B] tracking-tight">★★★★★</span>
              <span className="font-semibold text-[#1a1a1a]">4.8</span>
              <span className="text-black/60">from 22,104 Reviews</span>
              <span className="text-black/30">|</span>
              <span className="text-black/60">55M+ servings</span>
            </div>

            <p className="text-[11px] font-semibold tracking-wide text-black/60">
              HEALTHY AGING SUPPLEMENT
            </p>

            <h1
              className="text-[40px] leading-[1.1]"
              style={{ fontFamily: "var(--font-im8-display), serif", color: "#50000B" }}
            >
              Daily Ultimate Longevity
            </h1>

            <p className="text-[15px] leading-relaxed text-black/70">
              Target all 12 hallmarks of aging with 10 clinically proven compounds in one NAD+
              supplement
            </p>

            <div className="flex flex-wrap gap-2.5">
              {FEATURE_BADGES.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-[13px] text-[#1a1a1a]"
                >
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-[#50000B]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <PlanPicker />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-black/60">
            {TRUST_ROW.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5">
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>

          <TransformationProgram />

          <IngredientsAccordion />
        </div>
      </section>
    </div>
  );
}
