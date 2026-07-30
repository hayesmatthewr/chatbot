"use client";

import { useState, type ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export function Accordion({
  items,
  defaultOpenId,
  titleClassName,
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
  titleClassName?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="mt-2">
      <div className="h-px bg-[#e9e8e2]" />
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-3.5 py-4.5 text-left select-none"
            >
              <span
                className={
                  titleClassName ??
                  "text-[15.5px] font-semibold tracking-[-0.005em] text-[#16160f]"
                }
              >
                {item.title}
              </span>
              <span className="relative size-4.5 shrink-0">
                <span className="absolute top-1/2 right-px left-px h-[1.6px] -translate-y-1/2 bg-[#16160f]" />
                <span
                  className={`absolute top-px bottom-px left-1/2 w-[1.6px] -translate-x-1/2 bg-[#16160f] transition-[opacity,transform] duration-200 ${
                    isOpen ? "rotate-90 opacity-0" : ""
                  }`}
                />
              </span>
            </button>
            {isOpen && <div className="pb-6">{item.content}</div>}
            <div className="h-px bg-[#e9e8e2]" />
          </div>
        );
      })}
    </div>
  );
}
