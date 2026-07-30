"use client";

import Image from "next/image";
import { useState } from "react";
import { usePageState } from "../PageState";

export function ProductGallery() {
  const [badgeVisible, setBadgeVisible] = useState(true);
  const { openSheet } = usePageState();

  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      <div className="relative flex gap-2 overflow-x-auto px-5 pt-4.5 [scrollbar-width:none] lg:px-0 lg:pt-0 [&::-webkit-scrollbar]:hidden">
        <div className="relative aspect-[1/1.12] w-[86%] shrink-0 overflow-hidden rounded-[3px] bg-white lg:w-full">
          {badgeVisible && (
            <div className="absolute top-3.5 left-3.5 z-[15] flex max-w-[calc(100%-40px)] w-max items-center gap-3.5 rounded-[11px] border-[1.5px] border-[#16160f] bg-white p-3">
              <button
                type="button"
                aria-label="Dismiss badge"
                onClick={() => setBadgeVisible(false)}
                className="absolute top-1.5 right-[7px] flex size-[18px] items-center justify-center border-none bg-transparent"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#6d6d65" strokeWidth={1.6} strokeLinecap="round">
                  <path d="M3 3l8 8M11 3l-8 8" />
                </svg>
              </button>
              <div className="flex shrink-0 items-center gap-[3px]">
                <span className="text-left text-[13.5px] leading-[1.12] font-bold whitespace-nowrap text-[#16160f]">
                  Developed
                  <br />
                  with Doctors
                </span>
              </div>
              <div className="w-[152px] shrink-0">
                <p className="text-[10.5px] leading-[1.32] text-[#3a3a33]">
                  Approved and reviewed by clinical experts.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex">
                    {[0, 1, 2].map((i) => (
                      <i
                        key={i}
                        className="block size-[19px] rounded-full border-[1.5px] border-white bg-gradient-to-br from-[#c9c2b6] to-[#b3a89a] -ml-1.5 first:ml-0"
                      />
                    ))}
                  </span>
                  <button
                    type="button"
                    onClick={() => openSheet("science")}
                    className="text-[10.5px] font-bold whitespace-nowrap text-[#16160f]"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          )}
          <Image
            src="/images/digestive-enzymes/bottle-hero.jpg"
            alt="Physician's Choice Digestive Enzymes bottle"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 86vw"
            className="object-contain"
          />
        </div>
        <div
          className="flex aspect-[1/1.12] w-[86%] shrink-0 items-center justify-center rounded-[3px] bg-[#f7f6f2] font-medium text-[10px] tracking-[0.1em] text-[#9d9d94] uppercase lg:hidden"
          aria-hidden="true"
        >
          Lifestyle / Detail
        </div>
      </div>
    </div>
  );
}
