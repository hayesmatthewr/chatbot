import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./theme.css";

const inter = Inter({
  variable: "--font-lifework-recent",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lifework — Daily Cellular Protection (Recent)",
  description:
    "Nature's most potent antioxidant, refined for modern oxidative stress: skin, eyes, energy, recovery, and whole-body resilience, from the most clinically studied natural astaxanthin.",
};

export default function LifeworkRecentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`lifework-recent-theme ${inter.variable} bg-background text-foreground`}
      style={{ fontFamily: "var(--font-lifework-recent), ui-sans-serif, sans-serif" }}
    >
      {children}
    </div>
  );
}
