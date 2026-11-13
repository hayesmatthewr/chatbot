const base = {
  fill: "none",
  stroke: "white",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LinkIcon = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...base}>
    <rect x="6" y="15" width="22" height="13" rx="6.5" transform="rotate(-8 17 21.5)" />
    <rect x="20" y="21" width="22" height="13" rx="6.5" transform="rotate(-8 31 27.5)" />
  </svg>
);

export const MinusCircleIcon = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...base}>
    <circle cx="24" cy="24" r="17" />
    <path d="M17 24h14" />
  </svg>
);

export const PersonIcon = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...base}>
    <circle cx="24" cy="15" r="7.5" />
    <path d="M10 41v-3a11 11 0 0 1 11-11h6a11 11 0 0 1 11 11v3z" />
  </svg>
);
