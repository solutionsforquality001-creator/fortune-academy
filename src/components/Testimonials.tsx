import { TESTIMONIALS } from "@/lib/site";
import { cn } from "@/utils/cn";
import { Quote, Star } from "./Icons";
import { Counter, Eyebrow, SectionShell } from "./ui";

const AVATAR_TINTS = ["#E0A93C", "#2FC98F", "#7fa7ff", "#f08fb0", "#c8a2ff", "#4fe0ac", "#eec46a", "#ff8a8f"];

function initials(name: string) {
  return name
    .replace(".", "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Card({ t, i }: { t: (typeof TESTIMONIALS)[number]; i: number }) {
  return (
    <figure
      className={cn(
        "group relative w-[330px] shrink-0 overflow-hidden rounded-[18px] border border-white/8 bg-ink-850/70 p-6 transition-all duration-500 sm:w-[400px]",
        "hover:-translate-y-1 hover:border-gold-500/40 hover:bg-ink-800/90 hover:shadow-[0_36px_70px_-40px_rgba(0,0,0,1)]",
      )}
    >
      <Quote className="absolute -top-2 -right-1 h-20 w-20 text-white/[0.035] transition-colors duration-500 group-hover:text-gold-500/10" />
      <div className="flex items-center gap-1 text-gold-400">
        {Array.from({ length: t.rating }).map((_, s) => (
          <Star key={s} className="h-3.5 w-3.5" />
        ))}
      </div>
      <blockquote className="relative mt-4 text-[14.5px] leading-[1.75] text-paper-200">
        “{t.quote}”
      </blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11.5px] font-bold text-ink-950 ring-2 ring-white/10 transition-transform duration-500 group-hover:scale-110"
          style={{ background: AVATAR_TINTS[i % AVATAR_TINTS.length] }}
        >
          {initials(t.name)}
        </span>
        <span className="leading-tight">
          <span className="block text-[13.5px] font-semibold text-paper-50">{t.name}</span>
          <span className="block font-mono text-[10.5px] tracking-[0.14em] text-paper-400 uppercase">
            {t.location} · {t.plan}
          </span>
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full border border-mint-500/30 bg-mint-500/8 px-2 py-1 font-mono text-[8.5px] tracking-[0.16em] text-mint-300 uppercase">
          <span className="h-1 w-1 rounded-full bg-mint-400" />
          Verified
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const rowA = TESTIMONIALS.slice(0, 5);
  const rowB = TESTIMONIALS.slice(3);

  return (
    <SectionShell id="members" tone="deeper" className="py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[700px] blur-[130px]"
        style={{ background: "radial-gradient(ellipse, rgba(23,162,113,.18), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="reveal flex flex-col gap-5">
            <Eyebrow>Member voices</Eyebrow>
            <h2 className="max-w-xl font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-paper-50">
              Traders who stopped
              <br className="hidden sm:block" /> <span className="text-gold-400 italic">guessing</span>.
            </h2>
          </div>
          <div className="reveal flex items-center gap-8 rounded-[18px] border border-white/8 bg-ink-850/60 px-6 py-5" style={{ transitionDelay: "110ms" }}>
            <div>
              <p className="font-display text-[42px] leading-none font-semibold text-paper-50 tabnum">
                <Counter value={4.9} decimals={1} />
              </p>
              <div className="mt-2 flex items-center gap-1 text-gold-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3 w-3" />
                ))}
              </div>
            </div>
            <div className="h-14 w-px bg-white/10" />
            <div>
              <p className="font-display text-[42px] leading-none font-semibold text-paper-50 tabnum">
                <Counter value={380} suffix="+" />
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-paper-400 uppercase">
                Verified reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* dual marquee */}
      <div className="marquee-host relative mt-14 flex flex-col gap-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent sm:w-40" />

        <div className="overflow-hidden">
          <div className="marquee-track animate-marquee-slow gap-5">
            {[...rowA, ...rowA].map((t, i) => (
              <Card key={`a-${i}`} t={t} i={i} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track animate-marquee-rev gap-5">
            {[...rowB, ...rowB].map((t, i) => (
              <Card key={`b-${i}`} t={t} i={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
