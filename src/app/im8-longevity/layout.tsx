import type { Metadata } from "next";
import localFont from "next/font/local";

const arizonaFlare = localFont({
  variable: "--font-im8-display",
  src: [
    { path: "../../../public/fonts/ABCArizonaFlare-Light.woff2", weight: "300", style: "normal" },
    { path: "../../../public/fonts/ABCArizonaFlare-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/ABCArizonaFlare-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/ABCArizonaFlare-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const aeonik = localFont({
  variable: "--font-im8-body",
  src: [
    { path: "../../../public/fonts/aeonik_regular-webfont.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Aeonik-Medium.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "IM8 Daily Ultimate Longevity: Advanced Support for Healthy Aging – IM8 Health",
  description:
    "Target all 12 hallmarks of aging with 10 clinically proven compounds in one NAD+ supplement.",
};

export default function Im8Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${arizonaFlare.variable} ${aeonik.variable} bg-white text-[#1a1a1a]`}
      style={{ fontFamily: "var(--font-im8-body), ui-sans-serif, sans-serif" }}
    >
      {children}
    </div>
  );
}
