"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Menu, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { Sheet } from "./Sheet";

export function AuraHeader() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<"main" | "science">("main");

  return (
    <header className="sticky top-0 z-40 bg-aura-ground">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
        <a href="#top" className="text-[26px] leading-none font-bold tracking-[-0.03em] text-aura-red">
          AURA
        </a>
        <div className="flex items-center gap-1">
          <a
            href="#buy"
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-aura-step"
          >
            <ShoppingBag className="size-[22px]" aria-hidden />
            <span className="absolute top-1 right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-aura-red px-1 text-[12px] leading-none font-bold text-white tabular-nums">
              {count}
            </span>
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => {
              setView("main");
              setMenuOpen(true);
            }}
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-aura-step"
          >
            <Menu className="size-[22px]" aria-hidden />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} title={view === "main" ? "Menu" : "Science"} side="right">
        {view === "main" ? (
          <nav aria-label="Main" className="flex flex-col gap-8">
            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-[15px] text-aura-muted">Shop Products</p>
                <a href="#buy" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium hover:text-aura-red">
                  Shop All →
                </a>
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                <MenuRow title="Daily Cellular Protection" body="12mg natural astaxanthin. 1 softgel a day." onPick={() => setMenuOpen(false)} />
                <MenuRow title="12-Week Starter Kit" tag="Best Value" body="The full protocol research recommends." onPick={() => setMenuOpen(false)} />
                <MenuRow title="Bundles & Gifts" body="Sets, gifting, and more. (Placeholder)" onPick={() => setMenuOpen(false)} />
              </ul>
            </div>

            <a
              href="#buy"
              onClick={() => setMenuOpen(false)}
              className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[28px] bg-aura-red p-6 text-white"
            >
              <Image
                src="/images/aura/red-texture.jpg"
                alt=""
                fill
                sizes="400px"
                className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <span className="relative text-[15px]">aura</span>
              <span className="relative text-[30px] leading-tight font-bold tracking-[-0.02em]">Built for the sun.</span>
              <span className="relative text-[16px]">12mg natural astaxanthin.</span>
              <span className="relative mt-4 w-fit rounded-full bg-white px-5 py-2.5 text-[15px] font-bold text-aura-ink">Shop now</span>
            </a>

            <ul className="flex flex-col text-[20px] font-medium">
              <li>
                <a href="#reviews" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-aura-red">
                  Our Story
                </a>
              </li>
              <li>
                <button type="button" onClick={() => setView("science")} className="flex w-full items-center justify-between py-2 hover:text-aura-red">
                  Science <ArrowRight className="size-5" aria-hidden />
                </button>
              </li>
              <li>
                <a href="#reviews" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-aura-red">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#top" onClick={() => setMenuOpen(false)} className="block py-2 text-[17px] text-aura-muted hover:text-aura-red">
                  Log In
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          <nav aria-label="Science" className="flex flex-col gap-6">
            <button type="button" onClick={() => setView("main")} className="flex w-fit items-center gap-2 text-[15px] font-medium hover:text-aura-red">
              <ArrowLeft className="size-4" aria-hidden /> Back
            </button>
            {[
              { t: "AstaReal® Astaxanthin", b: "Natural astaxanthin, grown from microalgae.", href: "#compare" },
              { t: "The Research", b: "85+ human clinical studies behind the ingredient.", href: "#benefits" },
              { t: "The Results", b: "Real results, guaranteed.†", href: "#timeline" },
            ].map((item) => (
              <a key={item.t} href={item.href} onClick={() => setMenuOpen(false)} className="group rounded-[24px] bg-aura-ground p-5">
                <span className="block text-[20px] font-bold">{item.t}</span>
                <span className="block text-[16px]">{item.b}</span>
                <span className="mt-2 block text-[15px] font-medium text-aura-red group-hover:underline">Learn more</span>
              </a>
            ))}
          </nav>
        )}
      </Sheet>
    </header>
  );
}

function MenuRow({ title, body, tag, onPick }: { title: string; body: string; tag?: string; onPick: () => void }) {
  return (
    <li>
      <a href="#buy" onClick={onPick} className="flex items-center gap-4 rounded-[24px] bg-aura-ground p-3 transition-colors hover:bg-aura-step">
        <Image src="/images/aura/pouch-cutout.png" alt="" width={56} height={82} className="h-16 w-auto" />
        <span>
          <span className="flex flex-wrap items-center gap-2 text-[17px] font-bold">
            {title}
            {tag && <span className="rounded-full bg-aura-red px-2.5 py-0.5 text-[13px] font-medium text-white">{tag}</span>}
          </span>
          <span className="block text-[15px] text-aura-muted">{body}</span>
        </span>
      </a>
    </li>
  );
}
