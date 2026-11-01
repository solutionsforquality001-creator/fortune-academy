import { useState } from "react";
import { cn } from "@/utils/cn";
import { FAQS, PHONE_DISPLAY, telegramLink, whatsappLink } from "@/lib/site";
import { ArrowUpRight, Plus, Telegram, WhatsApp } from "./Icons";
import { Btn, Eyebrow, SectionShell } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="faq" tone="dark" className="py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 mask-fade-b" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-32 -left-40 h-[480px] w-[480px] rounded-full opacity-45 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(224,169,60,.2), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="reveal lg:sticky lg:top-32">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-paper-50">
              Frequently asked <span className="text-gold-400 italic">questions</span>.
            </h2>
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-paper-400">
              Quick, honest answers to what members ask us most. Still unsure about something? Message
              the desk — we would rather answer ten questions than have one unhappy member.
            </p>

            <div className="mt-8 rounded-[20px] border border-white/8 bg-ink-850/70 p-6 backdrop-blur">
              <p className="font-mono text-[10px] tracking-[0.24em] text-gold-400 uppercase">
                Talk to support
              </p>
              <p className="mt-3 font-display text-[26px] leading-none font-semibold text-paper-50 tabnum">
                {PHONE_DISPLAY}
              </p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-paper-400">
                07:00 – 22:00 GMT, seven days a week. Average first reply: 3 minutes.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <Btn href={whatsappLink("Hello Fortune Academy World, I have a question.")} external variant="wa" size="sm" icon={<WhatsApp className="h-4 w-4" />}>
                  WhatsApp
                </Btn>
                <Btn href={telegramLink()} external variant="tg" size="sm" icon={<Telegram className="h-4 w-4" />}>
                  Telegram
                </Btn>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-white/8 border-y border-white/8">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-5 py-6 text-left transition-colors duration-300"
                  >
                    <span
                      className={cn(
                        "mt-1 font-mono text-[11px] tracking-[0.14em] transition-colors duration-300 tabnum",
                        isOpen ? "text-gold-400" : "text-ink-400 group-hover:text-gold-500",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[19px] leading-snug font-medium transition-colors duration-300 sm:text-[22px]",
                        isOpen ? "text-gold-200" : "text-paper-100 group-hover:text-gold-200",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        isOpen
                          ? "rotate-[135deg] border-gold-400 bg-gold-400 text-ink-950"
                          : "border-ink-600 text-paper-300 group-hover:border-gold-500/60 group-hover:text-gold-300",
                      )}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={cn(
                          "max-w-3xl pb-7 pl-[3.1rem] text-[14.5px] leading-[1.85] transition-all duration-500",
                          isOpen ? "text-paper-300 opacity-100" : "translate-y-2 text-paper-400 opacity-0",
                        )}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <a
            href={whatsappLink("Hello, I have a question that isn't in the FAQ.")}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-ink-850/50 px-6 py-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold-500/45 hover:bg-ink-800/70"
          >
            <span>
              <span className="block font-display text-[19px] font-semibold text-paper-50">
                Question not answered here?
              </span>
              <span className="mt-1 block text-[13px] text-paper-400">
                Send it over on WhatsApp — a mentor, not a bot, will reply.
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-400 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
