"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { bundles, type Bundle, type BundleId } from "./content";

interface CartState {
  selected: Bundle;
  select: (id: BundleId) => void;
  count: number;
  toast: string | null;
  add: (message: string) => void;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<BundleId>("12-week");
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const add = useCallback((message: string) => {
    setCount((c) => c + 1);
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const value = useMemo<CartState>(
    () => ({
      selected: bundles.find((b) => b.id === selectedId) ?? bundles[1],
      select: setSelectedId,
      count,
      toast,
      add,
    }),
    [selectedId, count, toast, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function Toast() {
  const { toast } = useCart();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center px-4"
    >
      {toast && (
        <p className="rounded-full bg-aura-ink px-6 py-3 text-[15px] font-medium text-white shadow-[0_12px_32px_rgb(0_0_0/0.25)]">
          {toast}
        </p>
      )}
    </div>
  );
}
