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
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
          The Difference
        </span>
        <h2 className="mt-3 text-[1.9rem] leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-[2.2rem]">
          Not all astaxanthin is created equal.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-secondary">
          Dose, source, purity, and clinical backing matter.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-[14px]">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="pb-3 text-left font-[family-name:var(--font-lifework-red-display)] text-[16px] font-medium text-foreground">
                  Feature
                </th>
                <th className="pb-3 text-center font-[family-name:var(--font-lifework-red-display)] text-[16px] font-medium text-foreground">
                  Lifework
                </th>
                <th className="pb-3 text-center font-[family-name:var(--font-lifework-red-display)] text-[16px] font-medium text-muted-foreground">
                  Other Astaxanthin
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-border">
                  <td className="py-4 text-foreground">{row.feature}</td>
                  <td className="py-4 text-center font-semibold text-foreground">
                    {row.lifework === true ? (
                      <Check className="mx-auto size-4 text-accent" aria-label="Yes" />
                    ) : (
                      row.lifework
                    )}
                  </td>
                  <td className="py-4 text-center text-muted-foreground">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className="mt-8 cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase underline-offset-4 hover:underline"
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
