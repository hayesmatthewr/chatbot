const CARDS = ["Pudding test", "On bread", "On meat"];

export function PuddingTest() {
  return (
    <section className="mt-9 px-5 lg:mx-auto lg:max-w-[860px] lg:px-0">
      <h2 className="text-[23px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#16160f]">
        Watch them break down food in real time
      </h2>
      <p className="mt-2 text-[14.5px] leading-[1.55] text-[#6d6d65]">
        Empty a capsule onto pudding, bread, or meat and you can watch it start to break down.
        It&rsquo;s the same process happening to your food when you take it with a meal.
      </p>
      <div className="mt-4.5 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CARDS.map((cap) => (
          <div key={cap} className="w-[56%] shrink-0 sm:w-[30%]">
            <div className="relative flex aspect-[9/14] w-full items-center justify-center rounded-md bg-[#edece7]">
              <span className="flex size-10.5 items-center justify-center rounded-full bg-white/90">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#16160f">
                  <path d="M5 3.5l7 4.5-7 4.5z" />
                </svg>
              </span>
            </div>
            <div className="mt-2.5 text-[13px] text-[#6d6d65]">{cap}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-[1.5] text-[#9d9d94]">
        For demonstration only. For best results, take 1 capsule with your meal.
      </p>
    </section>
  );
}
