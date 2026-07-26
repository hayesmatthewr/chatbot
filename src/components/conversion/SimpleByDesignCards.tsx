import Image from "next/image"

const CARDS = [
  {
    src: "/images/ARQSTUDIO-32.jpg",
    alt: "Woman holding an Arq8 gummy up to her mouth",
    heading: "AT HOME. AT WORK. ON THE GO.",
    caption: "Fits anywhere your day takes you — no prep, no cleanup.",
  },
  {
    src: "/images/Fits_anywhere_your_day_takes_you_no_prep_no_cleanup..jpg",
    alt: "Athlete in starting sprint position",
    heading: "ONE SERVING. FULL FORMULA.",
    caption:
      "5g Nano-Creatine + Taurine, Succinic Acid, and Zinc in every dose.",
  },
  {
    src: "/images/ARQSTUDIO-4.jpg",
    alt: "Athlete stretching under water spray",
    heading: "BUILT FOR THE HABIT.",
    caption:
      "Creatine only works with consistency. This is the format that makes it effortless.",
  },
]

export function SimpleByDesignCards() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h2 className="text-4xl leading-tight font-bold text-foreground sm:text-[45px]">
        Simple by Design
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        4 gummies a day. No water, no mixing, no routine to build around.
        Just take them and go.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {CARDS.map((card) => (
          <div key={card.heading} className="flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold tracking-wide text-foreground">
                {card.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
