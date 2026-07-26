"use client"

import Image from "next/image"
import { useState } from "react"
import { BadgeCheck, ChevronLeft, ChevronRight, Play, Star } from "lucide-react"

interface Review {
  name: string
  headline: string
  quote: string
  avatar?: string
}

const REVIEWS: Review[] = [
  {
    name: "Rachel K.",
    headline: "Chaos schedule needs easy",
    quote:
      "Juggling work kids gym everything. these fit into my day perfectly. pop 4 during the day when I want something sweet. Energy is better and I'm taking these daily as I heard that this is the main rule with creatine.",
    avatar: "/images/rachel.png",
  },
  {
    name: "Tyler K.",
    headline: "Ski season game changer",
    quote:
      "I live near Park City and I ski about 3-4 days a week and my leg endurance is noticeably better. can push through full days without my quads giving out. Recovery between ski days is way faster too. Keep them in my jacket pocket and eat with hot tea when I'm on the slope",
    avatar: "/images/tyler.png",
  },
  {
    name: "Alicia M.",
    headline: "My glutes look way better",
    quote:
      "Glute strength is up and they're more toned. Hip thrusts feel stronger. Strawberry flavor tastes like candy without being overly sweet.",
    avatar: "/images/alicia.png",
  },
  {
    name: "Sarah M.",
    headline: "Way easier than powder",
    quote:
      "I keep these in my purse and gym bag. No mixing, no mess, just grab 4 and go. Mango flavor tastes like actual fruit candy. Been taking them for 2 months and recovery is noticeably faster.",
  },
  {
    name: "Jake R.",
    headline: "My running pace is better",
    quote:
      "i run like 4-5 times a week and can hold pace way longer now without feeling destroyed. recovery between runs is faster. way easier than dealing with powder",
  },
  {
    name: "Liam T.",
    headline: "First time I've stayed consistent",
    quote:
      "I've tried powder probably 5 times over the years and always quit. These are so easy I actually take them every day. Strength is up, endurance is better and I mainly didn't notice any bloating which was a no-go for me before.",
  },
  {
    name: "Brandon C.",
    headline: "Like that they added other stuff",
    quote:
      "most gummies are just creatine. these have taurine zinc and succinic acid too. noticed the difference during longer workouts especially",
  },
  {
    name: "Olivia L.",
    headline: "Lifesaver for busy moms",
    quote:
      "i have two kids under 5 and literally no time to deal with powder.",
  },
]

const NEIGHBOR_NAMES = [
  "Jarod Roy",
  "Hannah M.",
  "Elizabeth Lee",
  "Sean Martin",
  "Nicole Wallace",
  "Shelby",
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function ReviewerAvatar({ review }: { review: Review }) {
  if (review.avatar) {
    return (
      <Image
        src={review.avatar}
        alt={review.name}
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full object-cover"
      />
    )
  }
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold text-foreground">
      {getInitials(review.name)}
    </span>
  )
}

function VerifiedRow({ name, muted }: { name: string; muted?: boolean }) {
  return (
    <div>
      <p
        className={`text-sm font-bold ${
          muted ? "text-foreground/50" : "text-foreground"
        }`}
      >
        {name}
      </p>
      <p
        className={`mt-1 flex items-center gap-1 text-xs ${
          muted ? "text-foreground/40" : "text-muted-foreground"
        }`}
      >
        <BadgeCheck className="size-3.5" aria-hidden="true" />
        Verified Buyer
      </p>
    </div>
  )
}

function BottleIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/Gummies_Jar_1-2.png"
      alt=""
      width={32}
      height={32}
      className={className ?? "size-8 object-contain"}
      aria-hidden="true"
    />
  )
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const total = REVIEWS.length
  const active = REVIEWS[currentIndex]
  const prevReviewIndex = (currentIndex - 1 + total) % total
  const nextReviewIndex = (currentIndex + 1) % total

  const leftNeighborName =
    NEIGHBOR_NAMES[(currentIndex * 2) % NEIGHBOR_NAMES.length]
  const rightNeighborName =
    NEIGHBOR_NAMES[(currentIndex * 2 + 1) % NEIGHBOR_NAMES.length]

  function goTo(index: number, dir: "next" | "prev") {
    setDirection(dir)
    setCurrentIndex(index)
  }

  function handlePrev() {
    goTo(prevReviewIndex, "prev")
  }

  function handleNext() {
    goTo(nextReviewIndex, "next")
  }

  const slideInClass =
    direction === "next" ? "slide-in-from-right-6" : "slide-in-from-left-6"

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[32px] leading-[1.1] font-bold text-foreground md:text-[42px]">
              Hear from people who use it every day.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Athletes, professionals, and everyday movers share what they
              noticed after making Arq8™ part of their routine — strength,
              clarity, recovery, and consistency.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-medium text-foreground">1-19</span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {/* Left / previous card (dimmed) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`Show review from ${leftNeighborName}`}
            key={`left-${currentIndex}`}
            className={`animate-in fade-in ${slideInClass} hidden min-h-[480px] cursor-pointer flex-col justify-between bg-muted p-5 text-left opacity-40 transition-opacity duration-500 hover:opacity-60 md:flex`}
          >
            <VerifiedRow name={leftNeighborName} muted />
            <div className="flex flex-1 items-center justify-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-foreground/30 text-foreground/50">
                <Play className="ml-0.5 size-4 fill-current" />
              </span>
            </div>
            <BottleIcon />
          </button>

          {/* Active / center card */}
          <div
            key={`center-${currentIndex}`}
            className={`animate-in fade-in ${slideInClass} flex min-h-[480px] flex-col justify-between bg-muted p-6 duration-500`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <ReviewerAvatar review={active} />
                <VerifiedRow name={active.name} />
              </div>
              <div className="flex shrink-0 gap-0.5 pt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-foreground text-foreground"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-1 py-6 text-center">
              <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                {active.headline}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {active.quote}
              </p>
            </div>

            <div className="flex items-center gap-2 border-t border-border pt-4">
              <BottleIcon className="size-8 object-contain" />
              <span className="text-xs font-bold text-foreground">
                Arq8 FullDissolve™ Nano-Creatine Gummies
              </span>
            </div>
          </div>

          {/* Right / next card (dimmed) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label={`Show review from ${rightNeighborName}`}
            key={`right-${currentIndex}`}
            className={`animate-in fade-in ${slideInClass} hidden min-h-[480px] cursor-pointer flex-col justify-between bg-muted p-5 text-left opacity-40 transition-opacity duration-500 hover:opacity-60 md:flex`}
          >
            <VerifiedRow name={rightNeighborName} muted />
            <div className="flex flex-1 items-center justify-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-foreground/30 text-foreground/50">
                <Play className="ml-0.5 size-4 fill-current" />
              </span>
            </div>
            <BottleIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
