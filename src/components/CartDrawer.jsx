import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQty, total, count } = useCart()
  const drawerRef  = useRef(null)
  const closeRef   = useRef(null)

  // Close on Escape + trap focus into drawer
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
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
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-surface">
          <h2 className="font-display text-xl font-semibold text-brand-navy">
            Cart {count > 0 && <span className="text-brand-gold">({count})</span>}
          </h2>
          {/* Close — 44×44 touch target */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close cart"
            className="flex items-center justify-center w-11 h-11 -mr-2.5 text-brand-navy hover:text-brand-gold transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" className="text-brand-muted/40" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="font-body text-brand-muted text-sm">Your cart is empty.</p>
              <button onClick={onClose} className="font-body text-sm text-brand-navy underline hover:text-brand-gold transition-colors cursor-pointer">
                Continue shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.slug} className="flex gap-3 py-3 border-b border-brand-surface last:border-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-brand-surface flex-shrink-0 p-1 rounded-sm" />
                ) : (
                  <div className="w-16 h-16 bg-brand-surface flex-shrink-0 rounded-sm" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-brand-navy leading-snug truncate">{item.name}</p>
                  <p className="font-body text-sm text-brand-gold font-semibold mt-0.5">Rs. {item.price.toLocaleString()}</p>

                  {/* Qty — 44px tall touch targets */}
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={() => item.quantity === 1 ? removeFromCart(item.slug) : updateQty(item.slug, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-brand-surface text-brand-navy hover:border-brand-navy hover:bg-brand-surface transition-colors text-base font-bold cursor-pointer"
                    >−</button>
                    <span className="font-body text-sm w-8 text-center tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.slug, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-brand-surface text-brand-navy hover:border-brand-navy hover:bg-brand-surface transition-colors text-base font-bold cursor-pointer"
                    >+</button>
                  </div>
                </div>

                {/* Remove — 44×44 touch target */}
                <button
                  onClick={() => removeFromCart(item.slug)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="flex items-start justify-center min-w-[44px] pt-1 text-brand-muted hover:text-red-500 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
              className="block w-full bg-brand-gold hover:bg-brand-navy text-white font-body font-semibold text-sm py-4 text-center transition-colors duration-200 cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
