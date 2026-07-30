import { FrequencyPicker } from "./FrequencyPicker";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { PurchaseCta } from "./PurchaseCta";
import { QuantityPicker } from "./QuantityPicker";
import { TrustRow } from "./TrustRow";
import { UpsellList } from "./UpsellList";
import { UrgencyBar } from "./UrgencyBar";

export function ProductHero() {
  return (
    <div className="grid grid-cols-1 gap-8 px-5 pt-2 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pt-9">
      <ProductGallery />
      <div>
        <ProductInfo />
        <QuantityPicker />
        <FrequencyPicker />
        <UrgencyBar />
        <PurchaseCta />
        <UpsellList />
        <TrustRow />
      </div>
    </div>
  );
}
