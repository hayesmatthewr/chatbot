import { BackedSection } from "./BackedSection"
import { BeforeAfterSection } from "./BeforeAfterSection"
import { ScrollingTicker } from "./ScrollingTicker"
import { ModernRedesignSection } from "./ModernRedesignSection"
import { TastesGoodSection } from "./TastesGoodSection"

export function StoryBlock() {
  return (
    <>
      <BackedSection />
      <BeforeAfterSection />
      <ScrollingTicker />
      <ModernRedesignSection />
      <TastesGoodSection />
    </>
  )
}
