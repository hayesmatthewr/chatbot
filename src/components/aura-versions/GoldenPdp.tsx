"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/aura/CartContext";
import {
  antioxidantColumns,
  antioxidantRows,
  bundles,
  deepDives,
  fdaDisclaimer,
  guarantee,
  oneTime,
  rating,
  reviews,
  timeline,
} from "@/components/aura/content";
import { oneTimeToast, productImages } from "./shared";

// Direction 3 — "Golden Hour": colour chapters. The page is a run of full-bleed fields taken from the
// sunset photograph (sand, apricot, astaxanthin red, deep brown), a soft optical serif and round shapes.
// Astaxanthin is the algae's own sunscreen; the page is lit like the hour it protects you in.

const serif = "font-[family-name:var(--font-golden-serif)]";

export function GoldenPdp() {
  const { selected, select, add, count } = useCart();
  const [image, setImage] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const d = deepDives[benefit];

  return (
    <div className="min-h-screen bg-[#fbf6ef] font-[family-name:var(--font-golden-sans)] text-[#2b1410]">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="flex h-20 items-center justify-between px-5 md:px-10">
          <span className={cn(serif, "text-[30px] font-semibold tracking-[-0.02em] text-white")}>aura</span>
          <a href="#buy" className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[14px] font-medium">
            <ShoppingBag className="size-4" aria-hidden /> {count}
          </a>
        </div>
      </header>

      {/* Chapter: the hour */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#7a4a2a]">
        <Image src="/images/aura/sunset-hand.jpg" alt="A hand raised against sunlit water at golden hour" fill preload sizes="100vw" className="aura-drift object-cover" />
        <div className="absolute inset-0 bg-[#2b1410]/25" aria-hidden />
        <Image
          src="/images/aura/pouch-cutout.png"
          alt="Aura Cellular Protection pouch"
          width={478}
          height={704}
          preload
          sizes="(min-width: 768px) 28vw, 60vw"
          className="absolute top-[11%] left-1/2 h-[38%] w-auto -translate-x-1/2 rotate-[4deg] drop-shadow-[0_30px_60px_rgb(43_20_16/0.55)] md:top-[10%] md:left-[64%] md:h-[62%]"
        />
        <div className="relative grid w-full gap-8 px-5 pb-12 md:grid-cols-12 md:px-10 md:pb-16">
          <h1 className={cn(serif, "text-[clamp(56px,9vw,150px)] leading-[0.92] font-normal tracking-[-0.03em] text-white md:col-span-8")}>
            Daily Cellular Protection
          </h1>
          <div className="self-end text-white md:col-span-4">
            <p className="text-[18px] leading-[1.5]">One softgel of natural AstaReal® astaxanthin, studied in 85+ human trials, to help defend your cells from oxidative stress, naturally.‡</p>
            <a href="#buy" className="mt-6 inline-flex h-14 items-center rounded-full bg-[#fbf6ef] px-8 text-[16px] font-semibold text-[#2b1410] transition-transform hover:scale-[1.03]">
              Start your 12 weeks
            </a>
          </div>
        </div>
      </section>

      {/* Chapter: buy */}
      <section id="buy" className="grid gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-10 md:py-24">
        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white md:aspect-[5/4]">
            <Image key={image} src={productImages[image].src} alt={productImages[image].alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover duration-500 animate-in fade-in" />
          </div>
          <div className="mt-3 flex gap-3">
            {productImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setImage(i)}
                aria-label={`Show image ${i + 1}`}
                className={cn("relative size-16 overflow-hidden rounded-full transition-transform hover:scale-105 md:size-20", i === image && "ring-2 ring-[#c5221f] ring-offset-2 ring-offset-[#fbf6ef]")}
              >
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <a href="#reviews" className="text-[15px]">
            <span className="text-[#c5221f]">★★★★★</span> {rating.score}/5.0 ({rating.count} reviews)
          </a>
          <h2 className={cn(serif, "mt-3 text-[clamp(40px,4vw,60px)] leading-[1] tracking-[-0.02em]")}>Choose your supply</h2>
          <p className="mt-3 text-[17px]">
            <span className="text-[26px] font-bold">{selected.perWeek}</span>/week ·{" "}
            <span className="text-[#8a5a48]">{`$${selected.price} for ${selected.weeks} weeks`}</span>
          </p>

          <div className="mt-6 grid gap-3">
            {bundles.map((b) => {
              const active = selected.id === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(b.id)}
                  className={cn(
                    "relative rounded-[28px] p-5 text-left transition-colors",
                    active ? "bg-[#c5221f] text-white" : "bg-[#f2e8dc] hover:bg-[#ecdccb]",
                  )}
                >
                  {b.tag && (
                    <span className={cn("absolute -top-3 left-5 rounded-full px-3 py-1 text-[12px] font-bold", active ? "bg-[#2b1410] text-white" : "bg-[#eba46e]")}>
                      {b.tag}
                    </span>
                  )}
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={cn(serif, "text-[26px] leading-tight")}>{b.name}</span>
                    <span className="text-[20px] font-bold">${b.price}</span>
                  </span>
                  <span className={cn("mt-1 flex justify-between text-[15px]", active ? "text-white/85" : "text-[#8a5a48]")}>
                    <span>
                      Save ${b.save} ({b.savePct}%) · <s>${b.compareAt}</s>
                    </span>
                    <span>{b.perWeek}/week</span>
                  </span>
                  {active && (
                    <span className="mt-3 flex flex-wrap gap-2 text-[13px]">
                      {b.bullets.map((x) => (
                        <span key={x} className="rounded-full bg-white/15 px-3 py-1">
                          {x}
                        </span>
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => add(`Added ${selected.name} to cart`)}
            className="mt-5 h-16 w-full rounded-full bg-[#2b1410] text-[18px] font-semibold text-[#fbf6ef] transition-[transform,background-color] hover:bg-[#45221b] active:scale-[0.98]"
          >
            Subscribe & Save
          </button>
          <p className="mt-3 text-center text-[14px] text-[#8a5a48]">{`Delivered every ${selected.weeks} weeks · Cancel or pause anytime`}</p>
          <p className="mt-1 text-center">
            <button
              type="button"
              onClick={() => {
                select("4-week");
                add(oneTimeToast);
              }}
              className="text-[14px] underline underline-offset-4"
            >
              Or buy once for ${oneTime.price} + ${oneTime.shipping} shipping
            </button>
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {["Cellular Defense", "Skin Radiance", "Eye Comfort", "Exercise Recovery", "Heart Health", "Healthy Aging"].map((b) => (
              <li key={b} className="rounded-full bg-[#f2e8dc] px-4 py-2 text-[14px] font-medium">
                {b}‡
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chapter: the problem, red */}
      <section className="flex min-h-[90svh] items-center bg-[#c5221f] px-5 py-20 text-[#fbf6ef] md:px-10">
        <div className="grid w-full gap-10 md:grid-cols-12">
          <h2 className={cn(serif, "text-[clamp(52px,8vw,128px)] leading-[0.95] tracking-[-0.03em] md:col-span-9")}>
            Every cell takes hits from oxidative stress
          </h2>
          <p className="max-w-[36ch] self-end text-[19px] leading-[1.5] md:col-span-3">
            Sun, screens, hard training and time all add up, cell by cell. Astaxanthin spans the whole membrane and guards both sides at once.‡
          </p>
        </div>
      </section>

      {/* Chapter: one number, apricot */}
      <section className="grid min-h-[90svh] items-center gap-10 bg-[#eba46e] px-5 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <p className={cn(serif, "text-[clamp(120px,20vw,320px)] leading-[0.8] tracking-[-0.04em]")}>+22%</p>
          <p className="mt-6 max-w-[30ch] text-[22px] leading-[1.3]">focusing range in screen workers after 4 weeks. Placebo stayed flat.‡</p>
          <p className="mt-4 text-[14px] text-[#5a2f1f]">Nagaki et al., 2002. 13 per group, 5mg AstaReal® astaxanthin.</p>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden rounded-t-full rounded-b-[32px] md:col-span-5 md:col-start-8">
          <Image src="/images/aura/softgel-finger.jpg" alt="A red Aura softgel on a fingertip" fill sizes="(min-width: 768px) 35vw, 90vw" className="object-cover" />
        </div>
      </section>

      {/* Chapter: benefits, sand */}
      <section className="bg-[#f2e8dc] px-5 py-20 md:px-10 md:py-28">
        <h2 className={cn(serif, "max-w-[14ch] text-[clamp(44px,5.5vw,88px)] leading-[0.95] tracking-[-0.02em]")}>Protect how you look and feel</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <ul className="flex flex-col md:col-span-6">
            {deepDives.map((x, i) => (
              <li key={x.category}>
                <button
                  type="button"
                  aria-pressed={i === benefit}
                  onMouseEnter={() => setBenefit(i)}
                  onClick={() => setBenefit(i)}
                  className={cn(
                    serif,
                    "w-full py-2 text-left text-[clamp(26px,2.8vw,42px)] leading-[1.1] italic transition-colors",
                    i === benefit ? "text-[#c5221f]" : "text-[#2b1410] hover:text-[#c5221f]",
                  )}
                >
                  {x.category}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex min-h-[380px] flex-col justify-between rounded-[32px] bg-[#fbf6ef] p-8 md:col-span-6 md:p-10" aria-live="polite">
            <p className={cn(serif, "text-[clamp(64px,7vw,112px)] leading-none tracking-[-0.03em]", d.tentative ? "text-[#a98a7c]" : "text-[#c5221f]")}>{d.valueLabel}</p>
            <div>
              <p className={cn(serif, "text-[30px] leading-[1.1]")}>{d.hook}</p>
              <p className="mt-3 max-w-[48ch] text-[17px] leading-[1.55]">{d.body}</p>
              {d.note && <p className="mt-3 text-[14px] text-[#8a5a48]">{d.note}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Chapter: timeline, deep brown */}
      <section className="bg-[#2b1410] px-5 py-20 text-[#fbf6ef] md:px-10 md:py-28">
        <h2 className={cn(serif, "text-[clamp(44px,5.5vw,88px)] leading-[0.95] tracking-[-0.02em]")}>What to expect</h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {timeline.map((t) => (
            <li key={t.label}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[24px]">
                <Image src={t.image} alt={t.alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-5 text-[14px] font-semibold text-[#eba46e]">{t.label}</p>
              <p className={cn(serif, "mt-1 text-[26px] leading-[1.1]")}>{t.headline}</p>
              <p className="mt-2 text-[15px] leading-[1.55] text-[#fbf6ef]/85">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Chapter: comparison, cream */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <h2 className={cn(serif, "text-[clamp(44px,5.5vw,88px)] leading-[0.95] tracking-[-0.02em]")}>Not all antioxidants are equal</h2>
        <div className="mt-10 overflow-hidden rounded-[32px] bg-[#f2e8dc]">
          <table className="w-full text-[14px] md:text-[16px]">
            <thead>
              <tr>
                <th className="p-5" />
                {antioxidantColumns.map((c, i) => (
                  <th key={c} className={cn("px-1 py-5 text-center text-[13px] font-bold md:text-[15px]", i === 0 && "bg-[#c5221f] text-white")}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {antioxidantRows.map((r) => (
                <tr key={r.feature}>
                  <th scope="row" className="px-5 py-4 text-left font-medium">
                    {r.feature}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className={cn("text-center", i === 0 && "bg-[#c5221f] text-white")}>
                      {v ? <Check className={cn("mx-auto size-5", i !== 0 && "text-[#c5221f]")} aria-label="Yes" /> : <span className="text-[#b39383]">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter: reviews, rose */}
      <section id="reviews" className="bg-[#f1c9b9] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end gap-6">
          <p className={cn(serif, "text-[clamp(96px,12vw,200px)] leading-[0.8] tracking-[-0.04em]")}>{rating.score}</p>
          <p className="pb-2 text-[17px]">
            <span className="text-[#c5221f]">★★★★★</span>
            <br />
            {rating.count} reviews
          </p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <li key={r.headline} className="rounded-[32px] bg-[#fbf6ef] p-7">
              <p className={cn(serif, "text-[28px] leading-[1.1] italic")}>“{r.headline}”</p>
              <p className="mt-4 text-[16px] leading-[1.55]">{r.body}</p>
              <p className="mt-5 text-[14px] text-[#8a5a48]">{r.reviewer}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Chapter: guarantee, red */}
      <section className="relative overflow-hidden bg-[#c5221f] px-5 py-24 text-[#fbf6ef] md:px-10 md:py-32">
        <Image src="/images/aura/red-texture.jpg" alt="" fill sizes="100vw" className="object-cover opacity-35 mix-blend-multiply" />
        <div className="relative max-w-[900px]">
          <p className={cn(serif, "text-[clamp(48px,7vw,112px)] leading-[0.95] tracking-[-0.03em]")}>{guarantee.headline}</p>
          <p className="mt-6 max-w-[46ch] text-[18px]">{guarantee.short}</p>
          <a href="#buy" className="mt-8 inline-flex h-14 items-center rounded-full bg-[#fbf6ef] px-8 text-[16px] font-semibold text-[#2b1410]">
            Start your 12 weeks
          </a>
        </div>
      </section>

      <footer className="bg-[#2b1410] px-5 pt-16 pb-10 text-[#fbf6ef] md:px-10">
        <p className={cn(serif, "text-[min(40vw,560px)] leading-[0.75] tracking-[-0.05em] text-[#eba46e]")}>aura</p>
        <p className="mt-10 max-w-[90ch] text-[13px] leading-[1.6] text-[#fbf6ef]/70">{fdaDisclaimer}</p>
        <p className="mt-2 text-[13px] text-[#fbf6ef]/70">© 2026 Aura · Third-party tested · 12-Week Results Guarantee†</p>
      </footer>
    </div>
  );
}
