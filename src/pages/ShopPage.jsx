import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getProducts } from '../lib/api'
import { useCart } from '../context/CartContext'

const CATEGORIES = [
  { value: '',                 label: 'All Products'             },
  { value: 'mixer-grinders',  label: 'Mixer Grinders'           },
  { value: 'blenders-juicers',label: 'Blenders & Juicers'       },
  { value: 'coconut-scrapers',label: 'Coconut Scrapers'         },
  { value: 'jars',            label: 'Jars'                     },
  { value: 'spare-parts',     label: 'Spare Parts'              },
  { value: 'accessories',     label: 'Accessories'              },
]

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const img = product.images?.[0]?.url

  function handleAddToCart() {
    addToCart({
      id:    product.id,
      slug:  product.slug,
      name:  product.name,
      price: product.price,
      image: img || '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="group bg-white border border-brand-surface hover:border-brand-navy/20 hover:shadow-lg transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link to={`/shop/${product.slug}`} className="block overflow-hidden bg-brand-surface">
        {img ? (
          <img
            src={img}
            alt={product.images[0].alt || product.name}
            loading="lazy"
            className="w-full aspect-square object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full aspect-square bg-brand-surface flex items-center justify-center">
            <span className="font-display text-brand-navy/30 text-lg italic">No image</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/shop/${product.slug}`} className="group/title">
          <h3 className="font-display text-lg font-semibold text-brand-navy leading-snug group-hover/title:text-brand-gold transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Specs badges */}
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          {product.wattage && (
            <span className="text-xs font-body font-medium bg-brand-surface text-brand-navy px-2 py-1">
              {product.wattage}W
            </span>
          )}
          {product.jars && (
            <span className="text-xs font-body font-medium bg-brand-surface text-brand-navy px-2 py-1">
              {product.jars} Jars
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 mb-3">
          <span className="font-body font-bold text-xl text-brand-navy">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm text-brand-muted line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={added}
          aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          className={`w-full min-h-[44px] font-body font-semibold text-sm transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-brand-navy hover:bg-brand-gold text-white'
          }`}
        >
          {added ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Added
            </>
          ) : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [products,  setProducts]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    getProducts({ category: activeTab || undefined })
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [activeTab])

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Shop Mixer Grinders &amp; Kitchen Appliances | Mixie Kadai</title>
        <meta name="description" content="Browse 20+ mixer grinder models, blenders, coconut scrapers, jars, genuine spare parts & accessories. Free islandwide delivery over Rs. 5,000." />
      </Helmet>

      {/* Page header */}
      <div className="bg-brand-navy text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-brand-gold text-xs font-semibold tracking-widest uppercase mb-2">
            Browse Our Range
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold">Shop</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              aria-pressed={activeTab === cat.value}
              className={`font-body text-sm font-medium px-4 min-h-[44px] border transition-colors duration-150 cursor-pointer ${
                activeTab === cat.value
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-brand-navy border-brand-surface hover:border-brand-navy hover:bg-brand-surface'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-brand-surface animate-pulse aspect-square" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="font-body text-brand-muted">Could not load products. Make sure the CMS is running.</p>
            <p className="font-body text-xs text-brand-muted mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-brand-muted">No products found in this category.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="animate-fade grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
