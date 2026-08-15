"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/lifework/Placeholder";

type StepIndex = 0 | 1 | 2;

interface MechanismStep {
  label: string;
  title: string;
  subtitle: string;
  body: string;
}

const MECHANISM_STEPS: MechanismStep[] = [
  {
    label: "MECHANISM 01",
    title: "Spans the membrane",
    subtitle: "Protection from both sides.",
    body: "Astaxanthin sits across the cell membrane, helping provide antioxidant protection across its structure.*",
  },
  {
    label: "MECHANISM 02",
    title: "Helps break the chain reaction",
    subtitle: "Stops oxidative stress from spreading.",
    body: "Astaxanthin helps neutralize reactive species before oxidative damage can continue through the membrane.*",
  },
  {
    label: "MECHANISM 03",
    title: "Supports healthy membranes",
    subtitle: "Protects your cells' first line of defense.",
    body: "Healthy membranes are essential for normal cellular function. Astaxanthin helps protect their structure from oxidative stress.*",
  },
];

/**
 * Section 4 — "How It Works". The page's primary scientific-credibility
 * moment: a sticky mechanism visual on desktop paired with clickable
 * mechanism rows, collapsing to horizontal scroll-snap cards on mobile.
 */
export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<StepIndex>(0);

  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
            HOW IT WORKS
          </p>
          <h2 className="mt-4 text-[32px] font-bold tracking-tight text-[var(--lifework-ink)] sm:text-[40px] md:text-[48px]">
            Protection starts at the cell membrane.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--lifework-ink-soft)] sm:text-lg">
            Most antioxidants operate primarily in either water or fat. Astaxanthin&rsquo;s unique
            molecular structure allows it to span the cell membrane, helping protect it from
            oxidative stress across the lipid bilayer.*
          </p>
        </div>

        {/* Desktop: sticky visual + clickable mechanism rows */}
        <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Placeholder
              className="aspect-[4/5] w-full rounded-2xl"
              label="Cell membrane cross-section with astaxanthin molecule spanning the lipid bilayer, medical-journal style illustration"
            />
          </div>

          <div className="flex flex-col divide-y divide-[var(--lifework-line)]">
            {MECHANISM_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setActiveStep(index as StepIndex)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full flex-col items-start gap-2 border-l-2 py-8 pl-6 text-left transition-colors duration-200 first:pt-0",
                    isActive
                      ? "border-[var(--lifework-red)]"
                      : "border-transparent hover:border-[var(--lifework-line)]"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.1em] sm:text-sm",
                      isActive ? "text-[var(--lifework-red)]" : "text-[var(--lifework-ink-soft)]"
                    )}
                  >
                    {step.label}
                  </span>
                  <h3
                    className={cn(
                      "text-[20px] font-bold sm:text-[24px]",
                      isActive ? "text-[var(--lifework-ink)]" : "text-[var(--lifework-ink-soft)]"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm font-medium sm:text-base",
                      isActive ? "text-[var(--lifework-red)]" : "text-[var(--lifework-ink-faint)]"
                    )}
                  >
                    {step.subtitle}
                  </p>
                  {isActive && (
                    <p className="mt-1 max-w-md text-[15px] leading-relaxed text-[var(--lifework-ink-soft)]">
                      {step.body}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: horizontal scroll-snap cards */}
        <div className="mt-16 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:hidden">
          {MECHANISM_STEPS.map((step) => (
            <div
              key={step.label}
              className="flex w-[82%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-[var(--lifework-line)] bg-[var(--lifework-surface)] p-6 sm:w-[55%]"
            >
              <Placeholder
                className="aspect-square w-full rounded-xl"
                label="Cell membrane cross-section with astaxanthin molecule spanning the lipid bilayer, medical-journal style illustration"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--lifework-red)]">
                {step.label}
              </span>
              <h3 className="text-[20px] font-bold text-[var(--lifework-ink)]">{step.title}</h3>
              <p className="text-sm font-medium text-[var(--lifework-red)]">{step.subtitle}</p>
              <p className="text-[15px] leading-relaxed text-[var(--lifework-ink-soft)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center sm:mt-28">
          <p className="text-[20px] font-bold text-[var(--lifework-ink)] sm:text-[24px]">
            Healthy cells support a healthier you.
          </p>
          <p className="mt-1 text-[20px] font-bold text-[var(--lifework-ink)] sm:text-[24px]">
            Skin. Eyes. Brain. Muscles. Whole-body resilience.
          </p>
        </div>
      </div>
    </section>
  );
}
