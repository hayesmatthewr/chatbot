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
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
            Cellular protection builds with consistency.
          </h2>
          <p className="mt-3 text-[15px] leading-[22px] text-secondary">
            Astaxanthin begins working below the surface before you
            necessarily notice a difference. Consistent daily use is where
            the benefits build.*
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage) => (
            <div key={stage.label} className="rounded-[24px] bg-card p-6">
              <span className="text-[11px] font-medium text-muted-foreground uppercase">
                {stage.label}
              </span>
              <h3 className="mt-2 text-[15px] font-medium text-foreground">{stage.title}</h3>
              <p className="mt-2 text-[13px] leading-[20px] text-secondary">{stage.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
