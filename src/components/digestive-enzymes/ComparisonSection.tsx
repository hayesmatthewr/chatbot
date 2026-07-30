"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

type Row = { label: string; values: (boolean | string)[] };
type Panel = {
  id: string;
  tab: string;
  headline: string;
  columns: string[];
  rows: Row[];
  note: string;
};

const PANELS: Panel[] = [
  {
    id: "other-enzymes",
    tab: "vs. Other Enzymes",
    headline: "More complete than a basic enzyme blend",
    columns: ["PHYSICIAN'S CHOICE", "Basic Enzyme", "Single Enzyme"],
    rows: [
      { label: "16 diverse enzymes", values: [true, "A few", false] },
      { label: "Covers all 6 food groups", values: [true, false, false] },
      { label: "Probiotics included", values: [true, false, false] },
      { label: "Organic prebiotics", values: [true, false, false] },
      { label: "Soothing herbal blend", values: [true, false, false] },
    ],
    note: 'Comparison reflects typical formulas in the category. "Basic" and "single" enzyme products vary by brand.',
  },
  {
    id: "untested-brands",
    tab: "vs. Untested Brands",
    headline: "Clean, tested, and developed with doctors",
    columns: ["Physician's Choice", "Untested Brands"],
    rows: [
      { label: "Third-party tested", values: [true, false] },
      { label: "Developed with doctors", values: [true, false] },
      { label: "FDA-registered, cGMP facility", values: [true, false] },
      { label: "No major allergens or fillers", values: [true, false] },
      { label: "60-day money-back guarantee", values: [true, false] },
    ],
    note: '"Untested brands" describes products that do not disclose third-party testing. Standards vary by brand.',
  },
];

export function ComparisonSection() {
  const [activeId, setActiveId] = useState(PANELS[0].id);
  const active = PANELS.find((p) => p.id === activeId)!;

  return (
    <section className="mt-12.5 bg-[#f7f6f2] px-5 py-11.5 lg:px-10">
      <div className="lg:mx-auto lg:max-w-[860px]">
        <div role="tablist" aria-label="Product comparison" className="flex gap-1.5 rounded-[11px] bg-[#eceae3] p-1">
          {PANELS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={p.id === activeId}
              id={`cmp-tab-${p.id}`}
              aria-controls={`cmp-panel-${p.id}`}
              onClick={() => setActiveId(p.id)}
              className={`flex-1 rounded-lg px-1.5 py-2.5 font-semibold text-xs leading-tight transition-colors ${
                p.id === activeId ? "bg-white text-[#16160f] shadow-sm" : "text-[#6d6d65]"
              }`}
            >
              {p.tab}
            </button>
          ))}
        </div>

        <div
          id={`cmp-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`cmp-tab-${active.id}`}
          className="mt-6.5"
        >
          <h2 className="mb-5 text-center text-[21px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#16160f]">
            {active.headline}
          </h2>
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="min-w-[150px] max-w-[190px]" />
                  {active.columns.map((col, i) => (
                    <th
                      key={col}
                      className={`min-w-[84px] border-b-[1.5px] border-[#ccccc3] px-2 pt-5 pb-3 align-bottom text-[12px] leading-tight font-bold text-[#16160f] ${
                        i === 0 ? "rounded-t-[13px] bg-white shadow-[0_0_18px_rgba(0,0,0,0.06)]" : ""
                      }`}
                    >
                      {i === 0 ? (
                        <span className="inline-block rounded-full bg-[#CA133D] px-3 py-1 font-semibold text-[10.5px] tracking-[0.05em] text-white">
                          {col}
                        </span>
                      ) : (
                        col
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {active.rows.map((row, rowIdx) => (
                  <tr key={row.label}>
                    <td className="min-w-[150px] max-w-[190px] border-b border-[#e2e0d8] bg-[#f7f6f2] py-3 pr-2 text-left text-[12.5px] leading-[1.32] font-semibold text-[#16160f]">
                      {row.label}
                    </td>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={`min-w-[84px] px-2 py-3 text-center align-middle ${
                          i === 0
                            ? `bg-white shadow-[0_0_18px_rgba(0,0,0,0.06)] ${
                                rowIdx === active.rows.length - 1 ? "rounded-b-[13px]" : ""
                              }`
                            : "border-b border-[#e2e0d8]"
                        }`}
                      >
                        {v === true ? (
                          <CheckIcon size={17} className="mx-auto text-[#CA133D]" />
                        ) : v === false ? (
                          <svg width="15" height="15" viewBox="0 0 18 18" fill="none" className="mx-auto text-[#c2c1ba]" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round">
                            <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
                          </svg>
                        ) : (
                          <span className="inline-block rounded-full bg-[#e8e6df] px-2.5 py-0.5 text-[10px] font-semibold text-[#3a3a33]">
                            {v}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[11.5px] leading-[1.5] text-[#9d9d94]">{active.note}</p>
        </div>
      </div>
    </section>
  );
}
