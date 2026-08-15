import { Placeholder } from "@/components/lifework/Placeholder";

interface Stressor {
  placeholderLabel: string;
  title: string;
  copy: string;
}

const STRESSORS: Stressor[] = [
  {
    placeholderLabel: "Bright sunlight on skin",
    title: "UV Exposure",
    copy: "Daily sun exposure can increase oxidative stress in the skin.",
  },
  {
    placeholderLabel: "Phone / laptop blue light",
    title: "Prolonged Blue Light",
    copy: "Screen-heavy days can contribute to visual stress and eye fatigue.",
  },
  {
    placeholderLabel: "Urban pollution",
    title: "Environmental Pollution",
    copy: "Pollution adds another layer of oxidative stress your body has to manage.",
  },
  {
    placeholderLabel: "Healthy 40+ or 50+ subject",
    title: "Aging",
    copy: "Your natural antioxidant defenses can decline over time.",
  },
  {
    placeholderLabel: "Intense athletic training",
    title: "Intense Exercise",
    copy: "Hard training creates oxidative stress your body has to recover from.",
  },
];

export function OxidativeStress() {
  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
            THE DAILY PROBLEM
          </p>
          <h2 className="mt-3 text-[32px] font-medium leading-tight text-[var(--lifework-ink)] sm:text-[40px] md:text-[48px]">
            Your cells face oxidative stress every day.
          </h2>
          <p className="mt-5 text-base text-[var(--lifework-ink)] sm:text-lg">
            Sun. Screens. Pollution. Aging. Hard training.
            <br />
            Different stressors. Same cellular problem.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--lifework-ink-soft)]">
            Oxidative stress occurs when reactive molecules overwhelm your body&apos;s natural
            defenses. Over time, that stress can affect the cells behind how you look, feel,
            recover, and age.*
          </p>
        </div>

        {/* Full-bleed horizontal scroll-snap row of tall editorial photography */}
        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {STRESSORS.map((stressor) => (
            <div
              key={stressor.title}
              className="relative aspect-[3/4] w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[320px]"
            >
              <Placeholder className="absolute inset-0 h-full w-full" label={stressor.placeholderLabel} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-medium text-white">{stressor.title}</h3>
                <p className="mt-1 text-sm leading-snug text-white/80">{stressor.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center text-xl font-medium leading-snug text-[var(--lifework-ink)] sm:text-2xl">
          Modern life creates more oxidative stress. Lifework helps strengthen your daily
          defense.*
        </p>
      </div>
    </section>
  );
}
