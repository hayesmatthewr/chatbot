import { DM_Sans, Fraunces } from "next/font/google";
import { CartProvider, Toast } from "@/components/aura/CartContext";
import { GoldenPdp } from "@/components/aura-versions/GoldenPdp";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-golden-serif", axes: ["SOFT", "opsz"], style: ["normal", "italic"] });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-golden-sans" });

export const metadata = { title: "Aura · Direction 3: Golden Hour" };

export default function GoldenPage() {
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <CartProvider>
        <Toast />
        <GoldenPdp />
      </CartProvider>
    </div>
  );
}
