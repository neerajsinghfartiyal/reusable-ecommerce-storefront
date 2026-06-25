const ORDER_SUCCESS_STORAGE_KEY = 'storefront_order_success'

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'

export const saveOrderSuccess = (summary) => {
  if (!canUseStorage() || !summary) return
  window.sessionStorage.setItem(ORDER_SUCCESS_STORAGE_KEY, JSON.stringify(summary))
}

export const loadOrderSuccess = () => {
  if (!canUseStorage()) return null

  const raw = window.sessionStorage.getItem(ORDER_SUCCESS_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const clearOrderSuccess = () => {
  if (!canUseStorage()) return
  window.sessionStorage.removeItem(ORDER_SUCCESS_STORAGE_KEY)
}
