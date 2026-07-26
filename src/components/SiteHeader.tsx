"use client";

import Image from "next/image";

const NAV_LINKS = ["HOME", "SHOP", "SCIENCE", "ABOUT"];

/** Stylized "Arq8" logomark — a rounded, pinwheel-style square glyph. */
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

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-border bg-background">
      {/* Top announcement bar */}
      <div className="flex h-[34px] w-full items-center justify-center bg-[#f5fe5e] px-4">
        <p className="text-center text-xs font-medium text-foreground">
          Big Summer Sale: Up to 52% Off Subscriptions
        </p>
      </div>

      {/* Nav bar */}
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between px-6 md:px-10">
        {/* Left: nav links */}
        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-medium tracking-wider text-foreground/90 transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile: nothing on the left, logo stays centered via flex-1 spacers */}
        <div className="flex flex-1 items-center md:hidden" />

        {/* Center: logo */}
        <a href="#" className="flex items-center gap-1.5 text-foreground">
          <LogoMark className="h-5 w-5" />
          <Image
            src="/images/arq8-logo.svg"
            alt="Arq8"
            width={70}
            height={19}
            className="h-[19px] w-auto"
            priority
          />
        </a>

        {/* Right: account / cart */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium tracking-wider text-foreground/90 transition-colors hover:text-foreground"
          >
            <span className="hidden sm:inline">ACCOUNT</span>
            <img
              src="/images/arq-profile-icon-new.svg"
              alt=""
              aria-hidden="true"
              className="h-[17px] w-[17px]"
            />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium tracking-wider text-foreground/90 transition-colors hover:text-foreground"
          >
            <span className="hidden sm:inline">CART</span>
            <img
              src="/images/arq-cart-icon-new.svg"
              alt=""
              aria-hidden="true"
              className="h-[17px] w-[17px]"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
