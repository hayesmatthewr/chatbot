"use client";

import { useEffect, type ReactNode } from "react";
import { usePageState } from "../PageState";
import { BackIcon, CloseIcon } from "../icons";
import type { SheetId } from "../PageState";

export function BottomSheet({
  id,
  eyebrow,
  children,
}: {
  id: NonNullable<SheetId>;
  eyebrow: string;
  children: ReactNode;
}) {
  const { activeSheet, closeSheet } = usePageState();
  const open = activeSheet === id;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeSheet]);

  return (
    <>
      <div
        onClick={closeSheet}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-[#14140f]/45 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={eyebrow}
        className={`fixed left-1/2 bottom-0 z-[70] flex h-[93vh] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.18)] transition-transform duration-[380ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "translate-y-0" : "translate-y-[101%]"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between px-5.5 pt-5 pb-3">
          <span className="text-[16px] font-semibold text-[#16160f]">{eyebrow}</span>
          <button
            type="button"
            aria-label="Close"
            onClick={closeSheet}
            className="flex size-8.5 shrink-0 items-center justify-center rounded-full bg-[#f7f6f2]"
          >
            <CloseIcon className="text-[#16160f]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5.5 pt-1.5 pb-6.5">{children}</div>
        <div className="shrink-0 border-t border-[#e9e8e2] bg-white px-5.5 pt-3.5 pb-[calc(18px+env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={closeSheet}
            className="inline-flex items-center gap-2 rounded-full border border-[#cfcec7] bg-white px-5.5 py-3 font-semibold text-sm text-[#16160f]"
          >
            <BackIcon className="text-[#16160f]" />
            Keep Shopping
          </button>
        </div>
      </div>
    </>
  );
}
