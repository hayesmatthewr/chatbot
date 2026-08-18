import { ShoppingBag, Star } from "lucide-react";

const PRODUCTS = [
  {
    name: "Aurora",
    origin: "Colombia · Huila",
    roast: "Light roast",
    notes: "Red apple, brown sugar, jasmine",
    price: "$22",
    gradient: "linear-gradient(135deg, #e7c992 0%, #a16207 60%, #6b4708 100%)",
    badge: "New crop",
  },
  {
    name: "Meridian",
    origin: "Ethiopia · Yirgacheffe",
    roast: "Medium roast",
    notes: "Bergamot, stone fruit, honey",
    price: "$22",
    gradient: "linear-gradient(135deg, #c99a5b 0%, #7c4a12 60%, #3f2508 100%)",
    badge: "Bestseller",
  },
  {
    name: "Eclipse",
    origin: "Sumatra · Mandheling",
    roast: "Dark roast",
    notes: "Dark chocolate, cedar, molasses",
    price: "$22",
    gradient: "linear-gradient(135deg, #6b5744 0%, #33241a 60%, #14100c 100%)",
    badge: null,
  },
] as const;

export function ProductGrid() {
  return (
    <section id="shop" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-solstice-display)] text-3xl font-semibold text-foreground sm:text-4xl">
            Three roasts. One promise: roasted this week.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every bag ships with a roast date printed on the label — not a
            &quot;best by&quot; guess.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <div
                className="relative flex h-48 items-center justify-center"
                style={{ background: product.gradient }}
              >
                {product.badge && (
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase backdrop-blur-sm">
                    {product.badge}
                  </span>
                )}
                <span className="font-[family-name:var(--font-solstice-display)] text-4xl font-semibold text-white/90">
                  {product.name}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-secondary uppercase">
                  <span>{product.origin}</span>
                  <span>{product.roast}</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Tasting notes: {product.notes}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-solstice-display)] text-xl font-semibold text-foreground">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <ShoppingBag className="size-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-xl border border-accent/30 bg-muted p-8 sm:flex-row">
          <div>
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-accent" />
              ))}
            </div>
            <h3 className="mt-2 font-[family-name:var(--font-solstice-display)] text-xl font-semibold text-foreground">
              Founder&apos;s Trio — all three roasts, one box
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The easiest way to find your everyday roast. Save $8 versus buying
              separately.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:hover:translate-y-0"
          >
            Add trio · $58
          </button>
        </div>
      </div>
    </section>
  );
}
