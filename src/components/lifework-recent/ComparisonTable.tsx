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
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
          Not all astaxanthin is created equal.
        </h2>
        <p className="mt-3 text-[15px] leading-[22px] text-secondary">
          Dose, source, purity, and clinical backing matter.
        </p>

        <div className="mt-8 overflow-x-auto rounded-[24px] border border-border">
          <table className="w-full min-w-[520px] border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left font-medium text-foreground">Feature</th>
                <th className="px-6 py-4 text-center font-medium text-foreground">Lifework</th>
                <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                  Other Astaxanthin
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-t border-border">
                  <td className="px-6 py-4 text-foreground">{row.feature}</td>
                  <td className="px-6 py-4 text-center font-medium text-foreground">
                    {row.lifework === true ? (
                      <Check className="mx-auto size-4" aria-label="Yes" />
                    ) : (
                      row.lifework
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className="mt-6 flex h-7 w-fit cursor-pointer items-center rounded-full bg-muted px-2 text-[13px] text-foreground transition-opacity duration-200 hover:opacity-70"
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
