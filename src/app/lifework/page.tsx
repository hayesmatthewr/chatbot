import { SiteHeader } from "@/components/lifework/SiteHeader";
import { SiteFooter } from "@/components/lifework/SiteFooter";
import { ProductHero } from "@/components/lifework/product/ProductHero";
import { CoreBenefits } from "@/components/lifework/benefits/CoreBenefits";
import { OxidativeStress } from "@/components/lifework/problem/OxidativeStress";
import { HowItWorks } from "@/components/lifework/mechanism/HowItWorks";
import { BenefitsOverTime } from "@/components/lifework/timeline/BenefitsOverTime";
import { WholeBodyBenefits } from "@/components/lifework/benefits/WholeBodyBenefits";
import { ClinicalProof } from "@/components/lifework/evidence/ClinicalProof";
import { WhyLifework } from "@/components/lifework/comparison/WhyLifework";
import { IngredientStory } from "@/components/lifework/ingredient/IngredientStory";
import { QualityTesting } from "@/components/lifework/quality/QualityTesting";
import { CustomerResults } from "@/components/lifework/reviews/CustomerResults";
import { FaqSection } from "@/components/lifework/conversion/FaqSection";
import { BrandClose } from "@/components/lifework/conversion/BrandClose";

export default function LifeworkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero />
        <CoreBenefits />
        <OxidativeStress />
        <HowItWorks />
        <BenefitsOverTime />
        <WholeBodyBenefits />
        <ClinicalProof />
        <WhyLifework />
        <IngredientStory />
        <QualityTesting />
        <CustomerResults />
        <FaqSection />
        <BrandClose />
      </main>
      <SiteFooter />
    </>
  );
}
