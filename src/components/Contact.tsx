import { EMAIL, PHONE_DISPLAY, telegramLink } from "@/lib/site";
import { ArrowUpRight, Clock, Globe, Mail, Telegram } from "./Icons";
import { Eyebrow, SectionShell } from "./ui";

const BG =
  "https://images.pexels.com/photos/35118250/pexels-photo-35118250.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900";

const CHANNELS = [
  {
    key: "Telegram",
    icon: Telegram,
    value: PHONE_DISPLAY,
    note: "Fastest route · community links, payment receipts & member support",
    href: telegramLink(),
    tint: "#2AABEE",
  },
  {
    key: "Email",
    icon: Mail,
    value: EMAIL,
    note: "Invoices, corporate enquiries & formal queries",
    href: `mailto:${EMAIL}?subject=${encodeURIComponent("Enquiry — Fortune Academy World")}`,
    tint: "#EEC46A",
  },
];

export default function Contact() {
  return (
    <SectionShell id="contact" tone="deeper" className="py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={BG} alt="" className="h-full w-full object-cover opacity-[0.14]" loading="lazy" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #04060c 2%, rgba(4,6,12,.72) 45%, #04060c 98%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="reveal">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-paper-50">
              Let’s <span className="text-gold-400 italic">talk</span>.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-paper-300">
              Questions about the programme, payment, or whether it is the right fit for you at all?
              Reach out on any channel below and a real mentor will respond as soon as possible.
            </p>
          </div>

          <div className="reveal mt-9 flex flex-wrap gap-3" style={{ transitionDelay: "120ms" }}>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-850/70 px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-paper-300 uppercase">
              <Clock className="h-4 w-4 text-gold-400" />
              07:00 – 22:00 GMT
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-850/70 px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-paper-300 uppercase">
              <Globe className="h-4 w-4 text-mint-400" />
              Members in 30+ countries
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="space-y-3">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              return (
                <li key={c.key} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-5 overflow-hidden rounded-[20px] border border-white/10 bg-ink-850/70 px-6 py-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/20 sm:px-8"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `linear-gradient(100deg, ${c.tint}1f, transparent 62%)` }}
                      aria-hidden="true"
                    />
                    <span
                      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110"
                      style={{ borderColor: `${c.tint}44`, background: `${c.tint}12`, color: c.tint }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block font-mono text-[10px] tracking-[0.26em] text-paper-400 uppercase">
                        {c.key}
                      </span>
                      <span className="mt-1.5 block truncate font-display text-[22px] leading-tight font-semibold text-paper-50 transition-colors duration-300 group-hover:text-gold-200 sm:text-[26px]">
                        {c.value}
                      </span>
                      <span className="mt-1.5 block text-[12.5px] text-paper-400">{c.note}</span>
                    </span>
                    <ArrowUpRight className="relative h-5 w-5 shrink-0 text-paper-400 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold-300" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
