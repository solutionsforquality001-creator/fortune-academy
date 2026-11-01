import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useCountUp } from "@/hooks/useMotion";

/* ---------------- eyebrow ---------------- */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.28em]",
        tone === "dark" ? "text-gold-400" : "text-gold-600",
        className,
      )}
    >
      <span className={cn("h-px w-8", tone === "dark" ? "bg-gold-500/60" : "bg-gold-600/50")} />
      <span className={cn("h-1.5 w-1.5 rotate-45", tone === "dark" ? "bg-gold-400" : "bg-gold-600")} />
      {children}
    </span>
  );
}

/* ---------------- section heading ---------------- */
export function SectionHead({
  kicker,
  title,
  lead,
  tone = "dark",
  align = "left",
  className,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow tone={tone}>{kicker}</Eyebrow>
      <h2
        className={cn(
          "max-w-3xl text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.03] font-semibold tracking-[-0.02em]",
          tone === "dark" ? "text-paper-50" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-[15px] leading-relaxed sm:text-base",
            tone === "dark" ? "text-paper-400" : "text-ink-500",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/* ---------------- buttons ---------------- */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline" | "ghost" | "wa" | "tg";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
};

export function Btn({
  href,
  children,
  variant = "gold",
  size = "md",
  className,
  external,
  icon,
  onClick,
  ariaLabel,
}: BtnProps) {
  const sizes = {
    sm: "px-4 py-2 text-[12.5px]",
    md: "px-5.5 py-3 text-[13.5px]",
    lg: "px-7 py-3.5 text-[14.5px]",
  };
  const variants = {
    gold: "bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-[0_10px_30px_-12px_rgba(224,169,60,0.85)] hover:shadow-[0_16px_42px_-12px_rgba(224,169,60,0.95)] hover:-translate-y-0.5",
    outline:
      "border border-ink-600 bg-ink-850/60 text-paper-100 hover:border-gold-500/70 hover:text-gold-200 hover:-translate-y-0.5",
    ghost: "text-paper-300 hover:text-gold-300",
    wa: "bg-[#25D366] text-[#04231a] hover:bg-[#37e077] hover:-translate-y-0.5 shadow-[0_10px_28px_-14px_rgba(37,211,102,0.9)]",
    tg: "bg-[#2AABEE] text-[#04202e] hover:bg-[#3fb9f7] hover:-translate-y-0.5 shadow-[0_10px_28px_-14px_rgba(42,171,238,0.9)]",
  };
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[0.01em] whitespace-nowrap transition-all duration-300 active:translate-y-0",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 shine opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shimmer" />
      {icon}
      <span className="relative">{children}</span>
    </a>
  );
}

/* ---------------- counter ---------------- */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const [ref, v] = useCountUp(value);
  return (
    <span ref={ref} className={cn("tabnum", className)}>
      {v.toLocaleString("en-GB", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------------- small bits ---------------- */
export function Dot({ className }: { className?: string }) {
  return <span className={cn("inline-block h-1.5 w-1.5 rounded-full bg-current", className)} />;
}

export function ImpactDot({ level }: { level: "high" | "medium" | "low" }) {
  const map = {
    high: ["bg-flame-500", "bg-flame-500/35", "bg-flame-500/20"],
    medium: ["bg-gold-400", "bg-gold-400/35", "bg-gold-400/18"],
    low: ["bg-ink-400", "bg-ink-400/30", "bg-ink-400/15"],
  }[level];
  return (
    <span className="flex items-center gap-1" title={`${level} impact`}>
      {map.map((c, i) => (
        <span key={i} className={cn("h-3 w-1.5 rounded-[1px]", c)} />
      ))}
    </span>
  );
}

export function SectionShell({
  id,
  children,
  className,
  tone = "dark",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light" | "deeper";
}) {
  const bg =
    tone === "light"
      ? "bg-paper-100 text-ink-800"
      : tone === "deeper"
        ? "bg-ink-950"
        : "bg-ink-900";
  return (
    <section id={id} className={cn("relative overflow-hidden", bg, className)}>
      {children}
    </section>
  );
}
