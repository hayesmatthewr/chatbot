import Image from "next/image"

const leaveOutItems = [
  "High Fructose Corn Syrup",
  "Gelatin",
  "Silicon Dioxide",
  "Gluten & GMO",
  "Artificial sweeteners",
  "Synthetic colors",
  "Dairy",
  "Sugar",
]

export function LeaveOutSection() {
  return (
    <section className="w-full bg-muted py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-16">
          {/* Left: heading + subtext */}
          <div>
            <h2 className="text-[28px] leading-[1.1] font-bold text-foreground md:text-[36px]">
              What we leave out.
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <p className="text-sm text-foreground/60">
                Because not all gummies are created equal
              </p>
              <a
                href="#science"
                className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-foreground uppercase underline-offset-4 hover:underline"
              >
                Science behind
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right: 2x4 grid of leave-out items */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {leaveOutItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-dashed border-foreground/20 pb-3"
              >
                <Image
                  src="/images/no-black.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0 opacity-60"
                />
                <span className="text-sm text-foreground/50 line-through decoration-foreground/40">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
