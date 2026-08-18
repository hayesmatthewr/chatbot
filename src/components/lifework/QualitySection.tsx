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
    <section className="border-t border-border bg-muted py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            What protects your cells should meet a higher standard.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Lifework is made to strict quality standards and independently
            tested to confirm what is inside every softgel.
          </p>

          <dl className="mt-6 flex flex-col gap-4">
            {QUALITY_POINTS.map((point) => (
              <div key={point.title}>
                <dt className="text-base font-bold text-foreground">{point.title}</dt>
                <dd className="mt-0.5 text-sm text-secondary">{point.body}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            className="mt-6 cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
          >
            View Testing
          </button>
        </div>

        <Placeholder label="Quality / testing image" aspect="aspect-[4/5] w-full lg:aspect-square" />
      </div>
    </section>
  );
}
