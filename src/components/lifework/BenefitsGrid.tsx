const BENEFITS = [
  {
    tag: "Look",
    title: "Skin Health",
    body: "Supports hydration, elasticity, and resilience to environmental stress.*",
  },
  {
    tag: "Feel",
    title: "Eye Health",
    body: "Supports eye comfort and visual endurance during long screen days.*",
  },
  {
    tag: "Perform",
    title: "Performance + Recovery",
    body: "Supports endurance and recovery from hard effort.*",
  },
  {
    tag: "Long Game",
    title: "Healthy Aging",
    body: "Supports cellular resilience as your body's natural defenses change over time.*",
  },
];

export function BenefitsGrid() {
  return (
    <section className="border-t border-border bg-muted py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Protect how you look, feel, and perform.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Cellular protection starts at the smallest level, but its benefits
            reach across the body.*
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:hover:translate-y-0"
            >
              <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                {b.tag}
              </span>
              <h3 className="mt-2 text-base font-bold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
