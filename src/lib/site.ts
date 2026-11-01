export const BRAND = {
  name: "Fortune Academy World",
  short: "Fortune Academy",
  tagline: "Trading Education & Community",
  established: 2019,
};

export const PHONE_DISPLAY = "+44 7460 033935";
export const PHONE_RAW = "447460033935";
export const EMAIL = "support@fortuneacademy.world";

export const whatsappLink = (message?: string) =>
  `https://wa.me/${PHONE_RAW}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const telegramLink = (message?: string) =>
  `https://t.me/+${PHONE_RAW}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const CALENDAR_URL = "https://www.forexfactory.com/calendar";

/* ---------------- ticker ---------------- */
export type Instrument = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  digits: number;
};

export const INSTRUMENTS: Instrument[] = [
  { symbol: "XAU/USD", name: "Gold", price: 2648.42, change: 0.84, digits: 2 },
  { symbol: "EUR/USD", name: "Euro", price: 1.0842, change: -0.21, digits: 4 },
  { symbol: "GBP/USD", name: "Sterling", price: 1.2716, change: 0.37, digits: 4 },
  { symbol: "USD/JPY", name: "Yen", price: 151.284, change: -0.46, digits: 3 },
  { symbol: "BTC/USD", name: "Bitcoin", price: 96420, change: 2.13, digits: 0 },
  { symbol: "NAS100", name: "Nasdaq 100", price: 21184.5, change: 0.62, digits: 1 },
  { symbol: "US30", name: "Dow Jones", price: 42931.0, change: -0.18, digits: 1 },
  { symbol: "ETH/USD", name: "Ethereum", price: 3372.4, change: 1.44, digits: 1 },
  { symbol: "GBP/JPY", name: "Cable Yen", price: 192.417, change: 0.29, digits: 3 },
  { symbol: "XAG/USD", name: "Silver", price: 31.084, change: -0.73, digits: 3 },
  { symbol: "UKOIL", name: "Brent Crude", price: 74.62, change: 1.07, digits: 2 },
  { symbol: "AUD/USD", name: "Aussie", price: 0.6531, change: -0.34, digits: 4 },
];

export const HERO_PAIRS = [
  { symbol: "XAU/USD", label: "Gold", base: 2648.4, vol: 3.1 },
  { symbol: "EUR/USD", label: "Euro", base: 1.0842, vol: 0.0009 },
  { symbol: "BTC/USD", label: "Bitcoin", base: 96420, vol: 900 },
  { symbol: "NAS100", label: "Nasdaq", base: 21184, vol: 46 },
] as const;

/* ---------------- hero pillars ---------------- */
export const PILLARS = [
  { title: "Structured", copy: "Lessons from first principles to advanced execution" },
  { title: "Risk-first", copy: "Capital protection is taught before anything else" },
  { title: "Live", copy: "Daily market sessions, reviews and trade calls" },
  { title: "Community", copy: "A private, moderated group of serious members" },
];

/* ---------------- stats ---------------- */
export const STATS = [
  { value: 85, suffix: "%", label: "Documented win rate", note: "Members following signals across a rolling 1-month window" },
  { value: 1240, suffix: "+", label: "Active members", note: "Across 30+ countries, from Lagos to London" },
  { value: 640, suffix: "+", label: "Live sessions taught", note: "Recorded and archived in the member portal" },
  { value: 6, suffix: "yrs", label: "Mentoring the markets", note: "Independent, education-only, no signal hype" },
];

/* ---------------- programmes ---------------- */
export type Programme = {
  n: string;
  title: string;
  copy: string;
  points: string[];
  icon: "compass" | "structure" | "shield" | "live" | "people" | "pulse";
  span: string;
};

export const PROGRAMMES: Programme[] = [
  {
    n: "01",
    title: "Foundation Mentorship",
    copy: "The complete beginner track. Learn what actually moves price, how to read a chart without guessing, and the vocabulary of a professional desk.",
    points: ["Chart & order types", "Sessions and liquidity", "Your first trading plan"],
    icon: "compass",
    span: "lg:col-span-7",
  },
  {
    n: "02",
    title: "Advanced Strategy Lab",
    copy: "Market structure, supply & demand, entry models and a written plan you can execute under pressure.",
    points: ["Structure & bias", "Confluence checklists", "Backtesting protocol"],
    icon: "structure",
    span: "lg:col-span-5",
  },
  {
    n: "03",
    title: "Risk & Psychology",
    copy: "Position sizing, drawdown rules and the behavioural habits that keep traders solvent long enough to become good.",
    points: ["Fixed-fractional sizing", "Daily loss limits", "Tilt & revenge trading"],
    icon: "shield",
    span: "lg:col-span-5",
  },
  {
    n: "04",
    title: "Live Market Sessions",
    copy: "Watch analysis unfold in real time through London and New York. Every decision narrated, every outcome reviewed on camera.",
    points: ["London open briefing", "NY session trades", "End-of-day debrief"],
    icon: "live",
    span: "lg:col-span-7",
  },
  {
    n: "05",
    title: "Private Members Room",
    copy: "A moderated group for trade reviews, journal feedback and accountability partners — no noise, no shilling.",
    points: ["Weekly journal review", "Accountability pods", "Mentor Q&A"],
    icon: "people",
    span: "lg:col-span-6",
  },
  {
    n: "06",
    title: "Market Intelligence",
    copy: "Pre-market briefings around high-impact releases so you are never caught on the wrong side of the news.",
    points: ["Daily 07:00 GMT brief", "CPI / NFP / rate playbooks", "Weekly outlook"],
    icon: "pulse",
    span: "lg:col-span-6",
  },
];

/* ---------------- learning path ---------------- */
export const PATH = [
  {
    step: "01",
    title: "Apply",
    copy: "Complete the short join form and tell us your experience level and the markets you want to trade.",
    meta: "Takes 2 minutes",
  },
  {
    step: "02",
    title: "Get onboarded",
    copy: "Receive access instructions, your personalised learning path and the community guidelines.",
    meta: "Within 5 minutes of payment",
  },
  {
    step: "03",
    title: "Learn & practise",
    copy: "Work through lessons and live sessions — on a demo account first, until your process is repeatable.",
    meta: "Self-paced + scheduled",
  },
  {
    step: "04",
    title: "Review & improve",
    copy: "Journal every trade, submit it for mentor feedback and refine your edge week after week.",
    meta: "Ongoing for your plan length",
  },
];

/* ---------------- markets ---------------- */
export type CalEvent = {
  time: string;
  currency: string;
  event: string;
  impact: "high" | "medium" | "low";
  forecast: string;
  previous: string;
};

export const CALENDAR: CalEvent[] = [
  { time: "07:00", currency: "GBP", event: "UK CPI y/y", impact: "high", forecast: "2.6%", previous: "2.3%" },
  { time: "09:30", currency: "EUR", event: "ECB Lane Speech", impact: "medium", forecast: "—", previous: "—" },
  { time: "12:30", currency: "USD", event: "Core Retail Sales m/m", impact: "high", forecast: "0.4%", previous: "-0.1%" },
  { time: "13:15", currency: "USD", event: "FOMC Member Williams", impact: "medium", forecast: "—", previous: "—" },
  { time: "14:00", currency: "USD", event: "CB Consumer Confidence", impact: "medium", forecast: "101.2", previous: "100.7" },
  { time: "23:50", currency: "JPY", event: "Tokyo Core CPI y/y", impact: "high", forecast: "2.2%", previous: "1.8%" },
];

export type Session = {
  day: string;
  name: string;
  time: string;
  focus: string;
  live: boolean;
};

export const SCHEDULE: Session[] = [
  { day: "Mon", name: "Week Ahead Briefing", time: "07:00 – 07:45 GMT", focus: "Macro map, key levels, weekly bias", live: true },
  { day: "Tue", name: "London Open Desk", time: "08:00 – 09:30 GMT", focus: "Structure reading & live entries", live: true },
  { day: "Wed", name: "Strategy Lab", time: "18:00 – 19:30 GMT", focus: "Backtesting, journals, member Q&A", live: true },
  { day: "Thu", name: "New York Session", time: "13:30 – 15:00 GMT", focus: "News reaction & index trading", live: true },
  { day: "Fri", name: "Weekly Debrief", time: "16:00 – 17:00 GMT", focus: "Trade review, P&L breakdown, lessons", live: true },
  { day: "Sat", name: "Recorded Replay Drop", time: "10:00 GMT", focus: "Full session archive + worksheets", live: false },
];

export const INSIGHTS = [
  {
    tag: "Pre-market",
    title: "Gold is trading the real-yield channel, not the headlines",
    copy: "Two weeks of chop inside a clean supply zone. Here is the level that decides whether buyers get a second attempt.",
    read: "4 min read",
  },
  {
    tag: "Education",
    title: "The 1% rule is not risk management",
    copy: "Most beginners size correctly and then stack four correlated positions. Correlation is the risk nobody counts.",
    read: "6 min read",
  },
  {
    tag: "Psychology",
    title: "Why your best week is usually followed by your worst",
    copy: "Confidence drift is measurable in your own journal. We show the three fields to track to catch it early.",
    read: "5 min read",
  },
];

/* ---------------- testimonials ---------------- */
export const TESTIMONIALS = [
  {
    name: "Adaeze O.",
    location: "Lagos, NG",
    plan: "6-month plan",
    quote:
      "I had blown two accounts before joining. The risk module alone changed everything — I have not exceeded my daily loss limit in four months.",
    rating: 5,
  },
  {
    name: "Callum R.",
    location: "Glasgow, UK",
    plan: "12-month plan",
    quote:
      "The London open desk is the best hour of my day. You watch an experienced trader narrate the decision, not just the result.",
    rating: 5,
  },
  {
    name: "Thandi M.",
    location: "Johannesburg, ZA",
    plan: "3-month plan",
    quote:
      "No lambos, no screenshots of impossible profits. Just structure, journals and honest feedback. Refreshing.",
    rating: 5,
  },
  {
    name: "Yusuf A.",
    location: "Dubai, AE",
    plan: "6-month plan",
    quote:
      "My backtesting went from random to a documented 60-trade sample in three weeks. That is when the strategy finally made sense.",
    rating: 5,
  },
  {
    name: "Elena P.",
    location: "Madrid, ES",
    plan: "1-month plan",
    quote:
      "Started as a complete beginner on demo. The onboarding path told me exactly what to do each day — no overwhelm.",
    rating: 5,
  },
  {
    name: "Kwame B.",
    location: "Accra, GH",
    plan: "12-month plan",
    quote:
      "The accountability pod kept me honest. Weekly journal reviews with a mentor are worth the fee on their own.",
    rating: 5,
  },
  {
    name: "Sofia L.",
    location: "Milan, IT",
    plan: "3-month plan",
    quote:
      "Support answered on WhatsApp within two minutes at 22:00 my time. That level of care is rare.",
    rating: 5,
  },
  {
    name: "Daniel N.",
    location: "Nairobi, KE",
    plan: "6-month plan",
    quote:
      "I stopped trading news entirely after the CPI playbook session. My drawdown halved the following month.",
    rating: 5,
  },
];

/* ---------------- packages ---------------- */
export type Pack = {
  id: string;
  name: string;
  months: number;
  usd: number;
  usdWas?: number;
  gbp: number;
  gbpWas?: number;
  blurb: string;
  features: string[];
  popular?: boolean;
};

export const PACKAGES: Pack[] = [
  {
    id: "starter",
    name: "Starter",
    months: 1,
    usd: 120,
    gbp: 95,
    blurb: "Test the water. Full access for one month, no lock-in.",
    features: [
      "Private members community",
      "Daily market intelligence brief",
      "All live sessions for 30 days",
      "Foundation lesson library",
      "Session recordings archive",
    ],
  },
  {
    id: "committed",
    name: "Committed",
    months: 3,
    usd: 300,
    usdWas: 360,
    gbp: 240,
    gbpWas: 285,
    blurb: "One full quarter — enough time to build and validate a process.",
    features: [
      "Everything in Starter",
      "Advanced Strategy Lab track",
      "Risk & Psychology module",
      "Bi-weekly journal review",
      "Accountability pod placement",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    months: 6,
    usd: 540,
    usdWas: 720,
    gbp: 430,
    gbpWas: 570,
    blurb: "Our most chosen plan. Deep mentorship through two market cycles.",
    features: [
      "Everything in Committed",
      "Weekly 1-to-1 mentor review",
      "Backtesting protocol & templates",
      "Prop-firm challenge guidance",
      "Priority WhatsApp support",
    ],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    months: 12,
    usd: 900,
    usdWas: 1440,
    gbp: 720,
    gbpWas: 1140,
    blurb: "A full year on the desk. The plan members rarely leave.",
    features: [
      "Everything in Professional",
      "Monthly private coaching call",
      "Custom written trading plan",
      "Lifetime lesson-library access",
      "Alumni network & referrals",
    ],
  },
];

export const PAYMENT_METHODS = [
  { id: "crypto", label: "Cryptocurrency", note: "BTC · USDT (BEP20/TRC20) · ETH (ERC20)", detail: "USD price applies. Confirmed in 1–5 minutes." },
  { id: "bank", label: "Bank transfer", note: "GBP or USD account details on request", detail: "Details released after your application is reviewed." },
] as const;

export const EXPERIENCE = ["Complete beginner", "Some experience", "Trading 1–2 years", "Trading 2+ years"];

/* ---------------- faq ---------------- */
export const FAQS = [
  {
    q: "Who is Fortune Academy World for?",
    a: "Anyone who wants to learn to trade in a structured, honest way — from complete beginners to developing traders who keep giving back their profits. No prior experience is required, and no capital is needed to start learning.",
  },
  {
    q: "What exactly do I get when I join?",
    a: "Access to our private Telegram community, the full lesson library, daily pre-market intelligence, every live session for the length of your plan, session recordings, and mentor journal reviews according to the tier you choose.",
  },
  {
    q: "How do I pay?",
    a: "Choose a plan in the join form, then pay by cryptocurrency or bank transfer. For crypto you select your coin and network, send the payment and upload your receipt. For bank transfer, request our account details from support on WhatsApp or Telegram.",
  },
  {
    q: "Which cryptocurrencies do you accept?",
    a: "Bitcoin (Bitcoin network), USDT (BEP20 or TRC20), Ethereum (ERC20) and Tron. Always send on the network shown in your invoice — funds sent on a different network cannot be recovered.",
  },
  {
    q: "How fast do I get access after paying?",
    a: "Crypto payments are confirmed within 1 to 5 minutes. Message support on +44 7460 033935 with your receipt and you will receive the community link, your learning path and the portal login the same day.",
  },
  {
    q: "Do you guarantee profits?",
    a: "No, and be suspicious of anyone who does. We provide education, process and mentorship only. Trading leveraged markets carries a high level of risk and you can lose some or all of your capital. Never risk money you cannot afford to lose.",
  },
  {
    q: "Can I get a refund?",
    a: "Because access is delivered instantly and includes live mentorship, fees are non-refundable once your plan has started. Please message support before paying if you have any questions at all — we would rather answer them than lose you later.",
  },
  {
    q: "Do I need a broker account to begin?",
    a: "Not on day one. We recommend a demo account for your first weeks and we are broker-neutral — we do not earn introducer fees from sending you anywhere. When you are ready we will explain what to look for in regulation and execution.",
  },
  {
    q: "How do I contact support?",
    a: `WhatsApp or Telegram on ${PHONE_DISPLAY}, or email ${EMAIL}. Support hours are 07:00–22:00 GMT, seven days a week, with urgent member queries answered outside those hours.`,
  },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#programmes", label: "Programmes" },
  { href: "#path", label: "How it works" },
  { href: "#markets", label: "Markets" },
  { href: "#desk", label: "The desk" },
  { href: "#join", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];
