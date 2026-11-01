import { cn } from "@/utils/cn";
import { telegramLink } from "@/lib/site";
import { useScrollInfo } from "@/hooks/useMotion";
import { Arrow, Telegram } from "./Icons";

export default function FloatingDock() {
  const { y } = useScrollInfo();
  const showTop = y > 800;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-3 sm:bottom-6 sm:left-6">
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
    </div>
  );
}
