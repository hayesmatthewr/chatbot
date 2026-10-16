"use client";

import { useState } from "react";
import { Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { antioxidantColumns, antioxidantRows, astaxanthinRows } from "./content";
import { Reveal } from "./Reveal";
import { Sheet } from "./Sheet";

function Mark({ yes, onRed = false }: { yes: boolean; onRed?: boolean }) {
  return yes ? (
    <span className={cn("mx-auto grid h-8 w-6 place-items-center rounded-full", onRed ? "bg-white text-aura-red" : "bg-aura-red text-white")}>
      <Check className="size-4" strokeWidth={3} aria-label="Yes" />
    </span>
  ) : (
    <span className="mx-auto grid size-6 place-items-center text-aura-muted">
      <X className="size-4" strokeWidth={2.5} aria-label="No" />
    </span>
  );
}

export function Comparison() {
  const [tab, setTab] = useState<"antioxidants" | "astaxanthin">("antioxidants");
  const [detail, setDetail] = useState<number | null>(null);

  return (
    <section id="compare" aria-labelledby="compare-title" className="scroll-mt-16 py-20 md:py-32">
      <div className="mx-auto max-w-[1100px] px-4 md:px-8">
        <Reveal>
          <p className="text-[16px] text-aura-muted">Compare Aura</p>
          <div role="tablist" aria-label="Comparison" className="mt-4 inline-flex rounded-full bg-aura-step p-1">
            {(["antioxidants", "astaxanthin"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[16px] font-bold capitalize transition-colors",
                  tab === t ? "bg-aura-ink text-white" : "hover:bg-aura-paper",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <h2 id="compare-title" className="mt-8 text-[clamp(32px,4vw,60px)] leading-[1] font-bold tracking-[-0.035em]">
            {tab === "antioxidants" ? "Not All Antioxidants Are Equal" : "Not All Astaxanthin Is Equal"}
          </h2>
        </Reveal>

        {tab === "antioxidants" ? (
          <div role="tabpanel" className="mt-10">
            <table className="w-full border-separate border-spacing-0 text-[15px] md:text-[16px]">
              <thead>
                <tr>
                  <th className="w-[40%] pb-4 text-left text-[14px] font-normal text-aura-muted md:text-[16px]">Tap a row for detail</th>
                  {antioxidantColumns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={cn("px-1 pt-4 pb-4 text-center text-[13px] leading-tight font-bold md:px-2 md:text-[16px]", i === 0 && "rounded-t-[24px] bg-aura-red text-[15px] text-white md:text-[18px]")}
                    >
                      {i === 0 ? "AURA" : c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {antioxidantRows.map((row, r) => (
                  <tr key={row.feature} className="group">
                    <th scope="row" className="py-0 text-left font-medium">
                      <button
                        type="button"
                        onClick={() => setDetail(r)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-l-[20px] py-4 pr-2 pl-3 text-left transition-colors group-hover:bg-aura-paper md:pl-4",
                          r % 2 === 0 && "bg-aura-step",
                        )}
                      >
                        {row.feature}
                        <Info className="size-4 shrink-0 text-aura-muted" aria-hidden />
                      </button>
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={antioxidantColumns[i]}
                        className={cn(
                          "px-1 py-4 text-center md:px-2",
                          i === 0 ? "bg-aura-red" : r % 2 === 0 ? "bg-aura-step group-hover:bg-aura-paper" : "group-hover:bg-aura-paper",
                          i === 0 && r === antioxidantRows.length - 1 && "rounded-b-[24px]",
                          i === antioxidantColumns.length - 1 && "rounded-r-[20px]",
                        )}
                      >
                        <Mark yes={v} onRed={i === 0} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-[70ch] text-[14px] leading-[1.5] text-aura-muted">
              Based on published mechanisms and antioxidant behavior. Other antioxidants still have value. Aura is built around astaxanthin&apos;s membrane-spanning protection.
            </p>
          </div>
        ) : (
          <div role="tabpanel" className="mt-10">
            <table className="w-full border-separate border-spacing-0 text-[16px]">
              <thead>
                <tr>
                  <th className="w-1/2 pb-4 text-left font-normal text-aura-muted">Feature</th>
                  <th scope="col" className="rounded-t-[24px] bg-aura-red px-2 pt-4 pb-4 text-center text-[18px] font-bold text-white">
                    AURA
                  </th>
                  <th scope="col" className="px-2 pb-4 text-center font-bold">
                    Typical brands
                  </th>
                </tr>
              </thead>
              <tbody>
                {astaxanthinRows.map((row, r) => (
                  <tr key={row.feature}>
                    <th scope="row" className={cn("rounded-l-[20px] py-4 pl-4 text-left font-medium", r % 2 === 0 && "bg-aura-step")}>
                      {row.feature}
                    </th>
                    <td className={cn("bg-aura-red px-2 py-4 text-center", r === astaxanthinRows.length - 1 && "rounded-b-[24px]")}>
                      <Mark yes onRed />
                    </td>
                    <td className={cn("rounded-r-[20px] px-2 py-4 text-center", r % 2 === 0 && "bg-aura-step")}>
                      {row.typical === "no" ? <Mark yes={false} /> : <span className="text-[15px] text-aura-muted">{row.typical}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-[70ch] text-[14px] leading-[1.5] text-aura-muted">
              ¹ Studies conducted using AstaReal® astaxanthin. ² Refers to AstaReal® ingredient manufacturing. &ldquo;Typical brands&rdquo; reflects what most astaxanthin
              brands disclose publicly.
            </p>
          </div>
        )}
      </div>

      <Sheet open={detail !== null} onClose={() => setDetail(null)} title={detail !== null ? antioxidantRows[detail].feature : ""}>
        {detail !== null && <p>{antioxidantRows[detail].detail}</p>}
      </Sheet>
    </section>
  );
}
