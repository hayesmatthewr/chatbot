import { Placeholder } from "@/components/lifework/Placeholder";

export function BrandClose() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden px-6">
      <Placeholder
        className="absolute inset-0 h-full w-full"
        label="Full-width emotional lifestyle image — the long game"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-6 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/90">THE LONG GAME</p>

        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-[48px]">
          Protect the body you&rsquo;re asking to last a lifetime.
        </h2>

        <p className="max-w-xl text-base text-white/85 sm:text-lg">
          Daily protection for the cells behind how you look, feel, perform, and age.*
        </p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Placeholder className="h-24 w-24 rounded-2xl" label="product image + softgel" />
          <a
            href="#"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--lifework-ink)] transition-opacity hover:opacity-90"
          >
            Start Your Lifework
          </a>
        </div>
      </div>
    </section>
  );
}
