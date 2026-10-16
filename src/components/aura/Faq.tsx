"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "./content";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";

type Topic = keyof typeof faqs;
const topics = Object.keys(faqs) as Topic[];

export function Faq() {
  const [topic, setTopic] = useState<Topic>("Science");
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="faq-title" className="bg-aura-step py-20 md:py-32">
      <div className="mx-auto max-w-[960px] px-4 md:px-8">
        <Reveal>
          <h2 id="faq-title" className="text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em]">
            Questions? Answered.
          </h2>
          <div role="tablist" aria-label="FAQ topics" className="mt-8 inline-flex rounded-full bg-aura-ground p-1">
            {topics.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={topic === t}
                onClick={() => {
                  setTopic(t);
                  setOpen(0);
                }}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[16px] font-bold transition-colors",
                  topic === t ? "bg-aura-red text-white" : "hover:bg-aura-paper",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <ul role="tabpanel" className="mt-8 flex flex-col gap-2">
          {faqs[topic].map((item, i) => {
            const isOpen = open === i;
            const placeholder = item.a.includes("PLACEHOLDER:");
            const [answer, todo] = item.a.split("PLACEHOLDER:");
            return (
              <li key={item.q} className={cn("rounded-[28px] transition-colors", isOpen ? "bg-aura-paper" : "bg-aura-ground hover:bg-aura-paper")}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-[19px] font-bold md:p-6"
                >
                  {item.q}
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-300",
                      isOpen ? "rotate-45 bg-aura-red text-white" : "bg-aura-step",
                    )}
                    aria-hidden
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="max-w-[62ch] px-5 pb-6 text-[17px] leading-[1.55] md:px-6">
                    {answer.trim() && <p>{answer.trim()}</p>}
                    {placeholder && <Placeholder>{todo.trim()}</Placeholder>}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
