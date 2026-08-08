import Image from "next/image";
import { CartIcon, UserIcon } from "./icons";

const NAV = [
  { label: "Core Sleep", href: "/products/core-sleep" },
  { label: "Sleep + Calm", href: "/products/sleep-calm" },
  { label: "Sleep + Restore", href: "/products/sleep-restore" },
  { label: "FAQs", href: "/pages/faqs" },
  { label: "Research", href: "/pages/research" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/5">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 lg:px-10 py-4">
        <a href="/" className="shrink-0">
          <Image src="/images/sonnet/Logo.png" alt="Sonnet" width={147} height={40} priority />
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="hover:opacity-70 transition-opacity">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="p-2 border border-black/10 rounded-md" aria-label="Account">
            <UserIcon className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-black/10 rounded-md text-sm">
            <CartIcon className="w-5 h-5" />
            <span>0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
