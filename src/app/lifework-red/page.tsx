import { BenefitsGrid } from "@/components/lifework-red/BenefitsGrid";
import { ClinicalStudiesSection } from "@/components/lifework-red/ClinicalStudiesSection";
import { ClosingCta } from "@/components/lifework-red/ClosingCta";
import { ComparisonTable } from "@/components/lifework-red/ComparisonTable";
import { FaqAccordion } from "@/components/lifework-red/FaqAccordion";
import { IngredientSpotlight } from "@/components/lifework-red/IngredientSpotlight";
import { MechanismSection } from "@/components/lifework-red/MechanismSection";
import { ProblemSection } from "@/components/lifework-red/ProblemSection";
import { ProductHero } from "@/components/lifework-red/ProductHero";
import { QualitySection } from "@/components/lifework-red/QualitySection";
import { ReviewsSection } from "@/components/lifework-red/ReviewsSection";
import { SiteFooter } from "@/components/lifework-red/SiteFooter";
import { SiteHeader } from "@/components/lifework-red/SiteHeader";
import { TimelineSection } from "@/components/lifework-red/TimelineSection";

export default function LifeworkRedPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero />
        <ProblemSection />
        <BenefitsGrid />
        <MechanismSection />
        <ClinicalStudiesSection />
        <ComparisonTable />
        <TimelineSection />
        <IngredientSpotlight />
        <QualitySection />
        <ReviewsSection />
        <FaqAccordion />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
