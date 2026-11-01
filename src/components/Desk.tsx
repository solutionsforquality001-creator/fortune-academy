import { telegramLink } from "@/lib/site";
import { Check, Close, Telegram } from "./Icons";
import { Btn, Eyebrow, SectionShell } from "./ui";

const MENTOR = {
  name: "Isabella Logan",
  role: "Head Of Education, Trader And Consultant",
  since: "Trading since 2009",
  img: "/isabella-logan.jpg",
};

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
          <div className="lg:col-span-6">
            <div className="reveal">
              <Eyebrow>The desk</Eyebrow>
            </div>
            <h2
              className="reveal mt-6 font-display text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.03] font-semibold tracking-[-0.028em] text-paper-50"
              style={{ transitionDelay: "60ms" }}
            >
              Meet your
              <br />
              <span className="text-gold-400 italic">mentor</span>.
            </h2>
            <p
              className="reveal mt-6 max-w-lg text-[15px] leading-[1.8] text-paper-400"
              style={{ transitionDelay: "110ms" }}
            >
              Every session is led by a working trader. No anonymous signal feeds and no rented
              influencers — just education, process and honest feedback.
            </p>

            {/* profile */}
            <div
              className="reveal mt-9 rounded-[20px] border border-gold-500/25 bg-gradient-to-br from-gold-500/[0.09] to-transparent p-6"
              style={{ transitionDelay: "160ms" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400 font-mono text-[12px] font-bold text-ink-950">
                  {MENTOR.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[20px] font-semibold text-paper-50">{MENTOR.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-gold-400 uppercase">
                    {MENTOR.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[13.5px] text-paper-300">{MENTOR.since}</p>
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

          {/* ---------------- right: photo ---------------- */}
          <div className="lg:col-span-6">
            <div
              className="reveal group relative overflow-hidden rounded-[20px] border border-gold-400/70 shadow-[0_36px_80px_-40px_rgba(224,169,60,.7)]"
              style={{ transitionDelay: "140ms" }}
            >
              <div className="relative h-[460px] overflow-hidden sm:h-[560px]">
                <img
                  src={MENTOR.img}
                  alt={`${MENTOR.name}, ${MENTOR.role} at Fortune Academy World`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(4,6,12,.96) 4%, rgba(4,6,12,.4) 38%, rgba(4,6,12,0) 70%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-[28px] leading-tight font-semibold text-paper-50">
                    {MENTOR.name}
                  </p>
                  <p className="mt-1 font-mono text-[10.5px] tracking-[0.2em] text-gold-400 uppercase">
                    {MENTOR.role}
                  </p>
                  <p className="mt-2 text-[13px] text-paper-300">{MENTOR.since}</p>
                </div>
              </div>
            </div>

            <div
              className="reveal mt-4 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-white/8 bg-ink-850/60 px-6 py-5 backdrop-blur sm:flex-row sm:items-center"
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-[13.5px] leading-relaxed text-paper-300">
                Have a question before you pay? Ask us first — we will answer honestly.
              </p>
              <Btn
                href={telegramLink()}
                external
                variant="outline"
                size="sm"
                icon={<Telegram className="h-4 w-4 text-mint-400" />}
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
