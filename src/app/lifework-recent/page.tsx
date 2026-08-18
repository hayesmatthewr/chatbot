import { BenefitsGrid } from "@/components/lifework-recent/BenefitsGrid";
import { ClinicalStudiesSection } from "@/components/lifework-recent/ClinicalStudiesSection";
import { ClosingCta } from "@/components/lifework-recent/ClosingCta";
import { ComparisonTable } from "@/components/lifework-recent/ComparisonTable";
import { FaqAccordion } from "@/components/lifework-recent/FaqAccordion";
import { IngredientSpotlight } from "@/components/lifework-recent/IngredientSpotlight";
import { MechanismSection } from "@/components/lifework-recent/MechanismSection";
import { ProblemSection } from "@/components/lifework-recent/ProblemSection";
import { ProductHero } from "@/components/lifework-recent/ProductHero";
import { QualitySection } from "@/components/lifework-recent/QualitySection";
import { ReviewsSection } from "@/components/lifework-recent/ReviewsSection";
import { SiteFooter } from "@/components/lifework-recent/SiteFooter";
import { SiteHeader } from "@/components/lifework-recent/SiteHeader";
import { TimelineSection } from "@/components/lifework-recent/TimelineSection";

export default function LifeworkRecentPage() {
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
