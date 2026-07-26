"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

interface MythFact {
  myth: string
  fact: string
}

const MYTH_FACTS: MythFact[] = [
  {
    myth: "Myth: creatine is only for men",
    fact: "Women naturally produce 20–40% less creatine than men — and levels fluctuate further during menstrual cycles, perimenopause, and menopause. Creatine supports lean muscle, cognitive clarity, mood stability, and bone density. Women don't just benefit from creatine — they may need it more.",
  },
  {
    myth: "Myth: creatine is only for the gym",
    fact: "Your brain consumes creatine too. It supports mental energy, focus under stress, and resilience — whether you're training, working, or just getting through a demanding day.",
  },
  {
    myth: "Myth: creatine = bulky look",
    fact: "Creatine supports lean muscle and strength, not bulk. Visible size changes come from a caloric surplus and training style — not from creatine itself.",
  },
  {
    myth: "Myth: creatine makes you bloated",
    fact: "Bloating is typically caused by poor-quality creatine or inconsistent dosing — not creatine itself. FullDissolve™ Nano-Creatine is refined for complete solubility, minimizing the GI discomfort associated with standard creatine monohydrate.",
  },
  {
    myth: "Myth: creatine damages your kidneys",
    fact: "Extensively studied in healthy adults with no evidence of kidney damage at recommended doses. Creatine is one of the most researched supplements in existence.",
  },
  {
    myth: "Myth: creatine gummies are just candy",
    fact: "Arq8™ gummies deliver a full clinical 5g dose of FullDissolve™ Nano-Creatine plus taurine, zinc, and succinic acid — the same functional dose as powder, just without the mixing or chalky taste.",
  },
]

export function MythFactsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md text-[32px] leading-[1.1] font-bold text-foreground md:text-[42px]">
            Clinical facts over common myths.
          </h2>

          <div className="flex flex-col gap-6 md:max-w-xl md:flex-1">
            <div className="flex justify-end">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-80"
              >
                Try Arq8™ Now
                <ArrowUpRight className="size-4" />
              </button>
            </div>

            <div className="divide-y divide-border border-t border-b border-border">
              {MYTH_FACTS.map((item, i) => {
                const isOpen = openIndex === i
                return (
                  <div key={item.myth}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-base font-bold text-foreground md:text-lg">
                        {item.myth}
                      </span>
                      <span
                        className={`shrink-0 text-xl font-normal text-foreground transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="animate-in fade-in slide-in-from-top-1 pb-5 text-sm leading-relaxed text-muted-foreground duration-300">
                        {item.fact}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
