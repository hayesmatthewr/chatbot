export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <span className="font-[family-name:var(--font-lifework-red-display)] text-[20px] font-medium italic">
            Lifework
          </span>
          <div className="flex items-center gap-7 font-[family-name:var(--font-lifework-red-mono)] text-[11px] tracking-[0.04em] uppercase">
            <a href="#top" className="cursor-pointer opacity-70 transition-opacity duration-200 hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#top" className="cursor-pointer opacity-70 transition-opacity duration-200 hover:opacity-100">
              Terms of Service
            </a>
            <a href="#top" className="cursor-pointer opacity-70 transition-opacity duration-200 hover:opacity-100">
              Contact
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-primary-foreground/15 pt-6 text-[12px] leading-relaxed opacity-60">
          *These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
