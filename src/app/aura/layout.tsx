import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Cellular Protection – Aura",
  description:
    "One softgel of natural AstaReal® astaxanthin, studied in 85+ human trials, to help defend your cells from oxidative stress.",
};

export default function AuraLayout({ children }: { children: React.ReactNode }) {
  return <div className="aura min-h-full font-sans">{children}</div>;
}
