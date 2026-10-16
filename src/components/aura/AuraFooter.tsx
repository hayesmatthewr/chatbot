import { fdaDisclaimer } from "./content";

const columns = [
  { title: "Shop", links: [{ label: "Daily Cellular Protection", href: "#buy" }, { label: "Subscribe & Save", href: "#buy" }] },
  { title: "Learn", links: [{ label: "The Science", href: "#benefits" }, { label: "Reviews", href: "#reviews" }, { label: "FAQ", href: "#faq-title" }] },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#top" },
      { label: "Shipping & Returns", href: "#top" },
      { label: "Manage Subscription", href: "#top" },
    ],
  },
];

export function AuraFooter() {
  return (
    <footer className="bg-aura-night pt-16 pb-28 text-white md:pt-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <p className="max-w-[24ch] text-[22px] leading-[1.25] font-medium md:col-span-4">Natural astaxanthin for daily cellular protection.</p>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2">
              <p className="text-[15px] text-white/70">{col.title}</p>
              <ul className="mt-3 flex flex-col gap-2 text-[16px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-aura-red">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p aria-hidden className="mt-16 text-[min(36vw,540px)] leading-[0.78] font-bold tracking-[-0.06em] text-aura-red select-none">
          AURA
        </p>

        <div className="mt-10 flex flex-col gap-4 text-[14px] leading-[1.5] text-white/75">
          <p>© 2026 Aura · Third-party tested · 12-Week Results Guarantee†</p>
          <p className="max-w-[90ch]">{fdaDisclaimer}</p>
          <p className="max-w-[90ch]">† Guarantee terms apply. See the Real Results Guarantee for details.</p>
        </div>
      </div>
    </footer>
  );
}
