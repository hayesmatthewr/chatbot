"use client"

import Image from "next/image"
import { useState } from "react"
import { FlavorPicker, type Flavor } from "./FlavorPicker"
import { PackPicker, type PackSize } from "./PackPicker"
import { FreeGiftsBox } from "./FreeGiftsBox"
import { ProductAccordion } from "./ProductAccordion"

type PurchaseType = "subscribe" | "onetime"

export function ProductPurchaseBox() {
  const [flavor, setFlavor] = useState<Flavor>("strawberry")
  const [pack, setPack] = useState<PackSize>("1")
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscribe")

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <p className="text-xs text-muted-foreground">
        SHOP <span className="mx-1">/</span> FullDissolve&trade;
        Nano-Creatine Monohydrate Gummies
      </p>

      {/* Rating row */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src="/images/black-star.svg"
              alt=""
              width={16}
              height={16}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">4.9</span>
        <span className="text-sm text-muted-foreground">|</span>
        <a
          href="#reviews"
          className="text-sm font-medium text-foreground underline underline-offset-2"
        >
          REVIEWS
        </a>
      </div>

      {/* Title */}
      <h1 className="font-heading text-[32px] font-medium leading-tight text-foreground sm:text-[36px]">
        FullDissolve&trade; Nano-Creatine Monohydrate Gummies
      </h1>

      {/* Body copy */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        Most creatine gummies use old-generation creatine that causes
        bloating and hide chalky aftertaste behind a sugar coating. Arq8 uses
        FullDissolve&trade; Nano-Creatine Monohydrate &mdash;for 10x better
        absorption and a naturally smooth taste.
      </p>

      {/* Bullets */}
      <ul className="flex flex-col gap-2">
        <li className="flex gap-2 text-sm text-foreground">
          <span aria-hidden="true">&bull;</span>
          <span>5g clinical dose + 3 supporting ingredients</span>
        </li>
        <li className="flex gap-2 text-sm text-foreground">
          <span aria-hidden="true">&bull;</span>
          <span>No chalk, no bloating, no sugar</span>
        </li>
        <li className="flex gap-2 text-sm text-foreground">
          <span aria-hidden="true">&bull;</span>
          <span>Patent-pending nano refinement Swiss tech</span>
        </li>
      </ul>

      {/* Flavor */}
      <FlavorPicker value={flavor} onChange={setFlavor} />

      {/* Pack size */}
      <PackPicker value={pack} onChange={setPack} />

      {/* Gray subscription box */}
      <div className="flex flex-col gap-4 rounded-xl bg-muted p-5">
        <button
          type="button"
          onClick={() => setPurchaseType("subscribe")}
          className="flex cursor-pointer items-center gap-2 text-left"
        >
          <span
            className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
              purchaseType === "subscribe"
                ? "border-foreground"
                : "border-muted-foreground"
            }`}
          >
            {purchaseType === "subscribe" && (
              <span className="size-2 rounded-full bg-foreground" />
            )}
          </span>
          <span className="text-sm font-semibold text-foreground">
            Subscribe &amp; Save
          </span>
          <span className="rounded bg-[#f5fe5e] px-1.5 py-0.5 text-xs font-bold text-foreground">
            SAVE 15%
          </span>
        </button>

        <p className="-mt-2 pl-6 text-xs text-muted-foreground">
          Delivery every 1 month
        </p>

        <FreeGiftsBox />
      </div>

      {/* One-time purchase */}
      <button
        type="button"
        onClick={() => setPurchaseType("onetime")}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-left"
      >
        <span
          className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
            purchaseType === "onetime"
              ? "border-foreground"
              : "border-muted-foreground"
          }`}
        >
          {purchaseType === "onetime" && (
            <span className="size-2 rounded-full bg-foreground" />
          )}
        </span>
        <span className="text-sm font-medium text-foreground">
          One-time purchase
        </span>
      </button>

      {/* Add to cart */}
      <button
        type="button"
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
      >
        Add to Cart
        <span aria-hidden="true">&rarr;</span>
      </button>

      {/* Guarantee row */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <Image
          src="/images/guarantee-icon.svg"
          alt=""
          width={14}
          height={14}
        />
        <a href="#guarantee" className="underline underline-offset-2">
          30-day money-back guarantee.
        </a>
        <span aria-hidden="true">&middot;</span>
        <span aria-hidden="true">🇺🇸</span>
        <span>Made in USA</span>
      </div>

      {/* Tested by Swift Lab */}
      <div className="flex items-center gap-3 rounded-xl border border-blue-300 bg-blue-50/50 p-4">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-3.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L4.296 9.5a.75.75 0 111.06-1.06l3.542 3.541 6.72-6.72a.75.75 0 011.086.03z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <div className="text-sm">
          <span className="font-semibold text-foreground">
            Tested by Swift Lab in{" "}
          </span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
            FEB 2026
          </span>
          <div className="text-muted-foreground">
            1 substance tested for quality &rarr;
          </div>
        </div>
      </div>

      {/* Accordion */}
      <ProductAccordion />

      {/* Review card */}
      <div className="flex flex-col gap-2 rounded-xl bg-muted p-5">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">Whitney F.</span>
          <span aria-hidden="true">|</span>
          <span className="text-foreground" aria-hidden="true">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </span>
        </div>
        <p className="text-sm italic text-foreground">
          &ldquo;Tried other creatine gummies before and they all tasted
          chalky. These actually don&rsquo;t. Big difference.&rdquo;
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <span aria-hidden="true">&#10003;</span> Verified Customer
        </p>
      </div>
    </div>
  )
}
