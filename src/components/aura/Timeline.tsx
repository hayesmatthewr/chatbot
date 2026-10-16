"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { timeline } from "./content";
import { Reveal } from "./Reveal";

const WEEKS = 12;
const DAYS = 7;

// The live thing: drag through the 12-week protocol, one softgel per day, and see what the studies saw by then.
export function Timeline() {
  const [week, setWeek] = useState(4);
  const reached = [...timeline].reverse().find((t) => t.week <= week) ?? timeline[0];
  const taken = week * DAYS;

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="scroll-mt-16 py-20 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal className="grid gap-6 md:grid-cols-12 md:gap-8">
          <h2 id="timeline-title" className="text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em] md:col-span-5">
            What to Expect
          </h2>
          <p className="max-w-[48ch] text-[17px] leading-[1.55] md:col-span-6 md:col-start-7">
            Astaxanthin builds up in your cells over weeks, not hours. Here&apos;s when the clinical studies saw results.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12 rounded-[40px] bg-aura-night p-6 text-white md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="text-[clamp(44px,6vw,88px)] leading-[0.9] font-bold tracking-[-0.04em]">{`Week ${week}`}</p>
            <p className="text-[16px] text-white/80">{`${taken} of 84 softgels`}</p>
          </div>

          <div
            className="mt-8 grid grid-flow-col grid-cols-12 grid-rows-7 gap-1.5 md:gap-2"
            aria-hidden
          >
            {Array.from({ length: WEEKS * DAYS }, (_, i) => {
              const w = Math.floor(i / DAYS) + 1;
              return (
                <span
                  key={i}
                  className={cn(
                    "mx-auto aspect-[1/1.6] w-full max-w-[22px] rounded-full transition-[background-color,transform] duration-300",
                    w <= week ? "bg-aura-red" : "bg-aura-night-step",
                    w === week && "scale-110",
                  )}
                  style={{ transitionDelay: `${(i % DAYS) * 20}ms` }}
                />
              );
            })}
          </div>

          <label className="mt-8 block">
            <span className="sr-only">Week of daily use</span>
            <input
              type="range"
              min={1}
              max={WEEKS}
              step={1}
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
              aria-valuetext={`Week ${week}`}
              className="h-11 w-full cursor-pointer accent-[var(--aura-red)]"
            />
          </label>

          <div aria-live="polite" className="mt-4 grid gap-1 md:grid-cols-12 md:gap-8">
            <p className="text-[15px] text-white/75 md:col-span-3">{reached.label}</p>
            <div className="md:col-span-9">
              <p className="text-[clamp(22px,2.4vw,32px)] leading-[1.15] font-bold tracking-[-0.02em]">{reached.headline}</p>
              <p className="mt-2 max-w-[56ch] text-[17px] leading-[1.55] text-white/90">{reached.body}</p>
            </div>
          </div>
        </Reveal>

        <ol className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {timeline.map((t, i) => {
            const active = t.week <= week;
            return (
              <Reveal as="li" key={t.label} delay={i * 80}>
                <button type="button" onClick={() => setWeek(t.week)} className="group block w-full text-left">
                  <span className="relative block aspect-[3/4] overflow-hidden rounded-[999px] bg-aura-step">
                    <Image
                      src={t.image}
                      alt={t.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className={cn("object-cover transition-[transform,filter] duration-700 group-hover:scale-105", !active && "grayscale")}
                    />
                  </span>
                  <span className={cn("mt-4 block text-[15px] font-bold", active ? "text-aura-red" : "text-aura-muted")}>{t.label}</span>
                  <span className="mt-1 block text-[19px] leading-[1.2] font-bold tracking-[-0.01em]">{t.headline}</span>
                  <span className="mt-2 block text-[16px] leading-[1.5]">{t.body}</span>
                </button>
              </Reveal>
            );
          })}
        </ol>
        <p className="mt-8 text-[14px] text-aura-muted">Timelines from published human studies of astaxanthin. Individual results vary.</p>
      </div>
    </section>
  );
}
