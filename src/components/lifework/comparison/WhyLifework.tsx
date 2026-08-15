"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompareColumn {
  key: string;
  label: string;
  highlight?: boolean;
}

type CompareCell =
  | { kind: "check" }
  | { kind: "text"; text: string; strong?: boolean }
  | { kind: "dash" };

interface CompareRow {
  label: string;
  values: CompareCell[];
}

interface ComparisonView {
  id: string;
  tabLabel: string;
  subheadline: string;
  columns: CompareColumn[];
  rows: CompareRow[];
  disclaimer: string;
}

const VIEWS: ComparisonView[] = [
  {
    id: "astaxanthin-vs-antioxidants",
    tabLabel: "Astaxanthin vs. other antioxidants",
    subheadline: "The ultimate cellular protector",
    columns: [
      { key: "lifework", label: "Lifework Astaxanthin", highlight: true },
      { key: "vitamin-c", label: "Vitamin C" },
      { key: "coq10", label: "CoQ10" },
      { key: "vitamin-e", label: "Vitamin E" },
    ],
    rows: [
      {
        label: "Spans the cell membrane",
        values: [
          { kind: "check" },
          { kind: "text", text: "Varies / No" },
          { kind: "text", text: "Varies" },
          { kind: "text", text: "Partial" },
        ],
      },
      {
        label: "Works across lipid-rich cellular structures",
        values: [{ kind: "check" }, { kind: "dash" }, { kind: "dash" }, { kind: "dash" }],
      },
      {
        label: "Supports eye and brain tissues",
        values: [{ kind: "check" }, { kind: "dash" }, { kind: "dash" }, { kind: "dash" }],
      },
      {
        label: "Supports mitochondrial health",
        values: [{ kind: "check" }, { kind: "dash" }, { kind: "dash" }, { kind: "dash" }],
      },
      {
        label: "Studied across multiple whole-body outcomes",
        values: [{ kind: "check" }, { kind: "dash" }, { kind: "dash" }, { kind: "dash" }],
      },
    ],
    disclaimer: "Final comparison wording must be substantiated before launch.",
  },
  {
    id: "lifework-vs-astaxanthin",
    tabLabel: "Lifework vs. other astaxanthin",
    subheadline: "Not all astaxanthin is created equal.",
    columns: [
      { key: "lifework", label: "Lifework", highlight: true },
      { key: "other", label: "Other astaxanthin" },
    ],
    rows: [
      {
        label: "12 mg natural astaxanthin",
        values: [{ kind: "check" }, { kind: "text", text: "Varies" }],
      },
      {
        label: "Clinically studied source",
        values: [{ kind: "check" }, { kind: "text", text: "Varies" }],
      },
      {
        label: "Human clinical research",
        values: [
          { kind: "text", text: "85+", strong: true },
          { kind: "text", text: "Varies" },
        ],
      },
      {
        label: "Third-party tested",
        values: [{ kind: "check" }, { kind: "text", text: "Varies" }],
      },
      {
        label: "Purity + potency verified",
        values: [{ kind: "check" }, { kind: "text", text: "Varies" }],
      },
      {
        label: "1 softgel daily",
        values: [{ kind: "check" }, { kind: "text", text: "Varies" }],
      },
    ],
    disclaimer:
      '"Other astaxanthin" varies by formulation and brand. Comparison is based on disclosed product characteristics and should not imply that every competing product lacks these attributes.',
  },
];

function ComparisonCell({ cell, highlight }: { cell: CompareCell; highlight?: boolean }) {
  if (cell.kind === "check") {
    return (
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full",
          highlight ? "bg-[var(--lifework-red)]/10" : "bg-[var(--lifework-ink-faint)]/10"
        )}
      >
        <Check
          className={cn(
            "h-4 w-4",
            highlight ? "text-[var(--lifework-red)]" : "text-[var(--lifework-ink-soft)]"
          )}
          strokeWidth={2.5}
        />
      </span>
    );
  }

  if (cell.kind === "dash") {
    return <span className="text-sm text-[var(--lifework-ink-faint)]">&mdash;</span>;
  }

  return (
    <span
      className={cn(
        "text-sm",
        cell.strong
          ? "font-bold text-[var(--lifework-red)]"
          : highlight
            ? "font-medium text-[var(--lifework-ink)]"
            : "text-[var(--lifework-ink-soft)]"
      )}
    >
      {cell.text}
    </span>
  );
}

const GRID_COLS_BY_COUNT: Record<number, string> = {
  2: "grid-cols-[1.6fr_1fr_1fr]",
  4: "grid-cols-[1.6fr_1fr_1fr_1fr_1fr]",
};

export function WhyLifework() {
  const [activeView, setActiveView] = useState(0);
  const view = VIEWS[activeView];
  const gridCols = GRID_COLS_BY_COUNT[view.columns.length] ?? "grid-cols-[1.6fr_1fr_1fr_1fr_1fr]";

  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
            COMPARE
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--lifework-ink)] sm:text-4xl md:text-5xl">
            Not all cellular protection is created equal.
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveView(i)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                i === activeView
                  ? "bg-[var(--lifework-red)] text-white"
                  : "bg-[var(--lifework-surface)] text-[var(--lifework-ink-soft)] hover:text-[var(--lifework-ink)]"
              )}
            >
              {v.tabLabel}
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-lg font-medium text-[var(--lifework-ink)] sm:text-xl">
          {view.subheadline}
        </p>

        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[640px]">
            <div className={cn("grid items-end", gridCols)}>
              <div />
              {view.columns.map((col) => (
                <div
                  key={col.key}
                  className={cn(
                    "px-3 pb-4 pt-3 text-center",
                    col.highlight &&
                      "rounded-t-xl border border-b-0 border-[var(--lifework-red)] bg-[var(--lifework-red-tint)]/40"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      col.highlight ? "text-[var(--lifework-red)]" : "text-[var(--lifework-ink)]"
                    )}
                  >
                    {col.label}
                  </p>
                </div>
              ))}
            </div>

            {view.rows.map((row, rowIndex) => (
              <div
                key={row.label}
                className={cn("grid border-t border-[var(--lifework-line)]", gridCols)}
              >
                <div className="flex items-center px-3 py-4 text-sm text-[var(--lifework-ink)]">
                  {row.label}
                </div>
                {row.values.map((cell, i) => {
                  const col = view.columns[i];
                  const isLastRow = rowIndex === view.rows.length - 1;
                  return (
                    <div
                      key={col.key}
                      className={cn(
                        "flex items-center justify-center px-3 py-4",
                        col.highlight &&
                          cn(
                            "border-x border-[var(--lifework-red)] bg-[var(--lifework-red-tint)]/20",
                            isLastRow && "rounded-b-xl border-b"
                          )
                      )}
                    >
                      <ComparisonCell cell={cell} highlight={col.highlight} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-[var(--lifework-ink-faint)]">{view.disclaimer}</p>
      </div>
    </section>
  );
}
