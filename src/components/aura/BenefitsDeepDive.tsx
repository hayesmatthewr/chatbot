"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { deepDives, type DeepDive } from "./content";
import { Reveal } from "./Reveal";

const SCALE_MAX = 30;

function EffectChart({ item }: { item: DeepDive }) {
  const width = `${Math.min(100, (item.value / SCALE_MAX) * 100)}%`;
  return (
    <figure className="rounded-[24px] bg-aura-paper p-5 md:p-6">
      <figcaption className="text-[15px] font-bold">{item.chartTitle}</figcaption>
      <p className="text-[14px] text-aura-muted">Change from start of study</p>
      <div className="mt-5 flex flex-col gap-4">
        <div title={`${item.comparator}: no meaningful change`}>
          <div className="flex justify-between text-[15px]">
            <span>{item.comparator}</span>
            <span className="text-aura-muted tabular-nums">≈ 0</span>
          </div>
          <span className="mt-1.5 block h-3 w-[3%] min-w-2 rounded-r-[4px] bg-[#b9b9b4]" />
        </div>
        <div title={`Astaxanthin: ${item.valueLabel}`}>
          <div className="flex justify-between text-[15px]">
            <span className="font-bold">Astaxanthin</span>
            <span className="font-bold tabular-nums">{item.valueLabel}</span>
          </div>
          <span
            className={cn(
              "mt-1.5 block h-3 rounded-r-[4px] transition-[width] duration-700",
              item.tentative ? "bg-[repeating-linear-gradient(135deg,var(--aura-red)_0_6px,#f0b9ba_6px_10px)]" : "bg-aura-red",
            )}
            style={{ width }}
          />
        </div>
      </div>
      {item.note && <p className="mt-4 text-[14px] leading-[1.45] text-aura-muted">{item.note}</p>}
    </figure>
  );
}

export function BenefitsDeepDive() {
  const [open, setOpen] = useState(0);

  return (
    <section id="benefits" aria-labelledby="benefits-title" className="scroll-mt-16 bg-aura-step py-20 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-12 md:gap-8 md:px-8">
        <Reveal className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <h2 id="benefits-title" className="text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em]">
              Protect How You Look and Feel
            </h2>
            <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.55]">
              Astaxanthin embeds in the membrane of every cell it reaches, shielding skin, eyes, muscles and organs from the oxidative stress that drives aging.‡
              Tap a benefit to see the result.
            </p>
          </div>
        </Reveal>

        <ul className="flex flex-col gap-2 md:col-span-8">
          {deepDives.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={item.category} delay={i * 40}>
                <div className={cn("rounded-[28px] transition-colors duration-300", isOpen ? "bg-aura-ground" : "bg-aura-ground/60 hover:bg-aura-ground")}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                  >
                    <span className="flex-1">
                      <span className="block text-[15px] text-aura-muted">{item.category}</span>
                      <span className="block text-[clamp(20px,2vw,28px)] leading-[1.15] font-bold tracking-[-0.02em]">{item.hook}</span>
                    </span>
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-300",
                        isOpen ? "rotate-45 bg-aura-red text-white" : "bg-aura-paper",
                      )}
                      aria-hidden
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="grid gap-5 px-5 pb-6 md:grid-cols-2 md:px-6">
                      <p className="text-[17px] leading-[1.55]">{item.body}</p>
                      <EffectChart item={item} />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
