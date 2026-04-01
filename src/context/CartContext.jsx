import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'mixie_cart'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.slug === action.product.slug)
      if (existing) {
        return state.map(i =>
          i.slug === action.product.slug
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...state, { ...action.product, quantity: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.slug !== action.slug)
    case 'UPDATE_QTY':
      return state.map(i =>
        i.slug === action.slug
          ? { ...i, quantity: Math.max(1, action.qty) }
          : i
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], load)

  // Persist to localStorage whenever the cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage quota exceeded or private-browsing restriction — fail silently
    }
  }, [items])

  const addToCart    = useCallback(product => dispatch({ type: 'ADD',        product }), [])
  const removeFromCart = useCallback(slug  => dispatch({ type: 'REMOVE',     slug    }), [])
  const updateQty    = useCallback((slug, qty) => dispatch({ type: 'UPDATE_QTY', slug, qty }), [])
  const clearCart    = useCallback(()          => dispatch({ type: 'CLEAR' }),             [])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
