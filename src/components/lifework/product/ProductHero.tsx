import { ProductGallery } from "@/components/lifework/product/ProductGallery";
import { PlanPicker } from "@/components/lifework/product/PlanPicker";
import { CheckIcon, StarIcon } from "@/components/lifework/icons";

const BENEFITS = [
  "Helps defend cells from oxidative stress*",
  "Supports skin and eye health*",
  "Supports performance and recovery*",
  "1 softgel daily",
];

const QUICK_LINKS = ["12 mg Astaxanthin", "How It Works", "Clinical Studies"];

/**
 * Above-the-fold buy box: image gallery on the left, purchase-decision
 * copy and the plan picker on the right. Server component — interactivity
 * lives in the ProductGallery / PlanPicker client sub-components it
 * composes. On mobile the grid stacks gallery above copy by default.
 */
export function ProductHero() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-0.5 text-[var(--lifework-red)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="h-4 w-4" />
                ))}
              </span>
              <span className="font-semibold text-[var(--lifework-ink)]">4.5</span>
              <span className="text-[var(--lifework-ink-soft)]">from 4,100 reviews</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
              DAILY CELLULAR PROTECTION
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--lifework-ink)] sm:text-5xl">
              Daily Cellular Protection
            </h1>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--lifework-line)] px-3 py-1.5 text-xs font-medium text-[var(--lifework-ink)]">
              <CheckIcon className="h-3.5 w-3.5 text-[var(--lifework-red)]" />
              85+ Human Clinical Studies
            </span>

            <p className="text-base leading-relaxed text-[var(--lifework-ink-soft)]">
              12 mg of natural astaxanthin to help protect your cells from the oxidative stress of
              everyday life, supporting your skin, eyes, recovery, and whole-body resilience.*
            </p>

            <ul className="flex flex-col gap-2.5">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-[var(--lifework-ink)]">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lifework-red)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {QUICK_LINKS.map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="rounded-full border border-[var(--lifework-line)] px-3.5 py-1.5 text-xs font-medium text-[var(--lifework-ink)] transition-colors hover:border-[var(--lifework-ink-faint)]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <PlanPicker />
        </div>
      </div>
    </div>
  );
}
