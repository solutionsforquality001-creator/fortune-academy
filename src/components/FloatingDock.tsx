import { cn } from "@/utils/cn";
import { telegramLink, whatsappLink } from "@/lib/site";
import { useScrollInfo } from "@/hooks/useMotion";
import { Arrow, Telegram, WhatsApp } from "./Icons";

export default function FloatingDock() {
  const { y } = useScrollInfo();
  const showTop = y > 800;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "group relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 bg-ink-900/90 text-gold-300 shadow-[0_14px_34px_-16px_rgba(0,0,0,1)] backdrop-blur transition-all duration-400 hover:-translate-y-1 hover:border-gold-400 hover:text-gold-200",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <Arrow className="h-4.5 w-4.5 -rotate-90" />
      </button>

      <a
        href={telegramLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Fortune Academy World on Telegram"
        className="group relative flex items-center gap-0 overflow-hidden rounded-full bg-[#2AABEE] shadow-[0_16px_36px_-14px_rgba(42,171,238,.9)] transition-all duration-400 hover:-translate-y-1"
      >
        <span className="flex h-12 w-12 items-center justify-center text-[#04202e]">
          <Telegram className="h-5.5 w-5.5" />
        </span>
        <span className="max-w-0 overflow-hidden text-[13px] font-bold whitespace-nowrap text-[#04202e] transition-all duration-400 group-hover:max-w-[9rem] group-hover:pr-4">
          Telegram
        </span>
      </a>

      <a
        href={whatsappLink("Hello Fortune Academy World, I'd like to join the trading programme.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Fortune Academy World on WhatsApp"
        className="group relative flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] shadow-[0_16px_36px_-14px_rgba(37,211,102,.95)] transition-all duration-400 hover:-translate-y-1"
      >
        <span className="relative flex h-14 w-14 items-center justify-center text-[#04231a]">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/60" aria-hidden="true" />
          <WhatsApp className="relative h-7 w-7" />
        </span>
        <span className="max-w-0 overflow-hidden text-[13.5px] font-bold whitespace-nowrap text-[#04231a] transition-all duration-400 group-hover:max-w-[11rem] group-hover:pr-5">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
