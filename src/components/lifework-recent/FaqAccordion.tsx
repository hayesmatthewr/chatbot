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
    <section id="faq" className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
          Questions, answered.
        </h2>

        <div className="mt-6 flex flex-col gap-2">
          {FAQS.map((question, i) => {
            const isOpen = open === i;
            return (
              <div key={question} className="rounded-[16px] bg-card px-5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-[15px] font-medium text-foreground">{question}</span>
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-4 text-[13px] text-muted-foreground">
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
