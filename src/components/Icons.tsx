import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

/* ---------- brand ---------- */
export function Logo({ className = "", ...p }: P) {
  return (
    <svg viewBox="0 0 44 44" className={className} {...p} aria-hidden="true">
      <defs>
        <linearGradient id="faw-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6DCA4" />
          <stop offset="52%" stopColor="#E0A93C" />
          <stop offset="100%" stopColor="#8F6415" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="42" height="42" rx="11" fill="#0A101C" stroke="url(#faw-g)" strokeWidth="1.4" />
      <rect x="10" y="22" width="4" height="12" rx="1.6" fill="#C4891F" />
      <rect x="18.4" y="13" width="4" height="21" rx="1.6" fill="url(#faw-g)" />
      <rect x="26.8" y="18" width="4" height="16" rx="1.6" fill="#2FC98F" />
      <path d="M8 30.5 L20 19.5 L28 24.5 L37 12" stroke="#F6DCA4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="37" cy="12" r="2.1" fill="#F6DCA4" />
    </svg>
  );
}

export function WhatsApp(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 19.05 5 9.85 9.85 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.41 8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Z" />
    </svg>
  );
}

export function Telegram(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
      <path d="M21.84 4.6 18.6 19.9c-.24 1.07-.88 1.33-1.78.83l-4.95-3.65-2.39 2.3c-.27.27-.49.49-1 .49l.35-5.03 9.14-8.26c.4-.35-.09-.55-.62-.2L6.19 13.4 1.3 11.87c-1.06-.33-1.08-1.06.22-1.57l19.06-7.35c.88-.32 1.65.2 1.26 1.65Z" />
    </svg>
  );
}

/* ---------- ui ---------- */
export const Arrow = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);
export const Chevron = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const Close = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);
export const Phone = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 12l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3Z" />
  </svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);
export const Globe = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
    <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
  </svg>
);
export const Calendar = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5l1.11-6.47L2.6 9.45l6.5-.95Z" />
  </svg>
);
export const Copy = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2.4" />
    <path d="M15 5.6A2.6 2.6 0 0 0 12.4 3H5.6A2.6 2.6 0 0 0 3 5.6v6.8A2.6 2.6 0 0 0 5.6 15" />
  </svg>
);
export const Sparkle = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M12 3.2 13.7 9l5.8 1.7-5.8 1.7L12 18.2 10.3 12.4 4.5 10.7 10.3 9Z" />
    <path d="M18.6 3.4 19.2 5.4l2 .6-2 .6-.6 2-.6-2-2-.6 2-.6Z" />
  </svg>
);
export const Quote = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
    <path d="M9.6 5.5c-3.4 1.4-5.6 4.5-5.6 8.2 0 3 1.7 4.8 4 4.8 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.7 0-.9.1.4-1.7 1.9-3.3 3.7-4.2Zm9.3 0c-3.4 1.4-5.6 4.5-5.6 8.2 0 3 1.7 4.8 4 4.8 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.3 0-.7 0-.9.1.4-1.7 1.9-3.3 3.7-4.2Z" />
  </svg>
);
export const TrendUp = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="m3 16 5.5-5.5 3.5 3.5L21 5" />
    <path d="M15.5 5H21v5.5" />
  </svg>
);
export const TrendDown = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="m3 8 5.5 5.5L12 10l9 9" />
    <path d="M15.5 19H21v-5.5" />
  </svg>
);
export const Lock = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <rect x="4.5" y="10" width="15" height="10.5" rx="2.4" />
    <path d="M8 10V7.6a4 4 0 0 1 8 0V10" />
  </svg>
);
export const Alert = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M12 4.2 21 19.5H3Z" />
    <path d="M12 10v4M12 16.8v.2" />
  </svg>
);

/* ---------- programme icons ---------- */
export const Compass = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8Z" />
  </svg>
);
export const Structure = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M3 18h18" />
    <rect x="4" y="12" width="3.4" height="6" rx="1" />
    <rect x="10.3" y="7" width="3.4" height="11" rx="1" />
    <rect x="16.6" y="10" width="3.4" height="8" rx="1" />
    <path d="M5.7 9.5 12 4.2l6.3 4" strokeDasharray="2 2.4" />
  </svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M12 3 5 5.8v5.4c0 4.3 2.9 7.7 7 9.3 4.1-1.6 7-5 7-9.3V5.8Z" />
    <path d="m9.2 12 2 2 3.6-4" />
  </svg>
);
export const Live = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <circle cx="12" cy="12" r="2.4" />
    <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4" />
    <path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2" />
  </svg>
);
export const People = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.6-3.1 2.8-4.8 5.5-4.8s4.9 1.7 5.5 4.8" />
    <path d="M16 5.6a3.2 3.2 0 0 1 0 6M17.6 15.2c2 .5 3.3 2.1 3.7 4.3" />
  </svg>
);
export const Pulse = (p: P) => (
  <svg {...base(p)} aria-hidden="true">
    <path d="M2.5 12.5h4l2.2-6 3.4 12 2.6-8 1.8 4h5" />
  </svg>
);

export const PROGRAMME_ICONS = {
  compass: Compass,
  structure: Structure,
  shield: Shield,
  live: Live,
  people: People,
  pulse: Pulse,
};
