import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roobert = localFont({
  variable: "--font-roobert",
  src: [
    { path: "../../public/fonts/RoobertPRO-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Roobert-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/RoobertPRO-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Roobert-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const cardinal = localFont({
  variable: "--font-cardinal",
  src: [
    { path: "../../public/fonts/cardinalfruit-regular-TRIAL.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/CardinalFruitWeb-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/cardinalfruit-semibold-TRIAL.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/cardinalfruit-bold-TRIAL.otf", weight: "700", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  src: [
    { path: "../../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const oswald = localFont({
  variable: "--font-oswald",
  src: [
    { path: "../../public/fonts/Oswald-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Oswald-Medium.woff2", weight: "500", style: "normal" },
  ],
});

const bulbis = localFont({
  variable: "--font-bulbis",
  src: [{ path: "../../public/fonts/Bulbis-Filled.woff2", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  title: "Arq8™ Creatine Monohydrate Gummies – Arq8",
  description:
    "FullDissolve™ Nano-Creatine Monohydrate Gummies — clean creatine gummies, no chalk, no bloating, no sugar coating.",
  icons: {
    icon: "/seo/arq-favicon-_1.png",
    shortcut: "/seo/arq-favicon-_1.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roobert.variable} ${cardinal.variable} ${inter.variable} ${oswald.variable} ${bulbis.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
