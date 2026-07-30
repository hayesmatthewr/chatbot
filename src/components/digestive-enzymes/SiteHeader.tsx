import { CartIcon, MenuIcon, SearchIcon } from "./icons";

export function SiteHeader() {
  return (
    <>
      <div className="bg-[#16160f] px-4 py-2.5 text-center font-medium text-[10.5px] tracking-[0.05em] text-white leading-snug">
        DEVELOPED WITH DOCTORS
        <span className="mx-[7px] opacity-50">·</span>
        #1 ENZYME BRAND
        <span className="mx-[7px] opacity-50">·</span>
        60-DAY GUARANTEE
      </div>

      <header className="sticky top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#e9e8e2] bg-white/95 px-5 py-4 backdrop-blur-sm lg:px-10">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Open menu"
            aria-haspopup="true"
            className="flex size-10 items-center justify-center rounded-full text-[#16160f] transition-colors hover:bg-[#f7f6f2]"
          >
            <MenuIcon />
          </button>
        </div>
        <a
          href="#"
          aria-label="Physician's Choice home"
          className="block text-center text-[15px] leading-none font-bold tracking-[-0.01em] text-[#16160f]"
        >
          Physician&rsquo;s Choice
          <small className="mt-[3px] block font-medium text-[8px] tracking-[0.22em] text-[#6d6d65] uppercase">
            Digestive Enzymes
          </small>
        </a>
        <div className="flex items-center justify-end">
          <button
            type="button"
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full text-[#16160f] transition-colors hover:bg-[#f7f6f2]"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label="Cart, 0 items"
            className="flex size-10 items-center justify-center rounded-full text-[#16160f] transition-colors hover:bg-[#f7f6f2]"
          >
            <CartIcon />
          </button>
        </div>
      </header>
    </>
  );
}
