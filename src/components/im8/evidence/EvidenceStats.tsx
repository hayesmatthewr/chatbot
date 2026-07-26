interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "300mg", label: "NMN NAD+ Energy Booster" },
  { value: "250mg", label: "Trans-Resveratrol" },
  { value: "3mg", label: "Spermidine" },
];

export function EvidenceStats() {
  return (
    <section className="bg-white py-16 px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#50000B]">
          The Science
        </p>
        <h2
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-normal text-[#50000B]"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          Evidence-Based Longevity
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-neutral-600">
          Every ingredient in IM8 Longevity is dosed based on published human clinical
          trials—not marketing convenience. We use therapeutic doses proven effective in
          peer-reviewed research, ensuring you get real benefits backed by science.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="text-4xl sm:text-5xl font-normal text-[#50000B]"
                style={{ fontFamily: "var(--font-im8-display), serif" }}
              >
                {stat.value}
              </span>
              <span className="mt-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
