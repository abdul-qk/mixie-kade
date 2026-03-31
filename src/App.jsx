/*
 * MIXIE KADAI — Homepage
 * Client: Hashim Huzefa
 *
 * ── DESIGN DECISIONS ──────────────────────────────────────────────────────
 *
 * COLOUR PALETTE
 *   Client supplied: Navy Blue #1B3045
 *   Vibe: "Clean and minimal, Elegant and luxurious, Professional and trustworthy"
 *   → Derived gold accent (#C9A84C) for elegance; off-white cream (#FDFCFB)
 *     and light navy tint (#F4F6F8) for breathing room.
 *
 *   brand-navy       #1B3045  – primary, headings, navbar, footer
 *   brand-navy-dark  #0f1e2e  – deep shadows
 *   brand-navy-light #2a4a68  – mid-tone fills
 *   brand-gold       #C9A84C  – CTA buttons, accents, hover states
 *   brand-gold-light #F5EDD6  – card tints
 *   brand-surface    #F4F6F8  – USP strip, about section
 *   brand-cream      #FDFCFB  – hero background
 *   brand-muted      #4B5768  – body text, subheadings
 *
 * TYPOGRAPHY
 *   Display: Cormorant Garamond — elegant, serif, luxury feel
 *   Body:    DM Sans — clean, minimal, highly legible
 *
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CartProvider }   from './context/CartContext'
import Navbar             from './components/Navbar'
import Footer             from './components/Footer'
import Hero               from './components/Hero'
import USPStrip           from './components/USPStrip'
import CategoryGrid       from './components/CategoryGrid'
import AboutSnippet       from './components/AboutSnippet'

const ShopPage               = lazy(() => import('./pages/ShopPage'))
const ProductPage            = lazy(() => import('./pages/ProductPage'))
const CheckoutPage           = lazy(() => import('./pages/CheckoutPage'))
const OrderConfirmationPage  = lazy(() => import('./pages/OrderConfirmationPage'))
const AboutPage              = lazy(() => import('./pages/AboutPage'))
const ContactPage            = lazy(() => import('./pages/ContactPage'))

const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin" />
  </div>
)

function HomePage() {
  return (
    <main>
      <Helmet>
        <title>Mixie Kadai — Sri Lanka's Home for Mixer Grinders</title>
        <meta name="description" content="Shop 20+ mixer grinder models, genuine spare parts & kitchen accessories. Islandwide delivery from Jaffna, Sri Lanka. Preethi, Butterfly & more." />
      </Helmet>
      <Hero />
      <USPStrip />
      <CategoryGrid />
      <AboutSnippet />
    </main>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen font-body flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Suspense fallback={<PageSpinner />}>
              <Routes>
                <Route path="/"                 element={<HomePage />}              />
                <Route path="/shop"             element={<ShopPage />}              />
                <Route path="/shop/:slug"       element={<ProductPage />}           />
                <Route path="/checkout"         element={<CheckoutPage />}          />
                <Route path="/order/:id"        element={<OrderConfirmationPage />} />
                <Route path="/about"            element={<AboutPage />}             />
                <Route path="/contact"          element={<ContactPage />}           />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}
