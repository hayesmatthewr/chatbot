const COLUMNS = [
  { title: "SHOP", links: ["Premium Core Nutrition", "The Beckham Stack", "Merchandise", "Shop All"] },
  { title: "COMPANY", links: ["About Us", "Inter Miami CF", "Science", "Impact"] },
  { title: "LEARN", links: ["Reviews", "Ingredients", "Quality and Standards", "IM8 Ambassador Program"] },
  { title: "SUPPORT", links: ["FAQs", "Track My Order", "Returns / Exchanges", "Contact Us"] },
  { title: "IM8 COMMUNITY", links: ["IM8 Strava Club", "Instagram", "Facebook", "TikTok", "YouTube", "Refer a Friend"] },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: "#50000B" }} className="text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16">
        <div
          className="text-3xl mb-10"
          style={{ fontFamily: "var(--font-im8-display), serif" }}
        >
          IM8
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/15">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.1em] text-white/50 font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-[13.5px] text-white/85 hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-10 text-center border-b border-white/15">
          <p className="text-[13px] tracking-[0.08em] text-white/60 mb-4">JOIN THE COMMUNITY FOR EXCLUSIVE WELLNESS INSIGHTS</p>
          <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
            <input
              placeholder="Email address"
              className="flex-1 bg-transparent border border-white/30 rounded-full px-4 py-2.5 text-sm placeholder:text-white/40"
            />
            <button
              className="rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
              style={{ background: "linear-gradient(90deg, #DBB15C, #FDE9BF 50%, #DBB15C 100%)", color: "#50000B" }}
            >
              Join Now
            </button>
          </div>
          <p className="text-[11px] text-white/40 mt-3">*By joining, you&apos;ll receive our wellness insights and can unsubscribe anytime.</p>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12.5px] text-white/60">
          <span>© 2026 IM8®</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
        <p className="text-[11px] text-white/40 mt-6 max-w-3xl">
          *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. **Free Welcome Kit available for new subscribers only.
        </p>
      </div>
    </footer>
  );
}
