import { ClimaxCta } from "@/components/solstice/ClimaxCta";
import { Hero } from "@/components/solstice/Hero";
import { JourneySection } from "@/components/solstice/JourneySection";
import { ProblemSection } from "@/components/solstice/ProblemSection";
import { ProductGrid } from "@/components/solstice/ProductGrid";
import { SiteFooter } from "@/components/solstice/SiteFooter";
import { SiteHeader } from "@/components/solstice/SiteHeader";
import { SocialProof } from "@/components/solstice/SocialProof";

export default function SolsticeCoffeePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
        <JourneySection />
        <ProductGrid />
        <SocialProof />
        <ClimaxCta />
      </main>
      <SiteFooter />
    </>
  );
}
