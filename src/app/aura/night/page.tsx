import { Anton, Inter } from "next/font/google";
import { CartProvider, Toast } from "@/components/aura/CartContext";
import { NightPdp } from "@/components/aura-versions/NightPdp";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-night-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-night-sans" });

export const metadata = { title: "Aura · Direction 2: Chrome Night" };

export default function NightPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <CartProvider>
        <Toast />
        <NightPdp />
      </CartProvider>
    </div>
  );
}
