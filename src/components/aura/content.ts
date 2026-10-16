// All live copy for the Aura PDP. Strings marked PLACEHOLDER still need final copy.

export type BundleId = "4-week" | "12-week";

export interface Bundle {
  id: BundleId;
  name: string;
  weeks: number;
  price: number;
  compareAt: number;
  save: number;
  savePct: number;
  perWeek: string;
  tag?: string;
  bullets: string[];
}

export const bundles: Bundle[] = [
  {
    id: "4-week",
    name: "4-Week Supply",
    weeks: 4,
    price: 39,
    compareAt: 49,
    save: 10,
    savePct: 20,
    perWeek: "$9.75",
    bullets: ["Delivered every 4 weeks", "Cancel or pause anytime", "Free shipping"],
  },
  {
    id: "12-week",
    name: "12-Week Starter Kit",
    weeks: 12,
    price: 79,
    compareAt: 147,
    save: 68,
    savePct: 46,
    perWeek: "$6.58",
    tag: "Clinically Recommended",
    bullets: ["Delivered every 12 weeks", "Cancel or pause anytime", "Free shipping"],
  },
];

export const oneTime = { price: 49, shipping: "4.99", label: "4-Week Supply, one-time" };

export const rating = { score: "4.7", count: "2,431" };

export const guarantee = {
  headline: "Results in 12 weeks or your money back.†",
  short:
    "Take one softgel daily for 12 weeks. If you don't feel the difference, we'll refund you.†",
  sheet:
    "Subscribe to Aura and take one softgel daily for 12 weeks, the time research recommends. If you don't feel the difference, contact us and we'll refund your order.†",
  terms:
    "PLACEHOLDER: Confirm eligibility, claim window, what the refund covers, and the support email.",
};

export type SlideKind = "photo" | "dark" | "stat-chart" | "stat-red" | "review" | "guarantee" | "pouch-red";

export interface Slide {
  kind: SlideKind;
  thumb: string;
  alt: string;
  src?: string;
  kicker?: string;
  headline?: string;
  body?: string;
  footnote?: string;
  stat?: string;
  attribution?: string;
}

export const slides: Slide[] = [
  {
    kind: "photo",
    src: "/images/aura/pouch-studio.jpg",
    thumb: "/images/aura/pouch-studio.jpg",
    alt: "Aura Cellular Protection pouch in silver with red type",
  },
  {
    kind: "dark",
    thumb: "/images/aura/softgel-finger.jpg",
    alt: "The problem: oxidative stress",
    kicker: "The problem",
    headline: "Every cell takes hits from oxidative stress",
    body: "Sun, screens, hard training and time all add up, cell by cell.",
  },
  {
    kind: "dark",
    thumb: "/images/aura/petri-dish.jpg",
    src: "/images/aura/petri-dish.jpg",
    alt: "How it works: spans the whole cell membrane",
    kicker: "How it works",
    headline: "Spans the whole cell membrane",
    body: "Guards both sides of the membrane at once.‡",
  },
  {
    kind: "stat-chart",
    thumb: "/images/aura/softgel.png",
    alt: "Human study: focusing range up 22%",
    kicker: "Human study · 4 weeks",
    stat: "+22%",
    body: "focusing range in screen workers.‡ Placebo stayed flat.",
    footnote: "Nagaki et al., 2002. 13 per group, 5mg AstaReal® astaxanthin.",
  },
  {
    kind: "pouch-red",
    src: "/images/aura/pouch-cutout.png",
    thumb: "/images/aura/red-texture.jpg",
    alt: "Aura pouch over a red field",
  },
  {
    kind: "stat-red",
    thumb: "/images/aura/red-texture.jpg",
    alt: "6,000 times stronger than vitamin C at neutralizing singlet oxygen",
    kicker: "Compared to vitamin C",
    stat: "6,000×",
    body: "stronger at neutralizing singlet oxygen.◊",
    footnote: "◊ Lab test of one chemical reaction, not a human study. Nishida et al., 2007.",
  },
  {
    kind: "review",
    thumb: "/images/aura/sunset-hand.jpg",
    alt: "Customer review",
    kicker: "2,431 reviews",
    headline: "“My eye fatigue after clinic days is noticeably less.”",
    attribution: "Dr. R. Patel, MD · Verified buyer",
  },
  {
    kind: "photo",
    src: "/images/aura/pouch-closeup.jpg",
    thumb: "/images/aura/pouch-closeup.jpg",
    alt: "Aura pouch close-up in studio light",
  },
  {
    kind: "guarantee",
    thumb: "/images/aura/red-texture.jpg",
    alt: "12-Week Results Guarantee",
    headline: "12-Week Results Guarantee",
    body: "Take it daily for 12 weeks. Don't feel the difference? Get your money back.†",
  },
];

export const benefitGrid = [
  { label: "Cellular Defense‡", icon: "cell" },
  { label: "Skin Radiance‡", icon: "sun" },
  { label: "Eye Comfort‡", icon: "eye" },
  { label: "Exercise Recovery‡", icon: "pulse" },
  { label: "Heart Health‡", icon: "heart" },
  { label: "Healthy Aging‡", icon: "leaf" },
] as const;

export const dailyBenefits = [
  { title: "Cells", body: "Spans the cell membrane to defend against oxidative stress.‡" },
  { title: "Skin", body: "Helped skin hold moisture and elasticity in a 16-week human study.‡" },
  { title: "Eyes", body: "Focusing range up 22% in a 4-week study of screen workers.‡" },
  { title: "Recovery", body: "Lower blood lactate at max effort in a human study.‡" },
];

export const ugc = [
  { tag: "Skin", quote: "My skin looks noticeably brighter", image: "/images/aura/sunset-hand.jpg" },
  { tag: "Recovery", quote: "Bouncing back faster after training", image: "/images/aura/red-texture.jpg" },
  { tag: "Screen days", quote: "Less eye strain on long workdays", image: "/images/aura/pouch-closeup.jpg" },
  { tag: "Morning ritual", quote: "The easiest habit I've kept", image: "/images/aura/softgel-finger.jpg" },
  { tag: "Healthy aging", quote: "My non-negotiable for aging well", image: "/images/aura/petri-dish.jpg" },
  { tag: "Focus", quote: "Sharper through the afternoon", image: "/images/aura/pouch-studio.jpg" },
];

export const experts = [
  {
    name: "Shawn Talbott, PhD",
    role: "Nutritional biochemist · sports performance",
    quote:
      "We found a very novel effect of natural astaxanthin to improve overall cardiovascular function.",
    source: "Interview, NutraIngredients, 2017",
  },
  {
    name: "Parris Kidd, PhD",
    role: "Cell biologist · author, antioxidant reviews",
    quote: "A nutrient with unique cell membrane actions and diverse clinical benefits.",
    source: "Alternative Medicine Review, 2011",
  },
  {
    name: "Karen Hecht, PhD",
    role: "Nutritional biochemist · astaxanthin researcher",
    quote:
      "Astaxanthin modulated mitochondrial functions by a novel mechanism independent of its antioxidant function.",
    source: "Nishida, Hecht et al., Nutrients, 2021",
  },
  {
    name: "Teruo Miyazawa, PhD",
    role: "Professor Emeritus · Tohoku University",
    quote: "Astaxanthin has the potential to act as an important antioxidant in erythrocytes.",
    source: "Nakagawa, Miyazawa et al., British Journal of Nutrition, 2011",
  },
];

export const antioxidantRows = [
  {
    feature: "Spans the full cell membrane",
    values: [true, false, false, false],
    detail:
      "Astaxanthin's structure lets it sit across the entire cell membrane, shielding both the water- and fat-facing layers at once. Most antioxidants only cover one side.",
  },
  {
    feature: "Protects without turning harmful",
    values: [true, false, false, false],
    detail:
      "Unlike some antioxidants, astaxanthin doesn't become a pro-oxidant (a free-radical generator itself) once it has neutralized radicals.",
  },
  {
    feature: "Reaches the brain and eyes",
    values: [true, false, false, false],
    detail:
      "Astaxanthin can cross the blood-brain and blood-retina barriers, giving it access to tissues many antioxidants can't reach.",
  },
  {
    feature: "Neutralizes multiple radicals",
    values: [true, true, false, true],
    detail:
      "Its extended molecular structure lets one astaxanthin molecule quench several free radicals, rather than being used up after a single reaction.",
  },
  {
    feature: "Protects the mitochondria",
    values: [true, false, true, false],
    detail:
      "Astaxanthin accumulates in mitochondrial membranes, helping guard the cell's energy-producing engine from oxidative damage.",
  },
];

export const antioxidantColumns = ["Aura", "Vitamin C", "CoQ10", "Vitamin E"];

export const astaxanthinRows: { feature: string; aura: string; typical: string }[] = [
  { feature: "85+ human clinical studies¹", aura: "yes", typical: "no" },
  { feature: "Natural algae, never synthetic", aura: "yes", typical: "Often synthetic" },
  { feature: "Grown and extracted in the USA", aura: "yes", typical: "Rarely" },
  { feature: "Solvent-free CO₂ extraction", aura: "yes", typical: "Varies" },
  { feature: "USP-GMP certified²", aura: "yes", typical: "no" },
];

export interface DeepDive {
  category: string;
  hook: string;
  body: string;
  chartTitle: string;
  value: number;
  valueLabel: string;
  comparator: string;
  note?: string;
  tentative?: boolean;
}

// value = size of the effect in the chart's own unit; bars are drawn relative to it.
export const deepDives: DeepDive[] = [
  {
    category: "Skin Health",
    hook: "Raise your skin's sun threshold 12%",
    body: "Sun is the fastest way to age skin. Shown to raise skin's sun threshold 12% in nine weeks, protecting the collagen that keeps you looking firm and even.‡",
    chartTitle: "Sun threshold over 9 weeks",
    value: 12,
    valueLabel: "+12%",
    comparator: "Placebo",
    note: "Change vs placebo, measured at start and week 9.",
  },
  {
    category: "Eye Health",
    hook: "Widen your focusing range 22%",
    body: "Screens keep your eyes locked at one distance all day. In a 4-week study of screen workers, focusing range grew 22% while placebo stayed flat.‡",
    chartTitle: "Focusing range · 4 weeks",
    value: 22,
    valueLabel: "+22%",
    comparator: "Placebo",
    note: "Nagaki et al., 2002. Small study, 13 per group, 5mg AstaReal® astaxanthin; Aura contains 12mg.",
  },
  {
    category: "Performance & Recovery",
    hook: "Lower lactate at max effort",
    body: "Recovery decides how often you can train hard. Shown to lower blood lactate at max effort, so back-to-back sessions cost you less.‡",
    chartTitle: "Blood lactate at max effort",
    value: 18.5,
    valueLabel: "−1.85 mmol/L",
    comparator: "Placebo",
  },
  {
    category: "Healthy Aging",
    hook: "Boost mitochondrial signals 25%",
    body: "Energy fades with age because mitochondria do. Shown to raise mitochondrial building signals 25% in twelve weeks, defending your daily output.‡",
    chartTitle: "Mitochondrial building signals",
    value: 25,
    valueLabel: "+25%",
    comparator: "Placebo",
  },
  {
    category: "Immune Health",
    hook: "Strengthen immune response 18%",
    body: "Constant oxidative load wears immune signalling down. Shown to strengthen immune cell response 18% in eight weeks, for steadier defense through hard seasons.‡",
    chartTitle: "Immune cell response · 8 weeks",
    value: 18,
    valueLabel: "+18%",
    comparator: "Placebo",
  },
  {
    category: "Metabolic Health",
    hook: "Lower fasting glucose 16 mg/dL",
    body: "Fasting glucose is the first marker of metabolic drift. Shown across nine trials to lower it 16 mg/dL, moving borderline readings back to healthy.‡",
    chartTitle: "Fasting glucose",
    value: 16,
    valueLabel: "−16 mg/dL",
    comparator: "Control",
  },
  {
    category: "Heart Health",
    hook: "Drop triglycerides 25%",
    body: "Blood lipids drive long-term heart risk. Shown to drop triglycerides 25% and raise good cholesterol 15% in twelve weeks.‡",
    chartTitle: "Triglycerides · 12 weeks",
    value: 25,
    valueLabel: "−25%",
    comparator: "Placebo",
  },
  {
    category: "Brain Health",
    hook: "Support focus and memory",
    body: "Focus and memory rely on cells the body protects poorly. Improved several cognitive scores in 96 adults, though not significantly overall. Early, not proven.‡",
    chartTitle: "Cognitive scores · Early data",
    value: 8,
    valueLabel: "Trend",
    comparator: "Placebo",
    note: "Trend only. Not statistically significant overall.",
    tentative: true,
  },
];

export const timeline = [
  {
    week: 1,
    label: "Day 01",
    headline: "Start building your levels.",
    body: "Take one softgel with a meal that has some fat. Astaxanthin is fat-soluble, so food helps you absorb it.",
    image: "/images/aura/softgel-finger.jpg",
    alt: "A red Aura softgel balanced on a fingertip",
  },
  {
    week: 4,
    label: "Week 04",
    headline: "Eyes handle screens better.",
    body: "In studies, the lag when eyes refocus between distances dropped 63% by week four.‡",
    image: "/images/aura/pouch-closeup.jpg",
    alt: "Close-up of the Aura pouch label",
  },
  {
    week: 8,
    label: "Week 08",
    headline: "Skin and immune defenses build.",
    body: "Skin's sun threshold rose 12% by week nine, and immune cell response rose 18% by week eight.‡",
    image: "/images/aura/sunset-hand.jpg",
    alt: "A hand silhouetted against sunlit water",
  },
  {
    week: 12,
    label: "Week 12",
    headline: "Deeper markers shift.",
    body: "Mitochondrial building signals rose 25% and triglycerides fell 25% by week twelve.‡",
    image: "/images/aura/red-texture.jpg",
    alt: "Deep red astaxanthin texture",
  },
];

export const reviewDistribution = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 13 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export const reviewFilters = ["All", "Skin", "Recovery", "Eyes", "Energy"] as const;

export const reviews = [
  {
    tag: "Skin",
    headline: "My skin has never looked this even",
    body: "I was skeptical a supplement could do anything for my skin. Twelve weeks in, I burn less on runs and my skin looks clearer. I'm not stopping.",
    reviewer: "Sarah M. · Austin, TX · Taking 12 weeks",
  },
  {
    tag: "Recovery",
    headline: "Bouncing back faster after training",
    body: "I train five days a week. Legs feel fresher the next morning and I've stopped dreading back-to-back sessions.",
    reviewer: "James R. · Denver, CO · Taking 8 weeks",
  },
  {
    tag: "Eyes",
    headline: "Less eye strain on long screen days",
    body: "I'm on screens ten hours a day. By evening my eyes used to ache. That's noticeably better now.",
    reviewer: "Priya K. · Brooklyn, NY · Taking 6 weeks",
  },
  {
    tag: "Habit",
    headline: "The easiest habit I've kept",
    body: "One softgel with breakfast. Nothing to mix, no taste. It's the only supplement I haven't quit.",
    reviewer: "Dana L. · San Diego, CA · Taking 4 months",
  },
  {
    tag: "Energy",
    headline: "Steadier energy through the afternoon",
    body: "Hard to pin down at first, but my 3pm slump is gone. Would recommend giving it the full 12 weeks.",
    reviewer: "Marcus T. · Chicago, IL · Taking 12 weeks",
  },
];

export const faqs = {
  Science: [
    {
      q: "What is astaxanthin?",
      a: "A red carotenoid made by microalgae to protect themselves from intense sun. It's one of the most studied antioxidants, with 85+ human clinical studies, and it embeds across your cell membranes to defend against oxidative stress.‡",
    },
    {
      q: "How do I take it?",
      a: "One softgel a day with a meal that contains some fat, which helps absorption. Same time each day makes it easy to remember.",
    },
    {
      q: "Is it safe? How has it been studied?",
      a: "Astaxanthin is backed by 40+ safety studies and has a well-characterized safety profile at daily doses, with no serious adverse events reported in clinical trials. It can generally be taken alongside other supplements. If you're pregnant, nursing, on medication or have a medical condition, check with your doctor first.",
    },
  ],
  Results: [
    {
      q: "When will I see results?",
      a: "Most studies measure results at 8 to 12 weeks of daily use, which is why we recommend a 12-week starting routine. Some people notice changes sooner.",
    },
    {
      q: "Does it replace sunscreen?",
      a: "No. Aura supports your skin's defenses from the inside, but you should keep using sunscreen and other sun protection.",
    },
  ],
  Orders: [
    {
      q: "Can I pause or cancel my subscription?",
      a: "Yes, anytime from your account, with no fees. You can also change your delivery frequency.",
    },
    {
      q: "What is the 12-Week Results Guarantee?",
      a: "Take Aura daily for 12 weeks. If you don't feel the difference, contact us and we'll refund you.† PLACEHOLDER: confirm terms.",
    },
    {
      q: "How fast is shipping?",
      a: "PLACEHOLDER: shipping times and costs by region.",
    },
  ],
} as const;

export const fdaDisclaimer =
  "‡ These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.";
