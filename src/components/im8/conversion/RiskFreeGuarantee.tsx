type TrustBadge = {
  icon: string;
  label: string;
};

const TRUST_BADGES: TrustBadge[] = [
  { icon: "🛡️", label: "90-Day Guarantee (Quarterly)" },
  { icon: "🛡️", label: "30-Day Guarantee (Monthly)" },
  { icon: "🚚", label: "Free Shipping" },
  { icon: "✕", label: "Cancel Anytime" },
  { icon: "✓", label: "NSF Certified" },
];

export function RiskFreeGuarantee() {
  return (
    <section className="bg-white py-16 px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#50000B]">Our Promise</p>
        <h2
          className="mt-3 text-4xl sm:text-5xl md:text-6xl font-normal text-[#50000B]"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          Risk-Free
        </h2>
        <p className="mt-3 text-base sm:text-lg text-neutral-600">
          Feel it, or get your money back.
        </p>

        <div className="mt-12 flex justify-center">
          <div className="flex h-56 w-56 shrink-0 flex-col items-center justify-center rounded-full border-4 border-[#50000B] text-center sm:h-64 sm:w-64">
            <span
              className="text-3xl sm:text-4xl font-normal text-[#50000B]"
              style={{ fontFamily: "var(--font-im8-display), serif" }}
            >
              90 Day
            </span>
            <span className="mt-2 max-w-[10rem] text-[11px] font-bold uppercase tracking-widest text-[#50000B]">
              Guarantee &middot; Quarterly Plan
            </span>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600">
          Three full months to experience the difference. If you don&apos;t feel it — complete
          refund, no questions.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-5 sm:gap-6">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                {badge.icon}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1a1a1a]">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
