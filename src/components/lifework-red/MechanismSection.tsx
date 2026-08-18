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
    <section id="mechanism" className="border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
          The Mechanism
        </span>
        <h2 className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
          Protection starts at the cell membrane.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-secondary">
          Astaxanthin&apos;s unique structure allows it to span the cell
          membrane, helping neutralize reactive species and protect
          vulnerable cellular structures from oxidative stress.*
        </p>

        <Placeholder
          label="Simple cell membrane diagram"
          wash
          className="mx-auto mt-14 aspect-[16/9] w-full max-w-2xl"
        />

        <div className="mt-2 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <span
                aria-hidden
                className="h-8 w-px bg-[repeating-linear-gradient(180deg,var(--border)_0,var(--border)_3px,transparent_3px,transparent_7px)]"
              />
              <span className="flex size-8 items-center justify-center rounded-full border border-border font-[family-name:var(--font-lifework-red-mono)] text-[11px] text-accent">
                {step.number}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-lifework-red-display)] text-[17px] font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-secondary">{step.body}</p>
            </div>
          ))}
        </div>

        <a
          href="#studies"
          className="mt-10 inline-block cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase underline-offset-4 hover:underline"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
