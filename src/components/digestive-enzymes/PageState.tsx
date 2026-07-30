"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

export type QtyId = "60" | "90" | "180";
export type Frequency = "1 month" | "2 months";
export type PurchaseType = "sub" | "once";
export type SheetId = "supp-facts" | "science" | null;

export interface QtyOption {
  id: QtyId;
  name: string;
  was: number;
  disc: number;
  perMeal: string;
  badge?: { text: string; tone: "primary" | "success" };
}

export const QTY_OPTIONS: QtyOption[] = [
  { id: "60", name: "60 Count", was: 46.11, disc: 0.35, perMeal: "$0.50 / meal" },
  {
    id: "90",
    name: "90 Count",
    was: 64.95,
    disc: 0.4,
    perMeal: "$0.43 / meal",
    badge: { text: "Most Popular", tone: "primary" },
  },
  {
    id: "180",
    name: "180 Count",
    was: 98.07,
    disc: 0.45,
    perMeal: "$0.30 / meal",
    badge: { text: "Best Value", tone: "success" },
  },
];

interface PageStateValue {
  qty: QtyOption;
  setQtyId: (id: QtyId) => void;
  purchaseType: PurchaseType;
  setPurchaseType: (t: PurchaseType) => void;
  frequency: Frequency;
  setFrequency: (f: Frequency) => void;
  subPrice: number;
  activeSheet: SheetId;
  openSheet: (id: SheetId) => void;
  closeSheet: () => void;
  ctaRef: RefObject<HTMLButtonElement | null>;
  scrollToCta: () => void;
}

const PageStateContext = createContext<PageStateValue | null>(null);

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function PageStateProvider({ children }: { children: ReactNode }) {
  const [qtyId, setQtyId] = useState<QtyId>("90");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("sub");
  const [frequency, setFrequency] = useState<Frequency>("1 month");
  const [activeSheet, setActiveSheet] = useState<SheetId>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  const qty = useMemo(
    () => QTY_OPTIONS.find((o) => o.id === qtyId) ?? QTY_OPTIONS[1],
    [qtyId]
  );
  const subPrice = useMemo(() => qty.was * (1 - qty.disc), [qty]);

  const openSheet = (id: SheetId) => {
    setActiveSheet(id);
    document.body.style.overflow = "hidden";
  };
  const closeSheet = () => {
    setActiveSheet(null);
    document.body.style.overflow = "";
  };
  const scrollToCta = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <PageStateContext.Provider
      value={{
        qty,
        setQtyId,
        purchaseType,
        setPurchaseType,
        frequency,
        setFrequency,
        subPrice,
        activeSheet,
        openSheet,
        closeSheet,
        ctaRef,
        scrollToCta,
      }}
    >
      {children}
    </PageStateContext.Provider>
  );
}

export function usePageState() {
  const ctx = useContext(PageStateContext);
  if (!ctx) {
    throw new Error("usePageState must be used within a PageStateProvider");
  }
  return ctx;
}
