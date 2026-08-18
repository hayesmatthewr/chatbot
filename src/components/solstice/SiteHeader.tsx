"use client";

import { useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Our Process", href: "#journey" },
  { label: "Subscriptions", href: "#climax" },
  { label: "Reviews", href: "#reviews" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary py-2 text-center text-xs tracking-[0.15em] text-primary-foreground uppercase">
        Free shipping on orders over $45 — roasted &amp; shipped within 48 hours
      </div>
      <div className="border-b border-border/70 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Toggle menu"
            className="cursor-pointer text-foreground transition-colors duration-200 hover:text-accent md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <a
            href="#top"
            className="font-[family-name:var(--font-solstice-display)] text-2xl font-semibold tracking-wide text-foreground"
          >
            Solstice
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-pointer text-sm font-medium tracking-wide text-secondary transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="hidden cursor-pointer text-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="hidden cursor-pointer text-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
            >
              <User className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Cart, 0 items"
              className="relative cursor-pointer text-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ShoppingBag className="size-5" />
              <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                0
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-border/70 px-4 py-3 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer rounded-md px-2 py-2.5 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-muted hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
