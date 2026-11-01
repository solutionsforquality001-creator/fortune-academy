import { useState } from "react";
import { cn } from "@/utils/cn";
import { CALENDAR, CALENDAR_URL, INSIGHTS, SCHEDULE, whatsappLink } from "@/lib/site";
import { ArrowUpRight, Calendar, Clock, Lock, Pulse, WhatsApp } from "./Icons";
import { Btn, Eyebrow, ImpactDot, SectionShell } from "./ui";

const TABS = [
  { id: "calendar", label: "Economic calendar", icon: Calendar },
  { id: "sessions", label: "Live sessions", icon: Clock },
  { id: "insights", label: "Market insights", icon: Pulse },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Markets() {
  const [tab, setTab] = useState<TabId>("calendar");

  return (
    <SectionShell id="markets" tone="dark" className="py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 mask-fade-b" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-1/4 -right-40 h-[520px] w-[520px] rounded-full opacity-45 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(23,162,113,.2), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------- left: tabs + panel ---------- */}
          <div className="lg:col-span-8">
            <div className="reveal flex flex-col gap-5">
              <Eyebrow>Market intelligence</Eyebrow>
              <h2 className="max-w-2xl font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-paper-50">
                Know the news before it <span className="text-gold-400 italic">moves</span> the market.
              </h2>
              <p className="max-w-2xl text-[15px] leading-relaxed text-paper-400">
                High-impact releases — rate decisions, inflation, employment — can redraw a chart in
                seconds. Members get a pre-market brief at 07:00 GMT so risk is planned around the
                calendar, not reacted to inside it.
              </p>
            </div>

            {/* segmented control */}
            <div className="reveal mt-9 inline-flex w-full flex-wrap gap-1 rounded-full border border-white/10 bg-ink-850/70 p-1.5 backdrop-blur" style={{ transitionDelay: "90ms" }}>
              {TABS.map((t) => {
                const Icon = t.icon;
                const activeTab = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-pressed={activeTab}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-semibold whitespace-nowrap transition-all duration-400 sm:text-[13px]",
                      activeTab
                        ? "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-[0_10px_26px_-14px_rgba(224,169,60,.9)]"
                        : "text-paper-400 hover:bg-white/5 hover:text-paper-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* panels */}
            <div className="reveal mt-6 overflow-hidden rounded-[20px] border border-white/10 bg-ink-850/70 backdrop-blur-xl" style={{ transitionDelay: "140ms" }}>
              {tab === "calendar" && (
                <div className="animate-rise-in">
                  <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-3.5">
                    <p className="font-mono text-[10.5px] tracking-[0.22em] text-paper-400 uppercase">
                      Today · times in GMT
                    </p>
                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.16em] text-gold-400 uppercase transition-colors hover:text-gold-200"
                    >
                      Full calendar
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-white/8 font-mono text-[9.5px] tracking-[0.2em] text-paper-400 uppercase">
                          <th className="px-5 py-3 font-medium">Time</th>
                          <th className="px-3 py-3 font-medium">Cur</th>
                          <th className="px-3 py-3 font-medium">Event</th>
                          <th className="px-3 py-3 font-medium">Imp</th>
                          <th className="px-3 py-3 text-right font-medium">Forecast</th>
                          <th className="px-5 py-3 text-right font-medium">Previous</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CALENDAR.map((e) => (
                          <tr
                            key={e.event}
                            className="group border-b border-white/5 transition-colors duration-300 last:border-0 hover:bg-gold-500/[0.06]"
                          >
                            <td className="px-5 py-3.5 font-mono text-[12px] text-paper-300 tabnum">{e.time}</td>
                            <td className="px-3 py-3.5">
                              <span className="rounded-md border border-ink-600 bg-ink-800 px-2 py-1 font-mono text-[10.5px] tracking-wide text-gold-300">
                                {e.currency}
                              </span>
                            </td>
                            <td className="px-3 py-3.5 text-[13.5px] font-medium text-paper-100 transition-colors group-hover:text-gold-200">
                              {e.event}
                            </td>
                            <td className="px-3 py-3.5">
                              <ImpactDot level={e.impact} />
                            </td>
                            <td className="px-3 py-3.5 text-right font-mono text-[12px] text-mint-400 tabnum">{e.forecast}</td>
                            <td className="px-5 py-3.5 text-right font-mono text-[12px] text-paper-400 tabnum">{e.previous}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === "sessions" && (
                <ul className="animate-rise-in divide-y divide-white/6">
                  {SCHEDULE.map((s) => (
                    <li
                      key={s.name}
                      className="group flex flex-col gap-3 px-5 py-4 transition-colors duration-300 hover:bg-white/[0.035] sm:flex-row sm:items-center sm:gap-6"
                    >
                      <span
                        className={cn(
                          "flex h-11 w-14 shrink-0 items-center justify-center rounded-lg border font-mono text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-400",
                          s.day === "Sat"
                            ? "border-ink-600 bg-ink-800 text-paper-400"
                            : "border-gold-500/30 bg-gold-500/10 text-gold-300 group-hover:scale-105 group-hover:border-gold-400/60",
                        )}
                      >
                        {s.day}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <p className="text-[15px] font-semibold text-paper-50">{s.name}</p>
                          {s.live ? (
                            <span className="flex items-center gap-1.5 rounded-full border border-flame-500/40 bg-flame-500/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-flame-400 uppercase">
                              <span className="h-1 w-1 animate-blink rounded-full bg-flame-500" />
                              Live
                            </span>
                          ) : (
                            <span className="rounded-full border border-ink-600 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-paper-400 uppercase">
                              Replay
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[13px] text-paper-400">{s.focus}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[11.5px] tracking-[0.08em] text-paper-300 tabnum">
                        {s.time}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "insights" && (
                <ul className="animate-rise-in divide-y divide-white/6">
                  {INSIGHTS.map((n, i) => (
                    <li key={n.title}>
                      <a
                        href={whatsappLink(`Hello, I'd like to read the member insight: "${n.title}"`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-5 px-5 py-6 transition-colors duration-300 hover:bg-white/[0.035]"
                      >
                        <span className="mt-1 font-mono text-[11px] text-gold-500/60 tabnum">0{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <span className="inline-block rounded-full border border-mint-500/30 bg-mint-500/8 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.2em] text-mint-300 uppercase">
                            {n.tag}
                          </span>
                          <h3 className="mt-3 font-display text-[19px] leading-snug font-semibold text-paper-50 transition-colors duration-300 group-hover:text-gold-300 sm:text-[21px]">
                            {n.title}
                          </h3>
                          <p className="mt-2 max-w-prose text-[13.5px] leading-relaxed text-paper-400">{n.copy}</p>
                          <p className="mt-3 font-mono text-[10.5px] tracking-[0.18em] text-ink-400 uppercase">
                            {n.read} · members only
                          </p>
                        </div>
                        <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-ink-400 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold-400" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ---------- right: member portal ---------- */}
          <div className="lg:col-span-4">
            <div className="reveal lg:sticky lg:top-32" style={{ transitionDelay: "180ms" }}>
              <div className="relative overflow-hidden rounded-[20px] border border-gold-500/25 bg-gradient-to-b from-ink-800 to-ink-900 p-7">
                <div
                  className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(224,169,60,.25), transparent 70%)" }}
                  aria-hidden="true"
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Lock className="h-5.5 w-5.5" />
                </span>
                <p className="relative mt-6 font-mono text-[10px] tracking-[0.26em] text-gold-400 uppercase">
                  Member portal
                </p>
                <h3 className="relative mt-3 font-display text-[26px] leading-tight font-semibold text-paper-50">
                  Your learning, in one place.
                </h3>
                <p className="relative mt-3 text-[13.5px] leading-relaxed text-paper-400">
                  Lessons, live-session recordings, journal templates and announcements live behind one
                  login. Not a member yet? Apply below and access is opened the same day.
                </p>

                <ul className="relative mt-6 space-y-2.5">
                  {[
                    "640+ hours of recorded sessions",
                    "Downloadable journal & plan templates",
                    "Progress tracker per module",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-paper-200">
                      <span className="h-1 w-1 rotate-45 bg-mint-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-7 flex flex-col gap-2.5">
                  <Btn href="#join" className="w-full">
                    Join now
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Btn>
                  <Btn
                    href={whatsappLink("Hello, I'm an existing member and need help accessing the portal.")}
                    external
                    variant="outline"
                    className="w-full"
                    icon={<WhatsApp className="h-4 w-4 text-mint-400" />}
                  >
                    Member support
                  </Btn>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { k: "Avg. reply", v: "3 min" },
                  { k: "Support hours", v: "07–22 GMT" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border border-white/8 bg-ink-850/60 p-4 text-center">
                    <p className="font-mono text-[9.5px] tracking-[0.2em] text-paper-400 uppercase">{x.k}</p>
                    <p className="mt-1.5 font-display text-xl font-semibold text-paper-50 tabnum">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
