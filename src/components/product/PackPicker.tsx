"use client"

type PackSize = "1" | "2" | "3"

interface PackPickerProps {
  value: PackSize
  onChange: (pack: PackSize) => void
}

const PACKS: { id: PackSize; label: string; recommended?: boolean }[] = [
  { id: "1", label: "1 PACK" },
  { id: "2", label: "2 PACK", recommended: true },
  { id: "3", label: "3 PACK" },
]

export function PackPicker({ value, onChange }: PackPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PACKS.map((pack) => {
        const isActive = value === pack.id
        return (
          <div key={pack.id} className="relative">
            {pack.recommended && (
              <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[#f5fe5e] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground">
                Recommended
              </span>
            )}
            <button
              type="button"
              onClick={() => onChange(pack.id)}
              aria-pressed={isActive}
              className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground"
              }`}
            >
              {pack.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export type { PackSize }
