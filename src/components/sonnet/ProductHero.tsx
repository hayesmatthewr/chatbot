import Image from "next/image";
import { BuyBox } from "./BuyBox";
import { ProductDetails } from "./ProductDetails";

export function ProductHero() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-10 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <div className="bg-[#F5F5F5] rounded-2xl flex items-center justify-center p-8 lg:p-16 lg:sticky lg:top-24 lg:self-start">
        <Image
          src="/images/sonnet/sonnet-core-sleep-bottle-capsules.jpg"
          alt="Sonnet Core Sleep bottle with capsules"
          width={832}
          height={555}
          className="w-full max-w-lg h-auto object-contain"
          priority
        />
      </div>
      <div>
        <BuyBox />
        <ProductDetails />
      </div>
    </section>
  );
}
