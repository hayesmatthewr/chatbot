"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { experts } from "./content";
import { Reveal } from "./Reveal";

// Index with preview: names are the navigation, the chosen quotation fills one fixed frame.
export function Experts() {
  const [active, setActive] = useState(0);
  const current = experts[active];

  return (
    <section aria-labelledby="experts-title" className="bg-aura-night py-20 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal>
          <h2 id="experts-title" className="max-w-[18ch] text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em]">
            What researchers say about astaxanthin
          </h2>
          <p className="mt-4 max-w-[52ch] text-[16px] text-white/80">
            Published comments on the ingredient. The researchers quoted are not affiliated with Aura and do not endorse this product.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
          <ul className="flex flex-col md:col-span-5">
            {experts.map((e, i) => (
              <li key={e.name}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-4 py-4 text-left transition-colors duration-200",
                    i === active ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "h-9 w-6 shrink-0 rounded-full transition-colors duration-200",
                      i === active ? "bg-aura-red" : "bg-aura-night-step",
                    )}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-[clamp(22px,2.2vw,32px)] leading-[1.1] font-bold tracking-[-0.02em]">{e.name}</span>
                    <span className="block text-[15px] text-white/75">{e.role}</span>
                  </span>
                </button>
                <figure className={cn("pb-6 pl-10 md:hidden", i !== active && "hidden")}>
                  <blockquote className="text-[22px] leading-[1.25] font-medium">“{e.quote}”</blockquote>
                  <figcaption className="mt-3 text-[14px] text-white/75">{e.source}</figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <figure
            key={current.name}
            className="hidden min-h-[420px] flex-col justify-between rounded-[48px] bg-aura-red p-12 duration-300 animate-in fade-in md:col-span-7 md:flex"
          >
            <blockquote className="text-[clamp(28px,2.8vw,40px)] leading-[1.18] font-medium tracking-[-0.015em]">“{current.quote}”</blockquote>
            <figcaption className="mt-10 text-[16px]">
              <span className="font-bold">{current.name}</span> · {current.source}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
