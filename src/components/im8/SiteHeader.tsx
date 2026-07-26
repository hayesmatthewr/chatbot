"use client";

import { useState, useEffect } from "react";

function useCountdown() {
  const [secs, setSecs] = useState(9 * 3600 + 20 * 60 + 4);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return { d: "00", h: String(h).padStart(2, "0"), m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") };
}

export default function SiteHeader() {
  const t = useCountdown();
  return (
    <header>
      <div
        className="text-white text-center text-[13px] py-2.5 px-3 flex flex-wrap items-center justify-center gap-3"
        style={{ background: "linear-gradient(90deg, #6B0010, #A40011 45%, #E35B12 100%)" }}
      >
        <span className="font-semibold">WELCOME OFFER</span>
        <span className="opacity-90 hidden sm:inline">30% off + Free Welcome Kit + 5 Free Sachets</span>
        <span className="font-mono tabular-nums flex gap-1.5">
          <b>{t.d}</b>:<b>{t.h}</b>:<b>{t.m}</b>:<b>{t.s}</b>
        </span>
      </div>
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-black/10">
        <nav className="hidden lg:flex items-center gap-7 text-[14px]">
          <span className="flex items-center gap-1 cursor-pointer">Shop <span className="text-xs">▾</span></span>
          <span className="cursor-pointer">Science</span>
          <span className="cursor-pointer">The Beckham Stack</span>
          <span className="cursor-pointer">Welcome from David</span>
        </nav>
        <div
          className="text-2xl tracking-tight"
          style={{ fontFamily: "var(--font-im8-display), serif", color: "#50000B" }}
        >
          IM8
        </div>
        <div className="flex items-center gap-6 text-[14px]">
          <span className="hidden lg:inline cursor-pointer">Reviews</span>
          <span className="hidden lg:inline cursor-pointer">Ingredients</span>
          <span className="hidden lg:flex items-center gap-1 cursor-pointer">Discover <span className="text-xs">▾</span></span>
          <span className="w-6 h-6 rounded-full border border-current inline-flex items-center justify-center text-xs">◯</span>
          <span className="w-6 h-6 rounded-full border border-current inline-flex items-center justify-center text-xs">0</span>
        </div>
      </div>
    </header>
  );
}
