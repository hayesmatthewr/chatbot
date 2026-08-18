import { Placeholder } from "./Placeholder";

export function ClosingCta() {
  return (
    <section className="bg-background">
      <Placeholder
        label="Full-width brand / lifestyle image"
        className="aspect-[21/9] w-full rounded-none"
      />

      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-[20px] leading-[22.5px] font-medium tracking-tight text-foreground">
          Protect the body you&apos;re asking to last a lifetime.
        </h2>
        <p className="mt-3 text-[15px] leading-[22px] text-secondary">
          One softgel a day for ongoing cellular protection.*
        </p>

        <Placeholder label="Product image" className="mx-auto mt-8 aspect-square w-40" />

        <button
          type="button"
          className="mx-auto mt-8 flex h-11 w-full max-w-xs cursor-pointer items-center justify-center rounded-full bg-primary text-[13px] font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Start Your Lifework
        </button>
      </div>
    </section>
  );
}
