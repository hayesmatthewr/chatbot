import { Placeholder } from "./Placeholder";

const STATS = [
  {
    title: "Natural Astaxanthin",
    body: "Sourced from microalgae.",
  },
  {
    title: "12 mg Daily",
    body: "A meaningful daily dose in one softgel.",
  },
  {
    title: "85+ Human Studies",
    body: "Studied across multiple areas of whole-body health.*",
  },
];

export function IngredientSpotlight() {
  return (
    <section id="ingredient" className="border-t border-border bg-background py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Placeholder label="Ingredient visual" aspect="aspect-square w-full" />

        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Meet astaxanthin.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            A deep red antioxidant naturally produced by the microalgae
            Haematococcus pluvialis when it encounters environmental stress.
          </p>
          <p className="mt-3 text-base leading-relaxed text-secondary">
            Lifework delivers 12 mg in one daily softgel.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 border-t border-border pt-6 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.title}>
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {stat.title}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-secondary">{stat.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-base font-bold text-foreground">
            Built by nature for stress.
          </p>
          <p className="mt-2 text-base leading-relaxed text-secondary">
            The same molecule algae produce to protect themselves from
            environmental stress helps support your body&apos;s antioxidant
            defenses.*
          </p>

          <a
            href="#studies"
            className="mt-5 inline-block cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
