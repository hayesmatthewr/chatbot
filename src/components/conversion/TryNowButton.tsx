import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface TryNowButtonProps {
  className?: string
  variant?: "dark" | "light"
}

export function TryNowButton({ className, variant = "dark" }: TryNowButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-85",
        variant === "dark"
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground",
        className
      )}
    >
      TRY Arq8&#8482; NOW
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </button>
  )
}
