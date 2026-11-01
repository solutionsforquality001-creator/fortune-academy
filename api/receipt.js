// Vercel serverless function: receives a payment receipt and forwards it to your Telegram.
// Set two Environment Variables in Vercel: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return res.status(500).json({ ok: false, error: "not_configured" });

  try {
    const { caption, filename, mime, data } = req.body || {};
    if (typeof data !== "string" || !ALLOWED.includes(mime)) {
      return res.status(400).json({ ok: false, error: "bad_file" });
    }
    if (data.length > 4_200_000) return res.status(413).json({ ok: false, error: "too_large" });

    const buf = Buffer.from(data, "base64");
    const safeName = String(filename || "receipt").replace(/[^\w.\-]/g, "_").slice(0, 80);

    const form = new FormData();
    form.append("chat_id", chat);
    form.append("caption", String(caption || "Payment receipt").slice(0, 1000));
    form.append("document", new Blob([buf], { type: mime }), safeName);

    const r = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, { method: "POST", body: form });
    if (!r.ok) return res.status(502).json({ ok: false, error: "telegram_failed" });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
}
