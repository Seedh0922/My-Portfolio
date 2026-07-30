export const site = {
  name: "Clinton Brown",
  title: "Senior E-Commerce Full Stack Developer",
  location: "Murfreesboro, TN",
  availability: "Open to remote",
  email: "cbdev777@outlook.com",
  github: "https://github.com/Seedh0922",
  linkedin: "https://www.linkedin.com/in/clinton-brown-72210b426",
  url: "https://clintonbrown.vercel.app",
  summary:
    "13 years in web development, 8+ of them on Shopify, Shopify Plus, WooCommerce and headless commerce for B2C and B2B merchants.",
} as const;

export const repo = {
  url: "https://github.com/Seedh0922/shopify-headless-perf-lab",
  report:
    "https://github.com/Seedh0922/shopify-headless-perf-lab/blob/main/docs/perf/latest.md",
  levers:
    "https://github.com/Seedh0922/shopify-headless-perf-lab/blob/main/app/lib/perf-mode.ts",
  budgets:
    "https://github.com/Seedh0922/shopify-headless-perf-lab/blob/main/lighthouserc.json",
  adr: "https://github.com/Seedh0922/shopify-headless-perf-lab/tree/main/docs/adr",
  // Set once the demonstration pull request is open.
  failingPr: "https://github.com/Seedh0922/shopify-headless-perf-lab/pull/1",
} as const;

/**
 * Homepage figures from docs/perf/latest.md — mobile, applied throttling at
 * 4x CPU on Slow 4G, median of three runs. Lower is better for every metric
 * listed here, which is what lets them share one visual direction.
 */
export type Metric = {
  label: string;
  unit: string;
  baseline: number;
  optimized: number;
  /** Formatted for display; keeps the thousands separators explicit. */
  baselineText: string;
  optimizedText: string;
  changeText: string;
  improved: boolean;
};

export const metrics: Metric[] = [
  {
    label: "Largest Contentful Paint",
    unit: "ms",
    baseline: 4968,
    optimized: 2650,
    baselineText: "4,968 ms",
    optimizedText: "2,650 ms",
    changeText: "−47%",
    improved: true,
  },
  {
    label: "Total Blocking Time",
    unit: "ms",
    baseline: 143,
    optimized: 4,
    baselineText: "143 ms",
    optimizedText: "4 ms",
    changeText: "−97%",
    improved: true,
  },
  {
    label: "Speed Index",
    unit: "ms",
    baseline: 5010,
    optimized: 3088,
    baselineText: "5,010 ms",
    optimizedText: "3,088 ms",
    changeText: "−38%",
    improved: true,
  },
  {
    label: "Transfer size",
    unit: "KB",
    baseline: 714,
    optimized: 473,
    baselineText: "714 KB",
    optimizedText: "473 KB",
    changeText: "−34%",
    improved: true,
  },
];

export const headline = [
  {
    label: "Largest Contentful Paint",
    value: "2,650 ms",
    delta: "−47% vs baseline",
    note: "from 4,968 ms",
  },
  {
    label: "Total Blocking Time",
    value: "4 ms",
    delta: "−97% vs baseline",
    note: "from 143 ms",
  },
  {
    label: "Lighthouse performance",
    value: "95",
    delta: "+19 points",
    note: "from 76",
  },
] as const;

export const levers = [
  {
    lever: "CDN preconnect",
    optimized: "present",
    baseline: "removed",
    why: "A TLS round trip before the LCP image can start",
  },
  {
    lever: "Hero image",
    optimized: "eager + high priority",
    baseline: "lazy + auto",
    why: "Lazy-loading the LCP element defeats the preload scanner",
  },
  {
    lever: "sizes hint",
    optimized: "viewport-aware",
    baseline: "hardcoded 1600px",
    why: "Mobile downloads a desktop-width image",
  },
  {
    lever: "Layout reservation",
    optimized: "aspect ratio set",
    baseline: "absent",
    why: "The usual cause of a bad CLS score",
  },
  {
    lever: "Third-party app script",
    optimized: "absent",
    baseline: "synchronous in <head>",
    why: "Reviews / popup / upsell bundles — the biggest real-world cost",
  },
  {
    lever: "Storefront API cache",
    optimized: "CacheLong / CacheShort",
    baseline: "CacheNone",
    why: "Warm vs cold TTFB",
  },
] as const;

export const budgets = [
  { assertion: "Performance category", threshold: "≥ 0.90", level: "error" },
  { assertion: "Accessibility category", threshold: "≥ 0.95", level: "error" },
  { assertion: "SEO category", threshold: "≥ 0.95", level: "error" },
  { assertion: "Largest Contentful Paint", threshold: "≤ 2,500 ms", level: "error" },
  { assertion: "Cumulative Layout Shift", threshold: "≤ 0.10", level: "error" },
  { assertion: "Total Blocking Time", threshold: "≤ 300 ms", level: "error" },
  { assertion: "Unsized images", threshold: "none", level: "error" },
] as const;

export const roles = [
  {
    when: "Dec 2025 — Jun 2026",
    title: "Senior E-Commerce Full Stack Developer",
    org: "Netalico · Remote",
    note: "Owned day-to-day Shopify Plus delivery across merchant accounts — Checkout Extensibility, custom apps on the Admin and Storefront APIs, and a Node.js service syncing ERP catalog and inventory into Shopify with webhook handling and retry logic. Brought PDP and collection LCP down ~22%.",
  },
  {
    when: "Jan 2024 — Nov 2025",
    title: "Senior Ecommerce Engineer",
    org: "Human Good Kind · Nashville, TN",
    note: "Led a headless migration to Next.js and the Shopify Storefront API for a DTC brand, phased so navigation and catalog landed before higher-risk PDP work. Checkout stayed on Shopify. Email-attributed revenue rose ~14% over two quarters; a shipping-message test lifted checkout-start ~6%.",
  },
  {
    when: "Dec 2022 — Dec 2023",
    title: "Senior Full Stack Engineer",
    org: "Acklen Avenue · Nashville, TN",
    note: "React/Next.js clients and Node.js services for enterprise SaaS. Tuned PostgreSQL schemas and indexes on the heaviest report path, taking response time from ~4.5 s to under 900 ms.",
  },
  {
    when: "Oct 2019 — Nov 2022",
    title: "Senior Shopify Developer",
    org: "UPQODE · Nashville, TN",
    note: "Shopify and Shopify Plus builds for retail, CPG and subscription merchants. Rebuilt three Plus themes around reusable Liquid sections and metafields so marketers could launch without theme deploys. Mobile Lighthouse on priority templates went from the low 40s into the mid-70s.",
  },
  {
    when: "Jan 2017 — Sep 2019",
    title: "Full Stack Developer",
    org: "RH Consulting LLC · Murfreesboro, TN",
    note: "React front ends with Node.js and Laravel/PHP back ends; REST services connecting Shopify and WooCommerce stores to Stripe, PayPal and inventory/CRM systems.",
  },
  {
    when: "Jun 2013 — Dec 2016",
    title: "Junior Frontend Developer",
    org: "Raine Digital · Murfreesboro, TN",
    note: "Responsive layouts and WordPress theme work for marketing sites and early ecommerce projects.",
  },
] as const;

export const capabilities = [
  {
    heading: "Commerce platforms",
    body: "Shopify, Shopify Plus, Hydrogen, headless commerce, WooCommerce, BigCommerce, Shopify Markets",
  },
  {
    heading: "Shopify surface",
    body: "Liquid, Admin API, Storefront API, custom apps, webhooks, Checkout Extensibility, Theme App Extensions, metafields",
  },
  {
    heading: "Front end",
    body: "React, Next.js, TypeScript, Vue.js, Tailwind CSS, Redux, React Query, responsive and accessible UI",
  },
  {
    heading: "Back end & data",
    body: "Node.js, Express, Laravel/PHP, GraphQL, REST, MySQL, PostgreSQL, MongoDB, Redis",
  },
  {
    heading: "Delivery",
    body: "GitHub Actions, Azure DevOps, Docker, AWS, Vercel, Cloudflare, CI/CD, Lighthouse CI budgets",
  },
  {
    heading: "Growth & measurement",
    body: "Core Web Vitals, technical SEO, GA4, GTM, Search Console, Klaviyo, Hotjar, A/B testing, CRO",
  },
] as const;
