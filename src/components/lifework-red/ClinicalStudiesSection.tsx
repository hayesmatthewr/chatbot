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
    <section id="studies" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
            Peer-Reviewed Research
          </span>
          <h2 className="mt-3 text-[1.9rem] leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-[2.2rem]">
            One molecule. Multiple systems. 85+ human clinical studies.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            Astaxanthin has been studied across skin, eyes, performance,
            cognition, and healthy aging.*
          </p>
        </div>

        <div role="tablist" aria-label="Areas of clinical research" className="mt-9 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`cursor-pointer rounded-sm border px-4 py-2 font-[family-name:var(--font-lifework-red-mono)] text-[11px] tracking-[0.04em] uppercase transition-colors duration-200 ${
                active === t.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-secondary hover:border-secondary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-border bg-card">
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] text-muted-foreground">
                [Study {tab.code}]
              </span>
              <h3 className="mt-2 text-[21px] font-bold text-foreground">{tab.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-secondary">{tab.body}</p>

              <span className="mt-6 block font-[family-name:var(--font-lifework-red-mono)] text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
                Studied for
              </span>
              <ul className="mt-2 flex flex-col gap-1.5">
                {tab.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[14px] text-foreground">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-6 cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase underline-offset-4 hover:underline"
              >
                View Study
              </button>
            </div>

            <div>
              <Placeholder label="Chart / study visualization" className="aspect-[4/3] w-full" />
              <div className="mt-4 border-t border-border pt-4 font-[family-name:var(--font-lifework-red-mono)] text-[11.5px] leading-loose text-muted-foreground">
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
