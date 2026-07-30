import { Accordion } from "./Accordion";

const FAQS = [
  {
    q: "What are the benefits of Digestive Enzymes?",
    a: "The 16-enzyme blend helps break down protein, carbs, dairy, fats, vegetables, and legumes, which supports comfortable digestion, helps reduce bloating, and promotes nutrient absorption. Added probiotics and prebiotics support healthy gut function.",
    disclaimer: true,
  },
  {
    q: "Why do I need digestive enzymes?",
    a: "Your natural enzyme production can slow with age, processed foods are stripped of the enzymes that help digest them, and big meals can demand more than your body makes on its own. Taking a capsule with meals gives your body that support when it needs it.",
    disclaimer: true,
  },
  {
    q: "How long does it take to work?",
    a: "The enzymes start working in your stomach during the meal you take them with, so many people notice less bloating and more comfort right after eating. We recommend daily use for at least 60 days for best results.",
    disclaimer: true,
  },
  {
    q: "How many can I take per day?",
    a: "Take 1 capsule with any meal where you want support. You can take more than one a day. Many customers take one with every meal for ongoing digestive comfort.",
    disclaimer: true,
  },
  {
    q: "Can I take it with other Physician's Choice products?",
    a: "Yes. Digestive Enzymes give in-the-moment mealtime support and pair well with a daily probiotic, like 60 Billion Probiotic or Women's Probiotic, or a daily fiber for overall gut support.",
    disclaimer: true,
  },
  {
    q: "Is it third-party tested?",
    a: "Yes. It's third-party tested for safety, purity, and potency, screened for heavy metals and contaminants, and made in FDA-registered, cGMP-certified facilities. Backed by a 60-day money-back guarantee.",
    disclaimer: false,
  },
];

export function FaqSection() {
  return (
    <section className="mt-13 bg-[#f7f6f2] px-5 py-11 lg:px-10">
      <div className="lg:mx-auto lg:max-w-[860px]">
        <h2 className="mb-2 text-[27px] leading-[1.14] font-semibold tracking-[-0.02em] text-[#16160f]">
          Frequently asked questions
        </h2>
        <Accordion
          titleClassName="text-[16px] font-semibold text-[#16160f]"
          items={FAQS.map((f, i) => ({
            id: `faq-${i}`,
            title: f.q,
            content: (
              <p className="text-[15px] leading-[1.6] text-[#6d6d65]">
                {f.a}
                {f.disclaimer && (
                  <sup className="ml-px text-[0.58em] leading-none font-normal">‡</sup>
                )}
              </p>
            ),
          }))}
        />
      </div>
    </section>
  );
}
