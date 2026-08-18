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
    <section className="border-t border-border bg-muted py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Cellular protection builds with consistency.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Astaxanthin begins working below the surface before you
            necessarily notice a difference. Consistent daily use is where
            the benefits build.*
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage) => (
            <div key={stage.label} className="rounded-lg border border-border bg-card p-6">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {stage.label}
              </span>
              <h3 className="mt-2 text-base font-bold text-foreground">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{stage.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
