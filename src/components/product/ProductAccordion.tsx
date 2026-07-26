"use client"

import { useState } from "react"

const FAQ_ITEMS = [
  "What makes Arq8™ different from other creatine gummies?",
  "How do I take them?",
  "What are the benefits of this formula?",
  "Is it good for women?",
]

export function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border border-t border-border">
      {FAQ_ITEMS.map((question, i) => {
        const isOpen = openIndex === i
        return (
          <div key={question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-foreground"
            >
              <span>{question}</span>
              <span
                className={`shrink-0 text-lg font-normal text-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="pb-4 text-sm text-muted-foreground">
                Answer coming soon.
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
