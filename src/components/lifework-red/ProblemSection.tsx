import { Placeholder } from "./Placeholder";

const STRESSORS = ["UV Exposure", "Blue Light", "Pollution", "Aging", "Intense Exercise"];

export function ProblemSection() {
  return (
    <section className="border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
            The Problem
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
            Our bodies weren&apos;t built for modern oxidative stress.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-secondary">
            Sun, screens, pollution, stress, hard training, and aging all
            create oxidative stress. Over time, that stress can wear on the
            cells behind how you look, feel, perform, and age.*
          </p>
          <a
            href="#mechanism"
            className="mt-5 inline-block cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase underline-offset-4 hover:underline"
          >
            Learn More
          </a>

          <ul className="mt-8 flex flex-col">
            {STRESSORS.map((s, i) => (
              <li
                key={s}
                className="flex items-center justify-between gap-4 border-t border-border py-3 text-[14px] text-foreground last:border-b"
              >
                <span className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--border)_0,var(--border)_3px,transparent_3px,transparent_7px)]"
                />
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
              </li>
            ))}
          </ul>
        </div>

        <Placeholder label="Cellular / oxidative stress visual" wash className="aspect-square w-full" />
      </div>
    </section>
  );
}
