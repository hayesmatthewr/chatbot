"use client";

import { usePageState } from "../PageState";
import { RepeatIcon, ShieldIcon, TruckIcon } from "../icons";

export function PurchaseCta() {
  const { qty, purchaseType, ctaRef } = usePageState();

  return (
    <div>
      <button
        ref={ctaRef}
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#16160f] px-5 py-[19px] font-semibold text-[14.5px] tracking-[0.04em] text-white shadow-[0_6px_22px_rgba(22,22,15,0.22)] transition-[background,transform,box-shadow] duration-150 hover:-translate-y-px hover:bg-black hover:shadow-[0_10px_30px_rgba(22,22,15,0.32)] active:translate-y-0 active:scale-[0.99]"
      >
        ADD TO CART
        {purchaseType === "sub" && (
          <span className="font-bold text-[#FCA5A5]">· SAVE {Math.round(qty.disc * 100)}%</span>
        )}
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-1.5 text-[11.5px] whitespace-nowrap text-[#6d6d65]">
          <ShieldIcon size={14} />
          60-day guarantee
        </div>
        <div className="flex items-center gap-1.5 text-[11.5px] whitespace-nowrap text-[#6d6d65]">
          <TruckIcon size={14} />
          Free shipping
        </div>
        <div className="flex items-center gap-1.5 text-[11.5px] whitespace-nowrap text-[#6d6d65]">
          <RepeatIcon size={14} />
          Cancel anytime
        </div>
      </div>
    </div>
  );
}
