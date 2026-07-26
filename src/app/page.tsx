import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ProductHero } from "@/components/product/ProductHero";
import { StoryBlock } from "@/components/story/StoryBlock";
import { IngredientsBlock } from "@/components/ingredients/IngredientsBlock";
import { SocialProofBlock } from "@/components/social-proof/SocialProofBlock";
import { TrustBlock } from "@/components/trust/TrustBlock";
import { ConversionBlock } from "@/components/conversion/ConversionBlock";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero />
        <StoryBlock />
        <IngredientsBlock />
        <SocialProofBlock />
        <TrustBlock />
        <ConversionBlock />
      </main>
      <SiteFooter />
    </>
  );
}
