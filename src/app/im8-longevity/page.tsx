import SiteHeader from "@/components/im8/SiteHeader";
import SiteFooter from "@/components/im8/SiteFooter";
import { ProductHero } from "@/components/im8/product/ProductHero";
import { ScienceBlock } from "@/components/im8/science/ScienceBlock";
import { EvidenceBlock } from "@/components/im8/evidence/EvidenceBlock";
import { TimelineComparisonBlock } from "@/components/im8/timeline/TimelineComparisonBlock";
import { ConversionBlock } from "@/components/im8/conversion/ConversionBlock";

export default function Im8LongevityPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero />
        <ScienceBlock />
        <EvidenceBlock />
        <TimelineComparisonBlock />
        <ConversionBlock />
      </main>
      <SiteFooter />
    </>
  );
}
