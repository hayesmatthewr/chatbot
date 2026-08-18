import { Check } from "lucide-react";

const ROWS = [
  { feature: "Natural astaxanthin", lifework: true, other: "Varies" },
  { feature: "12 mg daily dose", lifework: true, other: "Varies" },
  { feature: "Clinically studied source", lifework: true, other: "Varies" },
  { feature: "Extensive human clinical research", lifework: "85+ studies", other: "Varies" },
  { feature: "Third-party tested", lifework: true, other: "Varies" },
  { feature: "1 softgel daily", lifework: true, other: "Varies" },
];

export function ComparisonTable() {
  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Not all astaxanthin is created equal.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-secondary">
          Dose, source, purity, and clinical backing matter.
        </p>

        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-5 py-3.5 text-left font-semibold">Feature</th>
                <th className="px-5 py-3.5 text-center font-semibold">Lifework</th>
                <th className="px-5 py-3.5 text-center font-semibold">Other Astaxanthin</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 1 ? "bg-muted" : "bg-card"}
                >
                  <td className="border-t border-border px-5 py-3.5 text-foreground">
                    {row.feature}
                  </td>
                  <td className="border-t border-border px-5 py-3.5 text-center font-semibold text-foreground">
                    {row.lifework === true ? (
                      <Check className="mx-auto size-4 text-accent" aria-label="Yes" />
                    ) : (
                      row.lifework
                    )}
                  </td>
                  <td className="border-t border-border px-5 py-3.5 text-center text-muted-foreground">
                    {row.other}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className="mt-6 cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
