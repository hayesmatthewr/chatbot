"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/im8/Placeholder";

type Decade = "30s" | "40s" | "50s" | "60+";

interface DecadeContent {
  tabLabel: string;
  heading: string;
  tag: string;
  whatsHappening: string[];
  benefits: string[];
}

const DECADE_CONTENT: Record<Decade, DecadeContent> = {
  "30s": {
    tabLabel: "30s",
    heading: "Early Decline (30-39)",
    tag: "Proactive intervention",
    whatsHappening: [
      "5% decline in cellular energy",
      "First signs of DNA damage",
      "Muscle mass begins declining",
      "Metabolism slows 2-3%",
    ],
    benefits: [
      "Prevents early cellular energy decline",
      "Protects against initial DNA damage",
      "Maintains muscle mass and metabolism",
      "Establishes strong longevity foundation",
    ],
  },
  "40s": {
    tabLabel: "40s",
    heading: "Accelerating Changes (40-49)",
    tag: "Early intervention window",
    whatsHappening: [
      "Nearly 50% decline in NAD+ levels",
      "Visible dips in daily energy",
      "Slower recovery from exertion",
      "Early joint and skin changes emerge",
    ],
    benefits: [
      "Restores healthy NAD+ levels",
      "Sustains steady, all-day energy",
      "Supports faster recovery and resilience",
      "Helps preserve joint and skin health",
    ],
  },
  "50s": {
    tabLabel: "50s",
    heading: "Compounding Effects (50-59)",
    tag: "Active management",
    whatsHappening: [
      "Accelerated muscle loss (sarcopenia)",
      "Metabolic slowdown continues to compound",
      "Increased inflammation markers",
      "Growing cognitive fog",
    ],
    benefits: [
      "Combats sarcopenia and muscle loss",
      "Supports healthy metabolic function",
      "Helps reduce inflammatory burden",
      "Sharpens cognitive clarity and focus",
    ],
  },
  "60+": {
    tabLabel: "60+",
    heading: "Critical Support Years (60+)",
    tag: "Comprehensive protection",
    whatsHappening: [
      "Significant NAD+ depletion (~75% loss)",
      "Higher senescent cell burden",
      "Reduced stem cell regeneration",
      "Elevated long-term disease risk",
    ],
    benefits: [
      "Delivers comprehensive cellular protection",
      "Supports clearance of senescent cells",
      "Helps support regenerative capacity",
      "Promotes long-term vitality",
    ],
  },
};

const DECADES: Decade[] = ["30s", "40s", "50s", "60+"];

export function DecadesTimeline() {
  const [activeDecade, setActiveDecade] = useState<Decade>("30s");
  const content = DECADE_CONTENT[activeDecade];

  return (
    <section className="bg-[#50000B] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="text-3xl font-normal uppercase tracking-wide text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          Your Body Through the Decades
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
          See how aging affects your body at different life stages and why early
          intervention matters
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {DECADES.map((decade) => (
            <button
              key={decade}
              type="button"
              onClick={() => setActiveDecade(decade)}
              aria-pressed={activeDecade === decade}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-colors",
                activeDecade === decade
                  ? "bg-rose-100 text-[#50000B]"
                  : "border border-white/30 text-white hover:bg-white/10"
              )}
            >
              {DECADE_CONTENT[decade].tabLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-2xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 sm:p-8 md:p-10">
            <Placeholder className="aspect-square w-full rounded-lg" />
          </div>

          <div className="flex flex-col p-6 sm:p-8 md:p-10">
            <div className="text-center">
              <h3
                className="text-2xl font-normal text-[#50000B] sm:text-3xl"
                style={{ fontFamily: "var(--font-im8-display), serif" }}
              >
                {content.heading}
              </h3>
              <p className="mt-2 text-sm font-medium text-[#50000B]">{content.tag}</p>
            </div>

            <div className="mt-8 grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-black">
                  What&apos;s Happening in Your Body:
                </h4>
                <ul className="mt-4 space-y-4">
                  {content.whatsHappening.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                      <span className="text-sm text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[#F6F1EA] p-5">
                <h4 className="text-sm font-semibold text-[#50000B]">
                  IM8 Longevity Benefits:
                </h4>
                <ul className="mt-4 space-y-4">
                  {content.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#50000B]" />
                      <span className="text-sm text-[#50000B]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
