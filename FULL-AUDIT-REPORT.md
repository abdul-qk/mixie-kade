# SEO Audit Report — Mixie Kadai
**URL:** https://mixie-kade.vercel.app
**Date:** 2026-03-31
**Auditor:** Claude SEO Skill (LLM-first analysis + HTTP evidence)

---

## Executive Summary

| Category | Score | Rating |
|---|---|---|
| Technical SEO | 28/100 | 🔴 Critical |
| On-Page SEO | 22/100 | 🔴 Critical |
| Structured Data / Schema | 0/100 | 🔴 Critical |
| Content Quality | 55/100 | ⚠️ Needs Improvement |
| Performance | 60/100 | ⚠️ Needs Improvement |
| Image Optimization | 30/100 | 🔴 Critical |
| AI Search Readiness | 5/100 | 🔴 Critical |
| **Overall** | **29/100** | **🔴 Poor** |

**The site is not currently indexable in a meaningful way.** The core problem is a pure client-side React SPA with no server-side rendering — search engines receive an empty HTML shell (`<div id="root"></div>`) and must execute JavaScript to see any content. Combined with missing meta tags, no structured data, and no sitemap, the site has near-zero organic visibility.

---

## Environment Notes

- PageSpeed Insights API quota was exhausted (429) — CWV scores estimated from HTTP timing evidence and code analysis
- All other checks conducted via direct HTTP inspection and source code review

---

## Section 1 — Technical SEO

### 1.1 Rendering Architecture

🔴 **Critical: Pure Client-Side Rendering (CSR)**

- **Finding:** The server delivers `<div id="root"></div>` — the entire page is rendered by React in the browser. No SSR, no SSG.
- **Evidence:** `curl https://mixie-kade.vercel.app` returns a 642-byte HTML shell with no visible text content, headings, or links.
- **Impact:** Google indexes pages in two waves — HTML is crawled immediately, but JS-rendered content is queued for a "second wave" that can take days to weeks. Bing, social media bots (Facebook, WhatsApp, LinkedIn), and AI crawlers (Claude, ChatGPT, Perplexity) typically **do not execute JavaScript at all**, meaning the site appears completely blank to them. This renders OG previews, AI search citations, and Bing rankings effectively impossible without SSR/SSG.
- **Fix:** Add `react-helmet-async` for dynamic `<head>` tags as an immediate stop-gap. For full indexability, migrate to a framework with SSG/SSR (Astro, Next.js, or Vite SSG). For a brochure-style e-commerce site this size, **Astro is the ideal solution** — generates static HTML per route at build time, zero runtime JS for non-interactive pages.

---

### 1.2 Meta Description

🔴 **Critical: Missing**

- **Finding:** No `<meta name="description">` tag anywhere in the HTML — not in `index.html` and not injected dynamically per page.
- **Evidence:** `cat index.html` shows no meta description. All pages share the same bare `index.html` template.
- **Impact:** Google will auto-generate a snippet from page content. Auto-generated snippets are typically lower quality and reduce click-through rate. Every competitor with a written meta description has an advantage in search results.
- **Fix:** Add per-page meta descriptions via `react-helmet-async` (short-term), or bake them into static HTML per route (ideal). Each page needs a unique 140–160 character description.

---

### 1.3 robots.txt

🔴 **Critical: Missing**

- **Finding:** `https://mixie-kade.vercel.app/robots.txt` returns the SPA's `index.html` (642 bytes of HTML), not a valid robots.txt.
- **Evidence:** The `vercel.json` catch-all rewrite (`"source": "/(.*)"`) intercepts `/robots.txt` and serves `index.html`. No `robots.txt` file exists in `/public/`.
- **Impact:** Search engines receive an invalid robots.txt (HTML response). Googlebot logs a robots.txt fetch error. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) have no directives at all.
- **Fix:** Create `public/robots.txt` with appropriate directives. Vite copies files from `/public/` to the build root, bypassing the SPA router.

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://mixie-kade.vercel.app/sitemap.xml
```

---

### 1.4 sitemap.xml

🔴 **Critical: Missing**

- **Finding:** No `sitemap.xml` exists. The catch-all rewrite serves `index.html` at `/sitemap.xml`.
- **Impact:** Search engines must discover pages by crawling links. Dynamic product pages (`/shop/:slug`) will not be discovered without a sitemap, since they're not linked from any static HTML.
- **Fix:** Generate a static `public/sitemap.xml` for all current pages. For product pages, automate sitemap generation at build time using the CMS API.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://mixie-kade.vercel.app/</loc><priority>1.0</priority></url>
  <url><loc>https://mixie-kade.vercel.app/shop</loc><priority>0.9</priority></url>
  <url><loc>https://mixie-kade.vercel.app/about</loc><priority>0.7</priority></url>
  <url><loc>https://mixie-kade.vercel.app/contact</loc><priority>0.7</priority></url>
  <!-- Dynamic product URLs added at build time -->
</urlset>
```

---

### 1.5 HTTPS & Security Headers

✅ **HTTPS enforced** — HTTP returns 308 redirect to HTTPS.
✅ **HSTS** — `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — excellent.
⚠️ **Missing security headers** — No `X-Frame-Options`, `X-Content-Type-Options`, or `Content-Security-Policy` detected.

---

### 1.6 Canonical Tags

🔴 **Missing** — No `<link rel="canonical">` on any page. With SPA routing, duplicate content risk is low, but canonical tags are still best practice and required for product pages that may be reachable via multiple paths.

---

### 1.7 Asset Caching

⚠️ **Warning: Suboptimal asset caching**

- **Finding:** JS/CSS assets have `Cache-Control: public, max-age=0, must-revalidate` (Vercel default for static assets).
- **Impact:** Assets with content hashes (e.g. `index-CaRdl8ib.js`) should use `max-age=31536000, immutable`. The current config forces revalidation on every visit, adding unnecessary latency for repeat visitors.
- **Fix:** Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

---

## Section 2 — On-Page SEO

### 2.1 Title Tags

⚠️ **Warning: Single static title for all pages**

- **Finding:** Every URL (`/`, `/shop`, `/about`, `/contact`, `/shop/:slug`) serves the same `<title>Mixie Kadai — Sri Lanka's Home for Mixer Grinders</title>` from `index.html`.
- **Evidence:** Source code inspection — title is set only in `index.html`, no dynamic `document.title` assignment found in any component.
- **Impact:** Google sees the same title for all pages, making it impossible to rank individual pages for distinct keywords. A product page for "Preethi Zodiac Mixer Grinder" should have a unique title.
- **Fix:** Use `react-helmet-async` to set per-page titles:
  - Homepage: `Mixie Kadai — Sri Lanka's Home for Mixer Grinders`
  - Shop: `Shop Mixer Grinders & Kitchen Appliances | Mixie Kadai`
  - Product: `{product.name} — Buy Online | Mixie Kadai`
  - About: `About Mixie Kadai | Jaffna's Kitchen Appliance Store`
  - Contact: `Contact Mixie Kadai | Jaffna, Sri Lanka`

---

### 2.2 H1 Tag

✅ **Present** — Hero component renders `<h1>Sri Lanka's Home for Mixer Grinders</h1>`.
⚠️ **But only after JS executes** — The H1 is invisible in the raw HTML response.

---

### 2.3 Open Graph / Social Meta Tags

🔴 **Critical: Missing entirely**

- **Finding:** No `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, or `og:site_name` tags.
- **Impact:** When customers share the site on Facebook, WhatsApp, or Instagram stories, no preview card appears — just a bare URL. This is a direct conversion loss for a Jaffna-based business where WhatsApp sharing is a primary word-of-mouth channel.
- **Fix:** Add to `index.html` as base OG tags, then override per-page with `react-helmet-async`:
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Mixie Kadai" />
<meta property="og:title" content="Mixie Kadai — Sri Lanka's Home for Mixer Grinders" />
<meta property="og:description" content="Shop 20+ mixer grinder models, genuine spare parts & accessories. Islandwide delivery from Jaffna, Sri Lanka." />
<meta property="og:image" content="https://mixie-kade.vercel.app/og-image.jpg" />
<meta property="og:url" content="https://mixie-kade.vercel.app" />
```

---

### 2.4 Twitter Card Tags

🔴 **Missing** — No `twitter:card` or related tags.
**Fix:** Add `<meta name="twitter:card" content="summary_large_image" />` alongside OG tags.

---

### 2.5 Image Alt Text

⚠️ **Partial** — Product cards use `product.images[0].alt || product.name` (good fallback). Hero section uses a CSS placeholder `<div>` with no `<img>` at all.

- **Impact:** No hero image means no visual search indexing of the most prominent page section. Alt text on product images is correctly implemented.

---

### 2.6 Internal Linking

⚠️ **Warning: Shallow link structure**

- The `<a href="#about">` on the Hero "Learn More" button is a fragment link, not a link to `/about` — missed internal linking opportunity.
- No breadcrumbs on Shop or Product pages (breadcrumbs are present in ProductPage.jsx but only rendered after JS).
- Category filter on Shop page uses `<button>` (not `<a>` tags), so category URLs are not crawlable.

---

## Section 3 — Structured Data / Schema

🔴 **Critical: Zero structured data**

No JSON-LD found on any page. The following schemas are **critical missing**:

### 3.1 LocalBusiness Schema (Homepage / Contact Page)

**Impact:** Without this, Google has no machine-readable information about the physical store location, hours, or contact details. This is the primary signal for local search ("mixer grinder shop near Jaffna", "mixer grinder Jaffna").

```json
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
  "geo": { "@type": "GeoCoordinates", "latitude": 9.66, "longitude": 80.01 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "16:00" }
  ],
  "image": "https://mixie-kade.vercel.app/og-image.jpg",
  "sameAs": [
    "https://www.instagram.com/mixie_kadai",
    "https://www.facebook.com/share/18cTEreLXk/"
  ]
}
```

### 3.2 Product Schema (Product Pages)

Each `/shop/:slug` page needs a `Product` schema with `name`, `description`, `image`, `offers` (price, currency, availability).

### 3.3 WebSite Schema with SearchAction (Homepage)

Enables the Google sitelinks searchbox in search results.

### 3.4 Organization Schema (About Page)

Establishes the brand entity in Google's Knowledge Graph.

### 3.5 BreadcrumbList Schema (Product Pages)

Breadcrumbs appear in the ProductPage.jsx but lack JSON-LD markup. Breadcrumbs in SERP results improve CTR significantly.

---

## Section 4 — Content Quality

### 4.1 Content Depth

✅ **About Page** — Strong E-E-A-T signals: founder story (Hashim Huzefa), physical location, mission/vision/values, 5 customer reviews (placeholder — needs real ones).
✅ **Contact Page** — Physical address, opening hours, embedded Google Map.
⚠️ **Homepage** — Hero text is thin. Category grid labels are short (e.g. "Mixer Grinders" with no descriptive text). The AboutSnippet is brief.
⚠️ **Shop Page** — Functional but no category description text. Google prefers category pages with introductory text explaining the product selection.
⚠️ **Product Pages** — Content depends entirely on CMS data. Ensure each product has a description field populated.

### 4.2 Keyword Targeting

The site targets relevant keywords but they are only visible after JavaScript renders:
- "mixer grinders Sri Lanka" ✅ (H1, hero subtext)
- "spare parts" ✅ (category navigation)
- "Jaffna" ⚠️ (present in footer address, not in prominent headings)
- "Preethi" (brand) — not visible in static HTML, only in product data

### 4.3 E-E-A-T Signals

- **Experience:** ✅ Owner bio section present (AboutPage)
- **Expertise:** ✅ Product range breadth demonstrated
- **Authoritativeness:** ⚠️ Placeholder reviews need real customer testimonials
- **Trust:** ⚠️ Phone and email are still placeholders (`+94 XX XXX XXXX`, `hello@mixiekadai.lk`)

---

## Section 5 — Performance

### 5.1 TTFB (Time to First Byte)

✅ **Fast** — ~160–480ms TTFB observed. Vercel edge network is serving from Singapore (sin1), which is appropriate for Sri Lanka.

### 5.2 JavaScript Bundle

⚠️ **No code splitting** — The entire application ships as a single `index-CaRdl8ib.js` bundle. This delays Time to Interactive (TTI) as the browser must parse and execute the full bundle before any content renders.

**Fix:** Vite supports automatic code splitting via dynamic imports:
```js
// In App.jsx — use lazy loading for heavy pages
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ShopPage  = lazy(() => import('./pages/ShopPage'))
```

### 5.3 Google Fonts Loading

⚠️ **Potential render-blocking** — Google Fonts is loaded via CSS `@import` in `index.css`. While `rel="preconnect"` is set, `@import` in CSS is render-blocking.

**Fix:** Move font loading to `<link rel="stylesheet">` with `display=swap` in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

### 5.4 Largest Contentful Paint (Estimated)

⚠️ **Estimated: Poor on mobile** — The hero section (LCP candidate) is a CSS `<div>` placeholder with no real image. The LCP element is likely the H1 text, but it only renders after the JS bundle executes (~400–600ms parse + render). Real LCP is likely 2–4 seconds on mobile, above the "good" threshold of 2.5s.

### 5.5 Cumulative Layout Shift (Estimated)

✅ **Estimated: Good** — Tailwind's utility-first approach and fixed `aspect-ratio` on product card images should prevent significant layout shift. The `h-20` navbar is fixed height.

---

## Section 6 — Image Optimization

### 6.1 Hero Image

🔴 **Critical: No hero image** — The hero section is a styled `<div>` placeholder. This is the largest visual element on the page and the most likely LCP candidate.

- **Impact:** No hero image means no visual content for Google Image Search, reduced visual appeal reducing CTR, and slower perceived performance (no meaningful first paint content).
- **Fix:** Replace the placeholder div with a real product image (`<img>` with `width`, `height`, `loading="eager"`, and descriptive `alt`).

### 6.2 Product Images

⚠️ **Unknown** — Product images are loaded from the Payload CMS (Turso + file storage). Cannot verify dimensions, format (WebP vs JPEG), or compression without live product data.

**Recommendation:** Ensure Payload CMS serves images as WebP with appropriate dimensions. Consider a Vercel `/_image` transform endpoint.

### 6.3 Logo

⚠️ **JPEG logo** — `/logo.jpeg` is served as JPEG. Convert to WebP or SVG for better quality at small sizes (the logo is rendered at `h-15` ≈ 60px).

---

## Section 7 — AI Search Readiness (GEO)

🔴 **Critical: Score 5/100**

- ❌ No `llms.txt` file — AI search engines (ChatGPT, Claude, Perplexity) use this to understand site purpose
- ❌ No structured data for AI entity recognition
- ❌ No SSR — AI crawlers cannot see any content without JavaScript execution
- ❌ No author/entity page linked from content
- ✅ Physical address present on Contact page (helps local entity recognition)

---

## Section 8 — Local SEO

⚠️ **Not established**

This is a physical store in Jaffna with islandwide delivery — local SEO is critical.

- ❌ No Google Business Profile mentioned or linked
- ❌ No LocalBusiness schema
- ❌ No NAP (Name, Address, Phone) consistency check possible (phone is placeholder)
- ✅ Address present on Contact page
- ✅ Google Maps embed on Contact page

---

## Summary Table

| # | Issue | Severity | Category |
|---|---|---|---|
| 1 | Pure CSR — no SSR/SSG | 🔴 Critical | Technical |
| 2 | No meta description | 🔴 Critical | On-Page |
| 3 | No robots.txt | 🔴 Critical | Technical |
| 4 | No sitemap.xml | 🔴 Critical | Technical |
| 5 | No Open Graph tags | 🔴 Critical | On-Page |
| 6 | No JSON-LD structured data | 🔴 Critical | Schema |
| 7 | Same title tag on all pages | ⚠️ Warning | On-Page |
| 8 | No Twitter Card tags | ⚠️ Warning | On-Page |
| 9 | No canonical tags | ⚠️ Warning | Technical |
| 10 | No code splitting | ⚠️ Warning | Performance |
| 11 | Asset caching suboptimal | ⚠️ Warning | Performance |
| 12 | Google Fonts @import in CSS | ⚠️ Warning | Performance |
| 13 | Hero placeholder div (no real image) | 🔴 Critical | Images |
| 14 | No llms.txt | ⚠️ Warning | AI/GEO |
| 15 | Contact info placeholders (phone, email, WhatsApp) | ⚠️ Warning | Content/Trust |
| 16 | Placeholder customer reviews | ⚠️ Warning | E-E-A-T |
| 17 | No Google Business Profile | ⚠️ Warning | Local SEO |
| 18 | Logo served as JPEG | ℹ️ Info | Images |
| 19 | "Learn More" links to `#about` not `/about` | ℹ️ Info | On-Page |
| 20 | Category filter uses buttons not links | ℹ️ Info | Technical |
