import { AtSign, Mail, MessageCircle } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: ["All coffee", "Subscriptions", "Founder's Trio", "Gift cards"],
  },
  {
    title: "Learn",
    links: ["Our process", "Origins", "Brewing guides", "Journal"],
  },
  {
    title: "Support",
    links: ["Shipping & returns", "FAQ", "Contact us", "Wholesale"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-[family-name:var(--font-solstice-display)] text-2xl font-semibold text-foreground">
              Solstice
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Small-batch coffee, roasted to order and shipped within 48 hours so
              flavor never has to wait.
            </p>
            <div className="mt-5 flex items-center gap-4">
              {[
                { icon: AtSign, label: "Follow on Instagram" },
                { icon: MessageCircle, label: "Message us" },
                { icon: Mail, label: "Email us" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="cursor-pointer text-muted-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Solstice Coffee Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#top" className="cursor-pointer transition-colors duration-200 hover:text-accent">
              Privacy Policy
            </a>
            <a href="#top" className="cursor-pointer transition-colors duration-200 hover:text-accent">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
