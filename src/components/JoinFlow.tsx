import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import {
  EXPERIENCE,
  PACKAGES,
  PAYMENT_METHODS,
  PHONE_DISPLAY,
  telegramLink,
  whatsappLink,
} from "@/lib/site";
import { Arrow, ArrowUpRight, Check, Copy, Sparkle, Telegram, WhatsApp } from "./Icons";
import { Btn, Eyebrow, SectionShell } from "./ui";

type Currency = "USD" | "GBP";
type Payment = (typeof PAYMENT_METHODS)[number]["id"];

const CURRENCY_SYMBOL: Record<Currency, string> = { USD: "$", GBP: "£" };
const RATE_NOTE: Record<Currency, string> = {
  USD: "USD prices apply to crypto payments",
  GBP: "GBP prices apply to card & bank transfer",
};

const STEPS = ["Choose your plan", "Your details", "Review & send"];

export default function JoinFlow() {
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [packId, setPackId] = useState("professional");
  const [payment, setPayment] = useState<Payment>("crypto");
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    experience: EXPERIENCE[0],
    goals: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pack = useMemo(() => PACKAGES.find((p) => p.id === packId)!, [packId]);
  const sym = CURRENCY_SYMBOL[currency];
  const price = currency === "USD" ? pack.usd : pack.gbp;
  const was = currency === "USD" ? pack.usdWas : pack.gbpWas;
  const saved = was ? was - price : 0;
  const perMonth = price / pack.months;

  const set = (k: keyof typeof form, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const summary = useMemo(() => {
    const pm = PAYMENT_METHODS.find((m) => m.id === payment)!;
    return [
      "Hello Fortune Academy World, I would like to apply to join.",
      "",
      `PLAN: ${pack.name} — ${pack.months} month${pack.months > 1 ? "s" : ""}`,
      `PRICE: ${currency} ${price}${was ? ` (normally ${sym}${was} — saving ${sym}${saved})` : ""}`,
      `PAYMENT: ${pm.label}`,
      "",
      `NAME: ${form.name || "—"}`,
      `EMAIL: ${form.email || "—"}`,
      `WHATSAPP: ${form.phone || "—"}`,
      `COUNTRY: ${form.country || "—"}`,
      `EXPERIENCE: ${form.experience}`,
      form.goals ? `GOALS: ${form.goals}` : "",
    ]
      .filter((l) => l !== "")
      .join("\n");
  }, [pack, currency, price, was, sym, saved, payment, form]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please tell us your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a number we can reach you on.";
    if (form.country.trim().length < 2) e.country = "Which country are you based in?";
    if (!form.consent) e.consent = "Please confirm you have read the risk disclaimer.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validate()) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setStep((s) => Math.min(2, s + 1));
    requestAnimationFrame(() => {
      document.getElementById("join")?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setToast("Application copied to your clipboard.");
    } catch {
      setToast("Copy unavailable — please select and copy the summary manually.");
    }
    window.setTimeout(() => setToast(null), 3200);
  };

  const field =
    "w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-paper-400 transition-all duration-300 focus:outline-none";

  return (
    <SectionShell id="join" tone="light" className="py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-[440px] w-[620px] blur-[130px]"
        style={{ background: "radial-gradient(ellipse, rgba(224,169,60,.2), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal flex flex-col gap-5">
            <Eyebrow tone="light">Join now</Eyebrow>
            <h2 className="max-w-2xl font-display text-[clamp(2.2rem,5.4vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-ink-900">
              Start your journey with <span className="text-gold-600 italic">Fortune Academy</span>.
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-ink-500">
              Three short steps. Longer plans carry bigger savings — lock in your rate today and a
              mentor will reply personally on {PHONE_DISPLAY}.
            </p>
          </div>

          <div className="reveal flex items-center gap-3" style={{ transitionDelay: "100ms" }}>
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-ink-500 uppercase">Currency</span>
            <div className="inline-flex rounded-full border border-ink-900/12 bg-white p-1">
              {(["USD", "GBP"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "rounded-full px-4 py-1.5 font-mono text-[11.5px] font-bold tracking-[0.1em] transition-all duration-300",
                    currency === c ? "bg-ink-900 text-gold-300" : "text-ink-500 hover:text-ink-900",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* promo strip */}
        <div className="reveal mt-10 flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-gold-500/40 bg-gradient-to-r from-gold-100 via-paper-50 to-white px-5 py-4 sm:flex-row sm:items-center sm:px-7">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-950">
            <Sparkle className="h-4.5 w-4.5" />
          </span>
          <p className="text-[13.5px] leading-relaxed text-ink-700">
            <span className="font-bold tracking-[0.02em] text-ink-900">LIMITED TIME:</span> multi-month
            plans are discounted — save up to <span className="font-bold text-gold-700">$540 / £420</span>{" "}
            on the 12-month Elite plan. {RATE_NOTE[currency]}.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* ---------------- wizard ---------------- */}
          <div className="reveal lg:col-span-7">
            <div className="overflow-hidden rounded-[24px] border border-ink-900/10 bg-white shadow-[0_40px_90px_-60px_rgba(7,11,20,.9)]">
              {/* progress */}
              <div className="border-b border-ink-900/8 bg-paper-50 px-6 py-5 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.24em] text-gold-600 uppercase">
                      Step {step + 1} of 3
                    </p>
                    <p className="mt-1.5 font-display text-[21px] font-semibold text-ink-900">
                      {STEPS[step]}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-500",
                          i === step ? "w-8 bg-gold-500" : i < step ? "w-4 bg-mint-500" : "w-4 bg-paper-300",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-7 sm:px-8">
                {/* -------- step 1 -------- */}
                {step === 0 && (
                  <div className="animate-rise-in space-y-3">
                    {PACKAGES.map((p) => {
                      const active = p.id === packId;
                      const priceP = currency === "USD" ? p.usd : p.gbp;
                      const wasP = currency === "USD" ? p.usdWas : p.gbpWas;
                      const save = wasP ? Math.round(((wasP - priceP) / wasP) * 100) : 0;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPackId(p.id)}
                          aria-pressed={active}
                          className={cn(
                            "group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-400 sm:gap-4 sm:p-5",
                            active
                              ? "border-gold-500 bg-gold-100/45 shadow-[0_20px_50px_-34px_rgba(196,137,31,.9)]"
                              : "border-ink-900/10 bg-paper-50 hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-white",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                              active ? "border-gold-600 bg-gold-500" : "border-paper-300 bg-white group-hover:border-gold-400",
                            )}
                          >
                            {active && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="font-display text-[19px] font-semibold text-ink-900">{p.name}</span>
                              <span className="rounded-full border border-ink-900/10 bg-white px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-ink-500 uppercase">
                                {p.months} month{p.months > 1 ? "s" : ""}
                              </span>
                              {p.popular && (
                                <span className="rounded-full bg-ink-900 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.18em] text-gold-300 uppercase">
                                  Most popular
                                </span>
                              )}
                              {save > 0 && (
                                <span className="rounded-full bg-mint-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.1em] text-mint-600 uppercase">
                                  Save {save}%
                                </span>
                              )}
                            </span>
                            <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-500">{p.blurb}</span>
                          </span>

                          <span className="shrink-0 text-right">
                            <span className="block font-display text-[26px] leading-none font-semibold text-ink-900 tabnum">
                              {sym}
                              {priceP}
                            </span>
                            {wasP && (
                              <span className="mt-1 block font-mono text-[11.5px] text-paper-400 line-through tabnum">
                                {sym}
                                {wasP}
                              </span>
                            )}
                            <span className="mt-1 block font-mono text-[10px] tracking-[0.1em] text-gold-700 uppercase tabnum">
                              {sym}
                              {(priceP / p.months).toFixed(0)}/mo
                            </span>
                          </span>
                        </button>
                      );
                    })}

                    <div className="pt-4">
                      <p className="font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">Payment method</p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {PAYMENT_METHODS.map((m) => {
                          const active = payment === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setPayment(m.id)}
                              aria-pressed={active}
                              className={cn(
                                "rounded-2xl border p-4 text-left transition-all duration-300",
                                active
                                  ? "border-ink-900 bg-ink-900 text-paper-100"
                                  : "border-ink-900/10 bg-paper-50 hover:border-ink-900/30 hover:bg-white",
                              )}
                            >
                              <span className="block text-[14px] font-semibold">{m.label}</span>
                              <span className={cn("mt-1 block text-[11.5px]", active ? "text-paper-400" : "text-ink-500")}>
                                {m.note}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* -------- step 2 -------- */}
                {step === 1 && (
                  <div className="animate-rise-in space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" error={errors.name} invalid={!!errors.name}>
                        <input
                          className={cn(field, errors.name ? "border-flame-500" : "border-ink-900/12 focus:border-gold-500")}
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Amara Okonkwo"
                          autoComplete="name"
                        />
                      </Field>
                      <Field label="Email address" error={errors.email} invalid={!!errors.email}>
                        <input
                          type="email"
                          className={cn(field, errors.email ? "border-flame-500" : "border-ink-900/12 focus:border-gold-500")}
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@email.com"
                          autoComplete="email"
                        />
                      </Field>
                      <Field label="WhatsApp number" error={errors.phone} invalid={!!errors.phone}>
                        <input
                          type="tel"
                          className={cn(field, errors.phone ? "border-flame-500" : "border-ink-900/12 focus:border-gold-500")}
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="+44 7000 000000"
                          autoComplete="tel"
                        />
                      </Field>
                      <Field label="Country" error={errors.country} invalid={!!errors.country}>
                        <input
                          className={cn(field, errors.country ? "border-flame-500" : "border-ink-900/12 focus:border-gold-500")}
                          value={form.country}
                          onChange={(e) => set("country", e.target.value)}
                          placeholder="United Kingdom"
                          autoComplete="country-name"
                        />
                      </Field>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">Experience level</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {EXPERIENCE.map((x) => (
                          <button
                            key={x}
                            type="button"
                            onClick={() => set("experience", x)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all duration-300",
                              form.experience === x
                                ? "-translate-y-0.5 border-gold-600 bg-gold-500 text-ink-950"
                                : "border-ink-900/12 bg-paper-50 text-ink-600 hover:border-gold-500/60 hover:bg-white",
                            )}
                          >
                            {x}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field label="What do you want to achieve? (optional)">
                      <textarea
                        rows={3}
                        className={cn(field, "resize-none border-ink-900/12 focus:border-gold-500")}
                        value={form.goals}
                        onChange={(e) => set("goals", e.target.value)}
                        placeholder="Pass a prop-firm challenge, trade the London open consistently, stop over-leveraging…"
                      />
                    </Field>

                    <label
                      data-invalid={!!errors.consent}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors duration-300",
                        errors.consent ? "border-flame-500 bg-flame-500/5" : "border-ink-900/10 bg-paper-50 hover:bg-white",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-300",
                          form.consent ? "border-gold-600 bg-gold-500" : "border-paper-300 bg-white",
                        )}
                      >
                        {form.consent && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                      </span>
                      <span className="text-[12.5px] leading-relaxed text-ink-600">
                        I understand that Fortune Academy World provides <strong>education only</strong>, that
                        trading carries a high level of risk, and that no profit is guaranteed.
                        {errors.consent && <span className="mt-1 block text-flame-500">{errors.consent}</span>}
                      </span>
                    </label>
                  </div>
                )}

                {/* -------- step 3 -------- */}
                {step === 2 && (
                  <div className="animate-rise-in">
                    <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-5">
                      <p className="font-mono text-[10px] tracking-[0.22em] text-gold-600 uppercase">
                        Your application summary
                      </p>
                      <pre className="mt-3 font-mono text-[12.5px] leading-[1.85] whitespace-pre-wrap text-ink-700">
                        {summary}
                      </pre>
                    </div>

                    <p className="mt-5 text-[13.5px] leading-relaxed text-ink-500">
                      Send this straight to our support desk. You will get access instructions and the
                      community link within <strong className="text-ink-900">1–5 minutes</strong> of your
                      payment being confirmed.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <a
                        href={whatsappLink(summary)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 text-[14px] font-bold text-[#04231a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#37e077] hover:shadow-[0_18px_38px_-18px_rgba(37,211,102,.95)]"
                      >
                        <WhatsApp className="h-5 w-5" />
                        Send via WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          copy();
                          window.open(telegramLink(), "_blank", "noopener,noreferrer");
                        }}
                        className="group flex items-center justify-center gap-2.5 rounded-full bg-[#2AABEE] px-6 py-4 text-[14px] font-bold text-[#04202e] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3fb9f7] hover:shadow-[0_18px_38px_-18px_rgba(42,171,238,.95)]"
                      >
                        <Telegram className="h-5 w-5" />
                        Send via Telegram
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={copy}
                        className="flex items-center gap-2 rounded-full border border-ink-900/12 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600/60 hover:text-gold-700"
                      >
                        <Copy className="h-4 w-4" />
                        Copy summary
                      </button>
                      <a
                        href={`mailto:support@fortuneacademy.world?subject=${encodeURIComponent(`Application — ${pack.name}`)}&body=${encodeURIComponent(summary)}`}
                        className="flex items-center gap-2 rounded-full border border-ink-900/12 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600/60 hover:text-gold-700"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        Email instead
                      </a>
                    </div>
                  </div>
                )}

                {/* nav buttons */}
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink-900/8 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300",
                      step === 0 ? "cursor-not-allowed text-paper-400" : "text-ink-700 hover:-translate-x-0.5 hover:text-gold-700",
                    )}
                  >
                    <Arrow className="h-4 w-4 rotate-180" />
                    Back
                  </button>

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="group flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 px-7 py-3.5 text-[14px] font-bold text-ink-950 shadow-[0_14px_34px_-16px_rgba(196,137,31,.95)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Continue
                      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink-500 uppercase">
                      Secure · no card details required
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- summary rail ---------------- */}
          <div className="reveal lg:col-span-5" style={{ transitionDelay: "120ms" }}>
            <div className="lg:sticky lg:top-32">
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-ink-900 p-7 text-paper-100 shadow-[0_40px_90px_-50px_rgba(7,11,20,1)]">
                <div
                  className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(224,169,60,.3), transparent 70%)" }}
                  aria-hidden="true"
                />
                <p className="relative font-mono text-[10px] tracking-[0.26em] text-gold-400 uppercase">
                  Order summary
                </p>

                <div className="relative mt-6 space-y-3.5 border-b border-white/10 pb-6">
                  <Row k="Plan" v={`${pack.name} · ${pack.months} mo`} />
                  <Row k="Payment" v={PAYMENT_METHODS.find((m) => m.id === payment)!.label} />
                  <Row k="Applicant" v={form.name.trim() || "—"} />
                  <Row k="Email" v={form.email.trim() || "—"} truncate />
                  <Row k="Experience" v={form.experience} />
                </div>

                <div className="relative mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-paper-400 uppercase">Total due today</p>
                    <p className="mt-2 flex items-baseline gap-2.5">
                      <span className="font-display text-[44px] leading-none font-semibold text-paper-50 tabnum">
                        {sym}
                        {price}
                      </span>
                      {was && (
                        <span className="font-mono text-[14px] text-paper-400 line-through tabnum">
                          {sym}
                          {was}
                        </span>
                      )}
                    </p>
                    {saved > 0 && (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-mint-500/15 px-2.5 py-1 font-mono text-[10.5px] font-bold tracking-[0.1em] text-mint-300 uppercase">
                        You save {sym}
                        {saved}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-paper-400 uppercase">Per month</p>
                    <p className="mt-1.5 font-display text-[24px] font-semibold text-gold-300 tabnum">
                      {sym}
                      {perMonth.toFixed(perMonth < 100 ? 2 : 0)}
                    </p>
                  </div>
                </div>

                <ul className="relative mt-7 space-y-2.5 border-t border-white/10 pt-6">
                  {pack.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-paper-200">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="relative mt-6 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-paper-400">
                  {RATE_NOTE[currency].toUpperCase()} · CONFIRMED IN 1–5 MINUTES
                </p>
              </div>

              <div className="mt-5 rounded-[20px] border border-ink-900/10 bg-white p-6">
                <p className="font-display text-[19px] font-semibold text-ink-900">
                  Prefer to ask a human first?
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                  Message the desk directly — no bots, no call centre. We answer between 07:00 and 22:00 GMT.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <Btn
                    href={whatsappLink("Hello Fortune Academy World, I have a question before joining.")}
                    external
                    variant="wa"
                    size="sm"
                    icon={<WhatsApp className="h-4 w-4" />}
                  >
                    WhatsApp
                  </Btn>
                  <Btn href={telegramLink()} external variant="tg" size="sm" icon={<Telegram className="h-4 w-4" />}>
                    Telegram
                  </Btn>
                </div>
                <p className="mt-4 text-center font-mono text-[12px] tracking-[0.1em] text-ink-700">
                  {PHONE_DISPLAY}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* toast */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-70 -translate-x-1/2 rounded-full border border-mint-500/40 bg-ink-900/95 px-5 py-3 text-[13px] font-medium text-mint-300 shadow-[0_20px_50px_-20px_rgba(0,0,0,1)] backdrop-blur transition-all duration-400",
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </SectionShell>
  );
}

function Row({ k, v, truncate }: { k: string; v: string; truncate?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10.5px] tracking-[0.16em] text-paper-400 uppercase">{k}</span>
      <span
        className={cn(
          "text-[13.5px] font-medium text-paper-100",
          truncate && "max-w-[58%] truncate",
        )}
      >
        {v}
      </span>
    </div>
  );
}

function Field({
  label,
  error,
  invalid,
  children,
}: {
  label: string;
  error?: string;
  invalid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block" data-invalid={invalid ? "true" : undefined}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[11.5px] font-medium text-flame-500">{error}</span>}
    </label>
  );
}
