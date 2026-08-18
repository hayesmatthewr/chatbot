import { Dumbbell, Monitor, Sun, Wind } from "lucide-react";
import { Placeholder } from "./Placeholder";

const STRESSORS = [
  { icon: Sun, label: "UV Exposure" },
  { icon: Monitor, label: "Blue Light" },
  { icon: Wind, label: "Pollution" },
  { icon: Sun, label: "Aging" },
  { icon: Dumbbell, label: "Intense Exercise" },
];

export function ProblemSection() {
  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Our bodies weren&apos;t built for modern oxidative stress.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Sun, screens, pollution, stress, hard training, and aging all create
            oxidative stress. Over time, that stress can wear on the cells
            behind how you look, feel, perform, and age.*
          </p>
          <a
            href="#mechanism"
            className="mt-5 inline-block cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
          >
            Learn More
          </a>

          <div className="mt-6 flex flex-wrap gap-2">
            {STRESSORS.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-secondary"
              >
                <s.icon className="size-3.5 text-accent" />
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <Placeholder label="Cellular / oxidative stress visual" aspect="aspect-square w-full" />
      </div>
    </section>
  );
}
