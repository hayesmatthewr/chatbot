"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Activity, ChevronDown, Eye, HeartPulse, Leaf, ShieldCheck, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "./CartContext";
import { Sheet } from "./Sheet";
import { Stars } from "./Stars";
import { Placeholder } from "./Placeholder";
import { benefitGrid, bundles, dailyBenefits, guarantee, oneTime, rating } from "./content";

const icons = { cell: ShieldCheck, sun: Sun, eye: Eye, pulse: Activity, heart: HeartPulse, leaf: Leaf };

export function BuyBox() {
  const { selected, select, add } = useCart();
  const [sheet, setSheet] = useState<null | "guarantee" | "research" | "natural">(null);

  return (
    <div id="buy" className="scroll-mt-20 px-4 md:px-0">
      <h1 className="text-[clamp(34px,4vw,56px)] leading-[1] font-bold tracking-[-0.035em]">Daily Cellular Protection</h1>

      <a href="#reviews" className="mt-3 flex w-fit items-center gap-2 text-[15px] hover:underline">
        <Stars />
        <span>
          <span className="font-bold">{rating.score}/5.0</span> ({rating.count} reviews)
        </span>
      </a>

      <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[28px] font-bold tracking-[-0.02em] tabular-nums">{selected.perWeek}/week</span>
        <span className="text-[16px]">{`$${selected.price} for ${selected.weeks} weeks`}</span>
        <s className="text-[16px] text-aura-muted tabular-nums">${selected.compareAt}</s>
        <span className="rounded-full bg-aura-red px-3 py-1 text-[14px] font-bold text-white">Save ${selected.save}</span>
      </p>

      <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.55]">
        One softgel of natural AstaReal® astaxanthin, studied in 85+ human trials, to help defend your cells from oxidative stress, naturally.‡
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
        {benefitGrid.map((b) => {
          const Icon = icons[b.icon];
          return (
            <li key={b.label} className="flex items-center gap-3 text-[15px] font-medium">
              <span className="grid h-10 w-7 shrink-0 place-items-center rounded-full bg-aura-red text-white">
                <Icon className="size-4" aria-hidden />
              </span>
              {b.label}
            </li>
          );
        })}
      </ul>

      <fieldset className="mt-8">
        <legend className="text-[17px] font-bold">Choose your supply</legend>
        <div className="mt-3 flex flex-col gap-3">
          {bundles.map((b) => {
            const active = selected.id === b.id;
            return (
              <label
                key={b.id}
                className={cn(
                  "relative block cursor-pointer rounded-[28px] p-5 transition-colors",
                  active ? "bg-aura-paper ring-2 ring-aura-red" : "bg-aura-step hover:bg-[#dededa]",
                )}
              >
                <input type="radio" name="bundle" value={b.id} checked={active} onChange={() => select(b.id)} className="sr-only" />
                {b.tag && (
                  <span className="absolute -top-3 left-5 rounded-full bg-aura-red px-3 py-1 text-[13px] font-bold text-white">{b.tag}</span>
                )}
                <span className="flex items-start gap-4">
                  <span
                    className={cn(
                      "mt-1 grid h-6 w-4 shrink-0 place-items-center rounded-full",
                      active ? "bg-aura-red" : "bg-aura-paper",
                    )}
                    aria-hidden
                  >
                    {active && <span className="h-2.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className="text-[18px] font-bold">{b.name}</span>
                      <span className="text-[18px] font-bold tabular-nums">
                        <s className="mr-2 text-[15px] font-normal text-aura-muted">${b.compareAt}</s>${b.price}
                      </span>
                    </span>
                    <span className="mt-0.5 flex flex-wrap justify-between gap-x-4 text-[15px]">
                      <span className="font-medium text-aura-red">
                        Save ${b.save} ({b.savePct}%)
                      </span>
                      <span className="tabular-nums">{b.perWeek}/week</span>
                    </span>
                    {active && (
                      <ul className="mt-3 flex flex-col gap-1.5 text-[15px]">
                        {b.bullets.map((line) => (
                          <li key={line} className="flex items-center gap-2.5">
                            <span className="h-3 w-2 shrink-0 rounded-full bg-aura-red" aria-hidden />
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        id="main-cta"
        type="button"
        onClick={() => add(`Added ${selected.name} to cart`)}
        className="mt-5 h-16 w-full rounded-full bg-aura-red text-[19px] font-bold text-white transition-[transform,background-color] duration-200 hover:bg-[#b81116] active:scale-[0.98]"
      >
        Subscribe & Save
      </button>
      <p className="mt-3 text-center text-[15px]">
        {`Delivered every ${selected.weeks} weeks · Cancel or pause anytime`}
      </p>
      <p className="mt-2 text-center">
        <button
          type="button"
          onClick={() => {
            select("4-week");
            add(`Added ${oneTime.label}, to cart`);
          }}
          className="text-[15px] underline underline-offset-4 hover:text-aura-red"
        >
          Or buy once for ${oneTime.price} + ${oneTime.shipping} shipping
        </button>
      </p>

      <p className="mt-8 text-[15px]">Research recommends 12 weeks of daily use.</p>
      <button
        type="button"
        onClick={() => setSheet("guarantee")}
        className="group relative mt-3 block w-full overflow-hidden rounded-[28px] bg-aura-night p-6 text-left text-white"
      >
        <Image src="/images/aura/sunset-hand.jpg" alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-0 bg-black/30" aria-hidden />
        <span className="relative block text-[14px] font-bold">Real Results Guarantee</span>
        <span className="relative mt-1 block max-w-[18ch] text-[26px] leading-[1.08] font-bold tracking-[-0.02em]">{guarantee.headline}</span>
        <span className="relative mt-3 block text-[15px] font-medium underline underline-offset-4">Learn more</span>
      </button>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <ProofTile title="85+ Human Clinical Studies" action="View Research" image="/images/aura/petri-dish.jpg" onClick={() => setSheet("research")} />
        <ProofTile title="Natural, Never Synthetic" action="Learn More" image="/images/aura/red-texture.jpg" onClick={() => setSheet("natural")} />
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <Accordion title="Daily Benefits" defaultOpen>
          <ul className="flex flex-col gap-3">
            {dailyBenefits.map((d) => (
              <li key={d.title} className="flex gap-3">
                <span className="mt-1.5 h-3.5 w-2.5 shrink-0 rounded-full bg-aura-red" aria-hidden />
                <span>
                  <span className="font-bold">{d.title}</span> {d.body}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-medium">Most studies ran 4 to 16 weeks. Give it 12.</p>
        </Accordion>
        <Accordion title="How to Use">
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>Take 1 softgel daily.</li>
            <li>Take it with a meal that contains some fat.</li>
            <li>Keep going for 12 weeks.</li>
          </ol>
          <Placeholder>Confirm final How to Use steps.</Placeholder>
        </Accordion>
        <Accordion title="Ingredient Label">
          <p>Serving size: 1 softgel. AstaReal® natural astaxanthin 12mg.</p>
          <Placeholder>Supplement facts panel: servings per container, each ingredient with amount and % daily value.</Placeholder>
        </Accordion>
        <Accordion title="The No List">
          <Placeholder>e.g. no fillers, no synthetic astaxanthin, no artificial colors, no gluten.</Placeholder>
        </Accordion>
        <Accordion title="Certifications & Testing">
          <Placeholder>Certifications held, third-party lab, what each batch is tested for, where to view results.</Placeholder>
        </Accordion>
      </div>

      <Sheet open={sheet === "guarantee"} onClose={() => setSheet(null)} title="Real Results Guarantee">
        <p>{guarantee.sheet}</p>
        <Placeholder>† Terms apply. {guarantee.terms.replace("PLACEHOLDER: ", "")}</Placeholder>
      </Sheet>
      <Sheet open={sheet === "research"} onClose={() => setSheet(null)} title="85+ Human Clinical Studies">
        <Placeholder>List the key human trials (study, population, dose, outcome) with links to each publication.</Placeholder>
      </Sheet>
      <Sheet open={sheet === "natural"} onClose={() => setSheet(null)} title="How Astaxanthin Works">
        <p>
          Astaxanthin is a red carotenoid made by microalgae. Its long chain sits inside the cell membrane while its two ends reach the water-facing surfaces on
          either side, so it can neutralize free radicals inside the membrane and at both surfaces. Many common antioxidants only work in one of these zones:
          vitamin C in the watery areas, vitamin E inside the membrane. Take it with a meal containing fat for best absorption.
        </p>
        <Placeholder>Review with science team.</Placeholder>
      </Sheet>
    </div>
  );
}

function ProofTile({ title, action, image, onClick }: { title: string; action: string; image: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group flex flex-col overflow-hidden rounded-[28px] bg-aura-paper text-left">
      <span className="relative block aspect-[16/9] overflow-hidden">
        <Image src={image} alt="" fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </span>
      <span className="flex flex-1 flex-col justify-between gap-3 p-4">
        <span className="text-[17px] leading-[1.2] font-bold">{title}</span>
        <span className="w-fit rounded-full bg-aura-ink px-4 py-2 text-[14px] font-bold text-white transition-colors group-hover:bg-aura-red">{action}</span>
      </span>
    </button>
  );
}

function Accordion({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-[24px] bg-aura-paper">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-[17px] font-bold"
      >
        {title}
        <ChevronDown className={cn("size-5 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>
      {open && <div className="px-5 pb-5 text-[16px] leading-[1.55]">{children}</div>}
    </div>
  );
}

export function StickyBar() {
  const { selected, add } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cta = document.getElementById("main-cta");
    if (!cta) return;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(cta);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 bg-aura-paper px-4 py-3 shadow-[0_-8px_32px_rgb(0_0_0/0.12)] transition-transform duration-300 md:px-8",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-4">
        <Image src="/images/aura/pouch-cutout.png" alt="" width={40} height={59} className="hidden h-12 w-auto sm:block" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-bold">{selected.name}</p>
          <p className="text-[15px]">{`$${selected.price} · ${selected.perWeek}/week`}</p>
        </div>
        <button
          type="button"
          tabIndex={visible ? 0 : -1}
          onClick={() => add(`Added ${selected.name} to cart`)}
          className="h-12 shrink-0 rounded-full bg-aura-red px-7 text-[16px] font-bold text-white transition-[transform,background-color] hover:bg-[#b81116] active:scale-95"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
