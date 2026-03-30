import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  const img = product.images?.[0]?.url

  return (
    <div className="group bg-white border border-brand-surface hover:shadow-lg transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link to={`/shop/${product.slug}`} className="block overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={product.images[0].alt || product.name}
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
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold text-brand-navy leading-snug hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Specs badges */}
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          {product.wattage && (
            <span className="text-xs font-body font-medium bg-brand-surface text-brand-navy px-2 py-0.5">
              {product.wattage}W
            </span>
          )}
          {product.jars && (
            <span className="text-xs font-body font-medium bg-brand-surface text-brand-navy px-2 py-0.5">
              {product.jars} Jars
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2">
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
          onClick={() => addToCart({
            slug:  product.slug,
            name:  product.name,
            price: product.price,
            image: img || '',
          })}
          className="mt-3 w-full bg-brand-navy hover:bg-brand-gold text-white font-body font-semibold text-sm py-2.5 transition-colors duration-200"
        >
          Add to Cart
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
              className={`font-body text-sm font-medium px-4 py-2 border transition-colors duration-150 ${
                activeTab === cat.value
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-brand-navy border-brand-surface hover:border-brand-navy'
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
