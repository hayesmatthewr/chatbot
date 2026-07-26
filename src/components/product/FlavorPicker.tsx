"use client"

type Flavor = "strawberry" | "mango"

interface FlavorPickerProps {
  value: Flavor
  onChange: (flavor: Flavor) => void
}

const FLAVORS: { id: Flavor; label: string; dotColor: string }[] = [
  { id: "strawberry", label: "Strawberry", dotColor: "bg-red-500" },
  { id: "mango", label: "Mango", dotColor: "bg-orange-500" },
]

export function FlavorPicker({ value, onChange }: FlavorPickerProps) {
  return (
    <div>
      <p className="mb-2 text-sm text-foreground">Select flavor:</p>
      <div className="grid grid-cols-2 gap-3">
        {FLAVORS.map((flavor) => {
          const isActive = value === flavor.id
          return (
            <button
              key={flavor.id}
              type="button"
              onClick={() => onChange(flavor.id)}
              aria-pressed={isActive}
              className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground"
              }`}
            >
              <span
                className={`size-2 rounded-full ${flavor.dotColor}`}
                aria-hidden="true"
              />
              {flavor.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export type { Flavor }
