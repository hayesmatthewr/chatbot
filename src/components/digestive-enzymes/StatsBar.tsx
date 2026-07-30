const STATS = [
  { n: "16", label: "Enzymes", sub: "across all 6 food groups" },
  { n: "#1", label: "Enzyme Brand", sub: "in the United States", note: "*" },
  { n: "250k+", label: "Five-star reviews", sub: "across Physician's Choice" },
  { n: "60", label: "Day Guarantee", sub: "risk-free trial" },
];

export function StatsBar() {
  return (
    <section
      aria-label="Key facts"
      className="mt-8.5 grid grid-cols-2 gap-x-3.5 gap-y-6.5 bg-[#16160f] px-5 py-8.5 lg:mx-auto lg:max-w-[860px] lg:grid-cols-4 lg:gap-6 lg:rounded-2xl"
    >
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-[32px] leading-none font-bold tracking-[-0.02em] text-[#E36579] tabular-nums">
            {s.n}
          </div>
          <div className="mt-2 text-[12.5px] font-semibold text-white">{s.label}</div>
          <div className="mt-0.5 text-[11px] text-white/68">
            {s.sub}
            {s.note && <sup className="text-[0.58em] leading-none font-normal">{s.note}</sup>}
          </div>
        </div>
      ))}
    </section>
  );
}
