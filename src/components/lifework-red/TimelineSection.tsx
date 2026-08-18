const STAGES = [
  {
    label: "Day 1",
    title: "Daily antioxidant support begins.",
    body: "Astaxanthin is absorbed and begins circulating through the body.",
  },
  {
    label: "Weeks 2–4",
    title: "Cellular support builds.",
    body: "Consistent use helps maintain ongoing antioxidant protection against everyday oxidative stress.*",
  },
  {
    label: "Weeks 4–8",
    title: "Benefits may become more noticeable.",
    body: "Depending on the individual and outcome, support for skin, eyes, or recovery may become easier to notice.*",
  },
  {
    label: "Weeks 8–12+",
    title: "The long game.",
    body: "Daily use continues supporting cellular resilience across the systems you rely on every day.*",
  },
];

export function TimelineSection() {
  return (
    <section className="border-t border-border bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
            The Timeline
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
            Cellular protection builds with consistency.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            Astaxanthin begins working below the surface before you
            necessarily notice a difference. Consistent daily use is where
            the benefits build.*
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden
            className="absolute top-[7px] right-0 left-0 hidden h-px bg-[repeating-linear-gradient(90deg,var(--secondary)_0,var(--secondary)_3px,transparent_3px,transparent_7px)] lg:block"
          />
          {STAGES.map((stage) => (
            <div key={stage.label} className="relative pt-6">
              <span className="absolute top-0 left-0 flex size-3.5 items-center justify-center rounded-full bg-accent lg:left-1/2 lg:-translate-x-1/2">
                <span className="size-1.5 rounded-full bg-card" />
              </span>
              <span className="font-[family-name:var(--font-lifework-red-mono)] text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase lg:block lg:text-center">
                {stage.label}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-lifework-red-display)] text-[17px] font-medium text-foreground lg:text-center">
                {stage.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-secondary lg:text-center">
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
