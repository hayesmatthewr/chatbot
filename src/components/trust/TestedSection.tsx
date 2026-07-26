import Image from "next/image"

const checklist = [
  "cGMP manufacturing",
  "Third-party tested",
  "Made in the USA",
  "Scientifically formulated",
]

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M6 10.2l2.4 2.4L14.4 6.8"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
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
  )
}

export function TestedSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-[32px] leading-[1.1] font-bold text-foreground md:text-[40px]">
            Built with precision.
            <br />
            Verified with care.
          </h2>

          <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
            Arq8&trade; is proudly made in the USA, produced in a
            cGMP-certified facility and independently third-party tested to
            ensure purity, consistency, and quality.
          </p>

          <ul className="flex flex-col gap-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-foreground md:text-base"
              >
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#buy"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            TRY Arq8&trade; NOW
            <ArrowIcon />
          </a>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
          <Image
            src="/images/ARQSTUDIO-19.jpg"
            alt="Arq8 gummies in daily use"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
