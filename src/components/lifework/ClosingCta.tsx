import { Placeholder } from "./Placeholder";

export function ClosingCta() {
  return (
    <section className="border-t border-border bg-background">
      <Placeholder
        label="Full-width brand / lifestyle image"
        aspect="aspect-[21/9] w-full"
        className="rounded-none border-x-0"
      />

      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Protect the body you&apos;re asking to last a lifetime.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-secondary">
          One softgel a day for ongoing cellular protection.*
        </p>

        <Placeholder label="Product image" aspect="aspect-square" className="mx-auto mt-8 w-40" />

        <button
          type="button"
          className="mt-8 w-full max-w-xs cursor-pointer rounded-lg bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Start Your Lifework
        </button>
      </div>
    </section>
  );
}
