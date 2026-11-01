import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { HERO_PAIRS, PILLARS, whatsappLink } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks/useMotion";
import { ArrowUpRight, Live, Star, WhatsApp } from "./Icons";
import { Btn, Eyebrow } from "./ui";

/* ------------------------------------------------------------------ */
/* candlestick terminal                                                */
/* ------------------------------------------------------------------ */

type Candle = { id: number; o: number; h: number; l: number; c: number };

const N = 44;
const W = 660;
const H = 330;
const PAD_L = 10;
const PAD_R = 74;
const PAD_T = 18;
const PAD_B = 22;

function buildCandles(base: number, vol: number): Candle[] {
  const out: Candle[] = [];
  let price = base * (1 - (vol / base) * 6);
  for (let i = 0; i < N; i++) {
    const o = price;
    const drift = (Math.random() - 0.44) * vol;
    const c = o + drift;
    const h = Math.max(o, c) + Math.random() * vol * 0.55;
    const l = Math.min(o, c) - Math.random() * vol * 0.55;
    out.push({ id: i, o, h, l, c });
    price = c;
  }
  return out;
}

function CandleChart({ base, vol, digits }: { base: number; vol: number; digits: number }) {
  const reduced = usePrefersReducedMotion();
  const [candles, setCandles] = useState<Candle[]>(() => buildCandles(base, vol));
  const nextId = useRef(N);

  useEffect(() => {
    setCandles(buildCandles(base, vol));
    nextId.current = N;
  }, [base, vol]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        const o = last.c;
        const drift = (Math.random() - 0.45) * vol;
        const c = o + drift;
        const h = Math.max(o, c) + Math.random() * vol * 0.5;
        const l = Math.min(o, c) - Math.random() * vol * 0.5;
        const candle = { id: nextId.current++, o, h, l, c };
        return [...prev.slice(1), candle];
      });
    }, 1700);
    return () => window.clearInterval(id);
  }, [vol, reduced]);

  const { min, max, closePath, areaPath, last, lastId } = useMemo(() => {
    let lo = Infinity;
    let hi = -Infinity;
    candles.forEach((c) => {
      lo = Math.min(lo, c.l);
      hi = Math.max(hi, c.h);
    });
    const padY = (hi - lo) * 0.14 || 1;
    lo -= padY;
    hi += padY;
    const innerW = W - PAD_L - PAD_R;
    const step = innerW / candles.length;
    const y = (v: number) => PAD_T + ((hi - v) / (hi - lo)) * (H - PAD_T - PAD_B);
    const pts = candles.map((c, i) => [PAD_L + step * (i + 0.5), y(c.c)] as const);
    const d = pts.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
    const area = `${d} L${pts[pts.length - 1][0].toFixed(1)} ${H - PAD_B} L${pts[0][0].toFixed(1)} ${H - PAD_B} Z`;
    const lastC = candles[candles.length - 1];
    return { min: lo, max: hi, closePath: d, areaPath: area, last: lastC, lastId: lastC.id };
  }, [candles]);

  const step = (W - PAD_L - PAD_R) / candles.length;
  const y = (v: number) => PAD_T + ((max - v) / (max - min)) * (H - PAD_T - PAD_B);
  const up = last.c >= last.o;
  const accent = up ? "#2FC98F" : "#F2555F";
  const lastY = y(last.c);
  const fmt = (v: number) =>
    v.toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Live market candlestick chart">
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E0A93C" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#EEC46A" stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>

      {[0.15, 0.35, 0.55, 0.75, 0.95].map((t) => {
        const gy = PAD_T + t * (H - PAD_T - PAD_B);
        const val = max - t * (max - min);
        return (
          <g key={t}>
            <line x1={PAD_L} x2={W - PAD_R + 8} y1={gy} y2={gy} stroke="#ffffff" strokeOpacity="0.055" strokeWidth="1" />
            <text x={W - PAD_R + 14} y={gy + 3.5} fill="#5b6f96" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
              {fmt(val)}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#area-fill)" />

      {candles.map((c, i) => {
        const cx = PAD_L + step * (i + 0.5);
        const bullish = c.c >= c.o;
        const color = bullish ? "#2FC98F" : "#F2555F";
        const top = y(Math.max(c.o, c.c));
        const bot = y(Math.min(c.o, c.c));
        const bw = Math.max(2.4, step * 0.52);
        return (
          <g
            key={c.id}
            className={c.id === lastId && !reduced ? "animate-candle-in" : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <line x1={cx} x2={cx} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.9" />
            <rect x={cx - bw / 2} y={top} width={bw} height={Math.max(1.4, bot - top)} rx="0.8" fill={color} opacity={c.id === lastId ? 1 : 0.88} />
          </g>
        );
      })}

      <path d={closePath} fill="none" stroke="url(#line-grad)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" opacity="0.75" />

      <line x1={PAD_L} x2={W - PAD_R + 10} y1={lastY} y2={lastY} stroke={accent} strokeWidth="1" strokeDasharray="4 4" opacity="0.75" vectorEffect="non-scaling-stroke" />
      <rect x={W - PAD_R + 10} y={lastY - 9} width="60" height="18" rx="3" fill={accent} />
      <text x={W - PAD_R + 40} y={lastY + 3.6} textAnchor="middle" fill="#04060c" fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        {fmt(last.c)}
      </text>
      <circle cx={PAD_L + step * (candles.length - 0.5)} cy={lastY} r="3.4" fill={accent} />
      <circle cx={PAD_L + step * (candles.length - 0.5)} cy={lastY} r="7" fill={accent} opacity="0.28" className={reduced ? undefined : "animate-pulse-ring"} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* session status                                                      */
/* ------------------------------------------------------------------ */

const SESSIONS = [
  { name: "Tokyo", open: 0, close: 6 },
  { name: "London", open: 8, close: 16 },
  { name: "New York", open: 13, close: 20 },
];

function useSession() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, []);
  const h = now.getUTCHours() + now.getUTCMinutes() / 60;
  const live = SESSIONS.find((s) => h >= s.open && h < s.close);
  const clock = `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`;
  return live
    ? { label: `${live.name} open · ${clock} GMT`, live: true }
    : { label: `Closed · ${clock} GMT`, live: false };
}

/* ------------------------------------------------------------------ */
/* hero                                                                */
/* ------------------------------------------------------------------ */

const MONOGRAMS = [
  { t: "AO", c: "#E0A93C" },
  { t: "CR", c: "#2FC98F" },
  { t: "TM", c: "#7fa7ff" },
  { t: "YA", c: "#f08fb0" },
  { t: "EP", c: "#c8a2ff" },
];

export default function Hero() {
  const [pairIdx, setPairIdx] = useState(0);
  const [pillar, setPillar] = useState(0);
  const session = useSession();
  const pair = HERO_PAIRS[pairIdx];
  const digits = pair.symbol === "EUR/USD" ? 4 : pair.symbol === "BTC/USD" ? 0 : 2;

  return (
    <section id="top" className="noise relative overflow-hidden bg-ink-900 pt-14 sm:pt-16 lg:pt-20">
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 -left-32 h-[620px] w-[620px] rounded-full opacity-60 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(224,169,60,.28), transparent 68%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-24 -right-40 h-[700px] w-[700px] rounded-full opacity-55 blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(23,162,113,.24), transparent 66%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
        style={{ background: "linear-gradient(to top, #070B14, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- copy ---------------- */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="reveal">
              <Eyebrow>Professional trading education &amp; community</Eyebrow>
            </div>

            <h1
              className="reveal mt-7 font-display text-[clamp(2.35rem,7.6vw,5.6rem)] leading-[0.96] font-semibold tracking-[-0.035em] text-paper-50"
              style={{ transitionDelay: "80ms" }}
            >
              Fortune favours
              <br />
              the <span className="text-gold-400 italic" style={{ fontWeight: 500 }}>disciplined</span>.
            </h1>

            <div className="reveal mt-7 flex items-center gap-4" style={{ transitionDelay: "150ms" }}>
              <span className="h-px w-16 bg-gradient-to-r from-gold-500 to-transparent" />
              <span className="font-mono text-[11px] tracking-[0.24em] text-paper-400 uppercase">
                Structure · Risk · Accountability
              </span>
            </div>

            <p
              className="reveal mt-6 max-w-xl text-[16px] leading-[1.75] text-paper-300 sm:text-[17px]"
              style={{ transitionDelay: "200ms" }}
            >
              Fortune Academy World is a professional trading academy built around education, risk
              management and honest accountability — so members build real skill step by step instead
              of chasing noise.
            </p>

            {/* pillars with hover detail */}
            <div
              className="reveal mt-9"
              style={{ transitionDelay: "260ms" }}
              onMouseLeave={() => setPillar(0)}
            >
              <ul className="flex flex-wrap gap-2.5">
                {PILLARS.map((p, i) => (
                  <li key={p.title}>
                    <button
                      type="button"
                      onMouseEnter={() => setPillar(i)}
                      onFocus={() => setPillar(i)}
                      onClick={() => setPillar(i)}
                      className={cn(
                        "group flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-semibold tracking-wide transition-all duration-300",
                        pillar === i
                          ? "-translate-y-0.5 border-gold-400/80 bg-gold-400/12 text-gold-200 shadow-[0_10px_28px_-16px_rgba(224,169,60,.9)]"
                          : "border-ink-600 bg-ink-850/50 text-paper-300 hover:border-gold-500/50",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rotate-45 transition-colors",
                          pillar === i ? "bg-gold-300" : "bg-ink-400 group-hover:bg-gold-500",
                        )}
                      />
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-3 h-5 font-mono text-[12px] tracking-[0.02em] text-paper-400 normal-case transition-opacity duration-300">
                {PILLARS[pillar].copy}
              </p>
            </div>

            {/* CTAs */}
            <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ transitionDelay: "320ms" }}>
              <Btn href="#join" size="lg">
                Join the Academy
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Btn>
              <Btn
                href={whatsappLink("Hello Fortune Academy World, I'd like to speak to a mentor about joining.")}
                external
                variant="outline"
                size="lg"
                icon={<WhatsApp className="h-4 w-4 text-mint-400" />}
              >
                Talk to a mentor
              </Btn>
            </div>

            {/* social proof */}
            <div className="reveal mt-11 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ transitionDelay: "380ms" }}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {MONOGRAMS.map((m) => (
                    <span
                      key={m.t}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-900 font-mono text-[10.5px] font-bold text-ink-950 transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: m.c }}
                    >
                      {m.t}
                    </span>
                  ))}
                </div>
                <div className="leading-tight">
                  <p className="text-[13.5px] font-semibold text-paper-100">1,240+ members</p>
                  <p className="font-mono text-[10.5px] tracking-[0.14em] text-paper-400 uppercase">30+ countries</p>
                </div>
              </div>
              <div className="h-9 w-px bg-ink-600" />
              <div className="leading-tight">
                <div className="flex items-center gap-1 text-gold-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5" />
                  ))}
                  <span className="ml-1.5 text-[13px] font-semibold text-paper-100">4.9</span>
                </div>
                <p className="mt-1 font-mono text-[10.5px] tracking-[0.14em] text-paper-400 uppercase">
                  380 member reviews
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- terminal ---------------- */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            <div className="reveal relative" style={{ transitionDelay: "240ms" }}>
              {/* glow */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-70 blur-2xl"
                style={{ background: "radial-gradient(60% 60% at 60% 40%, rgba(224,169,60,.16), transparent 70%)" }}
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-ink-850/90 shadow-[0_50px_100px_-40px_rgba(0,0,0,1)] backdrop-blur-xl">
                {/* header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 bg-ink-900/70 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {HERO_PAIRS.map((p, i) => (
                      <button
                        key={p.symbol}
                        type="button"
                        onClick={() => setPairIdx(i)}
                        className={cn(
                          "rounded-md px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.1em] uppercase transition-all duration-300",
                          i === pairIdx
                            ? "bg-gold-400/15 text-gold-200 ring-1 ring-gold-400/50"
                            : "text-paper-400 hover:bg-white/5 hover:text-paper-200",
                        )}
                      >
                        {p.symbol}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] uppercase">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        session.live ? "animate-blink bg-mint-400" : "bg-ink-400",
                      )}
                    />
                    <span className={session.live ? "text-mint-400" : "text-paper-400"}>{session.label}</span>
                  </div>
                </div>

                {/* chart */}
                <div className="relative h-[240px] px-2 pt-2 sm:h-[330px]">
                  <CandleChart base={pair.base} vol={pair.vol} digits={digits} />
                  <div className="pointer-events-none absolute top-4 left-5">
                    <p className="font-mono text-[10px] tracking-[0.26em] text-paper-400 uppercase">
                      {pair.label} · 5m
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold text-paper-50 tabnum">
                      {pair.symbol}
                    </p>
                  </div>
                </div>

                {/* footer stats */}
                <div className="grid grid-cols-4 divide-x divide-white/8 border-t border-white/8 bg-ink-900/60">
                  {(() => {
                    const f = (v: number) =>
                      v.toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits });
                    const sp = pair.vol * 0.34;
                    const rows = [
                      { k: "Bid", v: f(pair.base - sp / 2) },
                      { k: "Ask", v: f(pair.base + sp / 2) },
                      { k: "Spread", v: sp.toFixed(digits > 2 ? 1 : 2) },
                      { k: "Day range", v: `${f(pair.base + pair.vol * 5.5)} / ${f(pair.base - pair.vol * 6)}` },
                    ];
                    return rows.map((s) => (
                      <div key={s.k} className="px-3 py-2.5 text-center">
                        <p className="font-mono text-[9.5px] tracking-[0.18em] text-paper-400 uppercase">{s.k}</p>
                        <p className="mt-1 font-mono text-[11px] font-medium text-paper-100 tabnum">{s.v}</p>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* floating cards */}
              <div className="animate-float pointer-events-none absolute -top-5 -left-4 hidden rounded-xl border border-mint-500/30 bg-ink-900/95 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,1)] backdrop-blur sm:block">
                <div className="flex items-center gap-2">
                  <Live className="h-4 w-4 text-mint-400" />
                  <div className="leading-tight">
                    <p className="font-mono text-[9.5px] tracking-[0.2em] text-paper-400 uppercase">This week</p>
                    <p className="font-display text-lg font-semibold text-mint-400 tabnum">+2.4R</p>
                  </div>
                </div>
              </div>

              <div
                className="animate-float-slow pointer-events-none absolute -right-3 -bottom-6 hidden rounded-xl border border-gold-500/30 bg-ink-900/95 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,1)] backdrop-blur sm:block"
                style={{ ["--tilt" as string]: "2deg" }}
              >
                <p className="font-mono text-[9.5px] tracking-[0.2em] text-paper-400 uppercase">Risk per trade</p>
                <p className="font-display text-lg font-semibold text-gold-300 tabnum">0.5% max</p>
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="mt-16 hidden items-center justify-center gap-3 lg:flex">
          <span className="h-10 w-px bg-gradient-to-b from-transparent via-gold-500/70 to-transparent" />
          <a
            href="#stats"
            className="group flex items-center gap-2 font-mono text-[10.5px] tracking-[0.28em] text-paper-400 uppercase transition-colors hover:text-gold-300"
          >
            Scroll to explore
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </a>
          <span className="h-10 w-px bg-gradient-to-b from-transparent via-gold-500/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
