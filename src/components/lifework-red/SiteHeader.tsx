"use client";

import { useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

const NAV_LINKS = [
  { label: "The Science", href: "#mechanism" },
  { label: "Ingredients", href: "#ingredient" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
          className="text-[19px] font-extrabold tracking-tight text-foreground"
        >
          LIFEWORK
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="cursor-pointer text-[12.5px] font-semibold tracking-[0.08em] text-secondary uppercase transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Search"
            className="hidden cursor-pointer text-foreground transition-colors duration-200 hover:text-accent sm:inline-flex"
          >
            <Search className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden cursor-pointer text-foreground transition-colors duration-200 hover:text-accent sm:inline-flex"
          >
            <User className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Cart, 0 items"
            className="relative cursor-pointer text-foreground transition-colors duration-200 hover:text-accent"
          >
            <ShoppingBag className="size-[18px]" />
            <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
              0
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-border px-4 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer border-b border-border py-3 text-[12.5px] font-semibold tracking-[0.08em] text-secondary uppercase last:border-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
