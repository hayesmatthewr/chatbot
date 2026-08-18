import { Placeholder } from "./Placeholder";

export function IngredientSpotlight() {
  return (
    <section id="ingredient" className="bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Placeholder label="Ingredient visual" className="aspect-square w-full" />

        <div>
          <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
            Meet astaxanthin.
          </h2>
          <p className="mt-3 text-[15px] leading-[22px] text-secondary">
            A deep red antioxidant naturally produced by the microalgae
            Haematococcus pluvialis when it encounters environmental stress.
          </p>
          <p className="mt-2 text-[15px] leading-[22px] text-secondary">
            Lifework delivers 12 mg in one daily softgel.
          </p>

          <div className="mt-6 rounded-[24px] bg-muted p-6">
            <div className="flex items-center justify-between text-[13px] font-medium text-foreground">
              <span>Natural Astaxanthin</span>
              <span className="text-muted-foreground">12 mg / softgel</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-card">
              <div className="h-full w-full rounded-full bg-foreground" />
            </div>
            <p className="mt-2 text-[12px] text-muted-foreground">
              100% active dose — no fillers, blends, or proprietary dilution.
            </p>
          </div>

          <p className="mt-6 text-[15px] font-medium text-foreground">Built by nature for stress.</p>
          <p className="mt-1 text-[13px] leading-[20px] text-secondary">
            The same molecule algae produce to protect themselves from
            environmental stress helps support your body&apos;s antioxidant
            defenses.*
          </p>

          <a
            href="#studies"
            className="mt-4 flex h-7 w-fit cursor-pointer items-center rounded-full px-2 text-[13px] text-foreground transition-colors duration-200 hover:bg-muted"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
