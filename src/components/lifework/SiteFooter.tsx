const COLUMNS = [
  { title: "SHOP", links: ["Cellular Protection", "Subscribe & Save", "Gift a Subscription"] },
  { title: "LEARN", links: ["How It Works", "Clinical Studies", "The Ingredient", "Reviews"] },
  { title: "COMPANY", links: ["About Lifework", "Quality & Testing", "Contact Us"] },
  { title: "SUPPORT", links: ["FAQs", "Track My Order", "Returns / Exchanges"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-[var(--lifework-ink)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        <div className="text-2xl font-semibold tracking-tight">Lifework</div>

        <div className="mt-10 grid grid-cols-2 gap-8 border-b border-white/15 pb-12 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold tracking-[0.1em] text-white/50">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13.5px] text-white/85 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[12.5px] text-white/60 md:flex-row">
          <span>&copy; 2026 Lifework</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-[11px] text-white/40">
          *These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
