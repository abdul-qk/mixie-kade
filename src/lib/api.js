const CMS = import.meta.env.VITE_CMS_URL || 'http://localhost:3001'

/**
 * Normalize a product doc from the Payload ecommerce template schema
 * to the shape the frontend components expect.
 */
function normalizeProduct(doc) {
  if (!doc) return null
  return {
    ...doc,
    // The ecommerce template uses 'title'; our components use 'name'
    name: doc.name ?? doc.title,
    // LKR price stored in custom 'price' field
    price: doc.price ?? doc.priceInUSD,
  }
}

/**
 * Fetch all in-stock products from Payload.
 * Sorted by title, limit 100.
 */
export async function getProducts({ category } = {}) {
  const params = new URLSearchParams({
    limit: '100',
    sort: 'title',
    'where[inStock][equals]': 'true',
  })
  if (category) {
    params.set('where[category][equals]', category)
  }
  const res = await fetch(`${CMS}/api/products?${params}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const json = await res.json()
  return json.docs.map(normalizeProduct)
}

/**
 * Fetch a single product by slug.
 */
export async function getProduct(slug) {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    limit: '1',
    depth: '1', // populate relatedProducts sub-docs
  })
  const res = await fetch(`${CMS}/api/products?${params}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  const json = await res.json()
  return normalizeProduct(json.docs[0] || null)
}

/**
 * Place a COD order.
 * Maps the checkout form fields to the Payload ecommerce order schema
 * plus the custom Mixie Kadai COD fields.
 */
export async function placeOrder({ customerName, phone, address, city, notes, items, total }) {
  const payload = {
    status:       'pending',
    customerName,
    phone,
    address,
    city,
    notes:        notes || '',
    items,   // array of { productName, productSlug, quantity, price } — matches Orders.ts schema
    total,
  }

  const res = await fetch(`${CMS}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.errors?.[0]?.message || err?.message || 'Failed to place order')
  }
  return res.json()
}
