const BENEFITS = [
  { tag: "Look", title: "Skin Health", body: "Supports hydration, elasticity, and resilience to environmental stress.*" },
  { tag: "Feel", title: "Eye Health", body: "Supports eye comfort and visual endurance during long screen days.*" },
  { tag: "Perform", title: "Performance + Recovery", body: "Supports endurance and recovery from hard effort.*" },
  { tag: "Long Game", title: "Healthy Aging", body: "Supports cellular resilience as your body's natural defenses change over time.*" },
];

export function BenefitsGrid() {
  return (
    <section className="border-t border-border bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
            The Benefits
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
            Protect how you look, feel, and perform.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            Cellular protection starts at the smallest level, but its
            benefits reach across the body.*
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 divide-y divide-border border-t border-b border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="px-1 py-8 first:pt-0 sm:px-7 sm:py-2 sm:first:pl-0">
              <span className="font-[family-name:var(--font-lifework-red-mono)] text-[10.5px] font-medium tracking-[0.1em] text-accent uppercase">
                {b.tag}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[19px] font-medium text-foreground">
                {b.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-secondary">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
