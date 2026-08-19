import { BlurText } from "@/components/amicro/blur-text";
import { CardHover } from "@/components/amicro/card-hover";
import { CharacterStagger } from "@/components/amicro/character-stagger";
import { FadeIn } from "@/components/amicro/fade-in";
import { FadeUp } from "@/components/amicro/fade-up";
import { GlowButton } from "@/components/amicro/glow-button";
import { MagneticButton } from "@/components/amicro/magnetic-button";
import { MagneticWrap } from "@/components/amicro/magnetic-wrap";
import { ScaleIn } from "@/components/amicro/scale-in";
import { ScrollReveal } from "@/components/amicro/scroll-reveal";
import { SlideLeft } from "@/components/amicro/slide-left";
import { SlideRight } from "@/components/amicro/slide-right";
import { Spotlight } from "@/components/amicro/spotlight";
import { StickyReveal } from "@/components/amicro/sticky-reveal";
import { TextReveal } from "@/components/amicro/text-reveal";
import { TiltCard } from "@/components/amicro/tilt-card";
import { WordReveal } from "@/components/amicro/word-reveal";
import { ZoomIn } from "@/components/amicro/zoom-in";

function KitSection({
  name,
  category,
  children,
}: {
  name: string;
  category: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 pb-4">
          <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          <code className="text-xs text-muted-foreground">{category}</code>
        </div>
      </div>
      {children}
    </section>
  );
}

const CARD_ITEMS = [
  { id: "1", title: "Grid Stability", description: "Frequency response tuned for renewable-heavy grids." },
  { id: "2", title: "Peak Shaving", description: "Cuts demand charges by shifting load automatically." },
  { id: "3", title: "Fault Ride-Through", description: "Stays online through voltage sags other systems trip on." },
];

export default function AmicroKitPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="border-b border-border bg-muted/40 px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Amicro Kit</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Micro-interaction primitives from{" "}
          <code className="text-foreground">@subhanhq/amicro</code>, installed
          via its shadcn registry. Import from{" "}
          <code className="text-foreground">@/components/amicro</code> in any
          page. Scroll to see entrance/reveal effects trigger.
        </p>
      </div>

      <KitSection name="Entrance: Fade / Slide / Scale / Zoom" category="entrance">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:px-8">
          {[
            { label: "Fade In", node: <FadeIn>Fade In</FadeIn> },
            { label: "Fade Up", node: <FadeUp>Fade Up</FadeUp> },
            { label: "Slide Left", node: <SlideLeft>Slide Left</SlideLeft> },
            { label: "Slide Right", node: <SlideRight>Slide Right</SlideRight> },
            { label: "Scale In", node: <ScaleIn>Scale In</ScaleIn> },
            { label: "Zoom In", node: <ZoomIn>Zoom In</ZoomIn> },
          ].map((item) => (
            <div key={item.label} className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 text-center">
              <div className="text-sm font-medium text-foreground">{item.node}</div>
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </KitSection>

      <KitSection name="Text Reveal" category="text">
        <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <span className="text-xs text-muted-foreground">BlurText</span>
            <BlurText text="Precision-formulated for cellular resilience." className="text-2xl font-bold" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">CharacterStagger</span>
            <CharacterStagger text="Astaxanthin, refined." className="text-2xl font-bold" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">WordReveal</span>
            <WordReveal text="Backed by 85+ human clinical studies." className="text-2xl font-bold" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">TextReveal</span>
            <TextReveal text={"Line one reveals first\nThen line two follows"} className="text-2xl font-bold" />
          </div>
        </div>
      </KitSection>

      <KitSection name="Hover: Card / Tilt / Glow / Magnetic / Spotlight" category="hover · cursor">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <span className="mb-3 block text-xs text-muted-foreground">CardHover</span>
            <CardHover items={CARD_ITEMS} />
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">TiltCard</span>
              <TiltCard>
                <span className="text-sm font-semibold text-foreground">Tilt me</span>
              </TiltCard>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">GlowButton</span>
              <GlowButton>Glow Button</GlowButton>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">MagneticButton</span>
              <MagneticButton>Magnetic Button</MagneticButton>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">MagneticWrap (theme-agnostic)</span>
              <MagneticWrap>
                <button className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background">
                  Themed Button
                </button>
              </MagneticWrap>
            </div>
          </div>
          <div>
            <span className="mb-3 block text-xs text-muted-foreground">Spotlight</span>
            <Spotlight className="max-w-sm">
              <p className="text-sm text-neutral-300">Move your cursor over this card.</p>
            </Spotlight>
          </div>
        </div>
      </KitSection>

      <KitSection name="Scroll Reveal" category="scroll">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
          {[1, 2, 3].map((n) => (
            <ScrollReveal key={n}>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-foreground">Scroll block {n} — reveals once, on entering the viewport.</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </KitSection>

      <KitSection name="Sticky Reveal" category="scroll">
        <StickyReveal
          content={[
            { title: "Sourced", description: "Grown in closed photobioreactors, not open ponds — no contamination risk." },
            { title: "Tested", description: "Every batch third-party verified for potency and purity." },
            { title: "Absorbed", description: "Delivered in an oil suspension for meaningfully better bioavailability." },
          ]}
        />
      </KitSection>

      <div className="h-16" />
    </main>
  );
}
