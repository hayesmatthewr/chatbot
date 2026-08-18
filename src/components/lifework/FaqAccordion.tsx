"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
    <section id="faq" className="border-t border-border bg-muted py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Questions, answered.
        </h2>

        <div className="mt-8 flex flex-col divide-y divide-border border-t border-b border-border">
          {FAQS.map((question, i) => {
            const isOpen = open === i;
            return (
              <div key={question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors duration-200 hover:text-accent"
                >
                  <span className="text-sm font-semibold text-foreground">{question}</span>
                  <Plus
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-4 font-mono text-sm text-muted-foreground">
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
