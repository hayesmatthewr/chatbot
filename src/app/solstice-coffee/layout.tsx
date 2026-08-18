import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./theme.css";

const cormorant = Cormorant({
  variable: "--font-solstice-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-solstice-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Solstice Coffee Co. — Roasted at the Exact Moment of Peak Flavor",
  description:
    "Small-batch, single-origin coffee roasted to order and nitrogen-sealed within minutes. Shipped within 48 hours so every cup tastes like the cupping table.",
};

export default function SolsticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`solstice-theme ${cormorant.variable} ${montserrat.variable} bg-background text-foreground`}
      style={{ fontFamily: "var(--font-solstice-body), ui-sans-serif, sans-serif" }}
    >
      {children}
    </div>
  );
}
