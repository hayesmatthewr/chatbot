import Image from "next/image"

import { TryNowButton } from "./TryNowButton"

const ROWS = [
  "FullDissolve™ nano-creatine",
  "Clinically dosed (5g)",
  "Added functional ingredients",
  "Delicious, non-chalky taste",
  "No bloating",
  "Third-party tested",
  "Made in USA",
  "Vegan",
  "Sugar-free",
  "No artificial colors and flavors",
]

function StatusIcon({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <Image
        src="/images/yes-black.svg"
        alt="Yes"
        width={24}
        height={24}
        className="size-6"
      />
    )
  }
  return (
    <Image
      src="/images/no-black.svg"
      alt="No"
      width={24}
      height={24}
      className="size-6 opacity-30"
    />
  )
}

export function ComparisonsTable() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div className="max-w-lg">
          <h2 className="text-4xl leading-tight font-bold text-foreground sm:text-[45px]">
            The difference is clear.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A creatine gummy that delivers the full 5g clinical dose and works
            without the bloat. FullDissolve&#8482; Technology eliminates the
            chalky texture &mdash; so you get a smooth, delicious taste
            you&apos;ll actually enjoy taking every day.
          </p>
        </div>
        <TryNowButton className="hidden sm:inline-flex" />
        <TryNowButton className="w-full sm:hidden" />
      </div>

      <div className="mt-12 overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_180px_180px] items-end gap-4 sm:grid-cols-[1fr_220px_220px]">
            <div />
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/images/swiss-comaprisons.svg"
                alt="Swiss Technology"
                width={140}
                height={26}
                className="h-auto w-[120px]"
              />
              <div className="flex h-32 w-32 items-center justify-center">
                <Image
                  src="/images/1_2-2.png"
                  alt="Arq8 Swiss Technology gummies"
                  width={130}
                  height={180}
                  className="h-32 w-auto object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-bold tracking-wide text-foreground">
                REGULAR CREATINE
              </span>
              <div className="flex h-32 w-32 items-center justify-center">
                <Image
                  src="/images/regular-creatine.svg"
                  alt="Regular Creatine"
                  width={33}
                  height={14}
                  className="h-auto w-20 opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="relative mt-4">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-[196px] w-[180px] bg-muted sm:right-[236px] sm:w-[220px]"
            />
            <div className="relative">
              {ROWS.map((label) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_180px_180px] items-center gap-4 border-b border-dashed border-border py-4 sm:grid-cols-[1fr_220px_220px]"
                >
                  <span className="text-sm text-foreground sm:text-base">
                    {label}
                  </span>
                  <div className="flex items-center justify-center py-2">
                    <StatusIcon ok />
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <StatusIcon ok={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
