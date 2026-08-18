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
    <section className="bg-muted py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-[1.9rem] leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-[2.2rem]">
            What protects your cells should meet a higher standard.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            Lifework is made to strict quality standards and independently
            tested to confirm what is inside every softgel.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
            {BADGES.map((badge) => (
              <div key={badge.label} className="flex flex-col items-start gap-2">
                <badge.icon className="size-5 text-accent" />
                <span className="text-[12.5px] font-semibold text-foreground">{badge.label}</span>
              </div>
            ))}
          </div>

          <button type="button" className="mt-8 cursor-pointer text-[13px] font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-accent">
            View Testing
          </button>
        </div>

        <Placeholder label="Quality / testing image" photo className="aspect-[4/5] w-full lg:aspect-square" />
      </div>
    </section>
  );
}
