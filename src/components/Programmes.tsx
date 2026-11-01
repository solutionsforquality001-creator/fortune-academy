import { useRef } from "react";
import { cn } from "@/utils/cn";
import { PROGRAMMES, whatsappLink } from "@/lib/site";
import { ArrowUpRight, PROGRAMME_ICONS, WhatsApp } from "./Icons";
import { Btn, SectionHead, SectionShell } from "./ui";

export default function Programmes() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <SectionShell id="programmes" tone="dark" className="py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 mask-fade-b" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-0 right-0 h-[520px] w-[520px] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(224,169,60,.22), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            kicker="Programmes"
            title={
              <>
                Everything you need to grow
                <br className="hidden sm:block" /> as a <span className="text-gold-400 italic">trader</span>.
              </>
            }
            lead="Six practical tracks that take you from curious beginner to confident, process-driven trader. Mix them, repeat them, own them."
          />
          <div className="reveal shrink-0" style={{ transitionDelay: "140ms" }}>
            <Btn
              href={whatsappLink("Hello, I'd like advice on which Fortune Academy programme suits my level.")}
              external
              variant="outline"
              icon={<WhatsApp className="h-4 w-4 text-mint-400" />}
            >
              Which track suits me?
            </Btn>
          </div>
        </div>

        <div ref={gridRef} className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {PROGRAMMES.map((p, i) => {
            const Icon = PROGRAMME_ICONS[p.icon];
            return (
              <article
                key={p.n}
                onMouseMove={onMove}
                style={{ transitionDelay: `${i * 70}ms` }}
                className={cn(
                  "reveal tilt-card group relative overflow-hidden rounded-[20px] border border-white/8 bg-ink-850/60 p-6 sm:p-8",
                  "hover:-translate-y-1.5 hover:border-gold-500/45 hover:bg-ink-800/80 hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,1)]",
                  p.span,
                )}
              >
                <span className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/8 text-gold-300 transition-all duration-500 group-hover:scale-110 group-hover:border-gold-400/60 group-hover:bg-gold-400/15 group-hover:text-gold-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-[40px] leading-none font-semibold text-white/6 transition-colors duration-500 group-hover:text-gold-500/25 sm:text-[52px]">
                    {p.n}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-[22px] leading-tight font-semibold tracking-[-0.015em] text-paper-50 sm:text-[26px]">
                  {p.title}
                </h3>
                <p className="relative mt-3 max-w-prose text-[14px] leading-[1.75] text-paper-400">{p.copy}</p>

                <ul className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-paper-300 uppercase">
                      <span className="h-1 w-1 rotate-45 bg-gold-500" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-7 flex items-center gap-2 text-[12.5px] font-semibold text-gold-400 opacity-0 transition-all duration-400 group-hover:opacity-100">
                  Included in every plan
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
