import { Placeholder } from "@/components/im8/Placeholder";

const maroonGradient = "linear-gradient(135deg, #50000B 0%, #6B0011 100%)";

export function StackSynergy() {
  return (
    <section className="bg-[#F6F1EA] py-16 px-6 sm:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#50000B]"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          Great on Its Own. Unstoppable Together.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-neutral-600">
          Longevity targets aging at the cellular level. Essentials Pro powers your daily
          performance. Together, they&apos;re the Beckham Stack — the complete longevity system.
        </p>

        <p className="mt-10 text-xs font-bold uppercase tracking-widest text-[#50000B]">
          Start Your Longevity Journey
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-8 text-left">
          {/* Card 1: Daily Ultimate Longevity */}
          <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
            <Placeholder className="aspect-square w-full rounded-lg" />
            <h3
              className="mt-5 text-2xl font-normal text-[#50000B]"
              style={{ fontFamily: "var(--font-im8-display), serif" }}
            >
              Daily Ultimate Longevity
            </h3>
            <p className="mt-3 text-sm font-semibold text-[#1a1a1a]">
              Best for: Anyone 30+ looking to prevent cellular aging and establish a strong
              longevity foundation
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              You&apos;re probably in your 30s-40s and want to invest in long-term health before
              symptoms appear. This is proactive aging science.
            </p>
          </div>

          {/* Card 2: The Beckham Stack */}
          <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[#50000B]">
              Complete Health System
            </p>
            <Placeholder className="mt-4 aspect-square w-full rounded-lg" />
            <h3
              className="mt-5 text-2xl font-normal text-[#50000B]"
              style={{ fontFamily: "var(--font-im8-display), serif" }}
            >
              The Beckham Stack
            </h3>
            <p className="mt-3 text-sm font-semibold text-[#1a1a1a]">
              Best for: Anyone who wants comprehensive daily nutrition + advanced anti-aging
              science in one ritual
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              This is David Beckham&apos;s full daily protocol - longevity compounds targeting all
              12 hallmarks of aging PLUS foundational nutrition (energy, focus, gut health,
              immunity, sleep)
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-10 rounded-full px-10 py-4 text-[15px] font-bold text-white shadow-sm transition-opacity hover:opacity-95"
          style={{ background: maroonGradient }}
        >
          Shop the Stack
        </button>
      </div>
    </section>
  );
}
