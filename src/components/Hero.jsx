import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="min-h-screen bg-brand-cream flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

        {/* Text — 60% on desktop */}
        <div className="w-full lg:w-3/5 animate-fade-in">
          <p className="font-body text-sm font-semibold tracking-widest text-brand-gold uppercase mb-4">
            Mixer Grinders &amp; Kitchen Appliances
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy leading-tight mb-6">
            Sri Lanka's Home for<br />
            <span className="italic text-brand-gold">Mixer Grinders</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-brand-muted leading-relaxed mb-10 max-w-lg animate-fade-in-delay">
            Shop 20+ grinder models, genuine spare parts, and kitchen accessories — all in one place.
          </p>

          <div className="flex flex-wrap items-center gap-4 animate-fade-in-delay-2">
            <Link
              to="/shop"
              className="inline-block bg-brand-gold hover:bg-brand-navy text-white font-body font-semibold text-sm tracking-wide px-8 py-4 transition-colors duration-300"
            >
              Shop Now
            </Link>
            <a
              href="#about"
              className="inline-block font-body font-medium text-sm text-brand-navy underline underline-offset-4 decoration-brand-gold hover:text-brand-gold transition-colors duration-200"
            >
              Learn More →
            </a>
          </div>
        </div>

        {/* Image placeholder — 40% on desktop */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end animate-fade-in-delay">
          <div className="relative w-full max-w-sm lg:max-w-none aspect-square lg:aspect-[4/5]">
            {/* Main colour block */}
            <div className="w-full h-full bg-brand-navy rounded-sm overflow-hidden flex items-end justify-center">
              {/* Decorative inner shape — abstract appliance silhouette */}
              <div className="w-3/4 h-4/5 bg-brand-navy-light opacity-60 rounded-t-full" />
            </div>
            {/* Accent badge */}
            <div className="absolute -bottom-4 -left-4 bg-brand-gold text-white font-body font-semibold text-xs px-5 py-3 shadow-lg">
              20+ Models In Stock
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
