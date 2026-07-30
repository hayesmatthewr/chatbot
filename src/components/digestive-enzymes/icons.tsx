"use client";

/**
 * Inline icon set matching the bespoke line-icon style used throughout the
 * Physician's Choice Digestive Enzymes page. Dependency-free by design so
 * stroke color/weight can be tuned per usage via className/props.
 */

import { useId } from "react";

type IconProps = {
  className?: string;
  size?: number;
};

export function CheckIcon({ className, size = 15 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.7}
      aria-hidden="true"
    >
      <path d="M3 8.5l3.2 3.2L13 4.5" />
    </svg>
  );
}

export function MenuIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="17" y2="6" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="14" x2="17" y2="14" />
    </svg>
  );
}

export function SearchIcon({ className, size = 19 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8.7" cy="8.7" r="5.7" />
      <line x1="17" y1="17" x2="12.8" y2="12.8" />
    </svg>
  );
}

export function CartIcon({ className, size = 19 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 6.5h11l-1 10.5h-9z" />
      <path d="M7 6.5V5a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

export function CloseIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function BackIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5l-5 5 5 5M6 10h9" />
    </svg>
  );
}

export function ClockIcon({ className, size = 15 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <circle cx="8" cy="8.5" r="6" />
      <path d="M8 5.2V8.5l2.4 1.6" />
      <path d="M5.7 1.7h4.6" />
    </svg>
  );
}

export function DoctorIcon({ className, size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M10 17v0a4 4 0 0 0 8 0v-2" />
      <circle cx="18" cy="13" r="2" />
    </svg>
  );
}

export function FlaskIcon({ className, size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 3v5l-3.5 8a1.6 1.6 0 0 0 1.5 2.2h10a1.6 1.6 0 0 0 1.5-2.2L15 8V3" />
      <path d="M8 3h8M7.5 13h9" />
    </svg>
  );
}

export function TruckIcon({ className, size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 6h12v9h-12z" />
      <path d="M13.5 9H17l3.5 3.5V15h-7z" />
      <circle cx="6" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
    </svg>
  );
}

export function ShieldIcon({ className, size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l7 2.5V11c0 4.3-2.9 7.4-7 8.6C7.9 18.4 5 15.3 5 11V5.5z" />
      <path d="M9 11.5l2 2 4-4.2" />
    </svg>
  );
}

export function NutritionLabelIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <rect x="4" y="2.5" width="12" height="15" rx="2" />
      <line x1="7" y1="7" x2="13" y2="7" />
      <line x1="7" y1="10" x2="13" y2="10" />
      <line x1="7" y1="13" x2="11" y2="13" />
    </svg>
  );
}

export function ScienceIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2.5v5.2L4.2 14.6A1.6 1.6 0 0 0 5.6 17h8.8a1.6 1.6 0 0 0 1.4-2.4L12 7.7V2.5" />
      <line x1="7" y1="2.5" x2="13" y2="2.5" />
      <line x1="6.6" y1="11.5" x2="13.4" y2="11.5" />
    </svg>
  );
}

export function RepeatIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <path d="M8 2v3.5M8 2l2 1.5M8 2 6 3.5" />
      <path d="M3 8a5 5 0 1 0 1.5-3.6" />
    </svg>
  );
}

export function StarIcon({
  className,
  size = 14,
  fill = "full",
}: IconProps & { fill?: "full" | "half" | "empty" }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden="true">
      {fill === "half" && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="#16160f" />
            <stop offset="50%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10 1.6l2.47 5.18 5.7.74-4.2 3.9 1.08 5.66L10 14.3l-5.05 2.78L6.03 11.42l-4.2-3.9 5.7-.74z"
        fill={fill === "full" ? "#16160f" : fill === "half" ? `url(#${id})` : "#CBD5E1"}
      />
    </svg>
  );
}

export function StarRating({
  rating,
  size = 14,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className={`inline-flex gap-px ${className ?? ""}`}>
      {Array.from({ length: full }).map((_, i) => (
        <StarIcon key={`f${i}`} size={size} fill="full" />
      ))}
      {hasHalf && <StarIcon size={size} fill="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <StarIcon key={`e${i}`} size={size} fill="empty" />
      ))}
    </span>
  );
}
