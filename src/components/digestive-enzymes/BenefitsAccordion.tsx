"use client";

import { useState } from "react";

const BENEFITS = [
  {
    id: "bloating",
    title: "Help reduce bloating",
    sub: "Less gas and heaviness after you eat.",
    body: "That bloated feeling usually comes from food that hasn't broken down and ferments in the gut. The 16-enzyme blend helps food digest properly, so there's less gas and heaviness after meals.",
  },
  {
    id: "comfort",
    title: "Keep your digestion comfortable",
    sub: "Food breaks down and moves through smoothly.",
    body: "When your body has the right enzymes for each food group, meals digest the way they should, keeping you comfortable during and after eating.",
  },
  {
    id: "range",
    title: "Digest a wide range of foods",
    sub: "Coverage for dairy, beans, and rich foods.",
    body: "With enzymes covering protein, carbs, dairy, fats, vegetables, and legumes, the formula helps your body handle the foods that are often hardest to digest.",
  },
  {
    id: "absorption",
    title: "Promote nutrient absorption",
    sub: "Unlock more from the food you already eat.",
    body: "Your body can only absorb nutrients once food is broken down small enough. Enzymes do that job, helping you get more of the vitamins, minerals, and amino acids from your meals.",
  },
  {
    id: "gut",
    title: "Long-term gut support",
    sub: "Probiotics and prebiotics for daily use.",
    body: "Beyond the meal in front of you, 3 soil-based probiotic strains and organic prebiotics work to support healthy gut function over time, with daily use.",
  },
];

export function BenefitsAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="mt-10 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <h2 className="text-[23px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#16160f]">
        Make every meal a happy one
      </h2>
      <div className="mt-5.5">
        {BENEFITS.map((b) => {
          const isOpen = openId === b.id;
          return (
            <div key={b.id} className="flex items-start gap-3.5 pb-5">
              <span
                aria-hidden="true"
                className="mt-4 size-16 shrink-0 rounded-md bg-[#edece7]"
              />
              <div className="min-w-0 flex-1 border-t border-[#e9e8e2] pt-4">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : b.id)}
                  className="flex w-full items-center justify-between gap-3"
                >
                  <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#16160f]">
                    {b.title}
                  </span>
                  <span className="relative size-4.5 shrink-0">
                    <span className="absolute top-1/2 right-px left-px h-[1.6px] -translate-y-1/2 bg-[#16160f]" />
                    <span
                      className={`absolute top-px bottom-px left-1/2 w-[1.6px] -translate-x-1/2 bg-[#16160f] transition-[opacity,transform] duration-200 ${
                        isOpen ? "rotate-90 opacity-0" : ""
                      }`}
                    />
                  </span>
                </button>
                <div className="mt-1.5 text-left text-sm leading-[1.5] text-[#6d6d65]">
                  {b.sub}
                </div>
                {isOpen && (
                  <div className="mt-3.5 border-t border-[#e9e8e2] pt-3.5 text-sm leading-[1.6] text-[#3a3a33]">
                    {b.body}
                    <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
