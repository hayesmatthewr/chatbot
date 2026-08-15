import { Placeholder } from "@/components/lifework/Placeholder";
import { ArrowRightIcon } from "@/components/lifework/icons";

interface Fact {
  value: string;
  description: string;
}

const FACTS: Fact[] = [
  { value: "12 MG DAILY", description: "A meaningful daily dose in one softgel." },
  { value: "NATURAL ASTAXANTHIN", description: "Sourced from Haematococcus pluvialis microalgae." },
  {
    value: "85+ HUMAN STUDIES",
    description: "Studied across skin, eyes, performance, cognition, and cellular health.",
  },
];

const IMAGES = [
  "Haematococcus pluvialis microalgae",
  "Red astaxanthin pigment",
  "Molecular structure",
  "Finished red softgel",
];

export function IngredientStory() {
  return (
    <section className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lifework-red)]">
            THE INGREDIENT
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Meet astaxanthin.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--lifework-ink-soft)] sm:text-lg">
            A naturally occurring antioxidant produced by the microalgae Haematococcus pluvialis
            when its environment becomes stressful. That same natural defense molecule is what
            powers Lifework.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 md:grid-cols-4 md:gap-4">
          {IMAGES.map((label) => (
            <Placeholder key={label} className="aspect-[3/4] rounded-2xl" label={label} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 divide-y divide-[var(--lifework-line)] sm:mt-20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {FACTS.map((fact) => (
            <div key={fact.value} className="py-6 first:pt-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <p className="text-lg font-semibold tracking-tight sm:text-xl">{fact.value}</p>
              <p className="mt-2 text-sm text-[var(--lifework-ink-soft)]">{fact.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl border-t border-[var(--lifework-line)] pt-14 sm:mt-20 sm:pt-16">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built by nature for stress.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[var(--lifework-ink-soft)]">
            Astaxanthin&apos;s unusual molecular structure is what allows it to interact with cell
            membranes differently from many common antioxidants.*
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lifework-red)] hover:text-[var(--lifework-red-dark)]"
          >
            Explore the science
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
