import { Placeholder } from "./Placeholder";

const STEPS = [
  {
    number: "01",
    title: "Spans the membrane",
    body: "Astaxanthin sits across the cell membrane instead of only working on one side.*",
  },
  {
    number: "02",
    title: "Helps neutralize reactive species",
    body: "Supports your body's defense against molecules that contribute to oxidative stress.*",
  },
  {
    number: "03",
    title: "Supports cellular resilience",
    body: "Helps protect the structures your cells rely on to function normally.*",
  },
];

export function MechanismSection() {
  return (
    <section id="mechanism" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Protection starts at the cell membrane.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Astaxanthin&apos;s unique structure allows it to span the cell
            membrane, helping neutralize reactive species and protect
            vulnerable cellular structures from oxidative stress.*
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <Placeholder label="Simple cell membrane diagram" aspect="aspect-square w-full" />

          <div>
            <ol className="flex flex-col gap-6">
              {STEPS.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span className="font-mono text-2xl font-bold text-border">{step.number}</span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-secondary">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href="#studies"
              className="mt-6 inline-block cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
