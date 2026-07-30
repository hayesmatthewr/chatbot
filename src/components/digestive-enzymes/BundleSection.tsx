export function BundleSection() {
  return (
    <section className="mt-12.5 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <h2 className="text-[23px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#16160f]">
        Hack Your Tummy Bundle
      </h2>
      <p className="mt-2 text-[14.5px] leading-[1.5] text-[#6d6d65]">
        Enzymes handle the meal in front of you. The daily probiotic supports your gut over time.
        Together, they cover both.
        <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
      </p>
      <div className="mt-5.5 flex items-center gap-3">
        <div className="min-w-0 flex-1 rounded-xl border border-[#e9e8e2] p-4 text-center">
          <div aria-hidden="true" className="mb-3 aspect-square w-full rounded-lg bg-[#edece7]" />
          <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#16160f]">
            Digestive Enzymes
          </div>
          <div className="mt-0.5 text-[11.5px] text-[#6d6d65]">16 enzymes · mealtime</div>
        </div>
        <div className="shrink-0 text-xl text-[#9d9d94]">+</div>
        <div className="min-w-0 flex-1 rounded-xl border border-[#e9e8e2] p-4 text-center">
          <div aria-hidden="true" className="mb-3 aspect-square w-full rounded-lg bg-[#edece7]" />
          <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#16160f]">
            60 Billion Probiotic
          </div>
          <div className="mt-0.5 text-[11.5px] text-[#6d6d65]">daily gut support</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3.5 rounded-xl border border-[#e9e8e2] p-4.5">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[20px] font-semibold text-[#16160f]">$49.97</span>
            <span className="text-sm text-[#9d9d94] line-through">$61.94</span>
          </div>
          <div className="mt-0.5 font-semibold text-xs text-[#DC2626]">Save 19%</div>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full bg-[#16160f] px-5 py-3.5 font-semibold text-[12.5px] tracking-[0.03em] text-white shadow-[0_4px_16px_rgba(22,22,15,0.2)] transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_8px_22px_rgba(22,22,15,0.28)]"
        >
          ADD BUNDLE
        </button>
      </div>
    </section>
  );
}
