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
    <section id="mechanism" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
            Protection starts at the cell membrane.
          </h2>
          <p className="mt-3 text-[15px] leading-[22px] text-secondary">
            Astaxanthin&apos;s unique structure allows it to span the cell
            membrane, helping neutralize reactive species and protect
            vulnerable cellular structures from oxidative stress.*
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Placeholder label="Softgel cross-section diagram" className="aspect-square w-full" />

          <div className="flex flex-col gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-4">
                <span className="text-[13px] font-medium text-muted-foreground">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[15px] font-medium text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[13px] leading-[20px] text-secondary">{step.body}</p>
                </div>
              </div>
            ))}
            <a
              href="#studies"
              className="flex h-7 w-fit cursor-pointer items-center rounded-full px-2 text-[13px] text-foreground transition-colors duration-200 hover:bg-muted"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
