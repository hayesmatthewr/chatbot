import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-de-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Physician's Choice · Digestive Enzymes",
  description:
    "16 diverse enzymes plus probiotics and prebiotics, developed with doctors. Break down 6 major food groups, reduce bloating, and support nutrient absorption. Backed by a 60-day guarantee.",
};

export default function DigestiveEnzymesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${poppins.variable} bg-white text-[#16160f]`}
      style={{ fontFamily: "var(--font-de-poppins), sans-serif" }}
    >
      {children}
    </div>
  );
}
