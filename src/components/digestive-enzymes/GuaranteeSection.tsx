export function GuaranteeSection() {
  return (
    <section className="mt-12.5 bg-[#f7f6f2] px-5 py-11 text-center lg:px-10">
      <div className="mx-auto flex size-15.5 items-center justify-center rounded-full border-[1.5px] border-[#047857]">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2.5l7 2.5V11c0 4.6-3 7.9-7 9.5-4-1.6-7-4.9-7-9.5V5z" />
          <path d="M8.5 12l2.4 2.4L16 9.3" />
        </svg>
      </div>
      <h2 className="mt-4.5 text-2xl font-semibold tracking-[-0.02em] text-[#16160f]">
        Try it for 60 days, risk-free
      </h2>
      <p className="mx-auto mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-[#3a3a33]">
        If you don&rsquo;t feel more comfortable after meals, contact us within 60 days for a full
        refund. No return needed, no hassle.
      </p>
    </section>
  );
}
