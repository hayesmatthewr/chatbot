"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

const FAQ_ITEMS = [
  {
    question: "Is creatine safe for daily use?",
    answer:
      "Yes. Creatine is one of the most studied supplements in existence — with over 700 clinical studies and 30+ years of research confirming its safety for long-term daily use in healthy adults. No cycling required.",
  },
  {
    question: "When should I take creatine?",
    answer:
      "Any time. Creatine doesn't work like a stimulant — it works by maintaining consistent levels in your muscle and brain tissue around the clock. Morning, evening, with food or without. The only thing that matters is taking it every day.",
  },
  {
    question: "Will this cause bloating?",
    answer:
      "Not with Arq8™. Bloating from creatine is caused by undissolved particles sitting in the gut. FullDissolve™ Nano-Creatine dissolves completely — which means nothing sits unabsorbed, and your digestive system never has to deal with the residue that causes discomfort.",
  },
  {
    question: "Is creatine only for athletes?",
    answer:
      "No. Your brain uses creatine just as much as your muscles do. Creatine supports mental clarity, focus, stress resilience, and cognitive performance under fatigue — making it as relevant for professionals, parents, and anyone under daily demand as it is for athletes.",
  },
  {
    question: "When will I start seeing results?",
    answer:
      "Most people notice subtle improvements in energy and focus within the first one to two weeks. Full muscle and brain saturation typically occurs around 30 days of consistent daily use — which is when the deeper benefits become most noticeable.",
  },
  {
    question: "Does creatine have any side effects?",
    answer:
      "Creatine is exceptionally well tolerated. The side effects most people associate with it — bloating, cramping, digestive discomfort — are caused by poor solubility in standard forms, not by creatine itself. FullDissolve™ eliminates those issues. No stimulants. No hormones. Nothing artificial.",
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full bg-muted px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h2 className="text-4xl leading-tight font-bold text-foreground sm:text-[45px]">
          Questions? We&apos;ve got answers.
        </h2>

        <div className="divide-y divide-border border-t border-border">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-bold text-foreground"
                >
                  <span>{item.question}</span>
                  <span className="shrink-0 text-foreground" aria-hidden="true">
                    {isOpen ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
