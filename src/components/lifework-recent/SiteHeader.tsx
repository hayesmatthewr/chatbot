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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted sm:size-7 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>

        <a href="#top" className="text-[16px] font-medium tracking-tight text-foreground">
          Lifework
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex h-7 cursor-pointer items-center rounded-full px-3 text-[13px] text-secondary transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Search"
            className="hidden size-7 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted sm:flex"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden size-7 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted sm:flex"
          >
            <User className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Cart, 0 items"
            className="relative flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted sm:size-7"
          >
            <ShoppingBag className="size-4" />
            <span className="absolute -top-1 -right-1 flex size-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              0
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex h-11 cursor-pointer items-center rounded-full px-3 text-[13px] text-secondary transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
