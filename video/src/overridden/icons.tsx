const base = {
  fill: "none",
  stroke: "white",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const BanIcon = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...base}>
    <circle cx="24" cy="24" r="16" />
    <path d="M12.7 12.7l22.6 22.6" />
  </svg>
);

export const TargetIcon = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...base}>
    <circle cx="24" cy="24" r="15" />
    <circle cx="24" cy="24" r="6" />
    <path d="M24 4v7M24 37v7M4 24h7M37 24h7" />
  </svg>
);

export const CheckIcon = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...base}>
    <rect x="9" y="9" width="30" height="30" rx="6" />
    <path d="M16 24.5l5.5 5.5L33 18.5" />
  </svg>
);
