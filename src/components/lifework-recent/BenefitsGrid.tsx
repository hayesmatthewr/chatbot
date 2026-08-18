import { Activity, Droplet, Eye, TimerReset } from "lucide-react";

const BENEFITS = [
  { icon: Droplet, tag: "Look", title: "Skin Health", body: "Supports hydration, elasticity, and resilience to environmental stress.*" },
  { icon: Eye, tag: "Feel", title: "Eye Health", body: "Supports eye comfort and visual endurance during long screen days.*" },
  { icon: Activity, tag: "Perform", title: "Performance + Recovery", body: "Supports endurance and recovery from hard effort.*" },
  { icon: TimerReset, tag: "Long Game", title: "Healthy Aging", body: "Supports cellular resilience as your body's natural defenses change over time.*" },
];

export function BenefitsGrid() {
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
            Protect how you look, feel, and perform.
          </h2>
          <p className="mt-3 text-[15px] leading-[22px] text-secondary">
            Cellular protection starts at the smallest level, but its
            benefits reach across the body.*
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-[24px] bg-card p-8">
              <b.icon className="size-5 text-foreground" strokeWidth={1.75} />
              <span className="mt-4 block text-[11px] font-medium text-muted-foreground uppercase">
                {b.tag}
              </span>
              <h3 className="mt-1 text-[15px] font-medium text-foreground">{b.title}</h3>
              <p className="mt-2 text-[13px] leading-[20px] text-secondary">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
