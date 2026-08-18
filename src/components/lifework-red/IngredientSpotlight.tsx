import { Placeholder } from "./Placeholder";

export function IngredientSpotlight() {
  return (
    <section id="ingredient" className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Placeholder label="Ingredient visual" photo className="aspect-square w-full" />

        <div>
          <h2 className="text-[1.9rem] leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-[2.2rem]">
            Meet astaxanthin.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-secondary">
            A deep red antioxidant naturally produced by the microalgae
            Haematococcus pluvialis when it encounters environmental stress.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-secondary">
            Lifework delivers 12 mg in one daily softgel.
          </p>

          <div className="mt-7">
            <div className="flex items-center justify-between text-[12.5px] font-semibold text-foreground">
              <span>Natural Astaxanthin</span>
              <span className="font-[family-name:var(--font-lifework-red-mono)] text-muted-foreground">
                12 mg / softgel
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-full rounded-full bg-accent" />
            </div>
            <p className="mt-2 text-[12.5px] text-muted-foreground">
              100% active dose — no fillers, blends, or proprietary dilution.
            </p>
          </div>

          <p className="mt-8 text-[18px] font-bold text-foreground">Built by nature for stress.</p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-secondary">
            The same molecule algae produce to protect themselves from
            environmental stress helps support your body&apos;s antioxidant
            defenses.*
          </p>

          <a
            href="#studies"
            className="mt-6 inline-block cursor-pointer text-[13px] font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
