import { Placeholder } from "@/components/lifework/Placeholder";
import { ArrowRightIcon, CheckIcon } from "@/components/lifework/icons";

interface QualityPoint {
  label: string;
  description?: string;
}

const QUALITY_POINTS: QualityPoint[] = [
  { label: "Third-Party Tested", description: "Tested for purity and potency." },
  { label: "Heavy Metal + Contaminant Testing", description: "Screened for unwanted contaminants." },
  { label: "GMP Manufactured", description: "Produced under Good Manufacturing Practices." },
  { label: "FDA-Registered Facility", description: "Manufactured in an FDA-registered facility." },
  { label: "Natural Astaxanthin", description: "No synthetic astaxanthin." },
  { label: "Non-GMO" },
  { label: "Gluten-Free" },
  {
    label: "No Unnecessary Fillers",
    description: "No artificial colors, preservatives, or unnecessary fillers.",
  },
];

export function QualityTesting() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
            QUALITY
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            What protects your cells should meet a higher standard.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--lifework-ink-soft)] sm:text-lg">
            Every Lifework batch is made to strict quality standards and tested to confirm what
            is inside the softgel and what is not.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 sm:mt-16 lg:grid-cols-2 lg:items-start">
          <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {QUALITY_POINTS.map((point) => (
              <div key={point.label} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-[var(--lifework-red)]" />
                <div>
                  <p className="text-sm font-semibold">{point.label}</p>
                  {point.description && (
                    <p className="mt-1 text-sm text-[var(--lifework-ink-soft)]">{point.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Placeholder
            className="aspect-[4/5] w-full rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[520px]"
            label="Softgel in hand / testing environment / lab close-up"
          />
        </div>

        <a
          href="#"
          className="mt-14 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lifework-red)] hover:text-[var(--lifework-red-dark)] sm:mt-16"
        >
          View Certificate of Analysis
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
