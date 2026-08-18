import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-primary py-28 text-primary-foreground sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-white/80 uppercase backdrop-blur-md">
          <Sparkles className="size-3.5 text-accent" />
          Small-batch · Single-origin · Roasted to order
        </span>

        <h1 className="font-[family-name:var(--font-solstice-display)] text-4xl leading-[1.1] font-semibold sm:text-6xl">
          Roasted at the exact moment of peak flavor.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          We roast every order the morning it ships, seal it under nitrogen within
          minutes, and get it to your door in 48 hours — so the cup you drink still
          tastes like the cupping table.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#shop"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Shop the collection
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </a>
          <a
            href="#journey"
            className="cursor-pointer rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            See our process
          </a>
        </div>

        <dl className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
          {[
            { value: "< 48 hrs", label: "Roast to doorstep" },
            { value: "12", label: "Origin farms" },
            { value: "4.9/5", label: "Avg. rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-[family-name:var(--font-solstice-display)] text-2xl font-semibold text-accent sm:text-3xl">
                {stat.value}
              </dd>
              <div className="mt-1 text-xs tracking-wide text-white/60 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
