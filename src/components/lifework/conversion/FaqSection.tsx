"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "What is Lifework?",
    answer:
      "Lifework is a daily cellular protection softgel powered by 12 mg of natural astaxanthin, formulated to help protect cells from oxidative stress and support skin, eye, performance, recovery, and whole-body health.*",
  },
  {
    question: "What is astaxanthin?",
    answer:
      "Astaxanthin is a naturally occurring antioxidant sourced from the microalgae Haematococcus pluvialis. Its unique structure allows it to span the cell membrane and provide antioxidant protection across lipid-rich cellular structures.*",
  },
  {
    question: "Why do I need cellular protection?",
    answer:
      "Everyday factors including sun exposure, screens, pollution, intense exercise, stress, and aging can contribute to oxidative stress. Lifework is designed to support your body's antioxidant defenses against that daily stress.*",
  },
  {
    question: "How much should I take?",
    answer: "Take 1 softgel daily with food.",
  },
  {
    question: "How long does it take to work?",
    answer:
      "Astaxanthin begins working below the surface before you necessarily notice a difference. Clinical outcomes vary by benefit, dose, study, and individual. Consistency matters, with many astaxanthin studies measuring outcomes over several weeks of daily use.*",
  },
  {
    question: "Can I take Lifework with other supplements?",
    answer:
      "Lifework is designed to fit into an existing daily supplement routine. Customers taking medications or managing a medical condition should speak with their healthcare provider.",
  },
  {
    question: "Why 12 mg?",
    answer: "12 mg provides a meaningful daily dose of natural astaxanthin in a simple one-softgel routine.",
  },
  {
    question: "Is Lifework third-party tested?",
    answer: "Yes. Lifework is third-party tested for purity and potency and screened for contaminants.",
  },
];

function AccordionRow({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[var(--lifework-line)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base sm:text-lg font-medium text-[var(--lifework-ink)]">{faq.question}</span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--lifework-red)] text-lg font-medium leading-none text-[var(--lifework-red)] transition-transform duration-200",
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
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--lifework-ink-soft)]">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lifework-ink)] sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 border-t border-[var(--lifework-line)]">
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
