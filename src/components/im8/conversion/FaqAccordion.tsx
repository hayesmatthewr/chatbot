"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "What is the New Advanced Daily Ultimate Longevity?",
    answer:
      "It's a clinically-dosed NAD+ and longevity powder built to target all 12 hallmarks of aging through five synergistic compound complexes — including NMN, trans-resveratrol, spermidine, and senolytics. Each complex is dosed at levels studied in human clinical research, not sprinkled in as a proprietary-blend filler. You mix it into a daily drink as the foundation of your longevity ritual.",
  },
  {
    question: "How do I take the new powder?",
    answer:
      "Mix one scoop with water once daily, any time of day, with or without food. There's no strict timing window to worry about — consistency day-to-day matters far more than the exact hour you take it.",
  },
  {
    question: "What makes this the best longevity product on the market?",
    answer:
      "We use therapeutic clinical doses instead of the proprietary-blend fillers common in the category, and we address all 12 hallmarks of aging simultaneously through five complexes, where most competitors only target one or two. Every batch is third-party tested and NSF Certified for Sport, so you know exactly what you're getting.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Most people notice improvements in energy and mental clarity within 2-4 weeks. Deeper cellular benefits — like NAD+ repletion and autophagy support — build gradually over 60-90 days of consistent use, which is exactly why our guarantee window is 90 days on the quarterly plan.",
  },
];

function AccordionRow({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base sm:text-lg font-medium text-[#1a1a1a]">{faq.question}</span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#50000B] text-lg font-medium leading-none text-[#50000B] transition-transform duration-200",
            isOpen && "rotate-45"
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-600">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2
          className="text-center text-3xl sm:text-4xl md:text-5xl font-normal text-[#50000B]"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          FAQs
        </h2>

        <div className="mt-10 border-t border-black/10">
          {FAQS.map((faq, index) => (
            <AccordionRow
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
