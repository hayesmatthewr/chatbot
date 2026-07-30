"use client";

import { useState } from "react";

const STAGES = [
  {
    unit: "At your",
    num: "first meal",
    stage: "First meal",
    title: "Enzymes go to work",
    desc: "Taken with food, the enzymes start breaking down your meal right away. Many people feel lighter and more comfortable soon after eating.",
  },
  {
    unit: "Week",
    num: "01",
    stage: "Week 01",
    title: "A more comfortable routine",
    desc: "With daily use, meals that used to leave you bloated start to feel more manageable, including dairy, beans, and richer foods.",
  },
  {
    unit: "Day",
    num: "60+",
    stage: "Day 60+",
    title: "A consistent baseline",
    desc: "We suggest a 60-day trial. Used consistently, it helps maintain digestive comfort and supports long-term gut health.",
  },
];

export function TimelineSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="mt-12.5 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <h2 className="text-[25px] leading-[1.14] font-semibold tracking-[-0.02em] text-[#16160f]">
        Comfort at mealtime. Gut support over time.
      </h2>
      <div className="mt-7 flex gap-2.5">
        {STAGES.map((s, i) => (
          <button
            key={s.stage}
            type="button"
            onClick={() => setActive(i)}
            className="min-w-0 flex-1 text-left"
          >
            <span
              className={`block h-0.5 rounded-full transition-colors ${
                active === i ? "h-[2.5px] bg-[#CA133D]" : "bg-[#dcdbd4]"
              }`}
            />
            <span
              className={`mt-2.5 block text-[13.5px] leading-tight transition-colors ${
                active === i ? "text-[#16160f]" : "text-[#9d9d94]"
              }`}
            >
              {s.unit}
            </span>
            <span
              className={`block text-[13.5px] leading-tight transition-colors ${
                active === i ? "text-[#16160f]" : "text-[#9d9d94]"
              }`}
            >
              {s.num}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        {(() => {
          const s = STAGES[active];
          return (
            <div className="sm:flex sm:gap-8">
              <div
                aria-hidden="true"
                className="aspect-square w-[70%] shrink-0 rounded-lg bg-[#edece7] sm:w-[280px]"
              />
              <div className="mt-4.5 sm:mt-0">
                <div className="text-[28px] font-semibold tracking-[-0.02em] text-[#16160f]">
                  {s.stage}
                </div>
                <div className="mt-3.5 text-[17px] font-semibold tracking-[-0.01em] text-[#16160f]">
                  {s.title}
                </div>
                <div className="mt-2 text-[15px] leading-[1.5] text-[#6d6d65]">
                  {s.desc}
                  <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
