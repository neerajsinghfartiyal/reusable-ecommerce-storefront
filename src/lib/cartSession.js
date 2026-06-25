import { getCartSessionStorageKey } from './apiConfig.js'

const createCartSessionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `cart_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
}

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

/**
 * Returns a stable anonymous cart session ID for /api/cart/:sessionId routes.
 */
export const getCartSessionId = () => {
  if (!canUseStorage()) {
    return createCartSessionId()
  }

  const storageKey = getCartSessionStorageKey()
  const existing = window.localStorage.getItem(storageKey)

  if (existing) {
    return existing
  }

  const nextId = createCartSessionId()
  window.localStorage.setItem(storageKey, nextId)
  return nextId
}

/**
 * Clears the current cart session and issues a new ID.
 */
export const resetCartSessionId = () => {
  const nextId = createCartSessionId()

  if (canUseStorage()) {
    window.localStorage.setItem(getCartSessionStorageKey(), nextId)
  }

  return nextId
}
