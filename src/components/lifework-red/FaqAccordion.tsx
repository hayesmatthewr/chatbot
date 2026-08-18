"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const FAQS = [
  "What is astaxanthin?",
  "Why do I need cellular protection?",
  "Why 12 mg?",
  "How should I take Lifework?",
  "How long does it take to notice benefits?",
  "Can I take Lifework with other supplements?",
  "Is Lifework third-party tested?",
  "Is Lifework intended for daily, long-term use?",
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-border bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
          Questions
        </span>
        <h2 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
          Questions, answered.
        </h2>

        <div className="mt-10 flex flex-col divide-y divide-border border-t border-b border-border">
          {FAQS.map((question, i) => {
            const isOpen = open === i;
            return (
              <div key={question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-accent"
                >
                  <span className="font-[family-name:var(--font-lifework-red-display)] text-[17px] font-medium text-foreground">
                    {question}
                  </span>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                    {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 font-[family-name:var(--font-lifework-red-mono)] text-[13px] text-muted-foreground">
                    [Answer copy to add later]
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
