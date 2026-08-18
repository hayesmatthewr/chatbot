"use client";

import { useState } from "react";
import { Placeholder } from "./Placeholder";

const TABS = [
  {
    id: "skin",
    label: "Skin",
    title: "Built-in resilience to environmental stress.",
    body: "Astaxanthin has been clinically studied for skin hydration, elasticity, texture, and resilience to UV stress.*",
    bullets: ["Skin hydration", "Skin elasticity", "Skin texture", "UV resilience"],
  },
  {
    id: "eyes",
    label: "Eyes",
    title: "Comfort and endurance for long screen days.",
    body: "Astaxanthin has been clinically studied for eye comfort, visual endurance, and reducing everyday eye fatigue.*",
    bullets: ["Eye comfort", "Visual endurance", "Reduced eye fatigue", "Screen-time resilience"],
  },
  {
    id: "performance",
    label: "Performance + Recovery",
    title: "Supports endurance and faster recovery.",
    body: "Astaxanthin has been clinically studied for exercise performance, endurance, and post-exercise recovery.*",
    bullets: ["Endurance", "Muscle recovery", "Reduced exercise-induced stress", "Sustained energy"],
  },
  {
    id: "cognition",
    label: "Cognition",
    title: "Supports mental clarity and focus.",
    body: "Astaxanthin has been clinically studied for cognitive function and everyday mental clarity.*",
    bullets: ["Cognitive function", "Mental clarity", "Focus", "Brain cell protection"],
  },
  {
    id: "aging",
    label: "Healthy Aging",
    title: "Supports cellular resilience over time.",
    body: "Astaxanthin has been clinically studied for markers of cellular aging and long-term antioxidant defense.*",
    bullets: ["Cellular resilience", "Antioxidant defense", "Long-term protection", "Whole-body support"],
  },
] as const;

export function ClinicalStudiesSection() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("skin");
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section id="studies" className="border-t border-border bg-muted py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            One molecule. Multiple systems. 85+ human clinical studies.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Astaxanthin has been studied across skin, eyes, performance,
            cognition, and healthy aging.*
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Areas of clinical research"
          className="mt-8 flex gap-6 overflow-x-auto border-b border-border"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`cursor-pointer border-b-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                active === t.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-xs font-semibold tracking-wide text-accent uppercase">
              {tab.label}
            </span>
            <h3 className="mt-2 text-xl font-bold text-foreground">{tab.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary">{tab.body}</p>

            <span className="mt-6 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Studied for:
            </span>
            <ul className="mt-2 flex flex-col gap-1.5">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-6 cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
            >
              View Study
            </button>
          </div>

          <div>
            <Placeholder label="Chart / study visualization" aspect="aspect-[4/3] w-full" />
            <div className="mt-4 rounded-lg border border-border bg-card p-5 font-mono text-xs text-muted-foreground">
              <p>[Approved Clinical Result]</p>
              <p className="mt-1">[Study Duration]</p>
              <p className="mt-1">Human Clinical Study — [Participants]</p>
              <p className="mt-1">Dose: [Dose]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
