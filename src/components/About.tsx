import { STATS } from "@/lib/site";
import { cn } from "@/utils/cn";
import { Alert, Check, Sparkle } from "./Icons";
import { Counter, Eyebrow, SectionShell } from "./ui";

const DESK_IMG =
  "https://images.pexels.com/photos/5833758/pexels-photo-5833758.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=1250";

/* ------------------------------------------------------------------ */
export function StatsBand() {
  return (
    <SectionShell id="stats" tone="deeper" className="border-y border-white/8">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(ellipse, rgba(224,169,60,.2), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "reveal group relative px-2 sm:px-5",
                i > 0 && "lg:border-l lg:border-white/8",
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <p className="font-display text-[clamp(2.8rem,6vw,4.2rem)] leading-none font-semibold tracking-[-0.04em] text-paper-50 transition-colors duration-500 group-hover:text-gold-300">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <span className="mt-4 block h-px w-10 bg-gold-500/60 transition-all duration-500 group-hover:w-20" />
              <p className="mt-4 text-[14px] font-semibold tracking-[0.01em] text-paper-100">{s.label}</p>
              <p className="mt-1.5 max-w-[26ch] text-[12.5px] leading-relaxed text-paper-400">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 flex items-start gap-3 rounded-xl border border-gold-600/25 bg-gold-500/[0.06] px-4 py-3.5">
          <Alert className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
          <p className="text-[12.5px] leading-relaxed text-paper-300">
            <span className="font-semibold text-gold-300">Win rate</span> is the share of trades that
            closed in profit across our documented member sample. Trading leveraged markets carries a
            high level of risk. Past results do not guarantee future returns — never risk capital you
            cannot afford to lose.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------------ */
const PROMISES = [
  "Clear, jargon-free teaching for every experience level",
  "Risk management and trading psychology taught before strategy",
  "Transparent communication — no guaranteed-profit claims, ever",
  "Ongoing mentor feedback on your actual journal, not theory",
];

export function About() {
  return (
    <SectionShell id="about" tone="dark" className="py-24 lg:py-32">
      <div
        className="pointer-events-none absolute top-1/3 -left-52 h-[560px] w-[560px] rounded-full opacity-45 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(23,162,113,.22), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        {/* image column */}
        <div className="reveal lg:col-span-5">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[26px] border border-gold-500/20"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-ink-850">
              <img
                src={DESK_IMG}
                alt="A trader reviewing charts across multiple monitors at the Fortune Academy desk"
                loading="lazy"
                className="h-[420px] w-full object-cover opacity-85 transition-transform duration-[1.6s] ease-out hover:scale-[1.05] sm:h-[540px]"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(7,11,20,.92) 4%, rgba(7,11,20,.12) 55%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[10px] tracking-[0.26em] text-gold-400 uppercase">
                  The desk · London
                </p>
                <p className="mt-2 font-display text-xl leading-snug font-medium text-paper-50">
                  “We would rather teach one student to protect capital than sell a thousand
                  students a dream.”
                </p>
              </div>
            </div>

            <div className="animate-float absolute -right-4 -bottom-8 hidden w-52 rounded-2xl border border-white/10 bg-ink-900/95 p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,1)] backdrop-blur sm:block">
              <div className="flex items-center gap-2">
                <Sparkle className="h-4 w-4 text-gold-400" />
                <p className="font-mono text-[9.5px] tracking-[0.22em] text-paper-400 uppercase">
                  Members first
                </p>
              </div>
              <p className="mt-2 font-display text-3xl font-semibold text-paper-50 tabnum">92%</p>
              <p className="mt-1 text-[12px] leading-snug text-paper-400">
                of members renew their plan when it expires
              </p>
            </div>
          </div>
        </div>

        {/* copy column */}
        <div className="lg:col-span-7 lg:pl-6">
          <div className="reveal">
            <Eyebrow>About the academy</Eyebrow>
          </div>
          <h2
            className="reveal mt-6 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-paper-50"
            style={{ transitionDelay: "60ms" }}
          >
            A serious approach to
            <br className="hidden sm:block" /> the <span className="text-gold-400 italic">markets</span>.
          </h2>
          <div className="reveal mt-8 space-y-4 text-[15.5px] leading-[1.8] text-paper-300" style={{ transitionDelay: "120ms" }}>
            <p>
              Fortune Academy World was created to give aspiring traders a clear, honest path:
              understand what the market is doing, build a written plan, manage risk with precision and
              review the results without ego. We focus on education and process — not hype, not
              screenshots, not signals you cannot explain.
            </p>
            <p>
              Every member arrives with a different starting point, so the curriculum is layered. You
              are never thrown into a live session without the vocabulary to follow it, and you are
              never handed a strategy you have not first backtested yourself.
            </p>
          </div>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {PROMISES.map((p, i) => (
              <li
                key={p}
                className="reveal group flex items-start gap-3 rounded-xl border border-white/8 bg-ink-850/50 p-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold-500/45 hover:bg-ink-800/70"
                style={{ transitionDelay: `${180 + i * 70}ms` }}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-ink-950">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-[13.5px] leading-relaxed text-paper-200">{p}</span>
              </li>
            ))}
          </ul>

          <div className="reveal mt-10 grid gap-5 sm:grid-cols-5" style={{ transitionDelay: "320ms" }}>
            <div className="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-br from-gold-500/12 to-transparent p-6 sm:col-span-3">
              <p className="font-mono text-[10px] tracking-[0.26em] text-gold-400 uppercase">Our mission</p>
              <p className="mt-3 font-display text-[19px] leading-[1.5] font-medium text-paper-100">
                To raise the standard of retail trading education by teaching repeatable processes,
                protecting members from avoidable mistakes, and building a community that values
                patience over adrenaline.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-ink-850/60 p-6 sm:col-span-2">
              <p className="font-mono text-[10px] tracking-[0.26em] text-paper-400 uppercase">Our values</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Integrity", "Discipline", "Education", "Accountability"].map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-ink-600 px-3 py-1.5 text-[12px] font-medium text-paper-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint-500/60 hover:text-mint-300"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
