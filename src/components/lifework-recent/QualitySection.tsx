import { Award, BadgeCheck, FlaskConical, Leaf, ShieldCheck } from "lucide-react";
import { Placeholder } from "./Placeholder";

const BADGES = [
  { icon: FlaskConical, label: "Third-Party Tested" },
  { icon: Award, label: "Made in the USA" },
  { icon: Leaf, label: "Non-GMO" },
  { icon: ShieldCheck, label: "Purity Verified" },
  { icon: BadgeCheck, label: "1 Softgel Daily" },
];

export function QualitySection() {
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
            What protects your cells should meet a higher standard.
          </h2>
          <p className="mt-3 text-[15px] leading-[22px] text-secondary">
            Lifework is made to strict quality standards and independently
            tested to confirm what is inside every softgel.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {BADGES.map((badge) => (
              <div key={badge.label} className="rounded-[16px] bg-card p-4">
                <badge.icon className="size-4 text-foreground" strokeWidth={1.75} />
                <span className="mt-2 block text-[12px] font-medium text-foreground">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 flex h-9 w-fit cursor-pointer sm:h-7 items-center rounded-full bg-card px-2 text-[13px] text-foreground transition-opacity duration-200 hover:opacity-70"
          >
            View Testing
          </button>
        </div>

        <Placeholder label="Quality / testing image" className="aspect-[4/5] w-full lg:aspect-square" />
      </div>
    </section>
  );
}
