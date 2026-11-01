import { BRAND, CALENDAR_URL, EMAIL, NAV_LINKS, PHONE_DISPLAY, telegramLink } from "@/lib/site";
import { Arrow, ArrowUpRight, Logo, Mail, Phone, Telegram } from "./Icons";

const PROGRAMME_LINKS = [
  { label: "Foundation Mentorship", href: "#programmes" },
  { label: "Advanced Strategy Lab", href: "#programmes" },
  { label: "Risk & Psychology", href: "#programmes" },
  { label: "Live Market Sessions", href: "#markets" },
  { label: "Private Members Room", href: "#members" },
  { label: "Market Intelligence", href: "#markets" },
];

const LEGAL_LINKS = [
  { label: "Risk disclaimer", href: "#stats" },
  { label: "Refund policy", href: "#faq" },
  { label: "Payments & crypto", href: "#join" },
  { label: "Economic calendar", href: CALENDAR_URL, external: true },
];

export default function Footer() {
  return (
    <footer className="noise relative overflow-hidden border-t border-white/8 bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(ellipse, rgba(224,169,60,.2), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="reveal lg:col-span-4">
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <span className="leading-none">
                <span className="block font-display text-[21px] font-semibold text-paper-50">
                  Fortune <span className="text-gold-400 italic">Academy</span> World
                </span>
                <span className="mt-1.5 block font-mono text-[9.5px] tracking-[0.3em] text-paper-400 uppercase">
                  {BRAND.tagline}
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[13.5px] leading-[1.85] text-paper-400">
              An independent trading academy teaching structure, risk management and accountability to
              members in more than thirty countries. Education only — we do not manage funds, sell
              signals as a product, or promise profits.
            </p>

            <div className="mt-7 space-y-2.5">
              <a
                href={`tel:+${PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="group flex items-center gap-2.5 text-[13.5px] text-paper-200 transition-colors hover:text-gold-300"
              >
                <Phone className="h-4 w-4 text-gold-500 transition-transform duration-300 group-hover:-translate-y-0.5" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-2.5 text-[13.5px] text-paper-200 transition-colors hover:text-gold-300"
              >
                <Mail className="h-4 w-4 text-gold-500 transition-transform duration-300 group-hover:-translate-y-0.5" />
                {EMAIL}
              </a>
            </div>

            <div className="mt-7 flex gap-2.5">
              {[
                { Icon: Telegram, href: telegramLink(), label: "Telegram", tint: "hover:border-[#2AABEE]/60 hover:text-[#8fdcff]" },
                { Icon: ArrowUpRight, href: CALENDAR_URL, label: "Market calendar", tint: "hover:border-gold-500/60 hover:text-gold-300" },
              ].map(({ Icon, href, label, tint }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-paper-300 transition-all duration-300 hover:-translate-y-1 ${tint}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* nav */}
          <div className="reveal lg:col-span-2" style={{ transitionDelay: "60ms" }}>
            <p className="font-mono text-[10px] tracking-[0.26em] text-gold-400 uppercase">Academy</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="gold-underline text-[13.5px] text-paper-300 transition-colors hover:text-paper-50">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* programmes */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: "120ms" }}>
            <p className="font-mono text-[10px] tracking-[0.26em] text-gold-400 uppercase">Programmes</p>
            <ul className="mt-5 space-y-3">
              {PROGRAMME_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="gold-underline text-[13.5px] text-paper-300 transition-colors hover:text-paper-50">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* legal + cta */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: "180ms" }}>
            <p className="font-mono text-[10px] tracking-[0.26em] text-gold-400 uppercase">Legal & tools</p>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="gold-underline text-[13.5px] text-paper-300 transition-colors hover:text-paper-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#join"
              className="group mt-8 flex items-center justify-between gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/[0.07] px-5 py-4 transition-all duration-400 hover:-translate-y-1 hover:border-gold-400/70 hover:bg-gold-500/12"
            >
              <span>
                <span className="block font-display text-[17px] font-semibold text-paper-50">Apply to join</span>
                <span className="mt-0.5 block font-mono text-[10px] tracking-[0.16em] text-paper-400 uppercase">
                  Access in 1–5 minutes
                </span>
              </span>
              <Arrow className="h-4.5 w-4.5 text-gold-400 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* risk box */}
        <div className="reveal mt-14 rounded-2xl border border-white/8 bg-ink-900/60 p-6">
          <p className="font-mono text-[10px] tracking-[0.26em] text-flame-400 uppercase">Risk warning</p>
          <p className="mt-3 max-w-5xl text-[12.5px] leading-[1.85] text-paper-400">
            Trading foreign exchange, indices, commodities and cryptocurrencies on margin carries a
            high level of risk and may not be suitable for every investor. The possibility exists that
            you could sustain a loss of some or all of your initial investment. Fortune Academy World
            provides educational content, mentorship and community only; nothing published here or
            shared in our channels constitutes financial, investment or trading advice, and no
            representative is authorised to trade on your behalf. Any performance figures, win rates or
            examples are illustrative of a documented member sample and are not a guarantee of future
            results. You should carefully consider your investment objectives, level of experience and
            risk appetite before committing capital, and seek independent advice where appropriate.
          </p>
        </div>

        {/* giant wordmark */}
        <div className="reveal mt-16 select-none overflow-hidden" aria-hidden="true">
          <p
            className="font-display text-[clamp(2.2rem,11.5vw,10rem)] leading-[0.85] font-semibold tracking-[-0.045em] whitespace-nowrap text-transparent"
            style={{ WebkitTextStroke: "1px rgba(238,196,106,0.22)" }}
          >
            FORTUNE ACADEMY WORLD
          </p>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/8 pt-7 sm:flex-row">
          <p className="font-mono text-[11px] tracking-[0.1em] text-paper-400">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.18em] text-ink-400 uppercase">
            Education only · Not financial advice
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-paper-300 uppercase transition-colors hover:text-gold-300"
          >
            Back to top
            <Arrow className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
