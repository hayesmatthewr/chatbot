export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary py-10 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-lg font-extrabold tracking-tight">Lifework</span>
          <div className="flex items-center gap-6 text-xs text-primary-foreground/70">
            <a href="#top" className="cursor-pointer transition-colors duration-200 hover:text-primary-foreground">
              Privacy Policy
            </a>
            <a href="#top" className="cursor-pointer transition-colors duration-200 hover:text-primary-foreground">
              Terms of Service
            </a>
            <a href="#top" className="cursor-pointer transition-colors duration-200 hover:text-primary-foreground">
              Contact
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-primary-foreground/60">
          *These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
