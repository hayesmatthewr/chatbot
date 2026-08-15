import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/lifework/Placeholder";

interface Stage {
  time: string;
  title: string;
  body: string;
  visualLabel: string;
}

const STAGES: Stage[] = [
  {
    time: "DAY 1",
    title: "Astaxanthin enters circulation",
    body: "Your first softgel is absorbed and astaxanthin begins circulating through the body.",
    visualLabel: "Softgel / circulation visual",
  },
  {
    time: "WEEK 2",
    title: "Daily cellular defense builds",
    body: "Consistent use helps provide ongoing antioxidant support against everyday oxidative stress.*",
    visualLabel: "Cellular imagery",
  },
  {
    time: "WEEK 4",
    title: "Support starts becoming more noticeable",
    body: "Clinical research begins showing benefits across areas such as skin, eye comfort, and recovery depending on the endpoint studied.*",
    visualLabel: "Skin close-up",
  },
  {
    time: "WEEK 8",
    title: "Cellular protection compounds",
    body: "Consistent daily use continues supporting the cells behind your skin, eyes, muscles, and whole-body health.*",
    visualLabel: "Exercise recovery lifestyle",
  },
  {
    time: "WEEK 12+",
    title: "The long game",
    body: "Lifework is designed for ongoing cellular protection. Consistency is where the benefit compounds.",
    visualLabel: "Eyes / vitality lifestyle",
  },
];

export function BenefitsOverTime() {
  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
          WHAT TO EXPECT
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--lifework-ink)] sm:text-4xl">
          Your cells benefit before you notice.
        </h2>
        <p className="mt-4 max-w-xl text-base text-[var(--lifework-ink-soft)]">
          Cellular protection begins below the surface. Visible and felt benefits build with
          consistent daily use.*
        </p>

        <div className="mt-14 -mx-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory md:-mx-10 md:px-10 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <div className="flex gap-8 lg:grid lg:grid-cols-5 lg:gap-6">
            {STAGES.map((stage) => (
              <div
                key={stage.time}
                className={cn(
                  "w-[220px] shrink-0 snap-start",
                  "lg:w-auto lg:border-r lg:border-[var(--lifework-line)] lg:pr-6 lg:last:border-r-0 lg:last:pr-0"
                )}
              >
                <div className="relative h-px w-full bg-[var(--lifework-line)]">
                  <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--lifework-red)]" />
                </div>

                <p className="mt-6 font-mono text-sm font-semibold tabular-nums text-[var(--lifework-red)]">
                  {stage.time}
                </p>

                <Placeholder
                  className="mt-3 aspect-[3/4] w-full rounded-xl"
                  label={stage.visualLabel}
                />

                <h3 className="mt-4 text-base font-medium text-[var(--lifework-ink)]">
                  {stage.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-[var(--lifework-ink-soft)]">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
