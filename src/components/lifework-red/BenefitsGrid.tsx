import { Activity, Droplet, Eye, TimerReset } from "lucide-react";

const BENEFITS = [
  { icon: Droplet, tag: "Look", title: "Skin Health", body: "Supports hydration, elasticity, and resilience to environmental stress.*" },
  { icon: Eye, tag: "Feel", title: "Eye Health", body: "Supports eye comfort and visual endurance during long screen days.*" },
  { icon: Activity, tag: "Perform", title: "Performance + Recovery", body: "Supports endurance and recovery from hard effort.*" },
  { icon: TimerReset, tag: "Long Game", title: "Healthy Aging", body: "Supports cellular resilience as your body's natural defenses change over time.*" },
];

export function BenefitsGrid() {
  return (
    <section className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-[1.9rem] leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-[2.2rem]">
            Protect how you look, feel, and perform.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            Cellular protection starts at the smallest level, but its
            benefits reach across the body.*
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-sm bg-card p-6">
              <b.icon className="size-5 text-accent" />
              <span className="mt-4 block text-[11px] font-bold tracking-[0.08em] text-secondary uppercase">
                {b.tag}
              </span>
              <h3 className="mt-1.5 text-[17px] font-bold text-foreground">{b.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-secondary">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
