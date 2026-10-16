"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { slides, type Slide } from "./content";
import { Stars } from "./Stars";

export function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section aria-roledescription="carousel" aria-label="Product images" className="md:sticky md:top-20">
      <div className="relative">
        <div
          ref={track}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(index + 1);
            if (e.key === "ArrowLeft") goTo(index - 1);
          }}
          className="aura-no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain md:rounded-[32px]"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.alt}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.alt}`}
              className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden md:aspect-square"
            >
              <SlideView slide={slide} first={i === 0} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous image"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-aura-paper/90 text-aura-ink transition hover:scale-105 active:scale-95 disabled:opacity-0 md:grid"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-aura-paper/90 text-aura-ink transition hover:scale-105 active:scale-95 disabled:opacity-0 md:grid"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>

        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 md:hidden" aria-hidden>
          {slides.map((s, i) => (
            <span
              key={s.alt}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-aura-red" : "w-2 bg-white/80",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 hidden grid-cols-9 gap-2 md:grid">
        {slides.map((s, i) => (
          <button
            key={s.alt}
            type="button"
            aria-label={`Show image ${i + 1}: ${s.alt}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-full bg-aura-step transition-transform duration-200 hover:scale-105",
              i === index && "ring-2 ring-aura-red ring-offset-2 ring-offset-aura-ground",
            )}
          >
            <Thumb slide={s} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Thumb({ slide }: { slide: Slide }) {
  if (slide.kind === "dark" || slide.kind === "review" || slide.kind === "stat-chart") {
    return (
      <span className="grid size-full place-items-center bg-aura-night text-[11px] font-bold text-white">
        {slide.kind === "stat-chart" ? "+22%" : slide.kind === "review" ? "4.7★" : "Aa"}
      </span>
    );
  }
  if (slide.kind === "stat-red" || slide.kind === "guarantee") {
    return (
      <span className="grid size-full place-items-center bg-aura-red text-[11px] font-bold text-white">
        {slide.kind === "stat-red" ? "6,000×" : "12 wk"}
      </span>
    );
  }
  return <Image src={slide.thumb} alt="" fill sizes="64px" className="object-cover" />;
}

function SlideView({ slide, first }: { slide: Slide; first: boolean }) {
  switch (slide.kind) {
    case "photo":
      return (
        <Image
          src={slide.src ?? ""}
          alt={slide.alt}
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          preload={first}
          className="bg-white object-cover"
        />
      );
    case "pouch-red":
      return (
        <div className="relative size-full overflow-hidden bg-aura-red-deep">
          <Image src="/images/aura/red-texture.jpg" alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="aura-drift object-cover" />
          <div className="absolute inset-x-[14%] top-[8%] bottom-[8%] rounded-full bg-aura-red" aria-hidden />
          <Image
            src={slide.src ?? ""}
            alt={slide.alt}
            width={478}
            height={704}
            sizes="(min-width: 768px) 30vw, 60vw"
            className="absolute top-1/2 left-1/2 h-[78%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_40px_rgb(0_0_0/0.35)]"
          />
        </div>
      );
    case "dark":
      return (
        <div className="relative flex size-full flex-col justify-end overflow-hidden bg-aura-night p-7 text-white md:p-12">
          {slide.src ? (
            <Image src={slide.src} alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover opacity-35 grayscale" />
          ) : (
            <Image
              src="/images/aura/softgel-finger.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="absolute top-[6%] -right-[18%] w-[110%] max-w-none"
            />
          )}
          <div className="relative">
            <p className="text-[16px] text-white/80">{slide.kicker}</p>
            <p className="mt-2 max-w-[14ch] text-[clamp(32px,4.2vw,56px)] leading-[1.02] font-bold tracking-[-0.03em]">{slide.headline}</p>
            <p className="mt-4 max-w-[36ch] text-[17px] leading-[1.5] text-white/90">{slide.body}</p>
          </div>
        </div>
      );
    case "stat-chart":
      return (
        <div className="flex size-full flex-col justify-between bg-aura-night p-7 text-white md:p-12">
          <div>
            <p className="text-[16px] text-white/80">{slide.kicker}</p>
            <p className="mt-1 text-[clamp(72px,10vw,140px)] leading-[0.9] font-bold tracking-[-0.04em] text-aura-red">{slide.stat}</p>
            <p className="mt-3 max-w-[30ch] text-[17px] leading-[1.5]">{slide.body}</p>
          </div>
          <div>
            <figure aria-label="Change in focusing range after 4 weeks: placebo about 0%, astaxanthin +22%" className="flex h-[38%] min-h-[120px] items-end gap-3">
              <div className="flex flex-1 flex-col items-start gap-2">
                <span className="text-[15px] text-white/80 tabular-nums">±0%</span>
                <span className="block h-2 w-full rounded-t-[4px] bg-white/35" />
                <span className="text-[15px]">Placebo</span>
              </div>
              <div className="flex flex-1 flex-col items-start gap-2">
                <span className="text-[15px] font-bold tabular-nums">+22%</span>
                <span className="block h-[clamp(72px,14vw,170px)] w-full rounded-t-[4px] bg-aura-red" />
                <span className="text-[15px]">Astaxanthin</span>
              </div>
            </figure>
            <p className="mt-4 text-[13px] leading-[1.4] text-white/70">{slide.footnote}</p>
          </div>
        </div>
      );
    case "stat-red":
      return (
        <div className="relative flex size-full flex-col justify-between overflow-hidden bg-aura-red p-7 text-white md:p-12">
          <Image src="/images/aura/red-texture.jpg" alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover opacity-40 mix-blend-multiply" />
          <p className="relative text-[16px]">{slide.kicker}</p>
          <div className="relative">
            <p className="text-[clamp(80px,12vw,168px)] leading-[0.88] font-bold tracking-[-0.05em]">{slide.stat}</p>
            <p className="mt-3 max-w-[22ch] text-[22px] leading-[1.25] font-medium">{slide.body}</p>
          </div>
          <p className="relative max-w-[46ch] text-[13px] leading-[1.4] text-white/85">{slide.footnote}</p>
        </div>
      );
    case "review":
      return (
        <div className="relative flex size-full flex-col justify-end overflow-hidden bg-aura-night p-7 text-white md:p-12">
          <Image src="/images/aura/sunset-hand.jpg" alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-black/35" aria-hidden />
          <div className="relative">
            <p className="flex items-center gap-3 text-[16px]">
              <Stars className="text-white" /> {slide.kicker}
            </p>
            <blockquote className="mt-3 max-w-[20ch] text-[clamp(28px,3.4vw,44px)] leading-[1.08] font-bold tracking-[-0.02em]">
              {slide.headline}
            </blockquote>
            <p className="mt-4 text-[15px] text-white/90">{slide.attribution}</p>
          </div>
        </div>
      );
    case "guarantee":
      return (
        <div className="relative flex size-full flex-col justify-end overflow-hidden bg-aura-red p-7 text-white md:p-12">
          <div className="absolute -top-[30%] -right-[35%] aspect-[1/1.9] w-[95%] rotate-[28deg] rounded-full bg-aura-red-deep" aria-hidden />
          <p className="relative text-[clamp(84px,13vw,180px)] leading-[0.85] font-bold tracking-[-0.05em]">12</p>
          <p className="relative mt-1 max-w-[12ch] text-[clamp(30px,3.8vw,52px)] leading-[1.02] font-bold tracking-[-0.03em]">{slide.headline}</p>
          <p className="relative mt-4 max-w-[34ch] text-[17px] leading-[1.5]">{slide.body}</p>
        </div>
      );
  }
}
