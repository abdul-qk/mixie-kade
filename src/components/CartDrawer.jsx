import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQty, total, count } = useCart()
  const drawerRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-surface">
          <h2 className="font-display text-xl font-semibold text-brand-navy">
            Cart {count > 0 && <span className="text-brand-gold">({count})</span>}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-brand-navy hover:text-brand-gold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" className="text-brand-muted/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="font-body text-brand-muted text-sm">Your cart is empty.</p>
              <button onClick={onClose} className="font-body text-sm text-brand-navy underline">Continue shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.slug} className="flex gap-3 py-3 border-b border-brand-surface last:border-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-brand-surface flex-shrink-0 p-1" />
                ) : (
                  <div className="w-16 h-16 bg-brand-surface flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-brand-navy leading-snug truncate">{item.name}</p>
                  <p className="font-body text-sm text-brand-gold font-semibold mt-0.5">Rs. {item.price.toLocaleString()}</p>
                  {/* Qty */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => item.quantity === 1 ? removeFromCart(item.slug) : updateQty(item.slug, item.quantity - 1)}
                      className="w-7 h-7 border border-brand-surface text-brand-navy hover:border-brand-navy transition-colors text-sm font-bold flex items-center justify-center"
                    >−</button>
                    <span className="font-body text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.slug, item.quantity + 1)}
                      className="w-7 h-7 border border-brand-surface text-brand-navy hover:border-brand-navy transition-colors text-sm font-bold flex items-center justify-center"
                    >+</button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.slug)}
                  aria-label="Remove"
                  className="text-brand-muted/50 hover:text-red-500 transition-colors self-start mt-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body font-semibold text-brand-navy">Total</span>
              <span className="font-body font-bold text-xl text-brand-navy">Rs. {total.toLocaleString()}</span>
            </div>
            <p className="font-body text-xs text-brand-muted">Cash on Delivery — pay when your order arrives.</p>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-brand-gold hover:bg-brand-navy text-white font-body font-semibold text-sm py-3 text-center transition-colors duration-200"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
