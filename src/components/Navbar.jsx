import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

const navLinks = [
  { label: 'Home',    to: '/'        },
  { label: 'Shop',    to: '/shop'    },
  { label: 'About',   to: '/about'   },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [cartOpen,  setCartOpen]  = useState(false)
  const { count } = useCart()
  const location  = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll() // sync on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const isHomePage = location.pathname === '/'
  const floating   = isHomePage && !scrolled

  // Outer header: transparent + desktop inset padding when floating;
  // full-width opaque bar when scrolled
  const headerCls = [
    'fixed top-0 inset-x-0 z-50 transition-all duration-500',
    floating
      ? 'md:px-6 md:pt-5'
      : 'bg-white shadow-md border-b border-brand-surface/40',
  ].join(' ')

  // Inner nav pill / bar
  const navCls = [
    'flex items-center justify-between px-6 bg-white transition-all duration-500',
    floating
      ? `h-16 shadow-lg md:max-w-5xl md:mx-auto md:rounded-full ${
          menuOpen ? 'rounded-t-2xl' : 'rounded-b-2xl'
        }`
      : 'h-20',
  ].join(' ')

  // Mobile dropdown
  const dropdownCls = [
    'animate-slide-down md:hidden bg-white px-6 pb-5',
    floating
      ? 'rounded-b-2xl shadow-lg md:max-w-5xl md:mx-auto'
      : 'border-t border-brand-surface shadow-sm',
  ].join(' ')

  return (
    <>
      <header className={headerCls}>

        {/* ── Nav bar ─────────────────────────────────────────────── */}
        <nav className={navCls}>

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo.jpeg" alt="Mixie Kadai" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="font-body text-sm font-medium text-brand-navy hover:text-brand-gold transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart + hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`View cart (${count} items)`}
              className="relative text-brand-navy hover:text-brand-gold transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden text-brand-navy hover:text-brand-gold transition-colors duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* ── Mobile dropdown ──────────────────────────────────────── */}
        {menuOpen && (
          <div className={dropdownCls}>
            <ul className="flex flex-col gap-1 list-none m-0 p-0 pt-2">
              {navLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="block py-2.5 font-body text-sm font-medium text-brand-navy hover:text-brand-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
