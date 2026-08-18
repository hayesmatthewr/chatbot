import { Placeholder } from "./Placeholder";

const STRESSORS = ["UV Exposure", "Blue Light", "Pollution", "Aging", "Intense Exercise"];

export function ProblemSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-[1.9rem] leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-[2.2rem]">
            Our bodies weren&apos;t built for modern oxidative stress.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-secondary">
            Sun, screens, pollution, stress, hard training, and aging all
            create oxidative stress. Over time, that stress can wear on the
            cells behind how you look, feel, perform, and age.*
          </p>
          <a
            href="#mechanism"
            className="mt-5 inline-block cursor-pointer text-[13px] font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
          >
            Learn More
          </a>

          <div className="mt-7 flex flex-wrap gap-2">
            {STRESSORS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[12.5px] font-medium text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <Placeholder label="Cellular / oxidative stress visual" photo className="aspect-square w-full" />
      </div>
    </section>
  );
}
