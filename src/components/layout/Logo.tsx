"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 24, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z"
        stroke="url(#logo-grad)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M32 4 L32 32 M8 18 L32 32 M56 18 L32 32"
        stroke="url(#logo-grad)"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <rect x="29" y="16" width="6" height="22" rx="1" fill="url(#logo-grad)" />
      <path d="M29 38 L32 44 L35 38 Z" fill="url(#logo-grad)" />
      <rect x="29" y="14" width="6" height="4" rx="1" fill="url(#logo-grad)" opacity="0.7" />
      <line x1="29.5" y1="16" x2="34.5" y2="16" stroke="#18181b" strokeWidth="0.8" />
    </svg>
  );
}
