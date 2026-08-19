import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "@/app/lifework/theme.css";

const figtree = Figtree({
  variable: "--font-lifework",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Commerce Kit — DTC ecommerce blocks",
  description:
    "Reusable DTC ecommerce blocks installed from the shadcn registry, adapted to this project's base-ui-based shadcn primitives.",
};

export default function CommerceKitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`lifework-theme ${figtree.variable} bg-background text-foreground`}
      style={{ fontFamily: "var(--font-lifework), ui-sans-serif, sans-serif" }}
    >
      {children}
    </div>
  );
}
