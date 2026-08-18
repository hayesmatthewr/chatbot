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
    <section id="mechanism" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-[1.9rem] leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-[2.2rem]">
            Protection starts at the cell membrane.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            Astaxanthin&apos;s unique structure allows it to span the cell
            membrane, helping neutralize reactive species and protect
            vulnerable cellular structures from oxidative stress.*
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Placeholder label="Softgel cross-section diagram" className="aspect-square w-full" />

          <div className="flex flex-col gap-7">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-5">
                <span className="font-[family-name:var(--font-lifework-red-mono)] text-[13px] font-medium text-accent">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[16px] font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-secondary">{step.body}</p>
                </div>
              </div>
            ))}
            <a
              href="#studies"
              className="cursor-pointer text-[13px] font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
