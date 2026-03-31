import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getProduct } from '../lib/api'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { slug }           = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [added,   setAdded]   = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    setLoading(true)
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

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.filter(i => i.url).map(i => i.url),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'LKR',
      availability: product.inStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Mixie Kadai' },
    },
    ...(product.wattage && { description: `${product.wattage}W mixer grinder. ${product.warranty || ''}`.trim() }),
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{product.name} — Buy Online | Mixie Kadai</title>
        <meta name="description" content={`Buy the ${product.name} from Mixie Kadai.${product.wattage ? ` ${product.wattage}W.` : ''} Genuine product, islandwide delivery from Jaffna, Sri Lanka. Rs. ${product.price?.toLocaleString()}.`} />
        {product.images?.[0]?.url && <meta property="og:image" content={product.images[0].url} />}
        <meta property="og:title" content={`${product.name} | Mixie Kadai`} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <nav className="font-body text-sm text-brand-muted mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-brand-navy transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-navy transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brand-navy">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-brand-surface aspect-square flex items-center justify-center mb-3 overflow-hidden">
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
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 border-2 overflow-hidden transition-colors ${
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
              Mixer Grinder
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-brand-navy leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-body font-bold text-3xl text-brand-navy">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-body text-base text-brand-muted line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {product.wattage && (
                <div className="bg-brand-surface px-4 py-2 text-center">
                  <p className="font-body font-bold text-brand-navy text-lg">{product.wattage}W</p>
                  <p className="font-body text-xs text-brand-muted">Motor Power</p>
                </div>
              )}
              {product.jars && (
                <div className="bg-brand-surface px-4 py-2 text-center">
                  <p className="font-body font-bold text-brand-navy text-lg">{product.jars}</p>
                  <p className="font-body text-xs text-brand-muted">Jars</p>
                </div>
              )}
              {product.warranty && (
                <div className="bg-brand-gold-light px-4 py-2 text-center max-w-xs">
                  <p className="font-body font-bold text-brand-navy text-sm">{product.warranty}</p>
                  <p className="font-body text-xs text-brand-muted">Warranty</p>
                </div>
              )}
            </div>

            {/* Features */}
            {product.features?.length > 0 && (
              <ul className="space-y-2 mb-8">
                {product.features.map(({ feature }, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-brand-muted">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* COD note */}
            <div className="bg-brand-surface border-l-4 border-brand-gold px-4 py-3 mb-6">
              <p className="font-body text-sm font-semibold text-brand-navy">Cash on Delivery only</p>
              <p className="font-body text-xs text-brand-muted mt-0.5">Pay when your order arrives. No online payment required.</p>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 font-body font-semibold text-sm tracking-wide transition-colors duration-200 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-navy hover:bg-brand-gold text-white'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link
              to="/checkout"
              className="block w-full text-center mt-3 py-4 border border-brand-navy text-brand-navy font-body font-semibold text-sm hover:bg-brand-navy hover:text-white transition-colors duration-200"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
