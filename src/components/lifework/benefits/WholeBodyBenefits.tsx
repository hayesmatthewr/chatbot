"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/lifework/Placeholder";
import { ChevronIcon, CheckIcon } from "@/components/lifework/icons";

type BenefitCategory = {
  id: string;
  category: string;
  tag: string;
  claim: string;
  outcomes?: string[];
  placeholderLabel: string;
};

const CATEGORIES: BenefitCategory[] = [
  {
    id: "skin-health",
    category: "Skin Health",
    tag: "Hydration and resilience to environmental stress.",
    claim:
      "Astaxanthin helps protect lipid-rich skin structures from oxidative stress associated with UV exposure and everyday environmental stressors.*",
    outcomes: ["Skin hydration", "Skin elasticity", "Skin texture", "Resilience to UV stress"],
    placeholderLabel: "Skin close-up, natural light",
  },
  {
    id: "eye-health",
    category: "Eye Health",
    tag: "Visual endurance for screen-heavy days.",
    claim:
      "Astaxanthin can reach tissues in the eye where it provides antioxidant support and has been studied for visual performance and occasional eye fatigue.*",
    outcomes: ["Eye comfort", "Visual endurance", "Visual accommodation", "Retinal antioxidant defense"],
    placeholderLabel: "Eye / screen lifestyle",
  },
  {
    id: "performance-recovery",
    category: "Performance + Recovery",
    tag: "Support for what happens after hard effort.",
    claim:
      "Exercise temporarily increases oxidative stress. Astaxanthin has been studied for its role in endurance, muscle function, and post-exercise recovery.*",
    outcomes: ["Exercise recovery", "Lactate response", "Muscle endurance", "Performance"],
    placeholderLabel: "Post-training athlete",
  },
  {
    id: "healthy-aging",
    category: "Healthy Aging",
    tag: "Protect the cells you're asking to last.",
    claim:
      "Healthy aging starts with maintaining cellular resilience. Astaxanthin supports antioxidant defenses and mitochondrial health as your body's natural defenses change over time.*",
    placeholderLabel: "Healthy 50+ lifestyle",
  },
  {
    id: "cognitive-function",
    category: "Cognitive Function",
    tag: "Antioxidant support for the brain.",
    claim:
      "Astaxanthin has been studied for its ability to support healthy cognitive function and protect lipid-rich tissues from oxidative stress.*",
    placeholderLabel: "Focus / cognitive lifestyle",
  },
  {
    id: "cellular-resilience",
    category: "Cellular Resilience",
    tag: "Whole-body defense at the cellular level.",
    claim:
      "Astaxanthin's structure allows it to provide antioxidant protection across cell membranes throughout the body.*",
    placeholderLabel: "Cellular / microscopic imagery",
  },
];

/**
 * "One molecule, multiple systems" accordion — ARMRA-reference pattern.
 * Single-open: opening a row closes any other. Skin Health (highest
 * priority) starts open; collapsed rows are visually de-emphasized via a
 * truncated tag line so the layout nudges toward opening each one.
 */
export function WholeBodyBenefits() {
  const [openId, setOpenId] = useState<string | null>(CATEGORIES[0].id);

  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
          ONE MOLECULE. MULTIPLE SYSTEMS.
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Cellular protection does not stop at one part of the body.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-[var(--lifework-ink-soft)] sm:text-lg">
          Oxidative stress occurs throughout the body. That is why astaxanthin has been studied
          across skin, eyes, cognition, performance, recovery, and healthy aging.*
        </p>

        <div className="mt-12 flex flex-col border-t border-[var(--lifework-line)]">
          {CATEGORIES.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-b border-[var(--lifework-line)]">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <div className="min-w-0">
                    <span
                      className={cn(
                        "block text-lg font-medium sm:text-xl",
                        isOpen ? "text-[var(--lifework-ink)]" : "text-[var(--lifework-ink)]/80"
                      )}
                    >
                      {item.category}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-sm text-[var(--lifework-ink-soft)]",
                        !isOpen && "truncate"
                      )}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <ChevronIcon
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 text-[var(--lifework-red)] transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="grid grid-cols-1 gap-6 pb-8 sm:grid-cols-[1fr_1fr] sm:gap-10">
                    <Placeholder
                      className="aspect-[4/3] w-full rounded-2xl"
                      label={item.placeholderLabel}
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-base leading-relaxed text-[var(--lifework-ink)]">
                        {item.claim}
                      </p>
                      {item.outcomes && (
                        <ul className="mt-5 flex flex-col gap-3">
                          {item.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-center gap-2.5 text-sm text-[var(--lifework-ink-soft)]">
                              <CheckIcon className="h-4 w-4 shrink-0 text-[var(--lifework-red)]" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
