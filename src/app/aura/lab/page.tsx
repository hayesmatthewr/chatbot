import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { CartProvider, Toast } from "@/components/aura/CartContext";
import { LabPdp } from "@/components/aura-versions/LabPdp";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-lab-serif" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-lab-sans" });

export const metadata = { title: "Aura · Direction 1: Lab Journal" };

export default function LabPage() {
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <CartProvider>
        <Toast />
        <LabPdp />
      </CartProvider>
    </div>
  );
}
