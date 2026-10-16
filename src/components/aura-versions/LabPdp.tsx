"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/aura/CartContext";
import {
  antioxidantColumns,
  antioxidantRows,
  bundles,
  dailyBenefits,
  deepDives,
  faqs,
  fdaDisclaimer,
  guarantee,
  oneTime,
  rating,
  reviews,
  timeline,
} from "@/components/aura/content";
import { headlineStats, oneTimeToast, productImages } from "./shared";

// Direction 1 — "Lab Journal": a split stage. Clinical white paper, a large serif, hairline rules,
// square corners, footnoted numbers. Red is kept for data and the one action.

const serif = "font-[family-name:var(--font-lab-serif)]";

export function LabPdp() {
  const { selected, select, add, count } = useCart();
  const [image, setImage] = useState(0);
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#fafaf7] font-[family-name:var(--font-lab-sans)] text-[#111]">
      <header className="sticky top-0 z-30 border-b border-[#dadad5] bg-[#fafaf7]">
        <div className="flex h-14 items-center justify-between px-4 md:px-8">
          <span className="text-[22px] font-bold tracking-[-0.03em] text-[#c8102e]">AURA</span>
          <nav className="hidden gap-8 text-[14px] md:flex">
            <a href="#evidence" className="hover:text-[#c8102e]">Evidence</a>
            <a href="#results" className="hover:text-[#c8102e]">Results</a>
            <a href="#reviews" className="hover:text-[#c8102e]">Reviews</a>
            <a href="#faq" className="hover:text-[#c8102e]">FAQ</a>
          </nav>
          <a href="#buy" className="flex items-center gap-2 text-[14px]">
            <ShoppingBag className="size-5" aria-hidden /> Cart ({count})
          </a>
        </div>
      </header>

      {/* Split stage */}
      <section className="grid md:grid-cols-2">
        <div className="relative md:sticky md:top-14 md:h-[calc(100svh-56px)]">
          <div className="relative aspect-square bg-white md:aspect-auto md:h-full">
            <Image
              key={productImages[image].src}
              src={productImages[image].src}
              alt={productImages[image].alt}
              fill
              preload
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-6 duration-500 animate-in fade-in md:p-16"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex border-t border-[#dadad5] bg-[#fafaf7]">
            {productImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setImage(i)}
                aria-label={`Show image ${i + 1}`}
                className={cn(
                  "relative h-16 flex-1 border-r border-[#dadad5] last:border-r-0 md:h-20",
                  i === image && "outline-2 -outline-offset-2 outline-[#c8102e]",
                )}
              >
                <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div id="buy" className="border-[#dadad5] px-4 py-10 md:border-l md:px-14 md:py-16">
          <p className="text-[13px] tracking-[0.08em] text-[#6b6b66] uppercase">Formula 01 · Natural astaxanthin 12mg</p>
          <h1 className={cn(serif, "mt-4 text-[clamp(48px,5.6vw,88px)] leading-[0.95] tracking-[-0.02em]")}>
            Daily Cellular Protection
          </h1>
          <a href="#reviews" className="mt-5 flex items-center gap-3 text-[14px]">
            <span className="text-[#c8102e]">★★★★★</span>
            <span>
              {rating.score}/5.0 · {rating.count} reviews
            </span>
          </a>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.6] text-[#33332f]">
            One softgel of natural AstaReal® astaxanthin, studied in 85+ human trials, to help defend your cells from oxidative stress, naturally.‡
          </p>

          <dl className="mt-8 grid grid-cols-2 border-t border-[#dadad5] text-[14px]">
            {["Cellular Defense", "Skin Radiance", "Eye Comfort", "Exercise Recovery", "Heart Health", "Healthy Aging"].map((b, i) => (
              <div key={b} className={cn("flex items-center gap-2 border-b border-[#dadad5] py-3", i % 2 === 0 && "border-r pr-3", i % 2 === 1 && "pl-4")}>
                <Check className="size-4 text-[#c8102e]" aria-hidden />
                {b}‡
              </div>
            ))}
          </dl>

          <fieldset className="mt-10">
            <legend className="text-[13px] tracking-[0.08em] text-[#6b6b66] uppercase">Choose your supply</legend>
            <div className="mt-3 border-t border-[#111]">
              {bundles.map((b) => {
                const active = selected.id === b.id;
                return (
                  <label key={b.id} className={cn("flex cursor-pointer items-start gap-4 border-b border-[#dadad5] py-5", active && "bg-white")}>
                    <input type="radio" name="lab-bundle" checked={active} onChange={() => select(b.id)} className="mt-1.5 size-4 accent-[#c8102e]" />
                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className={cn(serif, "text-[28px] leading-none")}>{b.name}</span>
                        <span className="text-[18px] font-semibold">
                          <s className="mr-2 text-[14px] font-normal text-[#8a8a84]">${b.compareAt}</s>${b.price}
                        </span>
                      </span>
                      <span className="mt-2 flex justify-between text-[14px] text-[#55554f]">
                        <span>
                          {b.tag ? `${b.tag} · ` : ""}
                          <span className="text-[#c8102e]">Save ${b.save} ({b.savePct}%)</span>
                        </span>
                        <span>{b.perWeek}/week</span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => add(`Added ${selected.name} to cart`)}
            className="mt-6 h-14 w-full bg-[#c8102e] text-[16px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-[#a50d26]"
          >
            Subscribe & Save — ${selected.price}
          </button>
          <p className="mt-3 text-[14px] text-[#55554f]">{`Delivered every ${selected.weeks} weeks · Cancel or pause anytime`}</p>
          <button
            type="button"
            onClick={() => {
              select("4-week");
              add(oneTimeToast);
            }}
            className="mt-1 text-[14px] underline underline-offset-4"
          >
            Or buy once for ${oneTime.price} + ${oneTime.shipping} shipping
          </button>

          <div className="mt-10 border-t border-[#111] pt-6">
            <p className={cn(serif, "text-[28px] leading-[1.1]")}>{guarantee.headline}</p>
            <p className="mt-2 text-[14px] text-[#55554f]">Research recommends 12 weeks of daily use. {guarantee.short}</p>
          </div>

          <ul className="mt-10 border-t border-[#dadad5]">
            {dailyBenefits.map((d) => (
              <li key={d.title} className="grid grid-cols-[96px_1fr] border-b border-[#dadad5] py-4 text-[15px]">
                <span className="font-semibold">{d.title}</span>
                <span className="text-[#33332f]">{d.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Evidence */}
      <section id="evidence" className="border-t border-[#111] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-6 md:grid-cols-12">
          <h2 className={cn(serif, "text-[clamp(40px,5vw,76px)] leading-[0.95] md:col-span-5")}>The evidence, in three numbers</h2>
          <p className="max-w-[44ch] text-[17px] leading-[1.6] md:col-span-4 md:col-start-9">
            Sun, screens, hard training and time all add up, cell by cell. Astaxanthin spans the whole cell membrane, guarding both sides at once.‡
          </p>
        </div>
        <ol className="mt-16 grid border-t border-[#dadad5] md:grid-cols-3">
          {headlineStats.map((s, i) => (
            <li key={s.value} className={cn("border-b border-[#dadad5] py-8 md:border-b-0 md:px-8 md:first:pl-0", i > 0 && "md:border-l")}>
              <p className={cn(serif, "text-[clamp(72px,8vw,128px)] leading-none text-[#c8102e]")}>{s.value}</p>
              <p className="mt-4 max-w-[28ch] text-[17px] leading-[1.5]">{s.label}</p>
              <p className="mt-3 text-[13px] text-[#6b6b66]">
                [{i + 1}] {s.source}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Mechanism with image */}
      <section className="grid border-t border-[#dadad5] md:grid-cols-2">
        <div className="relative aspect-[4/3] bg-white md:aspect-auto">
          <Image src="/images/aura/petri-dish.jpg" alt="A hand holding a dish of red astaxanthin extract" fill sizes="50vw" className="object-cover" />
        </div>
        <div className="px-4 py-16 md:px-14 md:py-24">
          <p className="text-[13px] tracking-[0.08em] text-[#6b6b66] uppercase">How it works</p>
          <h2 className={cn(serif, "mt-4 text-[clamp(36px,4vw,60px)] leading-[1]")}>Spans the whole cell membrane</h2>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-[#33332f]">
            Astaxanthin is a red carotenoid made by microalgae. Its long chain sits inside the cell membrane while its two ends reach the water-facing surfaces on
            either side, so it can neutralize free radicals inside the membrane and at both surfaces. Vitamin C works in the watery areas, vitamin E inside the
            membrane. Astaxanthin covers both.‡
          </p>
        </div>
      </section>

      {/* Results index */}
      <section id="results" className="border-t border-[#111] px-4 py-20 md:px-8 md:py-28">
        <h2 className={cn(serif, "max-w-[16ch] text-[clamp(40px,5vw,76px)] leading-[0.95]")}>Protect how you look and feel</h2>
        <table className="mt-12 w-full text-left text-[15px]">
          <thead>
            <tr className="border-b border-[#111] text-[13px] tracking-[0.08em] text-[#6b6b66] uppercase">
              <th className="py-3 font-normal">Area</th>
              <th className="py-3 font-normal">Finding</th>
              <th className="hidden py-3 font-normal md:table-cell">Detail</th>
              <th className="py-3 text-right font-normal">Result</th>
            </tr>
          </thead>
          <tbody>
            {deepDives.map((d) => (
              <tr key={d.category} className="border-b border-[#dadad5] align-top">
                <td className="py-5 pr-4 text-[#6b6b66]">{d.category}</td>
                <td className={cn(serif, "py-5 pr-4 text-[22px] leading-[1.15] md:text-[26px]")}>{d.hook}</td>
                <td className="hidden max-w-[44ch] py-5 pr-6 leading-[1.55] text-[#33332f] md:table-cell">{d.body}</td>
                <td className={cn("py-5 text-right text-[20px] font-semibold whitespace-nowrap", d.tentative ? "text-[#8a8a84]" : "text-[#c8102e]")}>
                  {d.valueLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-[13px] text-[#6b6b66]">Brain health: trend only, not statistically significant overall. Small studies; Aura contains 12mg.</p>
      </section>

      {/* Comparison */}
      <section className="border-t border-[#dadad5] bg-white px-4 py-20 md:px-8 md:py-28">
        <h2 className={cn(serif, "text-[clamp(40px,5vw,76px)] leading-[0.95]")}>Not all antioxidants are equal</h2>
        <table className="mt-12 w-full text-[15px]">
          <thead>
            <tr className="border-b border-[#111]">
              <th className="py-3 text-left font-normal text-[#6b6b66]" />
              {antioxidantColumns.map((c, i) => (
                <th key={c} className={cn("px-1 py-3 text-center text-[13px] font-semibold md:text-[15px]", i === 0 && "text-[#c8102e]")}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {antioxidantRows.map((r) => (
              <tr key={r.feature} className="border-b border-[#dadad5]">
                <th scope="row" className="py-4 pr-2 text-left font-normal">
                  {r.feature}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className={cn("text-center", i === 0 && "bg-[#fdf1f2]")}>
                    {v ? <Check className="mx-auto size-5 text-[#c8102e]" aria-label="Yes" /> : <Minus className="mx-auto size-4 text-[#b5b5ae]" aria-label="No" />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 max-w-[70ch] text-[13px] text-[#6b6b66]">
          Based on published mechanisms and antioxidant behavior. Other antioxidants still have value.
        </p>
      </section>

      {/* Timeline */}
      <section className="border-t border-[#111] px-4 py-20 md:px-8 md:py-28">
        <h2 className={cn(serif, "text-[clamp(40px,5vw,76px)] leading-[0.95]")}>What to expect</h2>
        <ol className="mt-12 grid border-t border-[#dadad5] md:grid-cols-4">
          {timeline.map((t, i) => (
            <li key={t.label} className={cn("border-b border-[#dadad5] py-8 md:border-b-0 md:px-6 md:first:pl-0", i > 0 && "md:border-l")}>
              <p className={cn(serif, "text-[64px] leading-none")}>{t.label.replace("Day ", "D").replace("Week ", "W")}</p>
              <p className="mt-4 text-[18px] font-semibold">{t.headline}</p>
              <p className="mt-2 text-[15px] leading-[1.55] text-[#33332f]">{t.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[13px] text-[#6b6b66]">Timelines from published human studies of astaxanthin. Individual results vary.</p>
      </section>

      {/* Reviews */}
      <section id="reviews" className="border-t border-[#dadad5] bg-white px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className={cn(serif, "text-[clamp(96px,10vw,160px)] leading-none")}>{rating.score}</p>
            <p className="mt-2 text-[15px]">
              <span className="text-[#c8102e]">★★★★★</span> · {rating.count} verified reviews
            </p>
          </div>
          <ul className="md:col-span-8">
            {reviews.slice(0, 4).map((r) => (
              <li key={r.headline} className="border-t border-[#dadad5] py-8 first:border-[#111]">
                <p className={cn(serif, "text-[30px] leading-[1.1]")}>“{r.headline}”</p>
                <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.6] text-[#33332f]">{r.body}</p>
                <p className="mt-3 text-[13px] text-[#6b6b66]">
                  {r.reviewer} · Verified buyer
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[#111] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className={cn(serif, "text-[clamp(40px,5vw,76px)] leading-[0.95] md:col-span-4")}>Questions, answered</h2>
          <ul className="md:col-span-8">
            {Object.values(faqs)
              .flat()
              .map((f) => {
                const open = faqOpen === f.q;
                return (
                  <li key={f.q} className="border-b border-[#dadad5] first:border-t first:border-t-[#111]">
                    <button type="button" aria-expanded={open} onClick={() => setFaqOpen(open ? null : f.q)} className="flex w-full items-center justify-between py-5 text-left text-[18px]">
                      {f.q}
                      {open ? <Minus className="size-5" aria-hidden /> : <Plus className="size-5" aria-hidden />}
                    </button>
                    {open && <p className="max-w-[64ch] pb-6 text-[16px] leading-[1.6] text-[#33332f]">{f.a}</p>}
                  </li>
                );
              })}
          </ul>
        </div>
      </section>

      <footer className="border-t border-[#111] px-4 pt-16 pb-10 md:px-8">
        <p className="text-[min(30vw,420px)] leading-[0.8] font-bold tracking-[-0.06em] text-[#c8102e]">AURA</p>
        <p className="mt-10 max-w-[90ch] text-[13px] leading-[1.6] text-[#6b6b66]">{fdaDisclaimer}</p>
        <p className="mt-2 text-[13px] text-[#6b6b66]">© 2026 Aura · Third-party tested · 12-Week Results Guarantee†</p>
      </footer>
    </div>
  );
}
