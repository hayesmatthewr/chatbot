import Image from "next/image";

/** Stylized "Arq8" logomark — a rounded, pinwheel-style square glyph (matches SiteHeader). */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="6.2 3.6"
      />
    </svg>
  );
}

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  { title: "SHOP", links: ["Powder", "Gummies"] },
  { title: "LEARN MORE", links: ["About Us", "Science Behind"] },
  { title: "SUPPORT", links: ["Contact Us", "My Subscription"] },
  {
    title: "LEGAL",
    links: [
      "Money-Back Guarantee",
      "Terms and Conditions",
      "Privacy Policy",
      "Shipping Policy",
      "Refund Policy",
    ],
  },
];

const SOCIAL_LINKS: { name: string; src: string; hasOwnBg: boolean }[] = [
  { name: "Instagram", src: "/images/inst-icon.svg", hasOwnBg: false },
  { name: "Facebook", src: "/images/FB.svg", hasOwnBg: true },
  { name: "TikTok", src: "/images/tik-tok-icon.svg", hasOwnBg: true },
];

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#191919] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-10 md:px-10">
        {/* Logo + social row */}
        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-6">
          <a href="#" className="flex items-center gap-1.5">
            <LogoMark className="h-5 w-5" />
            <Image
              src="/images/footer-logo.svg"
              alt="Arq8"
              width={70}
              height={19}
              className="h-[19px] w-auto"
            />
          </a>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) =>
              social.hasOwnBg ? (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md"
                >
                  <img
                    src={social.src}
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-8"
                  />
                </a>
              ) : (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white"
                >
                  <img
                    src={social.src}
                    alt=""
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  />
                </a>
              )
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="max-w-xl pt-6 text-sm text-white/90">
          Supporting ATP renewal in 37 trillion cells &mdash; for strength,
          clarity, and resilience that lasts.
        </p>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-10 sm:grid-cols-4 md:gap-x-10">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-white/45">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/90 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer box */}
        <div className="mt-10 border border-white/20 px-4 py-3">
          <p className="text-center text-xs text-white/70">
            *Results may vary. These statements have not been evaluated by
            the Food and Drug Administration. This product is not intended
            to diagnose, treat, cure or prevent any disease.
          </p>
        </div>
      </div>

      {/* Bottom photo strip */}
      <div className="mt-10 w-full bg-[url('/images/footer-bottom.jpg')] bg-cover bg-center py-20">
        <div className="flex flex-col items-center justify-center gap-1 px-4 text-center">
          <p className="text-sm text-white">&copy; 2026 Arq8 Longevity&trade;</p>
          <p className="text-sm text-white">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
