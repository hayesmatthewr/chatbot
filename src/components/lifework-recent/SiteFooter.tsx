export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-[15px] font-medium text-foreground">Lifework</span>
          <div className="flex items-center gap-1">
            <a href="#top" className="flex h-9 cursor-pointer items-center rounded-full px-3 text-[12px] text-secondary transition-colors duration-200 hover:bg-muted sm:h-7">
              Privacy Policy
            </a>
            <a href="#top" className="flex h-9 cursor-pointer items-center rounded-full px-3 text-[12px] text-secondary transition-colors duration-200 hover:bg-muted sm:h-7">
              Terms of Service
            </a>
            <a href="#top" className="flex h-9 cursor-pointer items-center rounded-full px-3 text-[12px] text-secondary transition-colors duration-200 hover:bg-muted sm:h-7">
              Contact
            </a>
          </div>
        </div>

        <p className="mt-6 text-[11px] leading-[14px] text-muted-foreground">
          *These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
