"use client";

import { useState } from "react";
import { Placeholder } from "./Placeholder";

const TABS = [
  {
    id: "skin",
    label: "Skin",
    code: "01",
    title: "Built-in resilience to environmental stress.",
    body: "Astaxanthin has been clinically studied for skin hydration, elasticity, texture, and resilience to UV stress.*",
    bullets: ["Skin hydration", "Skin elasticity", "Skin texture", "UV resilience"],
  },
  {
    id: "eyes",
    label: "Eyes",
    code: "02",
    title: "Comfort and endurance for long screen days.",
    body: "Astaxanthin has been clinically studied for eye comfort, visual endurance, and reducing everyday eye fatigue.*",
    bullets: ["Eye comfort", "Visual endurance", "Reduced eye fatigue", "Screen-time resilience"],
  },
  {
    id: "performance",
    label: "Performance + Recovery",
    code: "03",
    title: "Supports endurance and faster recovery.",
    body: "Astaxanthin has been clinically studied for exercise performance, endurance, and post-exercise recovery.*",
    bullets: ["Endurance", "Muscle recovery", "Reduced exercise-induced stress", "Sustained energy"],
  },
  {
    id: "cognition",
    label: "Cognition",
    code: "04",
    title: "Supports mental clarity and focus.",
    body: "Astaxanthin has been clinically studied for cognitive function and everyday mental clarity.*",
    bullets: ["Cognitive function", "Mental clarity", "Focus", "Brain cell protection"],
  },
  {
    id: "aging",
    label: "Healthy Aging",
    code: "05",
    title: "Supports cellular resilience over time.",
    body: "Astaxanthin has been clinically studied for markers of cellular aging and long-term antioxidant defense.*",
    bullets: ["Cellular resilience", "Antioxidant defense", "Long-term protection", "Whole-body support"],
  },
] as const;

export function ClinicalStudiesSection() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("skin");
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section id="studies" className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
            One molecule. Multiple systems. 85+ human clinical studies.
          </h2>
          <p className="mt-3 text-[15px] leading-[22px] text-secondary">
            Astaxanthin has been studied across skin, eyes, performance,
            cognition, and healthy aging.*
          </p>
        </div>

        <div role="tablist" aria-label="Areas of clinical research" className="mt-6 flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`flex h-7 cursor-pointer items-center rounded-full px-3 text-[12px] font-medium transition-colors duration-200 ${
                active === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-secondary hover:bg-background"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] bg-card p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="text-[11px] text-muted-foreground">[Study {tab.code}]</span>
              <h3 className="mt-2 text-[18px] leading-[22px] font-medium text-foreground">
                {tab.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[20px] text-secondary">{tab.body}</p>

              <span className="mt-5 block text-[11px] font-medium text-muted-foreground uppercase">
                Studied for
              </span>
              <ul className="mt-2 flex flex-col gap-1.5">
                {tab.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[13px] text-foreground">
                    <span className="size-1.5 rounded-full bg-foreground" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-5 flex h-7 w-fit cursor-pointer items-center rounded-full bg-muted px-2 text-[13px] text-foreground transition-opacity duration-200 hover:opacity-70"
              >
                View Study
              </button>
            </div>

            <div>
              <Placeholder label="Chart / study visualization" className="aspect-[4/3] w-full" />
              <div className="mt-3 text-[11px] leading-[18px] text-muted-foreground">
                [Approved Clinical Result]
                <br />
                [Study Duration]
                <br />
                Human Clinical Study — [Participants]
                <br />
                Dose: [Dose]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
