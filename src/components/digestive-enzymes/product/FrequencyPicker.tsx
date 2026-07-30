"use client";

import type { Frequency } from "../PageState";
import { money, usePageState } from "../PageState";

const FREQUENCIES: Frequency[] = ["1 month", "2 months"];

export function FrequencyPicker() {
  const { qty, purchaseType, setPurchaseType, frequency, setFrequency, subPrice } =
    usePageState();

  const activate = (type: "sub" | "once") => (e: React.KeyboardEvent | React.MouseEvent) => {
    if (e.type === "keydown") {
      const key = (e as React.KeyboardEvent).key;
      if (key !== "Enter" && key !== " ") return;
      e.preventDefault();
    }
    setPurchaseType(type);
  };

  return (
    <div>
      <div id="freq-label" className="mt-7.5 font-semibold text-[13px] tracking-[0.01em] text-[#16160f]">
        Select frequency
      </div>
      <div role="radiogroup" aria-labelledby="freq-label" className="mt-3.5 rounded-xl border border-[#e9e8e2] p-4">
        <div
          role="radio"
          aria-checked={purchaseType === "sub"}
          tabIndex={0}
          onClick={activate("sub")}
          onKeyDown={activate("sub")}
          className="flex cursor-pointer items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`relative size-[18px] shrink-0 rounded-full border-[1.5px] transition-colors ${
                purchaseType === "sub" ? "border-[#CA133D]" : "border-[#cfcec7]"
              }`}
            >
              {purchaseType === "sub" && (
                <span className="absolute inset-[3px] rounded-full bg-[#CA133D]" />
              )}
            </span>
            <span className="text-[15px] font-medium text-[#16160f]">
              Subscribe &amp; Save <b className="font-semibold">{Math.round(qty.disc * 100)}%</b>
            </span>
          </div>
          <div className="flex-none text-right whitespace-nowrap">
            <span className="text-[16px] font-bold text-[#DC2626]">{money(subPrice)}</span>
            <span className="ml-1.5 text-sm text-[#9d9d94] line-through">{money(qty.was)}</span>
          </div>
        </div>

        {purchaseType === "sub" && (
          <div className="mt-3.5">
            <div className="mb-2.5 text-[13px] text-[#6d6d65]">Delivery every:</div>
            <div className="flex gap-2.5">
              {FREQUENCIES.map((f) => {
                const active = frequency === f;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFrequency(f)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-[10px] border px-2 py-3.5 font-semibold text-sm transition-colors ${
                      active
                        ? "border-[#16160f] bg-[#16160f] text-white"
                        : "border-[#cfcec7] bg-white text-[#16160f]"
                    }`}
                  >
                    Every {f}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="my-3.5 h-px bg-[#e9e8e2]" />

        <div
          role="radio"
          aria-checked={purchaseType === "once"}
          tabIndex={0}
          onClick={activate("once")}
          onKeyDown={activate("once")}
          className="flex cursor-pointer items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`relative size-[18px] shrink-0 rounded-full border-[1.5px] transition-colors ${
                purchaseType === "once" ? "border-[#CA133D]" : "border-[#cfcec7]"
              }`}
            >
              {purchaseType === "once" && (
                <span className="absolute inset-[3px] rounded-full bg-[#CA133D]" />
              )}
            </span>
            <span className="text-[15px] font-medium text-[#16160f]">One-time purchase</span>
          </div>
          <div className="flex-none text-right">
            <span className="text-[16px] font-bold text-[#DC2626]">{money(qty.was)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
