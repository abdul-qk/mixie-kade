import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getProduct } from '../lib/api'
import { useCart } from '../context/CartContext'
import LexicalRenderer from '../components/LexicalRenderer'

const WHATSAPP = '94776952531'

const placeholderReviews = [
  { rating: 5, text: 'Excellent product! Works perfectly and delivery was super fast. Highly recommend Mixie Kadai.', author: 'Priya R.', city: 'Colombo' },
  { rating: 5, text: 'Got genuine spare parts for my old grinder. Very helpful and the price was fair.', author: 'Kumaran S.', city: 'Jaffna' },
  { rating: 5, text: 'Been buying from Mixie Kadai for two years now. Always reliable, always genuine products.', author: 'Anita M.', city: 'Kandy' },
  { rating: 5, text: 'As a repair technician I trust Mixie Kadai for all my spare part needs. Best stock in Sri Lanka.', author: 'Rajan T.', city: 'Vavuniya' },
]

const trustItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    label: '2–3 Day Delivery',
    sub: 'Islandwide tracked shipping',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    label: 'Genuine Warranty',
    sub: 'Manufacturer guarantee',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    label: 'Cash on Delivery',
    sub: 'Pay when it arrives',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
    ),
    label: 'Easy Returns',
    sub: '7-day return policy',
  },
]

export default function ProductPage() {
  const { slug }              = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [added,   setAdded]   = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    setLoading(true)
    setActiveImg(0)
    getProduct(slug)
      .then(p => {
        if (!p) throw new Error('Product not found')
        setProduct(p)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  function handleAddToCart() {
    addToCart({
      slug:  product.slug,
      name:  product.name,
      price: product.price,
      image: product.images?.[0]?.url || '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin" />
    </div>
  )

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="font-body text-brand-muted">{error || 'Product not found.'}</p>
      <Link to="/shop" className="font-body text-sm text-brand-navy underline">← Back to Shop</Link>
    </div>
  )

  const images = product.images?.filter(i => i.url) || []
  const relatedProducts = Array.isArray(product.relatedProducts)
    ? product.relatedProducts.filter(r => r?.slug)
    : []

  const waText = encodeURIComponent(
    `Hi Mixie Kadai! I'm interested in the ${product.name}` +
    `${product.price ? ` (Rs. ${product.price.toLocaleString()})` : ''}.` +
    ` Please confirm availability and delivery details.`
  )

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images.map(i => i.url),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'LKR',
      availability: product.inStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Mixie Kadai' },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{product.name} — Buy Online | Mixie Kadai</title>
        <meta name="description" content={`Buy the ${product.name} from Mixie Kadai.${product.wattage ? ` ${product.wattage}W.` : ''} Genuine product, islandwide delivery from Jaffna, Sri Lanka. Rs. ${product.price?.toLocaleString()}.`} />
        {images[0]?.url && <meta property="og:image" content={images[0].url} />}
        <meta property="og:title" content={`${product.name} | Mixie Kadai`} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <nav className="font-body text-sm text-brand-muted mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-brand-navy transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-navy transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brand-navy">{product.name}</span>
        </nav>

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Images */}
          <div>
            <div className="bg-brand-surface aspect-square flex items-center justify-center mb-3 overflow-hidden rounded-sm">
              {images.length > 0 ? (
                <img
                  src={images[activeImg]?.url}
                  alt={images[activeImg]?.alt || product.name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <span className="font-display text-brand-navy/30 italic text-xl">No image</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 border-2 overflow-hidden transition-colors rounded-sm ${
                      activeImg === i ? 'border-brand-gold' : 'border-transparent hover:border-brand-navy'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-brand-gold mb-2">
              {product.category || 'Mixer Grinder'}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-body font-bold text-3xl text-brand-navy">
                Rs. {product.price?.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-body text-base text-brand-muted line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="font-body text-xs font-semibold bg-brand-gold text-white px-2 py-0.5">
                  SAVE Rs. {(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {product.wattage && (
                <div className="bg-brand-surface px-4 py-2 text-center rounded-sm">
                  <p className="font-body font-bold text-brand-navy text-lg">{product.wattage}W</p>
                  <p className="font-body text-xs text-brand-muted">Motor Power</p>
                </div>
              )}
              {product.jars && (
                <div className="bg-brand-surface px-4 py-2 text-center rounded-sm">
                  <p className="font-body font-bold text-brand-navy text-lg">{product.jars}</p>
                  <p className="font-body text-xs text-brand-muted">Jars</p>
                </div>
              )}
              {product.warranty && (
                <div className="bg-brand-gold-light px-4 py-2 text-center max-w-xs rounded-sm">
                  <p className="font-body font-bold text-brand-navy text-sm">{product.warranty}</p>
                  <p className="font-body text-xs text-brand-muted">Warranty</p>
                </div>
              )}
            </div>

            {/* Features */}
            {product.features?.length > 0 && (
              <ul className="space-y-2 mb-6">
                {product.features.map(({ feature }, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-brand-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-brand-gold mt-0.5 flex-shrink-0" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Mini trust strip */}
            <div className="grid grid-cols-2 gap-3 py-5 border-t border-b border-brand-surface mb-6">
              {trustItems.map(({ icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="font-body text-xs font-semibold text-brand-navy">{label}</p>
                    <p className="font-body text-xs text-brand-muted">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* COD note */}
            <div className="bg-brand-surface border-l-4 border-brand-gold px-4 py-3 mb-6">
              <p className="font-body text-sm font-semibold text-brand-navy">Cash on Delivery only</p>
              <p className="font-body text-xs text-brand-muted mt-0.5">Pay when your order arrives. No online payment required.</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              {/* Row 1: Add to Cart + Buy Now side by side */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 font-body font-semibold text-sm tracking-wide transition-colors duration-200 ${
                    added ? 'bg-green-600 text-white' : 'bg-brand-navy hover:bg-brand-gold text-white'
                  }`}
                >
                  {added ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Added
                    </span>
                  ) : 'Add to Cart'}
                </button>

                <Link
                  to="/checkout"
                  className="flex-1 text-center py-4 border border-brand-navy text-brand-navy font-body font-semibold text-sm hover:bg-brand-navy hover:text-white transition-colors duration-200"
                >
                  Buy Now
                </Link>
              </div>

              {/* Row 2: WhatsApp full width */}
              <a
                href={`https://wa.me/${WHATSAPP}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-4 font-body font-semibold text-sm text-white transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Buy on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Extended Description ───────────────────────────────────── */}
        {product.description && (
          <section className="border-t border-brand-surface pt-12 pb-12">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-brand-gold mb-3">Product Details</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-brand-navy mb-6">
              About This Product
            </h2>
            <div className="max-w-3xl">
              <LexicalRenderer content={product.description} />
            </div>
          </section>
        )}

        {/* ── Reviews ───────────────────────────────────────────────── */}
        <section className="border-t border-brand-surface pt-12 pb-12">
          <p className="font-body text-xs font-semibold tracking-widest uppercase text-brand-gold mb-3">Customer Reviews</p>
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-brand-navy">
              What Our Customers Say
            </h2>
            <div className="flex items-center gap-1 text-brand-gold text-sm">
              {'★★★★★'}
              <span className="font-body text-brand-muted text-xs ml-1">5.0 · {placeholderReviews.length} reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {placeholderReviews.map(({ rating, text, author, city }, i) => (
              <div key={i} className="bg-brand-surface p-6 rounded-sm border border-brand-surface">
                <p className="text-brand-gold text-sm mb-3">{'★'.repeat(rating)}</p>
                <p className="font-body text-sm text-brand-muted italic leading-relaxed mb-4">"{text}"</p>
                <p className="font-body text-sm font-semibold text-brand-navy">{author}</p>
                <p className="font-body text-xs text-brand-muted">{city}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Products ──────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-brand-surface pt-12 pb-4">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-brand-gold mb-3">You Might Also Like</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-brand-navy mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(related => {
                const relImg = related.images?.[0]?.url
                return (
                  <Link
                    key={related.slug}
                    to={`/shop/${related.slug}`}
                    className="group border border-brand-surface rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="bg-brand-surface aspect-square flex items-center justify-center overflow-hidden">
                      {relImg ? (
                        <img
                          src={relImg}
                          alt={related.name}
                          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="font-display text-brand-navy/20 italic text-sm">No image</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-body text-xs text-brand-muted mb-1">{related.category || 'Mixer Grinder'}</p>
                      <h3 className="font-display text-lg font-semibold text-brand-navy leading-tight mb-2 group-hover:text-brand-gold transition-colors duration-200">
                        {related.name || related.title}
                      </h3>
                      {(related.price ?? related.priceInUSD) && (
                        <p className="font-body font-bold text-brand-navy">
                          Rs. {(related.price ?? related.priceInUSD)?.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
