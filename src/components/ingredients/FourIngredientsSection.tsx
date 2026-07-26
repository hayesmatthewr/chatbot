import Image from "next/image"

type Ingredient = {
  label: string
  description: string
  position: string
  gradient: string
}

const ingredients: Ingredient[] = [
  {
    label: "NANO-CREATINE MONOHYDRATE",
    description:
      "Foundation for strength, clarity, and rapid recovery. Creatine is stored in muscle and brain tissue, where it supports rapid ATP regeneration — the energy every cell uses to function. FullDissolve™ Nano-Creatine is refined for complete solubility and superior absorption.",
    position: "top-[-6%] left-1/2 -translate-x-1/2 -translate-y-1/2",
    gradient:
      "radial-gradient(circle at 35% 30%, #f5f0e6 0%, #cbb98a 45%, #8a7248 100%)",
  },
  {
    label: "TAURINE",
    description:
      "Supports cellular hydration, muscle function, and recovery. Taurine works alongside creatine to support cell volume and reduce oxidative stress during physical exertion.",
    position: "top-[30%] left-[-2%] -translate-x-1/2 -translate-y-1/2",
    gradient:
      "repeating-linear-gradient(135deg, #f7f7f5 0 4px, #d8d8d3 4px 6px, #1c1c1c 6px 8px)",
  },
  {
    label: "ZINC (AS ZINC PICOLINATE)",
    description:
      "Supports protein synthesis, immune function, and hormone regulation. Zinc picolinate is a highly bioavailable form your body can actually absorb and use.",
    position: "top-[70%] left-[102%] -translate-x-1/2 -translate-y-1/2",
    gradient:
      "radial-gradient(circle at 60% 40%, #f6c453 0%, #e0993a 55%, #8a4fae 100%)",
  },
  {
    label: "SUCCINIC ACID (SUCCINATE)",
    description:
      "Supports mitochondrial energy production. Succinate is a key intermediate in the Krebs cycle, the pathway your cells use to generate usable energy.",
    position: "top-[104%] left-[52%] -translate-x-1/2 -translate-y-1/2",
    gradient:
      "radial-gradient(circle at 40% 35%, #ffffff 0%, #ede7de 45%, #a9702f 100%)",
  },
]

export function FourIngredientsSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 md:divide-x md:divide-foreground/15">
          {/* Left: heading + copy */}
          <div className="flex flex-col justify-center md:pr-16">
            <h2 className="text-[32px] leading-[1.1] font-bold text-foreground md:text-[44px]">
              Four ingredients.
              <br />
              Chosen with purpose.
            </h2>
            <p className="mt-6 max-w-md text-sm text-foreground/70 md:text-base">
              A complete daily formula that{" "}
              <span className="font-semibold text-foreground">
                supports how your body produces energy, recovers from stress,
                and performs — physically and mentally
              </span>{" "}
              — without stimulants or shortcuts.
            </p>
          </div>

          {/* Right: supplement facts link + radial diagram */}
          <div className="relative flex flex-col items-center pt-4 md:pt-0 md:pl-16">
            <a
              href="#supplement-facts"
              className="absolute top-0 right-0 z-10 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wide text-primary-foreground uppercase"
            >
              Supplement facts
              <span aria-hidden="true">↗</span>
            </a>

            <div className="relative mt-16 aspect-square w-full max-w-[360px] md:mt-20 md:max-w-[400px]">
              {/* outer dashed orbit */}
              <div className="absolute inset-0 rounded-full border border-dashed border-foreground/25" />
              {/* inner solid ring */}
              <div className="absolute inset-[12%] rounded-full border border-foreground/30" />
              {/* soft backdrop circle */}
              <div className="absolute inset-[16%] rounded-full bg-muted" />
              {/* central image */}
              <div className="absolute inset-[20%] overflow-hidden rounded-full">
                <Image
                  src="/images/ingredients-new-img.webp"
                  alt="ARQ-8 gummy formula"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              {/* orbiting ingredient badges */}
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.label}
                  className={`absolute ${ingredient.position} h-11 w-11 rounded-full border-2 border-background shadow-md sm:h-12 sm:w-12`}
                  style={{ background: ingredient.gradient }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ingredient details grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-foreground/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((ingredient) => (
            <div key={ingredient.label} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
                {ingredient.label}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {ingredient.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
