import Image from "next/image"

interface Gift {
  label: string
  worth?: string
  image: string
  alt: string
}

const GIFTS: Gift[] = [
  {
    label: "FREE Water bottle",
    worth: "$15",
    image: "/images/gummies_listing_2.4.webp",
    alt: "Arq8 water bottle",
  },
  {
    label: "FREE Longevity guide for men",
    worth: "$17",
    image: "/images/gummies_listing_2.5.webp",
    alt: "Longevity guide for men",
  },
  {
    label: "FREE Longevity guide for women",
    worth: "$17",
    image: "/images/gummies_listing_2.6.webp",
    alt: "Longevity guide for women",
  },
  {
    label: "FREE Shipping",
    image: "/images/gummies_listing_2.7.webp",
    alt: "Shipping",
  },
]

export function FreeGiftsBox() {
  return (
    <div>
      <p className="mb-3 text-sm text-foreground">
        Free gifts with your first order:
      </p>
      <ul className="flex flex-col gap-3">
        {GIFTS.map((gift) => (
          <li key={gift.label} className="flex items-center gap-3">
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-background">
              <Image
                src={gift.image}
                alt={gift.alt}
                fill
                className="object-cover"
                sizes="36px"
              />
            </span>
            <span className="text-sm text-foreground">
              <span className="font-semibold">{gift.label}</span>
              {gift.worth && (
                <span className="ml-1 text-muted-foreground">
                  (worth {gift.worth})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
