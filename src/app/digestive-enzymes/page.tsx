import { BenefitsAccordion } from "@/components/digestive-enzymes/BenefitsAccordion";
import { BundleSection } from "@/components/digestive-enzymes/BundleSection";
import { ComparisonSection } from "@/components/digestive-enzymes/ComparisonSection";
import { CoverageMatrix } from "@/components/digestive-enzymes/CoverageMatrix";
import { DoctorsSection } from "@/components/digestive-enzymes/DoctorsSection";
import { FaqSection } from "@/components/digestive-enzymes/FaqSection";
import { FinalCtaSection } from "@/components/digestive-enzymes/FinalCtaSection";
import { GuaranteeSection } from "@/components/digestive-enzymes/GuaranteeSection";
import { PageStateProvider } from "@/components/digestive-enzymes/PageState";
import { ProblemSection } from "@/components/digestive-enzymes/ProblemSection";
import { ProductAccordion } from "@/components/digestive-enzymes/ProductAccordion";
import { ProductHero } from "@/components/digestive-enzymes/product/ProductHero";
import { ProofStrip } from "@/components/digestive-enzymes/ProofStrip";
import { PuddingTest } from "@/components/digestive-enzymes/PuddingTest";
import { ReviewsSection } from "@/components/digestive-enzymes/ReviewsSection";
import { ScienceNote } from "@/components/digestive-enzymes/ScienceNote";
import { NutritionLabelSheet } from "@/components/digestive-enzymes/sheets/NutritionLabelSheet";
import { ScienceSheet } from "@/components/digestive-enzymes/sheets/ScienceSheet";
import { SiteFooter } from "@/components/digestive-enzymes/SiteFooter";
import { SiteHeader } from "@/components/digestive-enzymes/SiteHeader";
import { StatsBar } from "@/components/digestive-enzymes/StatsBar";
import { StickyMobileCta } from "@/components/digestive-enzymes/StickyMobileCta";
import { TimelineSection } from "@/components/digestive-enzymes/TimelineSection";

export default function DigestiveEnzymesPage() {
  return (
    <PageStateProvider>
      <SiteHeader />
      <main>
        <ProductHero />
        <ProofStrip />
        <StatsBar />
        <ProductAccordion />
        <PuddingTest />
        <ProblemSection />
        <BenefitsAccordion />
        <ScienceNote />
        <CoverageMatrix />
        <DoctorsSection />
        <ComparisonSection />
        <TimelineSection />
        <BundleSection />
        <ReviewsSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <NutritionLabelSheet />
      <ScienceSheet />
      <StickyMobileCta />
    </PageStateProvider>
  );
}
