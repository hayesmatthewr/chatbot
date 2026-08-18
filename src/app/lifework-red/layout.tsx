import type { Metadata } from "next";
import { Archivo, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./theme.css";

const fraunces = Fraunces({
  variable: "--font-lifework-red-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-lifework-red-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-lifework-red-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lifework — Daily Cellular Protection (Red)",
  description:
    "Nature's most potent antioxidant, refined for modern oxidative stress: skin, eyes, energy, recovery, and whole-body resilience, from the most clinically studied natural astaxanthin.",
};

export default function LifeworkRedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`lifework-red-theme ${fraunces.variable} ${archivo.variable} ${plexMono.variable} bg-background text-foreground`}
      style={{ fontFamily: "var(--font-lifework-red-body), ui-sans-serif, sans-serif" }}
    >
      {children}
    </div>
  );
}
