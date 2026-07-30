"use client";

import Image from "next/image";
import { useState } from "react";

const UPSELLS = [
  {
    id: "probiotic",
    name: "60 Billion Probiotic",
    desc: "Daily support for a balanced gut, regularity, and immune health.",
    image: "/images/digestive-enzymes/probiotic-upsell.jpg",
  },
  {
    id: "fiber",
    name: "Fiber Gummies",
    desc: "Prebiotic fiber that supports regularity and feelings of fullness.",
    image: "/images/digestive-enzymes/fiber-gummies-upsell.jpg",
  },
];

export function UpsellList() {
  const [added, setAdded] = useState<Record<string, boolean>>({});

  return (
    <div>
      <div className="mt-5.5 font-semibold text-[10.5px] tracking-[0.09em] text-[#6d6d65] uppercase">
        Frequently bought together
      </div>
      <div className="mt-2.5 flex flex-col gap-2.5">
        {UPSELLS.map((item) => {
          const isAdded = added[item.id];
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-[10px] border border-[#e9e8e2] bg-white p-3"
            >
              <Image
                src={item.image}
                alt={`Physician's Choice ${item.name}`}
                width={66}
                height={66}
                loading="lazy"
                className="size-[66px] shrink-0 rounded-lg bg-white object-contain"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-[#16160f]">{item.name}</div>
                <div className="mt-0.5 text-xs leading-[1.4] text-[#6d6d65]">
                  {item.desc}
                  <sup className="ml-px text-[0.58em] leading-none font-normal">*</sup>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAdded((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                className={`shrink-0 rounded-full border-[1.5px] px-4.5 py-2 font-semibold text-[12.5px] transition-colors ${
                  isAdded
                    ? "border-[#CA133D] bg-[#CA133D] text-white"
                    : "border-[#CA133D] bg-white text-[#CA133D] hover:bg-[#CA133D] hover:text-white"
                }`}
              >
                {isAdded ? "Added ✓" : "Add"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
