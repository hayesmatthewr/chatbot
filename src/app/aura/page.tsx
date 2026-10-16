import { AuraFooter } from "@/components/aura/AuraFooter";
import { AuraHeader } from "@/components/aura/AuraHeader";
import { BenefitsDeepDive } from "@/components/aura/BenefitsDeepDive";
import { BuyBox, StickyBar } from "@/components/aura/BuyBox";
import { CartProvider, Toast } from "@/components/aura/CartContext";
import { Comparison } from "@/components/aura/Comparison";
import { Experts } from "@/components/aura/Experts";
import { Faq } from "@/components/aura/Faq";
import { Gallery } from "@/components/aura/Gallery";
import { Quality } from "@/components/aura/Quality";
import { Reviews } from "@/components/aura/Reviews";
import { Timeline } from "@/components/aura/Timeline";
import { UgcVideos } from "@/components/aura/UgcVideos";

export default function AuraPage() {
  return (
    <CartProvider>
      <div id="top" />
      <AuraHeader />
      <Toast />
      <main>
        <section aria-label="Product" className="mx-auto grid max-w-[1440px] gap-8 pb-8 md:grid-cols-12 md:gap-10 md:px-8 md:pt-4">
          <div className="min-w-0 md:col-span-7">
            <Gallery />
          </div>
          <div className="min-w-0 md:col-span-5">
            <BuyBox />
          </div>
        </section>
        <UgcVideos />
        <Experts />
        <Comparison />
        <BenefitsDeepDive />
        <Timeline />
        <Quality />
        <Reviews />
        <Faq />
      </main>
      <AuraFooter />
      <StickyBar />
    </CartProvider>
  );
}
