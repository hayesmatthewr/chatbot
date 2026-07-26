import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/im8/Placeholder";

interface ComparisonColumn {
  key: string;
  label: string;
  highlight?: boolean;
}

const COLUMNS: ComparisonColumn[] = [
  { key: "ours", label: "Daily Ultimate Longevity", highlight: true },
  { key: "nmn", label: "Typical NMN Capsule" },
  { key: "stack", label: '"Longevity Stack"' },
  { key: "diy", label: "DIY Supplement Stack" },
];

interface BooleanRow {
  type: "boolean";
  label: string;
  values: boolean[];
}

interface TextRow {
  type: "text";
  label: string;
  values: string[];
}

type ComparisonRow = BooleanRow | TextRow;

const ROWS: ComparisonRow[] = [
  { type: "boolean", label: "All 12 hallmarks of aging", values: [true, false, false, false] },
  { type: "boolean", label: "Five synergistic complexes", values: [true, false, false, false] },
  {
    type: "boolean",
    label: "Therapeutic amino acid doses (5g)",
    values: [true, false, false, false],
  },
  { type: "boolean", label: "Triple senolytic compounds", values: [true, false, false, false] },
  { type: "boolean", label: "NMN NAD+ optimization", values: [true, true, false, false] },
  { type: "boolean", label: "Dedicated autophagy support", values: [true, false, false, false] },
  {
    type: "boolean",
    label: "Enhanced powder bioavailability",
    values: [true, false, false, false],
  },
  { type: "boolean", label: "NSF Certified for Sport", values: [true, false, false, false] },
  {
    type: "text",
    label: "Cost per day",
    values: ["$3.47 USD", "$1-3 USD", "$5-10 USD", "$10-15 USD"],
  },
];

const GRID_COLS = "grid-cols-[1.6fr_1fr_1fr_1fr_1fr]";

export function ComparisonTable() {
  return (
    <section className="bg-[#50000B]">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center">
        <p className="text-sm text-white/90">
          <span className="text-[#E8C99B]">&bull; SAVE 30% + FREE WELCOME KIT</span>
          <span className="mx-3 text-white/30">|</span>
          <span>Free Shipping + 90 Day Guarantee</span>
        </p>
        <button
          type="button"
          className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#50000B] transition-colors hover:bg-white/90"
        >
          START FROM $2.61/DAY &rarr;
        </button>
      </div>

      <div className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">
            How We Compare
          </p>
          <h2
            className="mt-3 text-3xl font-normal text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-im8-display), serif" }}
          >
            IM8 vs. Every Alternative
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
            The only longevity supplement targeting all 12 hallmarks of aging through
            five scientifically-designed complexes.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
          <div className="min-w-[820px]">
            <div className={cn("grid items-end", GRID_COLS)}>
              <div />
              {COLUMNS.map((col) => (
                <div
                  key={col.key}
                  className={cn(
                    "px-3 pb-6 pt-6 text-center",
                    col.highlight && "rounded-t-xl bg-[#6B0010]"
                  )}
                >
                  <Placeholder className="mx-auto h-16 w-16 rounded" />
                  <p className="mt-3 text-sm font-medium text-white">{col.label}</p>
                </div>
              ))}
            </div>

            {ROWS.map((row) => (
              <div key={row.label} className={cn("grid border-t border-white/10", GRID_COLS)}>
                <div className="flex items-center px-3 py-4 text-sm text-white/90">
                  {row.label}
                </div>
                {row.values.map((value, i) => {
                  const col = COLUMNS[i];
                  return (
                    <div
                      key={col.key}
                      className={cn(
                        "flex items-center justify-center px-3 py-4",
                        col.highlight && "bg-[#6B0010]"
                      )}
                    >
                      {row.type === "boolean" ? (
                        value === true ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                          </span>
                        ) : (
                          <X className="h-4 w-4 text-white/30" strokeWidth={2.5} />
                        )
                      ) : (
                        <span
                          className={cn(
                            "text-sm",
                            col.highlight ? "font-semibold text-white" : "text-white/80"
                          )}
                        >
                          {value as string}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
