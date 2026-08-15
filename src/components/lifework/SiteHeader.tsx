const NAV_LINKS = ["Cellular Protection", "How It Works", "Clinical Studies", "Reviews"];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--lifework-line)] bg-[var(--lifework-cream)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
        <div className="text-[19px] font-semibold tracking-tight">Lifework</div>
        <nav className="hidden items-center gap-8 text-[14px] text-[var(--lifework-ink-soft)] lg:flex">
          {NAV_LINKS.map((link) => (
            <span key={link} className="cursor-pointer transition-colors hover:text-[var(--lifework-ink)]">
              {link}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-[14px]">
          <span className="hidden sm:inline text-[var(--lifework-ink-soft)]">Account</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--lifework-line)] text-xs">
            0
          </span>
        </div>
      </div>
    </header>
  );
}
