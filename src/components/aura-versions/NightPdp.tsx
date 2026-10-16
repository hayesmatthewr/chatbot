"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ShoppingBag, X } from "lucide-react";
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

// Direction 2 — "Chrome Night": the object, large. A black stage, the silver pouch scaled past the
// viewport, condensed capitals, hard 4px corners. Feels like performance gear, not a pharmacy.

const display = "font-[family-name:var(--font-night-display)] uppercase";

export function NightPdp() {
  const { selected, select, add, count } = useCart();
  const [image, setImage] = useState(0);

  return (
    <div className="min-h-screen bg-[#090909] font-[family-name:var(--font-night-sans)] text-white">
      <header className="fixed inset-x-0 top-0 z-30 mix-blend-difference">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <span className={cn(display, "text-[28px] tracking-[0.02em]")}>Aura</span>
          <a href="#buy" className="flex items-center gap-2 text-[14px] font-medium">
            <ShoppingBag className="size-5" aria-hidden /> {count}
          </a>
        </div>
      </header>

      {/* Hero: the object, large */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <p
          aria-hidden
          className={cn(display, "absolute -bottom-[4vw] left-1/2 -translate-x-1/2 text-[38vw] leading-[0.8] whitespace-nowrap text-[#1a0405] select-none")}
        >
          Aura
        </p>
        <div className="absolute top-1/2 left-1/2 aspect-square w-[min(110vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e0141b] opacity-25 blur-[120px]" aria-hidden />
        <Image
          src="/images/aura/pouch-cutout.png"
          alt="Aura Cellular Protection pouch"
          width={478}
          height={704}
          preload
          sizes="(min-width: 768px) 45vw, 90vw"
          className="absolute top-[8%] left-1/2 h-[42%] w-auto max-w-none -translate-x-1/2 rotate-[-6deg] drop-shadow-[0_40px_80px_rgb(0_0_0/0.7)] md:top-[10%] md:left-[62%] md:h-[108%]"
        />
        <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-10 md:justify-center md:px-8 md:pb-0">
          <h1 className={cn(display, "max-w-[8ch] text-[clamp(64px,10vw,168px)] leading-[0.86]")}>Daily Cellular Protection</h1>
          <p className="mt-5 max-w-[34ch] text-[17px] leading-[1.5] text-[#cfcfd4]">
            One softgel of natural AstaReal® astaxanthin. 85+ human trials. Defends every cell from oxidative stress.‡
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href="#buy" className="flex h-14 items-center gap-3 rounded-[4px] bg-[#e0141b] px-7 text-[16px] font-semibold transition-colors hover:bg-[#ff2a31]">
              From $6.58/week <ArrowRight className="size-5" aria-hidden />
            </a>
            <a href="#reviews" className="text-[14px] text-[#cfcfd4]">
              ★★★★★ {rating.score} · {rating.count} reviews
            </a>
          </div>
        </div>
      </section>

      {/* Buy */}
      <section id="buy" className="grid gap-px bg-[#1e1e1e] md:grid-cols-2">
        <div className="bg-[#090909]">
          <div className="relative aspect-square bg-[#141414]">
            <Image src={productImages[image].src} alt={productImages[image].alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="grid grid-cols-5 gap-px bg-[#1e1e1e]">
            {productImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setImage(i)}
                aria-label={`Show image ${i + 1}`}
                className={cn("relative aspect-square bg-[#141414] transition-opacity", i === image ? "opacity-100" : "opacity-45 hover:opacity-80")}
              >
                <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#090909] px-4 py-12 md:px-12 md:py-16">
          <p className="text-[14px] text-[#e0141b]">12mg natural astaxanthin · 1 softgel daily</p>
          <h2 className={cn(display, "mt-3 text-[clamp(44px,4.6vw,72px)] leading-[0.9]")}>Choose your protocol</h2>

          <div className="mt-8 grid gap-3">
            {bundles.map((b) => {
              const active = selected.id === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(b.id)}
                  className={cn(
                    "relative flex items-center gap-5 rounded-[4px] p-5 text-left transition-colors",
                    active ? "bg-white text-[#090909]" : "bg-[#141414] hover:bg-[#1e1e1e]",
                  )}
                >
                  {b.tag && <span className="absolute -top-3 right-4 rounded-[2px] bg-[#e0141b] px-2 py-1 text-[11px] font-bold tracking-[0.08em] text-white uppercase">{b.tag}</span>}
                  <Image
                    src={b.id === "12-week" ? "/images/aura/kit-12-week.png" : "/images/aura/pouch-cutout.png"}
                    alt=""
                    width={b.id === "12-week" ? 1002 : 478}
                    height={b.id === "12-week" ? 788 : 704}
                    sizes="80px"
                    className="h-16 w-20 object-contain"
                  />
                  <span className="flex-1">
                    <span className={cn(display, "block text-[30px] leading-none")}>{b.name}</span>
                    <span className={cn("mt-1 block text-[14px]", active ? "text-[#55555a]" : "text-[#9a9aa0]")}>
                      {b.perWeek}/week · <span className="text-[#e0141b]">Save {b.savePct}%</span>
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[22px] font-bold">${b.price}</span>
                    <s className={cn("text-[14px]", active ? "text-[#77777c]" : "text-[#6a6a70]")}>${b.compareAt}</s>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => add(`Added ${selected.name} to cart`)}
            className="mt-5 h-16 w-full rounded-[4px] bg-[#e0141b] text-[17px] font-semibold transition-[transform,background-color] hover:bg-[#ff2a31] active:scale-[0.99]"
          >
            Subscribe & Save
          </button>
          <p className="mt-3 text-center text-[14px] text-[#cfcfd4]">{`Delivered every ${selected.weeks} weeks · Cancel or pause anytime`}</p>
          <p className="mt-1 text-center">
            <button
              type="button"
              onClick={() => {
                select("4-week");
                add(oneTimeToast);
              }}
              className="text-[14px] text-[#9a9aa0] underline underline-offset-4 hover:text-white"
            >
              Or buy once for ${oneTime.price} + ${oneTime.shipping} shipping
            </button>
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-[#1e1e1e] text-[14px]">
            {["Cellular Defense", "Skin Radiance", "Eye Comfort", "Exercise Recovery", "Heart Health", "Healthy Aging"].map((b) => (
              <span key={b} className="flex items-center gap-2 bg-[#111] px-4 py-3.5">
                <span className="size-1.5 bg-[#e0141b]" aria-hidden />
                {b}‡
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="relative overflow-hidden bg-[#e0141b]">
        <Image src="/images/aura/red-texture.jpg" alt="" fill sizes="100vw" className="object-cover opacity-50 mix-blend-multiply" />
        <div className="relative grid gap-10 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <p className={cn(display, "text-[clamp(120px,22vw,340px)] leading-[0.8] md:col-span-8")}>6,000×</p>
          <div className="self-end md:col-span-4">
            <p className="text-[24px] leading-[1.2] font-semibold">stronger than vitamin C at neutralizing singlet oxygen.◊</p>
            <p className="mt-3 text-[13px] text-white/80">◊ Lab test of one chemical reaction, not a human study. Nishida et al., 2007.</p>
          </div>
        </div>
      </section>

      {/* Results grid */}
      <section className="px-4 py-20 md:px-8 md:py-28">
        <h2 className={cn(display, "max-w-[14ch] text-[clamp(48px,6vw,96px)] leading-[0.9]")}>Protect how you look and feel</h2>
        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[4px] bg-[#1e1e1e] sm:grid-cols-2 lg:grid-cols-4">
          {deepDives.map((d) => (
            <li key={d.category} className="flex min-h-[260px] flex-col justify-between bg-[#0e0e0e] p-6 transition-colors hover:bg-[#151515]">
              <p className="text-[13px] tracking-[0.08em] text-[#9a9aa0] uppercase">{d.category}</p>
              <div>
                <p className={cn(display, "text-[64px] leading-none", d.tentative ? "text-[#55555a]" : "text-white")}>{d.valueLabel}</p>
                <p className="mt-3 text-[15px] leading-[1.45] text-[#cfcfd4]">{d.hook}‡</p>
                {d.tentative && <p className="mt-2 text-[13px] text-[#9a9aa0]">Trend only. Early, not proven.</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison */}
      <section className="bg-[#111] px-4 py-20 md:px-8 md:py-28">
        <h2 className={cn(display, "text-[clamp(48px,6vw,96px)] leading-[0.9]")}>Not all antioxidants are equal</h2>
        <div className="mt-12 overflow-hidden rounded-[4px]">
          <table className="w-full text-[14px] md:text-[16px]">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="p-4 text-left font-normal text-[#9a9aa0]">Feature</th>
                {antioxidantColumns.map((c, i) => (
                  <th key={c} className={cn("px-1 py-4 text-center text-[12px] font-bold tracking-[0.06em] uppercase md:text-[14px]", i === 0 && "bg-[#e0141b]")}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {antioxidantRows.map((r, ri) => (
                <tr key={r.feature} className={ri % 2 ? "bg-[#141414]" : "bg-[#0e0e0e]"}>
                  <th scope="row" className="p-4 text-left font-medium">
                    {r.feature}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className={cn("text-center", i === 0 && "bg-[#e0141b]/90")}>
                      {v ? <Check className="mx-auto size-5" aria-label="Yes" /> : <X className="mx-auto size-4 text-[#55555a]" aria-label="No" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Timeline */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[420px] bg-black">
          <Image src="/images/aura/softgel-finger.jpg" alt="A red Aura softgel on a fingertip" fill sizes="50vw" className="object-cover" />
        </div>
        <div className="px-4 py-16 md:px-12 md:py-24">
          <h2 className={cn(display, "text-[clamp(48px,6vw,96px)] leading-[0.9]")}>The 12-week protocol</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[4px] bg-[#1e1e1e]">
            {timeline.map((t) => (
              <li key={t.label} className="grid grid-cols-[88px_1fr] gap-4 bg-[#0e0e0e] p-5">
                <span className={cn(display, "text-[34px] leading-none text-[#e0141b]")}>{t.label}</span>
                <span>
                  <span className="block text-[17px] font-semibold">{t.headline}</span>
                  <span className="mt-1 block text-[15px] leading-[1.5] text-[#cfcfd4]">{t.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className={cn(display, "text-[clamp(48px,6vw,96px)] leading-[0.9]")}>{rating.score} / 5 from {rating.count} reviews</h2>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-[#1e1e1e] md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <li key={r.headline} className="bg-[#0e0e0e] p-7">
              <p className="text-[#e0141b]">★★★★★</p>
              <p className={cn(display, "mt-4 text-[34px] leading-[0.95]")}>{r.headline}</p>
              <p className="mt-4 text-[15px] leading-[1.55] text-[#cfcfd4]">{r.body}</p>
              <p className="mt-5 text-[13px] text-[#9a9aa0]">{r.reviewer} · Verified buyer</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Guarantee */}
      <section className="relative overflow-hidden">
        <Image src="/images/aura/sunset-hand.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60" />
        <div className="relative px-4 py-28 md:px-8 md:py-40">
          <p className="text-[14px] font-bold tracking-[0.1em] text-[#e0141b] uppercase">Real Results Guarantee</p>
          <p className={cn(display, "mt-4 max-w-[12ch] text-[clamp(56px,8vw,128px)] leading-[0.88]")}>{guarantee.headline}</p>
          <p className="mt-6 max-w-[44ch] text-[17px] text-[#e6e6ea]">{guarantee.short}</p>
        </div>
      </section>

      <footer className="px-4 pt-16 pb-10 md:px-8">
        <p className={cn(display, "text-[min(44vw,620px)] leading-[0.78] text-[#e0141b]")}>Aura</p>
        <p className="mt-10 max-w-[90ch] text-[13px] leading-[1.6] text-[#9a9aa0]">{fdaDisclaimer}</p>
        <p className="mt-2 text-[13px] text-[#9a9aa0]">© 2026 Aura · Third-party tested · 12-Week Results Guarantee†</p>
      </footer>
    </div>
  );
}
