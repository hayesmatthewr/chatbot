import { AnnouncementBar } from "@/components/sonnet/AnnouncementBar";
import { SiteHeader } from "@/components/sonnet/SiteHeader";
import { ProductHero } from "@/components/sonnet/ProductHero";
import { SupplementFactsIngredients } from "@/components/sonnet/SupplementFactsIngredients";
import { TestimonialAndChart } from "@/components/sonnet/TestimonialAndChart";
import { WhenToTakeFAQ } from "@/components/sonnet/WhenToTakeFAQ";
import { ReviewsSection } from "@/components/sonnet/ReviewsSection";
import { CommitmentBanner } from "@/components/sonnet/CommitmentBanner";
import { SiteFooter } from "@/components/sonnet/SiteFooter";

export default function SonnetCoreSleepPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <ProductHero />
        <SupplementFactsIngredients />
        <TestimonialAndChart />
        <WhenToTakeFAQ />
        <ReviewsSection />
        <CommitmentBanner />
      </main>
      <SiteFooter />
    </>
  );
}
