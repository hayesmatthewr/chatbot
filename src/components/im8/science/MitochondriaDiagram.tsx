interface FlowStep {
  emoji: string;
  label: string;
  detail: string;
}

const steps: FlowStep[] = [
  { emoji: "⚡", label: "INPUTS WE PROVIDE", detail: "NMN, PQQ, Taurine & More" },
  { emoji: "🔋", label: "YOUR MITOCHONDRIA", detail: "Convert Nutrients → ATP Energy" },
  { emoji: "✨", label: "RESULT YOU FEEL", detail: "Sustained Energy & Vitality" },
];

export function MitochondriaDiagram() {
  return (
    <section className="bg-white py-16 px-6 sm:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#50000B]"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          Your Cells Are Energy Factories
        </h2>
        <p className="mt-3 text-lg sm:text-xl text-neutral-600">
          Mitochondria: The Cellular Power Plants
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-700">
          Every cell in your body contains mitochondria, tiny organelles that convert nutrients
          and oxygen into ATP, the energy currency your cells use to function. Think of them as
          power plants inside each cell.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-700">
          The problem? As we age, mitochondria become less efficient and we produce fewer of
          them. The result: declining energy, slower recovery, and accelerated aging.
        </p>

        <div className="mt-14 flex flex-col items-stretch gap-4 sm:mt-16 md:flex-row md:items-center md:gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center md:flex-row md:flex-1">
              <div className="flex w-full flex-col items-center rounded-2xl border border-neutral-200 bg-[#F6F1EA] px-6 py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#50000B] text-3xl">
                  {step.emoji}
                </div>
                <p className="mt-5 text-xs font-bold tracking-[0.15em] text-[#50000B]">
                  {step.label}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{step.detail}</p>
              </div>

              {i < steps.length - 1 && (
                <div
                  className="flex shrink-0 items-center justify-center text-2xl text-[#A40011] md:mx-3"
                  aria-hidden="true"
                >
                  <span className="block rotate-90 md:rotate-0">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
