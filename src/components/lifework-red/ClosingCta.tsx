import { Placeholder } from "./Placeholder";

export function ClosingCta() {
  return (
    <section className="border-t border-border bg-background">
      <Placeholder
        label="Full-width brand / lifestyle image"
        wash
        className="aspect-[21/9] w-full rounded-none border-x-0"
      />

      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-lifework-red-display)] text-[2rem] leading-[1.15] font-medium text-foreground sm:text-[2.3rem]">
          Protect the body you&apos;re asking to last a lifetime.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-secondary">
          One softgel a day for ongoing cellular protection.*
        </p>

        <Placeholder label="Product image" wash className="mx-auto mt-10 aspect-square w-40" />

        <button
          type="button"
          className="mt-10 w-full max-w-xs cursor-pointer rounded-sm bg-primary py-3.5 text-[13.5px] font-semibold tracking-[0.03em] text-primary-foreground uppercase transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Start Your Lifework
        </button>
      </div>
    </section>
  );
}
