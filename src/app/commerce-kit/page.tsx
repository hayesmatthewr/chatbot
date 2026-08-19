import AnnouncementBar from "@/components/commerce/AnnouncementBar";
import CartDrawer from "@/components/commerce/CartDrawer";
import { Checkout1 } from "@/components/commerce/Checkout";
import { CompareProducts1 } from "@/components/commerce/CompareProducts";
import { Faq1 } from "@/components/commerce/Faq";
import { ProductCategories1 } from "@/components/commerce/ProductCategories";
import { ProductDetail1 } from "@/components/commerce/ProductDetail";
import { ProductGallery1 } from "@/components/commerce/ProductGallery";
import { ProductList1 } from "@/components/commerce/ProductList";
import { ProductQuickView4 } from "@/components/commerce/ProductQuickView";
import { ProductSpecs1 } from "@/components/commerce/ProductSpecs";

function KitSection({
  name,
  source,
  children,
}: {
  name: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 pb-2">
          <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          <code className="text-xs text-muted-foreground">{source}</code>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function CommerceKitPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="border-b border-border bg-muted/40 px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Commerce Kit</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Reusable DTC ecommerce blocks installed from the shadcn registry
          (@shadcnblocks), adapted to this project&apos;s base-ui-based
          shadcn primitives. Import from{" "}
          <code className="text-foreground">@/components/commerce</code> in
          any page.
        </p>
      </div>

      <KitSection name="Announcement Bar" source="@shadcnblocks/announcement-announcement-standard-1">
        <div className="flex justify-center px-4 py-8">
          <AnnouncementBar />
        </div>
      </KitSection>

      <KitSection name="Cart Drawer" source="@shadcnblocks/drawer-drawer-right-4">
        <div className="flex justify-center px-4 py-8">
          <CartDrawer />
        </div>
      </KitSection>

      <KitSection name="Product Gallery" source="@shadcnblocks/product-gallery1">
        <ProductGallery1 className="py-8" />
      </KitSection>

      <KitSection name="Product Detail" source="@shadcnblocks/product-detail1">
        <ProductDetail1 className="py-8" />
      </KitSection>

      <KitSection name="Product Quick View" source="@shadcnblocks/product-quick-view4">
        <div className="flex justify-center px-4 py-8">
          <ProductQuickView4 />
        </div>
      </KitSection>

      <KitSection name="Product List" source="@shadcnblocks/product-list1">
        <ProductList1 className="py-8" />
      </KitSection>

      <KitSection name="Product Categories" source="@shadcnblocks/product-categories1">
        <ProductCategories1 className="py-8" />
      </KitSection>

      <KitSection name="Product Specs" source="@shadcnblocks/product-specs1">
        <ProductSpecs1 className="py-8" />
      </KitSection>

      <KitSection name="Compare Products" source="@shadcnblocks/compare-products1">
        <CompareProducts1 className="py-8" />
      </KitSection>

      <KitSection name="FAQ" source="@shadcnblocks/faq1">
        <Faq1 className="py-8" />
      </KitSection>

      <KitSection name="Checkout" source="@shadcnblocks/checkout1">
        <Checkout1 className="py-8" />
      </KitSection>
    </main>
  );
}
