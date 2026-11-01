import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { whatsappLink } from "@/lib/site";
import { ArrowUpRight, Check, Close, WhatsApp } from "./Icons";
import { Btn, Eyebrow, SectionShell } from "./ui";

type Mentor = {
  name: string;
  role: string;
  since: string;
  img: string;
  quote: string;
  specialisms: string[];
  trades: string;
};

const MENTORS: Mentor[] = [
  {
    name: "Marcus Adeyemi",
    role: "Head of Education",
    since: "Trading since 2011",
    img: "https://images.pexels.com/photos/38453564/pexels-photo-38453564.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1120",
    quote:
      "I spent four years losing money before I ever wrote a plan. That is why the first module we teach is risk, not entries.",
    specialisms: ["Market structure", "Index trading", "Prop-firm challenges"],
    trades: "1,900+ journal entries reviewed with members",
  },
  {
    name: "Isabella Moreau",
    role: "Lead Strategy Mentor",
    since: "Trading since 2014",
    img: "https://images.pexels.com/photos/8528574/pexels-photo-8528574.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1120",
    quote:
      "A strategy you cannot explain in one sentence is a strategy you cannot execute when it matters. We simplify until it sticks.",
    specialisms: ["Supply & demand", "Gold & FX majors", "Backtesting protocol"],
    trades: "Runs the Wednesday Strategy Lab",
  },
  {
    name: "Amara Nwosu",
    role: "Risk & Performance Coach",
    since: "Trading since 2016",
    img: "https://images.pexels.com/photos/24285935/pexels-photo-24285935.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1120",
    quote:
      "Your journal tells you the truth about your psychology long before your P&L does. We read it together every single week.",
    specialisms: ["Trading psychology", "Position sizing", "Drawdown recovery"],
    trades: "Weekly 1-to-1 mentor reviews",
  },
];

const FOR_YOU = [
  "You want to understand why a trade worked, not just copy it",
  "You are willing to spend weeks on a demo before risking capital",
  "You want honest feedback on your journal, even when it stings",
  "You would rather compound slowly than gamble for a screenshot",
];

const NOT_FOR_YOU = [
  "You are looking for guaranteed daily profits or a signal service",
  "You want someone to trade your account for you",
  "You are trading money you cannot afford to lose",
  "You expect to be wealthy within a month",
];

export default function Desk() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % MENTORS.length), 6500);
    return () => window.clearInterval(id);
  }, [paused]);

  const mentor = MENTORS[active];

  return (
    <SectionShell id="desk" tone="dark" className="py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 mask-fade-b" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-1/4 -left-40 h-[560px] w-[560px] rounded-full opacity-45 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(224,169,60,.2), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------------- left ---------------- */}
          <div className="lg:col-span-5">
            <div className="reveal">
              <Eyebrow>The desk</Eyebrow>
            </div>
            <h2
              className="reveal mt-6 font-display text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.03] font-semibold tracking-[-0.028em] text-paper-50"
              style={{ transitionDelay: "60ms" }}
            >
              Three mentors.
              <br />
              One <span className="text-gold-400 italic">standard</span>.
            </h2>
            <p
              className="reveal mt-6 max-w-lg text-[15px] leading-[1.8] text-paper-400"
              style={{ transitionDelay: "110ms" }}
            >
              Every session is taught by a working trader who journals their own positions. No
              anonymous signal feeds, no rented influencers, no one on the team who has not blown an
              account and learned from it publicly.
            </p>

            {/* rotating quote */}
            <div
              className="reveal mt-9 rounded-[20px] border border-gold-500/25 bg-gradient-to-br from-gold-500/[0.09] to-transparent p-6"
              style={{ transitionDelay: "160ms" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 font-mono text-[11px] font-bold text-ink-950">
                  {mentor.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p key={mentor.name} className="animate-rise-in truncate font-display text-[17px] font-semibold text-paper-50">
                    {mentor.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-gold-400 uppercase">
                    {mentor.role}
                  </p>
                </div>
              </div>

              <p
                key={mentor.quote}
                className="animate-rise-in mt-4 font-display text-[18px] leading-[1.55] font-medium text-paper-100 italic sm:text-[19px]"
              >
                “{mentor.quote}”
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {mentor.specialisms.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-ink-900/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-paper-300 uppercase"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* dots */}
              <div className="mt-6 flex items-center gap-2">
                {MENTORS.map((m, i) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${m.name}`}
                    aria-pressed={i === active}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === active ? "w-10 bg-gold-400" : "w-4 bg-ink-600 hover:bg-ink-500",
                    )}
                  />
                ))}
                <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-paper-400 uppercase">
                  {String(active + 1).padStart(2, "0")} / 0{MENTORS.length}
                </span>
              </div>
            </div>

            {/* for / not for */}
            <div className="reveal mt-6 grid gap-4 sm:grid-cols-2" style={{ transitionDelay: "210ms" }}>
              <div className="rounded-[20px] border border-mint-500/25 bg-mint-500/[0.05] p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-mint-300 uppercase">
                  Right for you if
                </p>
                <ul className="mt-4 space-y-3">
                  {FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-paper-200">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-400" strokeWidth={2.4} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[20px] border border-flame-500/25 bg-flame-500/[0.04] p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-flame-400 uppercase">
                  Not for you if
                </p>
                <ul className="mt-4 space-y-3">
                  {NOT_FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-paper-300">
                      <Close className="mt-0.5 h-3.5 w-3.5 shrink-0 text-flame-500" strokeWidth={2.4} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ---------------- right: collage ---------------- */}
          <div className="lg:col-span-7">
            <div
              className="reveal grid gap-4 sm:grid-cols-3"
              style={{ transitionDelay: "140ms" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {MENTORS.map((m, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative overflow-hidden rounded-[20px] border text-left transition-all duration-600",
                      isActive
                        ? "border-gold-400/70 shadow-[0_36px_80px_-40px_rgba(224,169,60,.7)] sm:col-span-1"
                        : "border-white/10 hover:border-gold-500/45",
                      i === 0 && "sm:col-span-3 sm:row-span-1",
                    )}
                  >
                    <div className={cn("relative overflow-hidden", i === 0 ? "h-[300px] sm:h-[330px]" : "h-[260px]")}>
                      <img
                        src={m.img}
                        alt={`${m.name}, ${m.role} at Fortune Academy World`}
                        loading="lazy"
                        className={cn(
                          "h-full w-full object-cover object-center transition-all duration-[1.4s] ease-out",
                          isActive ? "scale-[1.04] opacity-95 grayscale-0" : "opacity-55 grayscale group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0",
                        )}
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(4,6,12,.96) 6%, rgba(4,6,12,.45) 45%, rgba(4,6,12,.12) 100%)",
                        }}
                      />

                      {isActive && (
                        <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-gold-400/50 bg-ink-950/80 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] text-gold-300 uppercase backdrop-blur">
                          <span className="h-1 w-1 animate-blink rounded-full bg-gold-400" />
                          On the desk
                        </span>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-display text-[21px] leading-tight font-semibold text-paper-50">
                          {m.name}
                        </p>
                        <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-gold-400 uppercase">
                          {m.role}
                        </p>
                        <p className="mt-2 text-[12px] text-paper-400">{m.since}</p>
                        <div
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                            isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="mt-3 flex items-center gap-2 border-t border-white/12 pt-3 text-[12px] text-mint-300">
                              <ArrowUpRight className="h-3.5 w-3.5" />
                              {m.trades}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="reveal mt-4 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-white/8 bg-ink-850/60 px-6 py-5 backdrop-blur sm:flex-row sm:items-center"
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-[13.5px] leading-relaxed text-paper-300">
                Want to know which mentor will run your onboarding? Ask before you pay — we will tell
                you honestly.
              </p>
              <Btn
                href={whatsappLink("Hello, which mentor would handle my onboarding at Fortune Academy World?")}
                external
                variant="outline"
                size="sm"
                icon={<WhatsApp className="h-4 w-4 text-mint-400" />}
              >
                Ask the desk
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
