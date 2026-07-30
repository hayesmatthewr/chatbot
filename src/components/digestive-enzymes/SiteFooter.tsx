const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: ["Digestive Enzymes", "60 Billion Probiotic", "Bundles"],
  },
  {
    title: "Learn",
    links: ["How Enzymes Work", "Our Doctors", "Our Story"],
  },
  {
    title: "Support",
    links: ["Contact", "Shipping & Returns", "FAQ"],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#16160f] px-5 pt-11 text-white">
      <div className="mx-auto flex max-w-[860px] flex-wrap gap-x-11 gap-y-7">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-[13px] font-medium text-[11px] tracking-[0.1em] text-white/55 uppercase">
              {col.title}
            </h4>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="mb-2.5 block text-sm text-white/90 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-[860px] text-[11px] leading-[1.55] text-white/60">
        <p className="mb-2.5">
          <sup className="mr-px text-[0.58em]">‡</sup>These statements have not been evaluated by
          the Food and Drug Administration. This product is not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
        <p>
          <sup className="mr-px text-[0.58em]">♢</sup>Developed with our team of Physician&rsquo;s
          Choice doctors. Please talk to your doctor before starting any new health routine.
          Individual results may vary.
        </p>
      </div>

      <div className="mx-auto mt-6.5 flex max-w-[860px] items-center justify-between border-t border-white/18 py-4.5 text-[11px] text-white/60">
        <span>© 2026 Physician&rsquo;s Choice. All rights reserved.</span>
        <span className="flex gap-4">
          <a href="#" aria-label="Physician's Choice on Instagram" className="opacity-85 hover:opacity-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="#fff">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
            </svg>
          </a>
          <a href="#" aria-label="Physician's Choice on TikTok" className="opacity-85 hover:opacity-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="#fff">
              <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" />
              <path d="M14 4c.4 2.4 2 4 4.5 4.2" />
            </svg>
          </a>
        </span>
      </div>

      <div className="pt-2.5 pb-5.5 text-center text-[46px] leading-none font-bold tracking-[-0.03em] text-white">
        Physician&rsquo;s Choice
        <small className="mt-2 block font-medium text-[10px] tracking-[0.22em] text-white/50 uppercase">
          Digestive Enzymes
        </small>
      </div>
    </footer>
  );
}
