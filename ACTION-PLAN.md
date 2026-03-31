# SEO Action Plan — Mixie Kadai
**URL:** https://mixie-kade.vercel.app
**Date:** 2026-03-31
**Priority order:** Highest impact first, lowest effort first within same impact tier

---

## Phase 1 — Quick Wins (Do Today, < 2 hours total)

These changes require no framework migration and fix the most critical missing elements.

---

### Fix 1.1 — Create `public/robots.txt`

**File:** `public/robots.txt` (new file)
**Impact:** 🔴 Critical — Googlebot currently receives invalid HTML as robots.txt

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://mixie-kade.vercel.app/sitemap.xml
```

---

### Fix 1.2 — Create `public/sitemap.xml`

**File:** `public/sitemap.xml` (new file)
**Impact:** 🔴 Critical — No sitemap means product pages won't be discovered

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mixie-kade.vercel.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mixie-kade.vercel.app/shop</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mixie-kade.vercel.app/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://mixie-kade.vercel.app/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

> **Note:** Product URLs (`/shop/:slug`) should be added here once products are live. Automate this at build time by fetching product slugs from the CMS API and generating the sitemap programmatically.

---

### Fix 1.3 — Add Meta Description + Open Graph + Twitter Card to `index.html`

**File:** `index.html`
**Impact:** 🔴 Critical — Missing meta description & OG tags cost every social share

Replace the `<head>` section with:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary meta -->
  <title>Mixie Kadai — Sri Lanka's Home for Mixer Grinders</title>
  <meta name="description" content="Shop 20+ mixer grinder models, genuine spare parts & kitchen accessories. Islandwide delivery from Jaffna, Sri Lanka. Preethi, Butterfly & more." />
  <link rel="canonical" href="https://mixie-kade.vercel.app/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Mixie Kadai" />
  <meta property="og:title" content="Mixie Kadai — Sri Lanka's Home for Mixer Grinders" />
  <meta property="og:description" content="Shop 20+ mixer grinder models, genuine spare parts & kitchen accessories. Islandwide delivery from Jaffna, Sri Lanka." />
  <meta property="og:image" content="https://mixie-kade.vercel.app/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://mixie-kade.vercel.app" />
  <meta property="og:locale" content="en_LK" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Mixie Kadai — Sri Lanka's Home for Mixer Grinders" />
  <meta name="twitter:description" content="Shop 20+ mixer grinder models, genuine spare parts & kitchen accessories. Islandwide delivery from Jaffna, Sri Lanka." />
  <meta name="twitter:image" content="https://mixie-kade.vercel.app/og-image.jpg" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
```

> **Also create:** A 1200×630px OG image (`public/og-image.jpg`) showing the Mixie Kadai logo on a navy background with gold text. This is what appears when the site is shared on WhatsApp, Facebook, etc.

---

### Fix 1.4 — Add LocalBusiness JSON-LD to Homepage

**File:** `index.html` or `src/components/Hero.jsx` (via `<script>` tag in component render)
**Impact:** 🔴 Critical — Required for local search ranking ("mixer grinder Jaffna")

Add inside `<head>` in `index.html` (update phone once confirmed):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mixie Kadai",
  "url": "https://mixie-kade.vercel.app",
  "telephone": "+94XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "771 Jaffna-Kankesanturai Rd",
    "addressLocality": "Jaffna",
    "postalCode": "40000",
    "addressCountry": "LK"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "image": "https://mixie-kade.vercel.app/og-image.jpg",
  "sameAs": [
    "https://www.instagram.com/mixie_kadai",
    "https://www.facebook.com/share/18cTEreLXk/?mibextid=wwXIfr"
  ]
}
</script>
```

> **Update `telephone` once Hashim confirms the number** — this is the same placeholder as in ContactPage.jsx.

---

### Fix 1.5 — Update `vercel.json` for Asset Caching + Security Headers

**File:** `vercel.json`
**Impact:** ⚠️ Warning — Improves repeat-visit performance and security posture

```json
{
  "rewrites": [{ "source": "/((?!assets|favicon|logo|icons|og-image).*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

### Fix 1.6 — Fill Contact Info Placeholders

**File:** `src/pages/ContactPage.jsx`
**Impact:** ⚠️ Warning — Trust signal for users and crawlers

Once Hashim provides the real details, update:
- `const WHATSAPP = '94XXXXXXXXXX'` → real number (digits only, no spaces)
- `value: '+94 XX XXX XXXX'` → real phone number
- `value: 'hello@mixiekadai.lk'` → real email address
- `value: 'Mon–Sat 9am–7pm · Sunday 10am–4pm'` → confirm real hours

---

### Fix 1.7 — Fix "Learn More" Hero Link

**File:** `src/components/Hero.jsx`
**Impact:** ℹ️ Info — Fixes broken anchor link and adds proper internal link

Change:
```jsx
<a href="#about" ...>Learn More →</a>
```
To:
```jsx
<Link to="/about" ...>Learn More →</Link>
```
And add `import { Link } from 'react-router-dom'` at the top.

---

## Phase 2 — Per-Page Meta Tags with react-helmet-async (1–2 days)

This is the highest-leverage on-page improvement that doesn't require a framework migration.

### Fix 2.1 — Install react-helmet-async

```bash
npm install react-helmet-async
```

### Fix 2.2 — Wrap App in HelmetProvider

**File:** `src/main.jsx`
```jsx
import { HelmetProvider } from 'react-helmet-async'
// ...
<HelmetProvider>
  <App />
</HelmetProvider>
```

### Fix 2.3 — Add Helmet to Each Page

**Homepage** (`src/components/Hero.jsx` or a new `src/pages/HomePage.jsx`):
```jsx
import { Helmet } from 'react-helmet-async'
// Inside component:
<Helmet>
  <title>Mixie Kadai — Sri Lanka's Home for Mixer Grinders</title>
  <meta name="description" content="Shop 20+ mixer grinder models, genuine spare parts & kitchen accessories. Islandwide delivery from Jaffna." />
</Helmet>
```

**Shop Page:**
```jsx
<Helmet>
  <title>Shop Mixer Grinders & Kitchen Appliances | Mixie Kadai</title>
  <meta name="description" content="Browse our full range of mixer grinders, blenders, coconut scrapers, jars, spare parts & accessories. Genuine brands, islandwide delivery." />
</Helmet>
```

**Product Page** (dynamic):
```jsx
<Helmet>
  <title>{product.name} — Buy Online | Mixie Kadai</title>
  <meta name="description" content={`Buy the ${product.name} from Mixie Kadai. ${product.wattage ? `${product.wattage}W. ` : ''}Genuine product, islandwide delivery from Jaffna, Sri Lanka.`} />
  <meta property="og:title" content={product.name} />
  <meta property="og:description" content={`Buy the ${product.name} from Mixie Kadai. Rs. ${product.price?.toLocaleString()}.`} />
  {product.images?.[0]?.url && <meta property="og:image" content={product.images[0].url} />}
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.map(i => i.url),
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "LKR",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  })}</script>
</Helmet>
```

**About Page:**
```jsx
<Helmet>
  <title>About Mixie Kadai | Jaffna's Kitchen Appliance Specialists</title>
  <meta name="description" content="Mixie Kadai is Jaffna's trusted kitchen appliance store. Founded by Hashim Huzefa, we sell 20+ mixer grinder models and 50+ genuine spare parts islandwide." />
</Helmet>
```

**Contact Page:**
```jsx
<Helmet>
  <title>Contact Mixie Kadai | Visit Us in Jaffna</title>
  <meta name="description" content="Contact Mixie Kadai at 771 Jaffna-Kankesanturai Rd, Jaffna 40000. Mon–Sat 9am–7pm. Send us a WhatsApp message or visit our store." />
</Helmet>
```

---

## Phase 3 — Google Search Console & Business Profile (1 week)

### Fix 3.1 — Set Up Google Search Console

1. Go to search.google.com/search-console
2. Add property: `https://mixie-kade.vercel.app`
3. Verify via HTML file (place in `/public/`) or meta tag in `index.html`
4. Submit sitemap: `https://mixie-kade.vercel.app/sitemap.xml`
5. Monitor Index Coverage and Core Web Vitals reports

### Fix 3.2 — Create Google Business Profile

1. Go to business.google.com
2. Create/claim listing for "Mixie Kadai" at 771 Jaffna-Kankesanturai Rd
3. Add photos, hours, phone number, website URL
4. This is **the single highest impact action for local search** ("mixer grinder Jaffna" type queries)

---

## Phase 4 — Performance & Code Quality (1–2 days)

### Fix 4.1 — Add Code Splitting

**File:** `src/App.jsx`

```jsx
import { lazy, Suspense } from 'react'

const ShopPage    = lazy(() => import('./pages/ShopPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const AboutPage   = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'))

// Wrap Routes in Suspense:
<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin" /></div>}>
  <Routes>
    ...
  </Routes>
</Suspense>
```

### Fix 4.2 — Move Google Fonts to `<link>` in `index.html`

Remove the `@import url(...)` from `index.css` and use the `<link>` tag already added in Fix 1.3 above. The `<link>` in HTML loads in parallel with CSS parsing; `@import` in CSS is sequential.

---

## Phase 5 — Real Hero Image (When Available)

### Fix 5.1 — Replace Hero Placeholder

**File:** `src/components/Hero.jsx`

Replace the `<div>` placeholder with a real product photo:
```jsx
<img
  src="/hero-product.jpg"
  alt="Preethi Zodiac Mixer Grinder — Sri Lanka's most popular mixer grinder"
  width={600}
  height={750}
  loading="eager"
  fetchpriority="high"
  className="w-full h-full object-cover rounded-sm"
/>
```

Use `loading="eager"` and `fetchpriority="high"` on the hero image to ensure it's the prioritized LCP element.

---

## Phase 6 — Long-Term: SSG Migration (Optional, High Impact)

If the site grows and organic search becomes a key acquisition channel, consider migrating to a static site generator:

### Option A: Astro (Recommended)
- Builds static HTML per route at build time — no JS rendering needed by crawlers
- Drop-in React component support with `@astrojs/react`
- Vite-based build toolchain (familiar)
- Near-zero JavaScript shipped for non-interactive pages = best LCP scores possible
- Estimated migration: 3–5 days

### Option B: Next.js
- Full SSR/SSG capabilities
- More complex than Astro for a primarily static site
- Overkill unless a dynamic user-account system is added later

---

## Checklist Summary

### Phase 1 (Do Today)
- [ ] Create `public/robots.txt`
- [ ] Create `public/sitemap.xml`
- [ ] Add meta description + OG tags + Twitter Card to `index.html`
- [ ] Add LocalBusiness JSON-LD to `index.html`
- [ ] Update `vercel.json` with asset cache headers + security headers
- [ ] Fix Hero "Learn More" link from `#about` → `/about`
- [ ] Create 1200×630 OG social share image (`public/og-image.jpg`)

### Phase 2 (This Week)
- [ ] Install `react-helmet-async`
- [ ] Add per-page `<Helmet>` with unique title + meta description to all 6 pages
- [ ] Add Product schema to ProductPage via Helmet
- [ ] Fill in contact info placeholders (WhatsApp, phone, email)
- [ ] Replace placeholder reviews with real customer testimonials

### Phase 3 (This Week)
- [ ] Set up Google Search Console + submit sitemap
- [ ] Create/claim Google Business Profile

### Phase 4 (Next Sprint)
- [ ] Add code splitting with `React.lazy`
- [ ] Move Google Fonts to `<link>` tag
- [ ] Update product prices from INR to LKR in CMS

### Phase 5 (When Assets Available)
- [ ] Replace hero placeholder div with real product photo
- [ ] Create a proper OG image

### Phase 6 (Long-term, Optional)
- [ ] Evaluate Astro migration for full static HTML generation
