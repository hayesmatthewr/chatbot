import Image from "next/image"

export function ModernRedesignSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span
              className="inline-block size-4 rounded-full bg-orange-500"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold tracking-[0.1em] text-foreground/70 uppercase">
              Mango &amp; Strawberry Gummies
            </span>
          </div>

          <h2 className="text-[32px] leading-[1.15] font-bold text-foreground md:text-[40px]">
            Creatine gummies that
            <br />
            actually taste good.
          </h2>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            <p>Most creatine gummies mask a chalky aftertaste with sugar coating.</p>
            <p>
              Arq8&trade; tastes clean because the creatine fully dissolves.
              Nothing to hide. Nothing to mask. Just a smooth, delicious
              gummy you&rsquo;ll actually look forward to.
            </p>
          </div>

          <a
            href="#buy"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            TRY ARQ8&trade; NOW
            <svg
              width="14"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 12L12.5 1.5M12.5 1.5H4M12.5 1.5V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-muted">
          <Image
            src="/images/mango-v2.png"
            alt="Fresh mango, one of Arq8's gummy flavors"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
