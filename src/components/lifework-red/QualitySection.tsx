import { Check } from "lucide-react";
import { Placeholder } from "./Placeholder";

const QUALITY_POINTS = [
  { title: "Third-Party Tested", body: "Tested for purity and potency." },
  { title: "Made in the USA", body: "Manufactured under strict quality standards." },
  { title: "Non-GMO", body: "Made without genetically modified ingredients." },
  { title: "Purity Verified", body: "Screened for unwanted contaminants." },
  { title: "1 Softgel Daily", body: "Simple enough to stay consistent." },
];

export function QualitySection() {
  return (
    <section className="border-t border-border bg-muted py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
            The Standard
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
            What protects your cells should meet a higher standard.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            Lifework is made to strict quality standards and independently
            tested to confirm what is inside every softgel.
          </p>

          <dl className="mt-8 flex flex-col divide-y divide-border border-t border-border">
            {QUALITY_POINTS.map((point) => (
              <div key={point.title} className="flex items-start gap-4 py-4">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-accent">
                  <Check className="size-3 text-accent" />
                </span>
                <div>
                  <dt className="font-[family-name:var(--font-lifework-red-display)] text-[16px] font-medium text-foreground">
                    {point.title}
                  </dt>
                  <dd className="mt-0.5 text-[13.5px] text-secondary">{point.body}</dd>
                </div>
              </div>
            ))}
          </dl>

          <button
            type="button"
            className="mt-7 cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase underline-offset-4 hover:underline"
          >
            View Testing
          </button>
        </div>

        <Placeholder label="Quality / testing image" wash className="aspect-[4/5] w-full lg:aspect-square" />
      </div>
    </section>
  );
}
