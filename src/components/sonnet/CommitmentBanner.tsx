import { ArrowRightIcon } from "./icons";

function BedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 18v2M21 18v2M3 12V8a1 1 0 011-1h6v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 20s-7-4.4-9.5-8.8C1 8.4 2.4 5 6 5c2 0 3.5 1.2 4.5 2.7C11.5 6.2 13 5 15 5c3.6 0 5 3.4 3.5 6.2C18 15.6 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommitmentBanner() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-[#345E9E] text-white px-6 lg:px-16 py-10 flex gap-5 items-start">
        <span className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <BedIcon className="w-6 h-6" />
        </span>
        <div>
          <h3 className="text-lg font-semibold">Our Commitment</h3>
          <p className="mt-1 text-white/85 max-w-md">
            Continually innovate to create the most evidence-backed approach to improving your long-term sleep health
          </p>
          <a href="/pages/research" className="mt-3 inline-flex items-center gap-2 font-semibold underline">
            Our Research <ArrowRightIcon className="w-4 h-3" />
          </a>
        </div>
      </div>
      <div className="bg-[#E79E6D] text-white px-6 lg:px-16 py-10 flex gap-5 items-start">
        <span className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <HeartIcon className="w-6 h-6" />
        </span>
        <div>
          <h3 className="text-lg font-semibold">Happiness Guarantee</h3>
          <p className="mt-1 text-white/90 max-w-md">
            Sleep isn&apos;t one-size-fits-all. Many see improvements the first night and full benefits after several
            weeks. If that&apos;s not the case, please reach out and let us know - we&apos;ll work to make it right.
          </p>
          <a href="/pages/contact" className="mt-3 inline-flex items-center gap-2 font-semibold underline">
            Contact Us <ArrowRightIcon className="w-4 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
