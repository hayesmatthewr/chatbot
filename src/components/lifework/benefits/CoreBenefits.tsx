import { Placeholder } from "@/components/lifework/Placeholder";

interface Pillar {
  label: string;
  title: string;
  copy: string;
  placeholderLabel: string;
}

const PILLARS: Pillar[] = [
  {
    label: "LOOK",
    title: "Skin Health",
    copy: "Supports hydration, elasticity, and resilience to environmental stress.*",
    placeholderLabel: "35+ woman in natural sunlight",
  },
  {
    label: "FEEL",
    title: "Eyes + Cognition",
    copy: "Supports eye comfort, visual endurance, and healthy cognitive function.*",
    placeholderLabel: "premium screen / eye / working lifestyle",
  },
  {
    label: "PERFORM",
    title: "Performance + Recovery",
    copy: "Supports endurance, muscle recovery, and resilience after hard effort.*",
    placeholderLabel: "athlete post-training or in motion",
  },
];

export function CoreBenefits() {
  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[32px] font-medium leading-tight text-[var(--lifework-ink)] sm:text-[40px] md:text-[48px]">
            Protect how you look, feel, and perform.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--lifework-ink-soft)] sm:text-lg">
            Oxidative stress does not stay in one place. Lifework supports the cells behind
            the things you notice every day.*
          </p>
        </div>

        {/* Desktop / tablet: editorial 3-column grid, image-forward */}
        <div className="mt-16 hidden gap-10 md:grid md:grid-cols-3 md:gap-8">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.label} pillar={pillar} />
          ))}
        </div>

        {/* Mobile: horizontal swipe carousel, CSS scroll-snap only, no JS */}
        <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:hidden">
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="w-[85%] shrink-0 snap-center">
              <PillarCard pillar={pillar} />
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-sm text-[var(--lifework-ink-soft)]">
          One daily softgel. Whole-body cellular support.*
        </p>
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="flex flex-col">
      <Placeholder className="aspect-[4/5] w-full rounded-2xl" label={pillar.placeholderLabel} />
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
          {pillar.label}
        </p>
        <h3 className="mt-2 text-xl font-medium text-[var(--lifework-ink)]">{pillar.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--lifework-ink-soft)]">
          {pillar.copy}
        </p>
      </div>
    </div>
  );
}
