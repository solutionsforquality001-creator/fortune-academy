import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { INSTRUMENTS, type Instrument } from "@/lib/site";
import { TrendDown, TrendUp } from "./Icons";

type Row = Instrument & { flash: "up" | "down" | null };

function jitter(v: number, pct: number) {
  const move = (Math.random() - 0.48) * pct;
  return { price: +(v * (1 + move)).toFixed(6), delta: move * 100 };
}

export default function Ticker() {
  const [rows, setRows] = useState<Row[]>(() =>
    INSTRUMENTS.map((i) => ({ ...i, flash: null })),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setRows((prev) => {
        const next = [...prev];
        const picks = new Set<number>();
        while (picks.size < 4) picks.add(Math.floor(Math.random() * next.length));
        picks.forEach((idx) => {
          const cur = next[idx];
          const { price, delta } = jitter(cur.price, 0.0016);
          next[idx] = {
            ...cur,
            price: +price.toFixed(cur.digits),
            change: +(cur.change + delta).toFixed(2),
            flash: delta >= 0 ? "up" : "down",
          };
        });
        return next;
      });
    }, 2400);

    const clear = window.setInterval(() => {
      setRows((prev) => (prev.some((r) => r.flash) ? prev.map((r) => ({ ...r, flash: null })) : prev));
    }, 1000);

    return () => {
      window.clearInterval(id);
      window.clearInterval(clear);
    };
  }, []);

  const items = useMemo(() => [...rows, ...rows], [rows]);

  return (
    <div className="relative z-30 border-y border-white/8 bg-ink-950/90 backdrop-blur-md">
      <div className="flex items-stretch">
        <div className="z-10 flex shrink-0 items-center gap-2 border-r border-white/8 bg-ink-950 px-4 py-2.5 sm:px-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame-500 opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-flame-500" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-paper-200 uppercase">Live</span>
        </div>

        <div className="marquee-host relative min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track animate-marquee items-center gap-0 will-change-transform">
            {items.map((r, i) => (
              <div
                key={`${r.symbol}-${i}`}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 border-r border-white/6 px-4 py-2.5 sm:px-5",
                  r.flash === "up" && "flash-up",
                  r.flash === "down" && "flash-down",
                )}
              >
                <span className="font-mono text-[11px] tracking-[0.12em] text-paper-300 uppercase">
                  {r.symbol}
                </span>
                <span className="tabnum font-mono text-[12.5px] font-medium text-paper-50">
                  {r.price.toLocaleString("en-GB", {
                    minimumFractionDigits: r.digits,
                    maximumFractionDigits: r.digits,
                  })}
                </span>
                <span
                  className={cn(
                    "tabnum flex items-center gap-1 font-mono text-[11.5px] font-semibold",
                    r.change >= 0 ? "text-mint-400" : "text-flame-400",
                  )}
                >
                  {r.change >= 0 ? (
                    <TrendUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendDown className="h-3.5 w-3.5" />
                  )}
                  {r.change >= 0 ? "+" : ""}
                  {r.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent" />
        </div>
      </div>
    </div>
  );
}
