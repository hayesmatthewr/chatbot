import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./theme.css";

const figtree = Figtree({
  variable: "--font-lifework",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lifework — Daily Cellular Protection",
  description:
    "Nature's most potent antioxidant, refined for modern oxidative stress: skin, eyes, energy, recovery, and whole-body resilience, from the most clinically studied natural astaxanthin.",
};

export default function LifeworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`lifework-theme ${figtree.variable} bg-background text-foreground`}
      style={{ fontFamily: "var(--font-lifework), ui-sans-serif, sans-serif" }}
    >
      {children}
    </div>
  );
}
