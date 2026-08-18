import { Placeholder } from "./Placeholder";

const STATS = [
  { title: "Natural Astaxanthin", body: "Sourced from microalgae." },
  { title: "12 mg Daily", body: "A meaningful daily dose in one softgel." },
  { title: "85+ Human Studies", body: "Studied across multiple areas of whole-body health.*" },
];

export function IngredientSpotlight() {
  return (
    <section id="ingredient" className="border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Placeholder label="Ingredient visual" wash className="aspect-square w-full" />

        <div>
          <span className="font-[family-name:var(--font-lifework-red-mono)] text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
            The Ingredient
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
            Meet astaxanthin.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            A deep red antioxidant naturally produced by the microalgae
            Haematococcus pluvialis when it encounters environmental stress.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-secondary">
            Lifework delivers 12 mg in one daily softgel.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-5 rounded-sm border border-border bg-card p-6 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.title}>
                <span className="font-[family-name:var(--font-lifework-red-mono)] text-[10px] tracking-[0.08em] text-accent uppercase">
                  {stat.title}
                </span>
                <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">{stat.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-7 font-[family-name:var(--font-lifework-red-display)] text-[19px] font-medium text-foreground">
            Built by nature for stress.
          </p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-secondary">
            The same molecule algae produce to protect themselves from
            environmental stress helps support your body&apos;s antioxidant
            defenses.*
          </p>

          <a
            href="#studies"
            className="mt-6 inline-block cursor-pointer text-[12.5px] font-semibold tracking-[0.06em] text-foreground uppercase underline-offset-4 hover:underline"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
