import Image from "next/image"

export function ScientistSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
          <Image
            src="/images/scientists-img.jpg"
            alt="Dr. Filippo Ongaro, MD"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[32px] leading-[1.1] font-bold text-foreground md:text-[40px]">
            Backed by longevity scientists.
          </h2>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            <p>
              &ldquo;Creatine is one of the most extensively studied compounds
              in human physiology, but its real-world efficacy depends on
              consistent intake. Poor solubility and gastrointestinal
              intolerance frequently limit adherence.
            </p>
            <p>
              When taken consistently, creatine&rsquo;s benefits extend far
              beyond performance. It supports muscle preservation,
              neuromuscular function, recovery, bone health, and metabolic
              resilience—benefits that become increasingly relevant with
              aging, caloric restriction, and periods of physical or
              cognitive stress.&rdquo;
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground md:text-base">
              Dr. Filippo Ongaro, MD
            </p>
            <p className="mt-1 text-sm text-foreground/50">
              Clinical Researcher &middot; Anti-Aging &amp; Functional
              Medicine &middot; Longevity Science
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
