import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { DEPOSITS, telegramLink } from "@/lib/site";
import { Check, Copy, Telegram } from "./Icons";

type Status = "idle" | "sending" | "done" | "error";

const MAX_PDF_BYTES = 3 * 1024 * 1024;

const toBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(new Error("read"));
    r.readAsDataURL(blob);
  });

/* Shrink screenshots so they upload quickly on mobile data. */
async function prepare(file: File): Promise<{ mime: string; data: string; name: string }> {
  if (file.type === "application/pdf") {
    if (file.size > MAX_PDF_BYTES) throw new Error("PDF is too large (max 3 MB).");
    return { mime: file.type, data: await toBase64(file), name: file.name };
  }
  if (!file.type.startsWith("image/")) throw new Error("Please upload an image or PDF.");
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const blob: Blob = await new Promise((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error("convert"))), "image/jpeg", 0.82),
  );
  return { mime: "image/jpeg", data: await toBase64(blob), name: file.name.replace(/\.\w+$/, "") + ".jpg" };
}

export default function CryptoPay({ usd, summary }: { usd: number; summary: string }) {
  const [coinId, setCoinId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dep = DEPOSITS.find((d) => d.id === coinId) ?? null;

  const copyAddress = async () => {
    if (!dep) return;
    try {
      await navigator.clipboard.writeText(dep.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setError("Copy unavailable — please select and copy the address manually.");
    }
  };

  const submit = async () => {
    if (!dep || !file) return;
    setStatus("sending");
    setError("");
    try {
      const f = await prepare(file);
      const r = await fetch("/api/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption: `${summary}\n\nCRYPTO: ${dep.coin} (${dep.network})\nAMOUNT DUE: $${usd}`,
          filename: f.name,
          mime: f.mime,
          data: f.data,
        }),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      if (!r.ok || !j.ok) throw new Error("upload");
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error && e.message !== "upload"
          ? e.message
          : "We could not upload your receipt automatically. Please send it to us on Telegram instead.",
      );
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-ink-900/10 bg-white p-5">
      <p className="font-mono text-[10px] tracking-[0.22em] text-gold-600 uppercase">Pay with crypto</p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">
        Amount due: <strong className="text-ink-900">${usd} USD</strong> — send the equivalent value in the coin you
        choose.
      </p>

      {/* 1 · coin */}
      <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">1 · Choose coin</p>
      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DEPOSITS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              setCoinId(d.id);
              setCopied(false);
            }}
            aria-pressed={coinId === d.id}
            className={cn(
              "rounded-xl border px-3 py-3 text-[14px] font-semibold transition-all duration-300",
              coinId === d.id
                ? "border-ink-900 bg-ink-900 text-gold-300"
                : "border-ink-900/12 bg-paper-50 text-ink-700 hover:border-gold-500/60 hover:bg-white",
            )}
          >
            {d.coin}
          </button>
        ))}
      </div>

      {dep && (
        <>
          {/* 2 · network */}
          <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">2 · Network</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <span className="flex items-center gap-2 rounded-full border border-gold-600 bg-gold-500 px-4 py-2 text-[12.5px] font-semibold text-ink-950">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              {dep.network}
            </span>
          </div>

          {/* 3 · address */}
          <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">3 · Deposit address</p>
          <div className="mt-2.5 rounded-xl border border-ink-900/12 bg-paper-50 p-4">
            <p className="font-mono text-[13px] leading-relaxed font-medium break-all text-ink-900">{dep.address}</p>
            <button
              type="button"
              onClick={copyAddress}
              className="mt-3 flex items-center gap-2 rounded-full border border-ink-900/12 bg-white px-4 py-2 text-[12.5px] font-semibold text-ink-700 transition-all duration-300 hover:border-gold-600/60 hover:text-gold-700"
            >
              {copied ? <Check className="h-4 w-4" strokeWidth={2.6} /> : <Copy className="h-4 w-4" />}
              {copied ? "Address copied" : "Copy address"}
            </button>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-500">
            Send only <strong className="text-ink-900">{dep.coin}</strong> on the{" "}
            <strong className="text-ink-900">{dep.network}</strong> network. Crypto transfers cannot be reversed, so
            double-check the address and network before you send.
          </p>

          {/* 4 · receipt */}
          <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">
            4 · Upload your receipt
          </p>
          {status === "done" ? (
            <div className="mt-2.5 rounded-xl border border-mint-500/40 bg-mint-500/10 p-4 text-[13.5px] leading-relaxed text-ink-700">
              <strong className="text-ink-900">Receipt received.</strong> Our team will check the payment and send your
              access instructions on the contact details you gave us.
            </div>
          ) : (
            <div className="mt-2.5">
              <input
                ref={inputRef}
                type="file"
                accept="image/*,application/pdf"
                className="sr-only"
                onChange={(e) => {
                  setFile(e.target.files?.[0] ?? null);
                  setStatus("idle");
                  setError("");
                }}
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-ink-900/20 bg-paper-50 px-4 py-5 text-center text-[13.5px] font-medium text-ink-600 transition-colors duration-300 hover:border-gold-500/70 hover:bg-white"
              >
                {file ? file.name : "Tap to choose a screenshot or PDF of your payment"}
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!file || status === "sending"}
                className="mt-3 w-full rounded-full bg-gold-500 px-6 py-3.5 text-[14px] font-bold text-ink-950 transition-all duration-300 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? "Uploading…" : "Submit receipt for confirmation"}
              </button>
              {error && <p className="mt-3 text-[12.5px] leading-relaxed text-flame-500">{error}</p>}
              {status === "error" && (
                <a
                  href={telegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#2AABEE] px-6 py-3 text-[13.5px] font-bold text-[#04202e]"
                >
                  <Telegram className="h-4.5 w-4.5" />
                  Send receipt on Telegram
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
