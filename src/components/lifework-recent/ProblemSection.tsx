import { Placeholder } from "./Placeholder";

const STRESSORS = ["UV Exposure", "Blue Light", "Pollution", "Aging", "Intense Exercise"];

export function ProblemSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
            Our bodies weren&apos;t built for modern oxidative stress.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-[22px] text-secondary">
            Sun, screens, pollution, stress, hard training, and aging all
            create oxidative stress. Over time, that stress can wear on the
            cells behind how you look, feel, perform, and age.*
          </p>
          <a
            href="#mechanism"
            className="mt-3 flex h-7 w-fit cursor-pointer items-center rounded-full px-2 text-[13px] text-foreground transition-colors duration-200 hover:bg-muted"
          >
            Learn More
          </a>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {STRESSORS.map((s) => (
              <span
                key={s}
                className="flex h-7 items-center rounded-full bg-muted px-3 text-[12px] font-medium text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <Placeholder label="Cellular / oxidative stress visual" className="aspect-square w-full" />
      </div>
    </section>
  );
}
