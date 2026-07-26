import Image from "next/image"

const GUMMIES_POINTS = ["Instantly ready", "Delicious", "Zero bloat"]
const POWDER_POINTS = ["Inconvenient", "Chalky taste", "Bloating"]

export function TastesGoodSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-[32px] leading-[1.15] font-bold text-foreground md:text-[40px]">
            Modern creatine system.
            <br />
            Built for daily life.
          </h2>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            <p>
              Arq8&trade; gummies use FullDissolve&trade; Nano-Creatine
              Monohydrate &mdash; refined through a patent-pending particle
              reduction process developed in Switzerland for complete
              solubility and better cellular absorption.
            </p>
            <p>
              No chalkiness, no sugar coating, no gritty texture. Just a
              smooth, delicious gummy with a full 5g clinical dose and 3
              supporting ingredients. So nothing is standing between you and
              taking it every single day.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-sm bg-muted md:w-40">
              <Image
                src="/images/modern-new-img.png"
                alt="Arq8 creatine gummies jar"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-[0.1em] text-foreground/60 uppercase">
                Gummies:
              </p>
              <ul className="flex flex-col gap-1.5">
                {GUMMIES_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="text-foreground">&#10003;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-sm bg-muted md:w-40">
              <Image
                src="/images/modern-new-img-2.png"
                alt="Messy creatine powder bottle"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-[0.1em] text-foreground/60 uppercase">
                Messy Powder:
              </p>
              <ul className="flex flex-col gap-1.5">
                {POWDER_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-foreground/60"
                  >
                    <span className="text-foreground/60">&#10005;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
