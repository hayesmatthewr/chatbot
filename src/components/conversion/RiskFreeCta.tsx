import Image from "next/image"

import { TryNowButton } from "./TryNowButton"

export function RiskFreeCta() {
  return (
    <section className="w-full bg-[#191919] px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Image
          src="/images/guarantee-icon.svg"
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className="size-7 invert"
        />
        <h2 className="mt-6 text-4xl leading-tight font-bold text-white sm:text-[45px]">
          Try Arq8&#8482; risk-free for 30 days.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base">
          Not satisfied? Full refund. No questions asked. If you&apos;re not
          feeling the difference within consistent 30 day use, we&apos;ll
          refund your first order. No hassle. Just results, or your money
          back. For full guarantee details and conditions, please visit{" "}
          <a href="#" className="underline underline-offset-2">
            Money-Back Guarantee
          </a>
          .
        </p>
        <TryNowButton variant="light" className="mt-8" />
      </div>
    </section>
  )
}
