"use client";

import { Accordion } from "./Accordion";
import { CheckIcon } from "./icons";
import { usePageState } from "./PageState";

const QUALITY_CHECKS = [
  "Third-party tested for safety, purity, and potency",
  "Screened for heavy metals and contaminants",
  "Made in FDA-registered, cGMP-certified facilities",
  "Formulated without dairy, soy, gluten, and major allergens",
  "No GMOs, artificial sweeteners, or preservatives",
];

export function ProductAccordion() {
  const { openSheet } = usePageState();

  return (
    <section className="mt-8 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <Accordion
        defaultOpenId="how-it-works"
        items={[
          {
            id: "how-it-works",
            title: "How it works",
            content: (
              <div className="text-[15px] leading-[1.6] text-[#6d6d65]">
                <p className="mb-3.5">
                  Enzymes help break food into smaller nutrients so your body can absorb and use
                  them. Different foods need different enzymes to break them down, and your body
                  makes fewer of its own with age, stress, and processed foods. Physician&rsquo;s
                  Choice Digestive Enzymes is developed with doctors to:
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      b: "Break down all 6 major food groups:",
                      t: "16 diverse enzymes work to break down protein, carbs, dairy, fats, veggies & legumes.",
                    },
                    {
                      b: "Help reduce bloating and discomfort:",
                      t: "Properly broken-down food is less likely to ferment and cause gas, bloating, or discomfort.",
                    },
                    {
                      b: "Support long-term gut health:",
                      t: "Soil-based probiotics + prebiotics work to support your gut health over time.",
                    },
                  ].map((row) => (
                    <div key={row.b} className="flex items-start gap-3">
                      <span className="min-h-4.5 w-[3px] shrink-0 self-stretch rounded-sm bg-[#CA133D]" />
                      <span>
                        <b className="font-semibold text-[#16160f]">{row.b}</b> {row.t}
                        <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            id: "key-ingredients",
            title: "Key ingredients",
            content: (
              <div className="text-[15px] leading-[1.6] text-[#6d6d65]">
                <p className="mb-3.5">
                  A 16-enzyme blend covering protein, starches, sugars, dairy, fats, and plant
                  fibers, taken with your meal.
                </p>
                <p className="mb-3.5">
                  Plus <em>2 billion CFU of 3 soil-based probiotic strains</em> and organic
                  prebiotics (inulin and acacia fiber) to support long-term gut health, with
                  organic peppermint and ginger for added digestive comfort.
                  <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
                </p>
                <button
                  type="button"
                  onClick={() => openSheet("supp-facts")}
                  className="inline-block text-[14.5px] font-semibold text-[#16160f] underline decoration-[#cfcec7] underline-offset-[3px]"
                >
                  View Nutrition Label →
                </button>
              </div>
            ),
          },
          {
            id: "how-to-take",
            title: "How to take",
            content: (
              <div className="text-[15px] leading-[1.6] text-[#6d6d65]">
                <p className="mb-3.5">
                  Take 1 capsule with your meal, right before or during eating. You can take more
                  than one a day.
                </p>
                <p>
                  For everyday support, take it with every meal. For targeted relief, take it
                  with your biggest meals or any food that usually leaves you uncomfortable. No
                  refrigeration required.
                </p>
              </div>
            ),
          },
          {
            id: "what-to-expect",
            title: "What to expect",
            content: (
              <div className="text-[15px] leading-[1.6] text-[#6d6d65]">
                <p className="mb-3.5">
                  Because the enzymes work during your meal, many people feel less bloating and
                  more comfort soon after eating. Results vary from person to person.
                </p>
                <p>
                  For best results, take daily with a meal to support digestive comfort, nutrient
                  absorption, and gut health over time. We suggest a consistent 60-day trial.
                  <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
                </p>
              </div>
            ),
          },
          {
            id: "quality-testing",
            title: "Quality & testing",
            content: (
              <ul className="flex flex-col gap-3">
                {QUALITY_CHECKS.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[14.5px] text-[#6d6d65]">
                    <CheckIcon className="mt-0.5 shrink-0 text-[#059669]" />
                    {c}
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      />
    </section>
  );
}
