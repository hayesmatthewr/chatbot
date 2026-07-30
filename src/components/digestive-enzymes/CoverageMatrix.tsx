const GROUPS = [
  {
    group: "Protein",
    count: "6 enzymes",
    examples: "Meat, poultry, fish, eggs, dairy, plant proteins",
    enzymes: ["Bromelain", "Papain", "Peptidase", "Protease 3.0", "Protease 4.5", "Protease 6.0"],
  },
  {
    group: "Starches & carbs",
    count: "2 enzymes",
    examples: "Bread, pasta, rice, potatoes, grains",
    enzymes: ["Amylase", "Glucoamylase"],
  },
  {
    group: "Sugars",
    count: "1 enzyme",
    examples: "Table sugar, fruit sugars, sweetened foods",
    enzymes: ["Invertase"],
  },
  {
    group: "Dairy",
    count: "1 enzyme",
    examples: "Milk, cheese, yogurt, ice cream",
    enzymes: ["Lactase"],
  },
  {
    group: "Fats & oils",
    count: "1 enzyme",
    examples: "Oils, butter, nuts, seeds, avocado, fried foods",
    enzymes: ["Lipase"],
  },
  {
    group: "Vegetables, legumes & fiber",
    count: "5 enzymes",
    examples: "Leafy greens, beans, lentils, whole grains",
    enzymes: ["Cellulase", "Hemicellulase", "Beta-Glucanase", "Alpha-Galactosidase", "Xylanase"],
  },
];

export function CoverageMatrix() {
  return (
    <section className="mt-12.5 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <h2 className="text-[23px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#16160f]">
        16 enzymes. Every food group covered.
      </h2>
      <p className="mt-1.5 text-[14.5px] leading-[1.5] text-[#6d6d65]">
        Most enzyme supplements include only a few. This one covers the full range of what&rsquo;s
        on your plate.
      </p>
      <div className="mt-5.5">
        {GROUPS.map((g) => (
          <div key={g.group} className="border-t border-[#e9e8e2] py-4 last:border-b">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[14.5px] font-semibold text-[#16160f]">{g.group}</span>
              <span className="shrink-0 text-[11px] text-[#9d9d94]">{g.count}</span>
            </div>
            <div className="mt-0.5 text-[12.5px] text-[#6d6d65]">{g.examples}</div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {g.enzymes.map((e) => (
                <span
                  key={e}
                  className="rounded-[5px] border border-[#e9e8e2] bg-[#f7f6f2] px-2 py-1 text-[10.5px] tracking-[0.01em] text-[#3a3a33]"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
