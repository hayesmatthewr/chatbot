import Image from "next/image"

export function BeforeAfterSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-16">
        <div className="flex flex-col gap-6 md:order-1">
          <h2 className="text-[32px] leading-[1.15] font-bold text-foreground md:text-[40px]">
            Creatine works.
            <br />
            When it&rsquo;s taken daily.
          </h2>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            <p>
              Creatine is one of the most studied nutrients in human
              physiology.{" "}
              <span className="font-semibold text-foreground">
                But most people quit before the benefits arrive.
              </span>
            </p>
            <p>
              The reason is always the same. Powder is messy.{" "}
              <span className="font-semibold text-foreground">
                The bloat, chalkiness and taste put people off.
              </span>{" "}
              And when the habit breaks, the results never build.
            </p>
            <p>
              <span className="font-semibold text-foreground">
                Arq8&trade; gummies solve the biggest problem creatine ever
                had
              </span>{" "}
              &mdash; friction. So nothing stands between you and the
              benefits.
            </p>
          </div>

          <a
            href="#buy"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            TRY Arq8&trade; NOW
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

        <div className="relative aspect-[959/774] w-full overflow-hidden bg-muted md:order-2">
          <Image
            src="/images/ARQSTUDIO-19.jpg"
            alt="Athlete holding a jar of Arq8 creatine gummies"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
