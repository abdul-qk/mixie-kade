import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { placeOrder } from '../lib/api'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    customerName: '',
    phone:        '',
    address:      '',
    city:         '',
    notes:        '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState(null)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-body text-brand-muted">Your cart is empty.</p>
        <Link to="/shop" className="font-body text-sm text-brand-navy underline">Browse products</Link>
      </div>
    )
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const orderData = {
        ...form,
        items: items.map(i => ({
          productName: i.name,
          productSlug: i.slug,
          quantity:    i.quantity,
          price:       i.price,
        })),
        total,
      }
      const result = await placeOrder(orderData)
      clearCart()
      navigate(`/order/${result.doc?.id || result.id}`, {
        state: { order: result.doc || result },
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
        <h1 className="font-display text-4xl font-semibold text-brand-navy mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <h2 className="font-display text-xl font-semibold text-brand-navy">Delivery Details</h2>

            {[
              { name: 'customerName', label: 'Full Name',        type: 'text',     required: true,  placeholder: 'Your full name' },
              { name: 'phone',        label: 'Phone Number',     type: 'tel',      required: true,  placeholder: '07X XXX XXXX' },
              { name: 'city',         label: 'City',             type: 'text',     required: false, placeholder: 'e.g. Colombo' },
            ].map(({ name, label, type, required, placeholder }) => (
              <div key={name}>
                <label className="block font-body text-sm font-medium text-brand-navy mb-1">
                  {label}{required && <span className="text-brand-gold ml-0.5">*</span>}
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  required={required}
                  placeholder={placeholder}
                  className="w-full border border-brand-surface focus:border-brand-navy outline-none px-4 py-2.5 font-body text-sm text-brand-navy bg-white transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block font-body text-sm font-medium text-brand-navy mb-1">
                Delivery Address <span className="text-brand-gold">*</span>
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                placeholder="House no, street, area..."
                className="w-full border border-brand-surface focus:border-brand-navy outline-none px-4 py-2.5 font-body text-sm text-brand-navy bg-white transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-brand-navy mb-1">
                Order Notes <span className="font-normal text-brand-muted">(optional)</span>
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Any special instructions?"
                className="w-full border border-brand-surface focus:border-brand-navy outline-none px-4 py-2.5 font-body text-sm text-brand-navy bg-white transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3">
                <p className="font-body text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-brand-gold-light border-l-4 border-brand-gold px-4 py-3">
              <p className="font-body text-sm font-semibold text-brand-navy">Cash on Delivery</p>
              <p className="font-body text-xs text-brand-muted mt-0.5">
                No online payment needed. Pay Rs. {total.toLocaleString()} when your order arrives.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-navy hover:bg-brand-gold text-white font-body font-semibold text-sm py-4 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-brand-surface p-6 sticky top-20">
              <h2 className="font-display text-xl font-semibold text-brand-navy mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.slug} className="flex justify-between gap-2">
                    <span className="font-body text-sm text-brand-navy leading-snug">
                      {item.name}
                      {item.quantity > 1 && <span className="text-brand-muted"> ×{item.quantity}</span>}
                    </span>
                    <span className="font-body text-sm font-semibold text-brand-navy whitespace-nowrap">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-surface pt-4 flex justify-between">
                <span className="font-body font-semibold text-brand-navy">Total</span>
                <span className="font-body font-bold text-xl text-brand-navy">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
