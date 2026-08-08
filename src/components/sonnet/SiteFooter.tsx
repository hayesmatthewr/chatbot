"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, ChevronDown, FacebookIcon, InstagramIcon, XIcon } from "./icons";

const EXPLORE_LINKS = [
  { label: "Core Sleep", href: "/products/core-sleep" },
  { label: "Sleep + Calm", href: "/products/sleep-calm" },
  { label: "Sleep + Restore", href: "/products/sleep-restore" },
  { label: "FAQs", href: "/pages/faqs" },
  { label: "Research", href: "/pages/research" },
];

const MORE_LINKS = [
  { label: "About Us", href: "/pages/about" },
  { label: "Contact", href: "/pages/contact" },
  { label: "Terms & Conditions", href: "/pages/terms" },
  { label: "Privacy Policy", href: "/pages/privacy" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-2xl font-semibold lg:pointer-events-none"
      >
        {title}
        <ChevronDown className={`w-4 h-4 lg:hidden transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="mt-3 space-y-2 text-white/85">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#345E9E] text-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16">
        <h2 className="text-2xl font-semibold mb-4">Exclusive Benefits</h2>
        <form className="flex items-center gap-3 max-w-md" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="flex-1 bg-transparent border border-white/50 rounded-md px-4 py-2.5 placeholder:text-white/60 focus:outline-none focus:border-white"
          />
          <button type="submit" aria-label="Subscribe" className="p-2.5">
            <ArrowRightIcon className="w-6 h-4" />
          </button>
        </form>
        <p className="mt-3 text-white/70">Apply for our free membership to receive exclusive deals, news, and events.</p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FooterColumn title="Explore" links={EXPLORE_LINKS} />
          <FooterColumn title="More" links={MORE_LINKS} />
        </div>

        <div className="mt-16">
          <Image src="/images/sonnet/Logo_1.png" alt="Sonnet" width={632} height={122} className="w-full max-w-2xl h-auto" />
        </div>

        <div className="mt-10 flex items-center gap-6">
          <a href="#" aria-label="Facebook">
            <FacebookIcon className="w-7 h-7" />
          </a>
          <a href="#" aria-label="Instagram">
            <InstagramIcon className="w-7 h-7" />
          </a>
          <a href="#" aria-label="Twitter">
            <XIcon className="w-7 h-7" />
          </a>
        </div>

        <p className="mt-10 text-sm text-white/70 max-w-3xl">
          Statements on this website have not been evaluated by the Food and Drug Administration. Any products
          discussed or advertised are not intended to diagnose, treat, cure or prevent any disease. Testimonial
          results are from Sonnet customers, individual results may vary.
        </p>
      </div>
      <div className="bg-[#221D35] text-white/70 text-sm">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span>© 2026 Sonnet. (Holistic Health Holdings LLC). All Rights Reserved.</span>
          <a href="/pages/terms" className="hover:text-white transition-colors">
            Terms &amp; Conditions
          </a>
          <a href="/pages/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
