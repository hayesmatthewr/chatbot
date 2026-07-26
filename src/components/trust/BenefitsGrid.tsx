import Image from "next/image"

interface BenefitCard {
  image: string
  title: string
  description: string
}

const benefits: BenefitCard[] = [
  {
    image: "/images/pdp-benefits-1.jpg",
    title: "Gym & Strength Training",
    description:
      "Supports stronger output, faster recovery, and lean muscle development — taken daily, not just on training days.",
  },
  {
    image: "/images/pdp-benefits-2.jpg",
    title: "Endurance & Team Sports",
    description:
      "Supports repeat-effort capacity, sustained energy under physical demand, faster recovery between sessions, and mental sharpness when it matters most.",
  },
  {
    image: "/images/pdp-benefits-3.jpg",
    title: "Busy Professionals",
    description:
      "Steady mental clarity, sharper focus, and physical energy across long days — with greater resilience under stress and measurably less cognitive drop from poor sleep.",
  },
  {
    image: "/images/pdp-benefits-4.jpg",
    title: "Healthy aging",
    description:
      "Helps preserve muscle mass, brain health, strength, and cellular energy as the body changes with age.",
  },
  {
    image: "/images/pdp-benefits-5.jpg",
    title: "Women's Health",
    description:
      "Supports energy, mood stability, and hormonal resilience — especially during PMS, perimenopause, and menopause.",
  },
  {
    image: "/images/pdp-benefits-6.jpg",
    title: "Former creatine users",
    description:
      "Built for those who stopped due to bloating, chalkiness, or inconvenience — making daily consistency finally possible.",
  },
]

export function BenefitsGrid() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <h2 className="max-w-2xl text-[32px] leading-[1.1] font-bold text-foreground md:text-[40px]">
          Different lives. One foundation.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
          Built for different bodies, routines, and life stages, Arq8&trade;
          delivers steady, digestible support for strength, mental clarity,
          and recovery — without bloating, loading, or disruption.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:mt-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col gap-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-muted">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground md:text-base">
                  {benefit.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/70 md:text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
