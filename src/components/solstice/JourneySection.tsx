import { Flame, Globe2, Snowflake, Truck } from "lucide-react";

const STEPS = [
  {
    icon: Globe2,
    title: "Sourced direct",
    body: "We buy directly from 12 farms across Ethiopia, Colombia, and Sumatra, paying 30–40% above commodity price for lots that clear our cupping bar.",
  },
  {
    icon: Flame,
    title: "Roasted to order",
    body: "Every bag is roasted the same morning it ships in 5kg batches, profiled by hand for that lot's density and moisture.",
  },
  {
    icon: Snowflake,
    title: "Nitrogen-sealed",
    body: "Beans rest for degassing, then get flushed and sealed in a one-way valve bag within minutes of cooling — locking the aromatics in.",
  },
  {
    icon: Truck,
    title: "Shipped within 48 hrs",
    body: "No warehouse, no distributor shelf. Your order goes from roaster to carrier the same day or the next morning.",
  },
];

export function JourneySection() {
  return (
    <section id="journey" className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 100% 0%, color-mix(in oklab, var(--accent) 25%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-solstice-display)] text-3xl font-semibold sm:text-4xl">
            From farm to your cup, four days end to end.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Every step is built around one rule: never let time work against the
            flavor.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group relative rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-200 hover:border-accent/50 hover:bg-white/10"
            >
              <span className="font-[family-name:var(--font-solstice-display)] text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <step.icon className="mt-3 size-6 text-accent" />
              <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
