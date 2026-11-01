import { PATH, PHONE_DISPLAY, telegramLink } from "@/lib/site";
import { cn } from "@/utils/cn";
import { useInView } from "@/hooks/useMotion";
import { Arrow, Telegram } from "./Icons";
import { Btn, Eyebrow, SectionShell } from "./ui";

export default function Path() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);

  return (
    <SectionShell id="path" tone="light" className="py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(224,169,60,.18), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal flex flex-col gap-5">
            <Eyebrow tone="light">How it works</Eyebrow>
            <h2 className="max-w-2xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-ink-900">
              A clear path in <span className="text-gold-600 italic">four steps</span>.
            </h2>
          </div>
          <p className="reveal max-w-md text-[15px] leading-relaxed text-ink-500" style={{ transitionDelay: "100ms" }}>
            Simple onboarding, then steady progress at a pace that suits you. Most members are in their
            first live session the same day they join — support replies on {PHONE_DISPLAY} within minutes.
          </p>
        </div>

        {/* timeline */}
        <div ref={ref} className="relative mt-16">
          {/* desktop rail */}
          <div className="absolute top-[27px] right-0 left-0 hidden h-px bg-paper-300 lg:block">
            <div
              className="h-full origin-left bg-gradient-to-r from-gold-500 via-gold-400 to-mint-500 transition-transform duration-[1800ms] ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ transform: `scaleX(${inView ? 1 : 0})` }}
            />
          </div>
          {/* mobile rail */}
          <div className="absolute top-0 bottom-0 left-[27px] w-px bg-paper-300 lg:hidden">
            <div
              className="w-full origin-top bg-gradient-to-b from-gold-500 to-mint-500 transition-transform duration-[1800ms] ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ transform: `scaleY(${inView ? 1 : 0})` }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {PATH.map((s, i) => (
              <li
                key={s.step}
                className="reveal relative pl-[72px] lg:pl-0"
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <div className="absolute top-0 left-0 flex h-14 w-14 items-center justify-center lg:relative lg:mb-7">
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full border bg-paper-50 transition-all duration-700",
                      inView ? "border-gold-500/60 shadow-[0_0_0_6px_rgba(224,169,60,.1)]" : "border-paper-300",
                    )}
                    style={{ transitionDelay: `${300 + i * 180}ms` }}
                  />
                  <span className="relative font-display text-[19px] font-semibold text-ink-900 tabnum">
                    {s.step}
                  </span>
                </div>

                <div className="group lg:pr-6">
                  <h3 className="font-display text-[26px] leading-tight font-semibold tracking-[-0.02em] text-ink-900 transition-colors duration-300 group-hover:text-gold-600">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-ink-500">{s.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-paper-300 bg-paper-50 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-ink-600 uppercase transition-colors duration-300 group-hover:border-gold-500/50 group-hover:text-gold-700">
                    {s.meta}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal mt-16 flex flex-col items-start justify-between gap-6 rounded-[22px] border border-ink-900/10 bg-white p-7 shadow-[0_30px_70px_-50px_rgba(7,11,20,.8)] sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="font-display text-[22px] leading-snug font-semibold text-ink-900 sm:text-[26px]">
              Ready to start step one?
            </p>
            <p className="mt-2 text-[14px] text-ink-500">
              The application takes two minutes. No card details, no pressure — a mentor replies personally.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn href="#join" size="lg">
              Start application
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Btn>
            <Btn href={telegramLink()} external variant="outline" size="lg" className="border-ink-900/15 bg-paper-50 text-ink-800 hover:border-gold-600/60 hover:text-gold-700" icon={<Telegram className="h-4 w-4 text-[#2AABEE]" />}>
              Ask on Telegram
            </Btn>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
