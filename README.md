# Portfolio — Clinton Brown

Senior e-commerce full stack developer. Static Next.js on Vercel: three routes,
no web fonts, no third-party scripts, no analytics.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Measured

Mobile Lighthouse, simulated throttling, production build:

| Route | Performance | Accessibility | Best practices | SEO | CLS |
|---|---:|---:|---:|---:|---:|
| `/` | 100 | 100 | 100 | 100 | 0.000 |
| `/work/shopify-headless-perf-lab` | 98 | 100 | 100 | 100 | 0.000 |
| `/about` | 100 | 100 | 100 | 100 | 0.000 |

The case-study page pays for React's hydration bundle on a page with nothing to
hydrate. That is the honest cost of the framework choice, and the footer says so
rather than rounding it away.

## Colour

The UI is monochrome; colour is reserved for data. The two data steps are one hue
in two shades, validated against both surfaces (light `#86b6ef` → `#1c5cab`,
dark `#256abf` → `#9ec5f4`), so the "optimized" mark carries the stronger step in
either theme — the direction of an improvement never depends on the reader's
colour scheme.

Muted text runs at `#6e6d68` rather than the reference palette's `#898781`
chart-axis step, which measures 3.41:1 on this surface: fine behind a gridline,
not fine under a sentence.

## Layout

```
app/
  page.tsx                              home
  work/shopify-headless-perf-lab/       case study
  about/                                background
  globals.css                           tokens and components
components/
  chrome.tsx                            nav, footer, icons
  figures.tsx                           stat tiles, dumbbell comparison
lib/site.ts                             single source for every figure on the site
```

Every number on the site comes from `lib/site.ts`, transcribed from the generated
report in
[shopify-headless-perf-lab](https://github.com/Seedh0922/shopify-headless-perf-lab).
