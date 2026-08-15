import type { Metadata } from "next";
import localFont from "next/font/local";

const inter = localFont({
  variable: "--font-lifework-display",
  src: [
    { path: "../../../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Lifework Cellular Protection | Daily Cellular Protection",
  description:
    "12 mg of natural astaxanthin to help protect your cells from the oxidative stress of everyday life, supporting your skin, eyes, recovery, and whole-body resilience.",
};

const LIFEWORK_TOKENS = {
  "--lifework-red": "#B3392C",
  "--lifework-red-dark": "#8A2B21",
  "--lifework-red-tint": "#F2D9D4",
  "--lifework-ink": "#262626",
  "--lifework-ink-soft": "#727272",
  "--lifework-ink-faint": "#949494",
  "--lifework-cream": "#FAFAF8",
  "--lifework-cream-deep": "#F5F3EE",
  "--lifework-surface": "#F9F9F9",
  "--lifework-line": "#E5E7EB",
} as React.CSSProperties;

export default function LifeworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} bg-[var(--lifework-cream)] text-[var(--lifework-ink)] antialiased`}
      style={{ fontFamily: "var(--font-lifework-display), ui-sans-serif, sans-serif", ...LIFEWORK_TOKENS }}
    >
      {children}
    </div>
  );
}
