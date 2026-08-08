export function WaveLogomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" fill="none" className={className} aria-hidden>
      <path d="M2 6c4-4 8-4 12 0s8 4 12 0 8-4 12 0" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M2 14c4-4 8-4 12 0s8 4 12 0 8-4 12 0" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M2 22c4-4 8-4 12 0s8 4 12 0 8-4 12 0" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function BarsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 20" fill="none" className={className} aria-hidden>
      <rect x="0" y="10" width="3" height="10" fill="currentColor" />
      <rect x="6" y="6" width="3" height="14" fill="currentColor" />
      <rect x="16" y="2" width="3" height="18" fill="currentColor" />
      <rect x="22" y="8" width="3" height="12" fill="currentColor" />
      <rect x="28" y="0" width="3" height="20" fill="currentColor" />
    </svg>
  );
}

export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3.5 6L8 10.5L12.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 2.5V13.5M2.5 8H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" fill="none" className={className} aria-hidden>
      <path d="M0.5 8H23.5M23.5 8L16.5 1M23.5 8L16.5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#221D35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className, filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} className={className} aria-hidden>
      <path
        d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5z"
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.2}
      />
    </svg>
  );
}

export function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4 6h12l-1 10.5a1.5 1.5 0 01-1.5 1.5h-7a1.5 1.5 0 01-1.5-1.5L4 6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7 6V5a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 17c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.44-3.96 4.06V10H7.6v3.1h2.77v8h3.13z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.9 3H22l-7.5 8.6L23 21h-6.6l-5.2-6.4L5.3 21H2.2l8-9.1L1.5 3h6.8l4.7 5.9L18.9 3zm-1.15 16h1.7L7.35 4.9H5.5L17.75 19z" />
    </svg>
  );
}
