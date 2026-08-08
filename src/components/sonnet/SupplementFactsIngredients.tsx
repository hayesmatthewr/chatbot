import Image from "next/image";
import { BarsIcon } from "./icons";

const FACTS_ROWS = [
  { name: "Valerian Root Extract (Valeriana officinalis)", sub: "(std. to 0.8% Valerenic acid)", amount: "300mg*" },
  { name: "SENSORIL® Ashwagandha Root and Leaf Extract", sub: "(Withania somnifera) (std. to 10% Withanolides)", amount: "125mg*" },
  { name: "GABA (Gamma-Aminobutyric Acid)", sub: "", amount: "100mg*" },
  { name: "Venetron® Rafuma Leaf Extract", sub: "(Apocynum venetum) (std. to 4% of Hyperoside & isoquercitrin)", amount: "50mg*" },
];

const INGREDIENTS = [
  {
    name: "Venetron®",
    color: "#B9743C",
    desc: "Reduces excitability and produces a calming effect which has been shown to increase delta waves and enhance non-REM sleep time.",
  },
  {
    name: "Valerian Root",
    color: "#8A7A5C",
    desc: "Promotes sleep by binding with a natural amino acid known as GABA which induces a more relaxed, calm state.",
  },
  {
    name: "Sensoril® Ashwagandha",
    color: "#A97F4B",
    desc: "Promotes longevity, enhanced vitality, healthy immune response, enhanced focus, and relieves occasional sleeplessness.",
  },
  {
    name: "GABA (Gamma-Aminobutyric Acid)",
    color: "#F2F2F2",
    desc: "Produces an immediate calming effect that supports a reduction in stress, anxiety, and sleeplessness.",
  },
];

export function SupplementFactsIngredients() {
  return (
    <section className="bg-[#345E9E] text-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
        <div className="bg-[#345E9E] p-8 lg:p-12">
          <div className="text-center mb-8">
            <BarsIcon className="w-8 h-4 mx-auto mb-3 text-white/70" />
            <h2 className="text-3xl font-semibold">Supplement Facts</h2>
          </div>
          <div className="text-sm">
            <p className="font-bold uppercase tracking-wide">Core Sleep</p>
            <div className="flex justify-between mt-2 text-white/90">
              <span>Serving Size: 2 Capsules</span>
            </div>
            <div className="flex justify-between text-white/90">
              <span>Servings Per Container: 30</span>
              <span className="text-right font-semibold">
                Amount per serving
                <br />
                <span className="font-normal text-xs">*Daily Value (DV) not established</span>
              </span>
            </div>
            <div className="mt-4 divide-y divide-white/20">
              {FACTS_ROWS.map((row) => (
                <div key={row.name} className="py-3 flex justify-between gap-4">
                  <div>
                    <p>{row.name}</p>
                    {row.sub && <p className="text-white/60 text-xs">{row.sub}</p>}
                  </div>
                  <span className="whitespace-nowrap">{row.amount}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-white/70 text-xs leading-relaxed">
              Other Ingredients: Vegetable Cellulose Capsule, Organic Rice Hulls
              <br />
              Contains &lt;2% Of: Ascorbyl Palmitate, Calcium Silicate
            </p>
          </div>
          <div className="mt-10 flex items-center justify-between text-[11px] text-white/50">
            <p className="max-w-[70%]">
              Manufactured in a cGMP certified facility for Holistic Health Holdings LLC
              <br />
              SENSORIL® is a registered trademark of Natreon, Inc.
              <br />
              Venetron® is a registered trademark of Tokiwa Phytochemical Co., Ltd.
            </p>
            <Image src="/images/sonnet/Logo_1.png" alt="Sonnet" width={110} height={21} className="opacity-90" />
          </div>
        </div>

        <div className="bg-[#345E9E] p-8 lg:p-12">
          <div className="text-center mb-8">
            <BarsIcon className="w-8 h-4 mx-auto mb-3 text-white/70" />
            <h2 className="text-lg font-semibold tracking-wide uppercase border-b border-white/20 pb-4">
              Clinically Studied Ingredients
            </h2>
          </div>
          <div className="space-y-6">
            {INGREDIENTS.map((ing) => (
              <div key={ing.name} className="flex gap-4 items-start">
                <span
                  className="w-12 h-12 rounded-full shrink-0 border border-white/20"
                  style={{ backgroundColor: ing.color }}
                />
                <div>
                  <h4 className="font-semibold">{ing.name}</h4>
                  <p className="text-sm text-white/75 leading-relaxed">{ing.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/50 uppercase tracking-wide">Tap any ingredient to expand</p>
        </div>
      </div>
    </section>
  );
}
