import { useLocation, useParams, Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  const { id }   = useParams()
  const location = useLocation()
  const order    = location.state?.order

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6">
      <div className="animate-fade-in max-w-lg w-full bg-white border border-brand-surface p-8 text-center">

        {/* Success icon */}
        <div className="animate-fade-in-delay w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-semibold text-brand-navy mb-2">Order Placed!</h1>
        <p className="font-body text-brand-muted text-sm mb-6">
          Thank you for your order. We'll confirm it shortly and contact you on the number you provided.
        </p>

        {/* Order number */}
        {order?.orderNumber && (
          <div className="bg-brand-surface px-6 py-4 mb-6">
            <p className="font-body text-xs text-brand-muted uppercase tracking-wider mb-1">Order Number</p>
            <p className="font-display text-2xl font-semibold text-brand-navy">{order.orderNumber}</p>
          </div>
        )}

        {/* Order items */}
        {order?.items?.length > 0 && (
          <div className="text-left mb-6 space-y-2">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">Items Ordered</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between font-body text-sm">
                <span className="text-brand-navy">{item.productName} ×{item.quantity}</span>
                <span className="text-brand-muted">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-brand-surface pt-2 flex justify-between font-body font-semibold text-sm text-brand-navy mt-2">
              <span>Total</span>
              <span>Rs. {order.total?.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* COD reminder */}
        <div className="bg-brand-gold-light border-l-4 border-brand-gold px-4 py-3 text-left mb-6">
          <p className="font-body text-sm font-semibold text-brand-navy">Cash on Delivery</p>
          <p className="font-body text-xs text-brand-muted mt-0.5">
            Please have the exact amount ready when your delivery arrives.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-block w-full bg-brand-navy hover:bg-brand-gold text-white font-body font-semibold text-sm py-3 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
