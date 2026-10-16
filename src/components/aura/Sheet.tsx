"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "bottom" | "right";
}

// Native <dialog> sheet: focus trap, Esc and backdrop close come from the platform.
export function Sheet({ open, onClose, title, children, side = "bottom" }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-0 max-h-none max-w-none bg-aura-paper p-0 text-aura-ink",
        side === "bottom"
          ? "fixed inset-x-0 top-auto bottom-0 max-h-[85svh] w-full rounded-t-[28px] md:inset-x-auto md:left-1/2 md:max-w-[640px] md:-translate-x-1/2"
          : "fixed inset-y-0 right-0 left-auto h-full max-h-none w-full max-w-[420px]",
      )}
    >
      <div className="flex items-start justify-between gap-6 px-6 pt-6 pb-2">
        <h2 className="text-[26px] leading-tight font-bold tracking-[-0.02em]">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-aura-step transition-transform hover:scale-105 active:scale-95"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <div className="overflow-y-auto px-6 pb-8 text-[17px] leading-[1.55]">{children}</div>
    </dialog>
  );
}
