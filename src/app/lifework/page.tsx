import { ScrollReveal } from "@/components/amicro/scroll-reveal";
import { BenefitsGrid } from "@/components/lifework/BenefitsGrid";
import { ClinicalStudiesSection } from "@/components/lifework/ClinicalStudiesSection";
import { ClosingCta } from "@/components/lifework/ClosingCta";
import { ComparisonTable } from "@/components/lifework/ComparisonTable";
import { FaqAccordion } from "@/components/lifework/FaqAccordion";
import { IngredientSpotlight } from "@/components/lifework/IngredientSpotlight";
import { MechanismSection } from "@/components/lifework/MechanismSection";
import { ProblemSection } from "@/components/lifework/ProblemSection";
import { ProductHero } from "@/components/lifework/ProductHero";
import { QualitySection } from "@/components/lifework/QualitySection";
import { ReviewsSection } from "@/components/lifework/ReviewsSection";
import { SiteFooter } from "@/components/lifework/SiteFooter";
import { SiteHeader } from "@/components/lifework/SiteHeader";
import { TimelineSection } from "@/components/lifework/TimelineSection";

export default function LifeworkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero />
        <ScrollReveal><ProblemSection /></ScrollReveal>
        <ScrollReveal><BenefitsGrid /></ScrollReveal>
        <ScrollReveal><MechanismSection /></ScrollReveal>
        <ScrollReveal><ClinicalStudiesSection /></ScrollReveal>
        <ScrollReveal><ComparisonTable /></ScrollReveal>
        <ScrollReveal><TimelineSection /></ScrollReveal>
        <ScrollReveal><IngredientSpotlight /></ScrollReveal>
        <ScrollReveal><QualitySection /></ScrollReveal>
        <ScrollReveal><ReviewsSection /></ScrollReveal>
        <ScrollReveal><FaqAccordion /></ScrollReveal>
        <ScrollReveal><ClosingCta /></ScrollReveal>
      </main>
      <SiteFooter />
    </>
  );
}
