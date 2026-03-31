import { Link } from 'react-router-dom'

const stats = [
  { number: '20+',        label: 'Mixer Grinder Models'  },
  { number: '50+',        label: 'Genuine Spare Parts'   },
  { number: '1000+',      label: 'Happy Customers'       },
  { number: 'Islandwide', label: 'Delivery Coverage'     },
]

const reviews = [
  { text: 'Excellent quality product! The Preethi Zodiac is exactly what my family needed. Fast delivery and great packaging.', author: 'Priya R.', city: 'Colombo' },
  { text: 'Got genuine spare parts for my old Preethi. Very helpful staff and the delivery was faster than expected.', author: 'Kumaran S.', city: 'Jaffna' },
  { text: 'Been buying from Mixie Kadai for 2 years now. Always reliable, always genuine parts. Highly recommend.', author: 'Anita M.', city: 'Kandy' },
  { text: 'As a repair technician I trust Mixie Kadai for all my spare part needs. Best stock in Sri Lanka.', author: 'Rajan T.', city: 'Vavuniya' },
  { text: 'Ordered online and it was delivered in 2 days to Batticaloa. Amazing service and product quality.', author: 'Fathima N.', city: 'Batticaloa' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── 1. Page Hero ──────────────────────────────────────────── */}
      <div className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4 leading-tight">
            Sri Lanka's Home<br className="hidden md:block" /> for Mixer Grinders
          </h1>
          <p className="font-body text-white/70 text-lg max-w-xl mb-8">
            Bringing quality kitchen appliances to every Sri Lankan home since 2020.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="font-body text-sm font-medium bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full">
              1000+ Customers Served
            </span>
            <span className="font-body text-sm font-medium bg-brand-gold/20 border border-brand-gold/40 text-brand-gold px-4 py-2 rounded-full">
              Islandwide Delivery
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. About the Company ──────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="font-body text-xs font-semibold tracking-widest text-brand-gold uppercase mb-3">
              About Mixie Kadai
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy mb-6 leading-snug">
              Your Trusted Kitchen Appliance Partner
            </h2>
            <p className="font-body text-brand-muted text-base leading-relaxed mb-4">
              Mixie Kadai was founded in Jaffna with a simple goal — to make quality kitchen appliances accessible to every Sri Lankan family. What started as a small shop serving the local community has grown into an island-wide destination trusted by thousands of households.
            </p>
            <p className="font-body text-brand-muted text-base leading-relaxed mb-4">
              We stock 20+ mixer grinder models and 50+ genuine spare parts, covering everything from entry-level home blenders to professional-grade grinding machines. Every product we carry is handpicked for quality and durability.
            </p>
            <p className="font-body text-brand-muted text-base leading-relaxed">
              Whether you're a home cook, a small food business, or a repair technician sourcing genuine parts, Mixie Kadai has you covered with honest advice and professional-grade stock.
            </p>
          </div>

          {/* Shop photo placeholder */}
          <div className="relative">
            {/* Shop photo — swap with real image */}
            <div className="bg-brand-surface rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden">
              <div className="w-2/3 h-2/3 bg-brand-navy/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-gold/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
                    </svg>
                  </div>
                  <p className="font-body text-xs text-brand-navy/40">Shop photo here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. About the Owner ────────────────────────────────────── */}
      <section className="py-20 px-6 bg-brand-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait placeholder — left on desktop */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            {/* Owner portrait — swap with real image */}
            <div className="bg-brand-navy/10 rounded-2xl aspect-square w-full max-w-xs flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-navy/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#1B3045" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-body text-xs text-brand-navy/40">Owner portrait here</p>
              </div>
            </div>
          </div>

          {/* Text — right on desktop */}
          <div className="order-1 lg:order-2">
            <p className="font-body text-xs font-semibold tracking-widest text-brand-gold uppercase mb-3">
              Meet the Owner
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy mb-5">
              Hashim Huzefa
            </h2>
            <p className="font-body text-brand-muted text-base leading-relaxed mb-6">
              Based in Jaffna, Hashim has always had a passion for kitchen technology and practical home appliances. He founded Mixie Kadai to bridge a gap he saw in the local market — reliable access to quality mixer grinders and genuine spare parts, without having to travel to Colombo or order from abroad.
            </p>
            <blockquote className="border-l-4 border-brand-gold pl-5 mb-6">
              <p className="font-display italic text-xl text-brand-navy leading-relaxed">
                "Every family deserves a kitchen that works as hard as they do."
              </p>
            </blockquote>
            <p className="font-body text-brand-muted text-base leading-relaxed">
              Today Hashim personally curates every product in the store and is available to advise customers — from first-time buyers choosing a mixer grinder to experienced repair technicians sourcing specific components.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Stats Strip ────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-navy">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ number, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-semibold text-brand-gold mb-2">{number}</p>
              <p className="font-body text-sm text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Mission / Vision / Values ──────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-widest text-brand-gold uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy">
              Our Mission, Vision & Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className="bg-white border border-brand-surface p-8 rounded-xl">
              <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-5">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-navy mb-3">Mission</h3>
              <p className="font-body text-brand-muted text-sm leading-relaxed">
                To make quality kitchen appliances and genuine spare parts accessible to every Sri Lankan family and repair professional — regardless of where they live.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-brand-surface p-8 rounded-xl">
              <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-5">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-navy mb-3">Vision</h3>
              <p className="font-body text-brand-muted text-sm leading-relaxed">
                To be Sri Lanka's most trusted destination for mixer grinders and kitchen equipment — the first name people think of when their appliance needs attention.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white border border-brand-surface p-8 rounded-xl">
              <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-5">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-navy mb-3">Values</h3>
              <p className="font-body text-brand-muted text-sm leading-relaxed">
                Quality, Honesty, and Service — in every product we stock and every customer we help. We never compromise on authenticity or cut corners on support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Delivery & Warranty ────────────────────────────────── */}
      <section className="py-20 px-6 bg-brand-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-widest text-brand-gold uppercase mb-3">
              Peace of Mind
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy">
              Delivery & Warranty
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery */}
            <div className="bg-brand-navy text-white p-8 rounded-xl">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-5">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" />
                  <rect x="9" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="21" r="1" fill="white" stroke="none" />
                  <circle cx="20" cy="21" r="1" fill="white" stroke="none" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">Islandwide Delivery</h3>
              <ul className="space-y-3 font-body text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  Free delivery island-wide on orders over Rs. 5,000
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  Orders dispatched within 1–2 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  Tracked shipping to all provinces
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  Secure packaging — every order
                </li>
              </ul>
            </div>

            {/* Warranty */}
            <div className="bg-brand-gold-light border border-brand-gold p-8 rounded-xl">
              <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-5">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-navy mb-4">Warranty Coverage</h3>
              <ul className="space-y-3 font-body text-sm text-brand-muted">
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  All products carry manufacturer warranty
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  Preethi: 2-year product + 5-year motor warranty
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  Lifetime free service on select models
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✓</span>
                  100% genuine parts — no counterfeits
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Customer Reviews ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-widest text-brand-gold uppercase mb-3">
              What Customers Say
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy">
              Customer Reviews
            </h2>
            <p className="font-body text-brand-muted text-sm mt-2">
              Placeholder reviews — replace with real customer feedback
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(({ text, author, city }) => (
              <div key={author} className="bg-white border border-brand-surface p-6 rounded-xl flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-brand-muted text-sm leading-relaxed italic flex-1">"{text}"</p>
                <div>
                  <p className="font-body text-sm font-semibold text-brand-navy">{author}</p>
                  <p className="font-body text-xs text-brand-muted">{city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Photo Placeholders ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-brand-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-widest text-brand-gold uppercase mb-3">
              Our Space
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy">
              Visit Us in Jaffna
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shop photos placeholder */}
            <div className="bg-brand-navy/10 rounded-xl aspect-video flex flex-col items-center justify-center gap-3">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#1B3045" strokeWidth="1.5" opacity="0.3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
              </svg>
              <p className="font-body text-sm text-brand-navy/40 font-medium">Shop Photos</p>
              <p className="font-body text-xs text-brand-navy/30">Add shop photos here</p>
            </div>
            {/* Delivery photos placeholder */}
            <div className="bg-brand-gold-light rounded-xl aspect-video flex flex-col items-center justify-center gap-3">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" />
                <rect x="9" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-sm text-brand-muted font-medium">Delivery Photos</p>
              <p className="font-body text-xs text-brand-muted/60">Add delivery photos here</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Ready to Shop?</h2>
          <p className="font-body text-white/70 text-base mb-8">
            Browse our full range of mixer grinders, spare parts, and accessories.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="font-body text-sm font-medium bg-brand-gold hover:bg-white hover:text-brand-navy text-white px-8 py-3 transition-colors duration-200"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="font-body text-sm font-medium border border-white/30 hover:border-white text-white px-8 py-3 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
