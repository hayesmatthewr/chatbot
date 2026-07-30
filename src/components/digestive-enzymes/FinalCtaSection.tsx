"use client";

import { usePageState } from "./PageState";

export function FinalCtaSection() {
  const { scrollToCta } = usePageState();

  return (
    <section className="mt-12 bg-[#16160f] px-5 py-12 text-center text-white lg:px-10">
      <div className="lg:mx-auto lg:max-w-[600px]">
        <h2 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
          Eat what you love. Actually digest it.
        </h2>
        <p className="mt-3 text-[14.5px] text-white/80">
          16 enzymes, plus probiotics and prebiotics. Developed with doctors. 60-day money-back
          guarantee.
        </p>
        <div className="mt-5 font-medium text-xs tracking-[0.05em] text-white/85">
          BEST VALUE · 180 COUNT · $0.30/MEAL · SAVE 45%
        </div>
        <button
          type="button"
          onClick={scrollToCta}
          className="mx-auto mt-3.5 w-full max-w-[320px] rounded-full bg-white px-5 py-[18px] font-bold text-sm tracking-[0.04em] text-[#16160f] shadow-[0_8px_26px_rgba(0,0,0,0.28)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(0,0,0,0.36)]"
        >
          GET DIGESTIVE ENZYMES
        </button>
        <div className="mt-3.5 text-xs text-white/70">
          ★★★★★ 250,000+ five-star reviews
        </div>
      </div>
    </section>
  );
}
