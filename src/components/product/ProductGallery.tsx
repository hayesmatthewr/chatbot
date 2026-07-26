"use client"

import Image from "next/image"
import { useState } from "react"

const THUMBNAILS = [
  { src: "/images/gummies_listing_2.3.webp", alt: "$49 in Welcome Gifts promo" },
  { src: "/images/Arq8_Sup_Facts_-_CLP_added.png", alt: "Supplement facts panel" },
  { src: "/images/gummies_listing_2.4.webp", alt: "Arq8 creatine gummies jar" },
  { src: "/images/gummies_listing_2.5.webp", alt: "Gummy texture close-up" },
  { src: "/images/gummies_listing_2.6.webp", alt: "Strawberry gummies" },
  { src: "/images/gummies_listing_2.7.webp", alt: "Arq8 lifestyle shot" },
  { src: "/images/gummies_listing_2.8.webp", alt: "Arq8 product detail" },
  { src: "/images/gummies_listing_2.9a.webp", alt: "Arq8 product detail" },
]

export function ProductGallery() {
  const [activeThumb, setActiveThumb] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Trust badges row */}
      <div className="flex flex-wrap items-stretch gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5">
          <span className="text-2xl leading-none" aria-hidden="true">
            🌿
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">
              Clinicians&rsquo; Choice
            </div>
            <div className="text-xs text-muted-foreground">
              Hundreds of clinicians shared this with their patients without
              compensation.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[#191919] px-3 py-2 text-[#f5fe5e]">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#f5fe5e]">
            <span className="text-[9px] font-bold leading-none">
              INFORMED
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-[10px] font-bold uppercase">Sport</div>
            <div className="text-[9px] uppercase text-white/80">
              Banned Substance
            </div>
            <div className="text-[9px] uppercase text-white/80">
              Tested Every Batch
            </div>
          </div>
        </div>
      </div>

      {/* Welcome gifts headline */}
      <div>
        <h2 className="text-2xl font-bold text-foreground sm:text-[28px]">
          $49 in Welcome Gifts &mdash; On Us
          <sup className="ml-0.5 text-sm font-bold">*</sup>
        </h2>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <div className="text-sm font-medium text-foreground">
              2x Longevity Guides
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground line-through">
                $34
              </span>
              <span className="rounded bg-[#f5fe5e] px-1.5 py-0.5 text-xs font-bold text-foreground">
                FREE
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              Arq8 Creatine Gummies
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground line-through">
                $59
              </span>
              <span className="rounded bg-[#f5fe5e] px-1.5 py-0.5 text-xs font-bold text-foreground">
                $45
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              Arq8 Water Bottle
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground line-through">
                $15
              </span>
              <span className="rounded bg-[#f5fe5e] px-1.5 py-0.5 text-xs font-bold text-foreground">
                FREE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main product image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src="/images/Arq8_MGGO_Main_Image_no_bg.png"
          alt="Arq8 FullDissolve Nano-Creatine Monohydrate Gummies jar with free gifts"
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
        <span className="absolute bottom-3 right-4 text-xs italic text-muted-foreground">
          *Subscribers Only
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {THUMBNAILS.map((thumb, i) => (
          <button
            key={thumb.src + i}
            type="button"
            onClick={() => setActiveThumb(i)}
            className={`relative aspect-square w-16 shrink-0 cursor-pointer overflow-hidden rounded-md border bg-muted transition-colors hover:border-foreground sm:w-20 ${
              activeThumb === i ? "border-2 border-foreground" : "border-border"
            }`}
          >
            <Image
              src={thumb.src}
              alt={thumb.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
