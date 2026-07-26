import { ProductGallery } from "./ProductGallery"
import { ProductPurchaseBox } from "./ProductPurchaseBox"

export function ProductHero() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery />
        <ProductPurchaseBox />
      </div>
    </section>
  )
}
