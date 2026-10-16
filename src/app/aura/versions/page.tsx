const versions = [
  { href: "/aura/lab", name: "1 · Lab Journal", note: "Clinical white paper, large serif, hairline rules, footnoted numbers. Evidence-first, like a science journal." },
  { href: "/aura/night", name: "2 · Chrome Night", note: "Black stage, the silver pouch scaled huge, condensed capitals, hard corners. Performance gear energy." },
  { href: "/aura/golden", name: "3 · Golden Hour", note: "Warm full-bleed colour chapters from the sunset photo, soft serif, round shapes. Lifestyle and ritual." },
  { href: "/aura", name: "0 · Softgel motif (first build)", note: "The original version, kept for reference." },
];

export const metadata = { title: "Aura · Design directions" };

export default function VersionsPage() {
  return (
    <main className="mx-auto max-w-[960px] px-4 py-16 md:py-24">
      <h1 className="text-[clamp(36px,5vw,64px)] leading-none font-bold tracking-[-0.03em]">Aura PDP: three directions</h1>
      <p className="mt-4 max-w-[56ch] text-[17px]">Same copy, same images, same working cart. Different type, colour, shape and layout.</p>
      <ul className="mt-12 flex flex-col gap-3">
        {versions.map((v) => (
          <li key={v.href}>
            <a href={v.href} className="block rounded-[20px] bg-white p-6 transition-colors hover:bg-[#ffe9ea]">
              <span className="block text-[24px] font-bold">{v.name}</span>
              <span className="mt-1 block text-[16px] text-[#55554f]">{v.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
