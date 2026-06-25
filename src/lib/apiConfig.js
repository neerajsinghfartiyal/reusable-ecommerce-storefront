const DEFAULT_API_BASE_URL = 'http://localhost:5000'
const DEFAULT_CART_SESSION_KEY = 'reusable_cart_session'

export const getApiBaseUrl = () => {
  const raw = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
  return String(raw).replace(/\/+$/, '')
}

export const getCartSessionStorageKey = () =>
  import.meta.env.VITE_CART_SESSION_KEY || DEFAULT_CART_SESSION_KEY
