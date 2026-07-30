"use client";

import { useEffect, useState } from "react";
import { money, usePageState } from "./PageState";

export function StickyMobileCta() {
  const { qty, purchaseType, frequency, subPrice, ctaRef, scrollToCta } = usePageState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ctaRef]);

  const name = purchaseType === "sub" ? `${qty.name} · Subscribe` : `${qty.name} · One-time`;
  const price =
    purchaseType === "sub" ? `${money(subPrice)} · every ${frequency}` : money(qty.was);

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 mx-auto flex max-w-[430px] items-center gap-3 border-t border-[#e9e8e2] bg-white/96 px-4 py-2.5 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-[#16160f]">{name}</div>
        <div className="text-xs text-[#6d6d65]">{price}</div>
      </div>
      <button
        type="button"
        onClick={scrollToCta}
        className="shrink-0 rounded-full bg-[#16160f] px-5.5 py-3 font-semibold text-[13px] tracking-[0.03em] text-white shadow-[0_4px_14px_rgba(22,22,15,0.22)]"
      >
        ADD TO CART
      </button>
    </div>
  );
}
