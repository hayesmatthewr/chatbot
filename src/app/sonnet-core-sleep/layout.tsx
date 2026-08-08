import type { Metadata } from "next";
import localFont from "next/font/local";

const ttCommons = localFont({
  variable: "--font-sonnet-body",
  src: [
    { path: "../../../public/fonts/sonnet/TT-Commons-Regular.otf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/sonnet/TT-Commons-Medium.otf", weight: "500", style: "normal" },
    { path: "../../../public/fonts/sonnet/TT-Commons-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../../public/fonts/sonnet/TT-Commons-Bold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Core Sleep – Sonnet",
  description:
    "Sonnet's core sleep formulation of Venetron (Rafuma Extract), SenSoril, GABA, and Valerian root, crafted to help you sleep well and wake up refreshed, without the sleep hangover.",
};

export default function SonnetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${ttCommons.variable} bg-white text-[#221D35]`}
      style={{ fontFamily: "var(--font-sonnet-body), ui-sans-serif, sans-serif" }}
    >
      {children}
    </div>
  );
}
