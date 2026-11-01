import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { NAV_LINKS, PHONE_DISPLAY, whatsappLink } from "@/lib/site";
import { useActiveSection, useScrollInfo } from "@/hooks/useMotion";
import { ArrowUpRight, Close, Logo, Menu, Phone, Telegram, WhatsApp } from "./Icons";
import { Btn } from "./ui";

const SECTION_IDS = ["about", "programmes", "path", "markets", "members", "desk", "join", "faq", "contact"];

function GmtClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setT(new Date()), 10000);
    return () => window.clearInterval(id);
  }, []);
  const hh = String(t.getUTCHours()).padStart(2, "0");
  const mm = String(t.getUTCMinutes()).padStart(2, "0");
  return (
    <span className="tabnum">
      {hh}:{mm} GMT
    </span>
  );
}

export default function Nav() {
  const { y, progress } = useScrollInfo();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const solid = y > 40;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* scroll progress */}
        <div className="h-[2px] w-full bg-transparent">
          <div
            className="h-full origin-left bg-gradient-to-r from-gold-600 via-gold-300 to-mint-400 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* utility strip */}
        <div
          className={cn(
            "hidden overflow-hidden border-b border-white/5 bg-ink-950/80 backdrop-blur-xl transition-all duration-500 lg:block",
            solid ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
          )}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-2 font-mono text-[11px] tracking-[0.14em] text-paper-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-400" />
              </span>
              Support desk live · <GmtClock /> · replies in ~3 min
            </span>
            <span className="flex items-center gap-6">
              <span className="text-paper-400/70">Education only — not financial advice</span>
              <a
                href={`tel:+${PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="gold-underline flex items-center gap-1.5 text-gold-300 transition-colors hover:text-gold-200"
              >
                <Phone className="h-3.5 w-3.5" />
                {PHONE_DISPLAY}
              </a>
            </span>
          </div>
        </div>

        {/* main bar */}
        <div
          className={cn(
            "transition-all duration-500",
            solid
              ? "border-b border-white/8 bg-ink-950/85 shadow-[0_18px_50px_-30px_rgba(0,0,0,1)] backdrop-blur-2xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
            <a href="#top" className="group flex items-center gap-3" aria-label="Fortune Academy World — home">
              <Logo className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-paper-50 sm:text-[19px]">
                  Fortune <span className="text-gold-400 italic">Academy</span>
                </span>
                <span className="mt-1 font-mono text-[9.5px] tracking-[0.34em] text-paper-400 uppercase">
                  World · est. 2019
                </span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 xl:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                      active === l.href.slice(1) ? "text-gold-300" : "text-paper-300 hover:text-paper-50",
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold-400 transition-transform duration-400",
                        active === l.href.slice(1) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              <a
                href="https://t.me/+447460033935"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on Telegram"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-paper-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2AABEE]/70 hover:text-[#7fd4ff] sm:flex"
              >
                <Telegram className="h-4.5 w-4.5" />
              </a>
              <a
                href={whatsappLink("Hello Fortune Academy World, I would like to know more about the trading programme.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-paper-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/70 hover:text-[#7bf0b4] sm:flex"
              >
                <WhatsApp className="h-4.5 w-4.5" />
              </a>
              <Btn href="#join" size="sm" className="hidden sm:inline-flex">
                Join now
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Btn>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-paper-200 transition-colors hover:border-gold-500/70 hover:text-gold-300 xl:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-60 xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "noise absolute inset-y-0 right-0 flex w-[min(420px,90vw)] flex-col overflow-y-auto border-l border-white/10 bg-ink-900 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
            <span className="font-mono text-[11px] tracking-[0.28em] text-gold-400 uppercase">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-600 text-paper-200 transition-colors hover:border-flame-500/70 hover:text-flame-400"
            >
              <Close className="h-4.5 w-4.5" />
            </button>
          </div>
          <ul className="flex flex-col px-3 py-4">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between border-b border-white/6 px-3 py-4 transition-colors hover:bg-white/4"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  <span className="font-display text-2xl font-medium text-paper-100 transition-colors group-hover:text-gold-300">
                    {l.label}
                  </span>
                  <span className="font-mono text-[10px] text-ink-400">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 px-6 pb-8">
            <Btn href="#join" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Apply to join
            </Btn>
            <div className="grid grid-cols-2 gap-3">
              <Btn
                href={whatsappLink("Hello Fortune Academy World, I have a question.")}
                external
                variant="wa"
                icon={<WhatsApp className="h-4 w-4" />}
              >
                WhatsApp
              </Btn>
              <Btn
                href="https://t.me/+447460033935"
                external
                variant="tg"
                icon={<Telegram className="h-4 w-4" />}
              >
                Telegram
              </Btn>
            </div>
            <p className="pt-2 text-center font-mono text-[11px] tracking-[0.14em] text-paper-400">
              {PHONE_DISPLAY}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
