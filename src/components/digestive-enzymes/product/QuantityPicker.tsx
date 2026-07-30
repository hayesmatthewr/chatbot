"use client";

import { QTY_OPTIONS, money, usePageState } from "../PageState";

export function QuantityPicker() {
  const { qty, setQtyId } = usePageState();

  return (
    <div>
      <div id="qty-label" className="mt-7.5 font-semibold text-[13px] tracking-[0.01em] text-[#16160f]">
        Select quantity
      </div>
      <div role="radiogroup" aria-labelledby="qty-label" className="mt-6 flex gap-2.5">
        {QTY_OPTIONS.map((opt) => {
          const active = opt.id === qty.id;
          const price = opt.was * (1 - opt.disc);
          return (
            <div
              key={opt.id}
              role="radio"
              aria-checked={active}
              tabIndex={0}
              onClick={() => setQtyId(opt.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setQtyId(opt.id);
                }
              }}
              className={`relative min-w-0 flex-1 cursor-pointer rounded-xl border-[1.5px] px-2 pt-3.5 pb-3.5 text-center transition-colors ${
                active
                  ? "border-[#CA133D] bg-[#CA133D]/10 shadow-[0_0_0_1px_#CA133D_inset]"
                  : "border-[#e9e8e2]"
              }`}
            >
              {opt.badge && (
                <div
                  className={`absolute -top-[11px] left-1/2 -translate-x-1/2 rounded-md px-2.5 py-1 text-[10.5px] font-semibold whitespace-nowrap text-white ${
                    opt.badge.tone === "primary" ? "bg-[#CA133D]" : "bg-[#047857]"
                  }`}
                >
                  {opt.badge.text}
                </div>
              )}
              <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#16160f]">
                {opt.name}
              </div>
              <div className="mt-[7px] text-[17px] leading-none font-bold text-[#16160f]">
                {money(price)}
              </div>
              <div className="mt-[3px] text-[11px] text-[#9d9d94] line-through">
                {money(opt.was)}
              </div>
              <div className="mt-[7px] inline-block rounded px-1.5 py-0.5 text-[9.5px] font-bold tracking-[0.02em] text-white bg-[#DC2626]">
                {Math.round(opt.disc * 100)}% OFF
              </div>
              <div className="mt-2 text-[12.5px] font-semibold text-[#16160f]">{opt.perMeal}</div>
              <div className="mt-1.5 font-bold text-[9px] tracking-[0.04em] text-[#CA133D] uppercase">
                Free shipping
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
