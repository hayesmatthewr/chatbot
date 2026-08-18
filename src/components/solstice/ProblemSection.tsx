import { Clock, PackageX, TrendingDown } from "lucide-react";

const STATS = [
  {
    icon: Clock,
    value: "3+ weeks",
    label: "Average shelf time",
    body: "Supermarket bags sit in a warehouse, a truck, and a shelf before you ever see them.",
  },
  {
    icon: TrendingDown,
    value: "60%",
    label: "Aroma lost by day 10",
    body: "Coffee's volatile aromatics start breaking down within days of roasting, not months.",
  },
  {
    icon: PackageX,
    value: "No roast date",
    label: "Most bags don't say",
    body: "\"Best by\" isn't a roast date — it's a marketing decision that hides how stale the beans are.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-solstice-display)] text-3xl font-semibold text-foreground sm:text-4xl">
            Most coffee is stale before it&apos;s opened.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Flavor peaks 3–14 days after roasting, then declines fast. By the time a
            typical bag reaches your counter, that window has already closed.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="cursor-default rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <stat.icon className="size-6 text-accent" />
              <div className="mt-4 font-[family-name:var(--font-solstice-display)] text-2xl font-semibold text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-semibold tracking-wide text-secondary uppercase">
                {stat.label}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stat.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
