import { apiDelete, apiGet, apiPost, apiPut } from '../lib/apiClient.js'
import { buildQueryString } from '../lib/queryString.js'

const cartPath = (sessionId) => `/api/cart/${encodeURIComponent(sessionId)}`

/**
 * GET /api/cart/:sessionId
 */
export const getCart = (sessionId) => apiGet(cartPath(sessionId))

/**
 * POST /api/cart/:sessionId/items
 * @param {{ productId: string, quantity: number }} item
 */
export const addCartItem = (sessionId, item) =>
  apiPost(`${cartPath(sessionId)}/items`, item)

/**
 * PUT /api/cart/:sessionId/items/:productId
 * @param {{ quantity: number }} payload
 */
export const updateCartItem = (sessionId, productId, payload) =>
  apiPut(`${cartPath(sessionId)}/items/${encodeURIComponent(productId)}`, payload)

/**
 * DELETE /api/cart/:sessionId/items/:productId
 */
export const removeCartItem = (sessionId, productId) =>
  apiDelete(`${cartPath(sessionId)}/items/${encodeURIComponent(productId)}`)

/**
 * DELETE /api/cart/:sessionId
 */
export const clearCart = (sessionId) => apiDelete(cartPath(sessionId))

/**
 * GET /api/cart/:sessionId/shipping-options
 */
export const getShippingOptions = (sessionId, params = {}) =>
  apiGet(`${cartPath(sessionId)}/shipping-options${buildQueryString(params)}`)

/**
 * PUT /api/cart/:sessionId/shipping-method
 * @param {{ shippingMethodId?: string, shippingMethodCode?: string, customer?: string }} payload
 */
export const selectShippingMethod = (sessionId, payload) =>
  apiPut(`${cartPath(sessionId)}/shipping-method`, payload)

/**
 * GET /api/cart/:sessionId/payment-options
 */
export const getPaymentOptions = (sessionId, params = {}) =>
  apiGet(`${cartPath(sessionId)}/payment-options${buildQueryString(params)}`)

/**
 * PUT /api/cart/:sessionId/payment-method
 * @param {{ paymentMethodId?: string, paymentMethodCode?: string, customer?: string }} payload
 */
export const selectPaymentMethod = (sessionId, payload) =>
  apiPut(`${cartPath(sessionId)}/payment-method`, payload)

/**
 * POST /api/cart/:sessionId/checkout
 * @param {{ customer: string, notes?: string, shippingMethodId?: string, shippingMethodCode?: string, paymentMethodId?: string, paymentMethodCode?: string }} payload
 */
export const checkoutCart = (sessionId, payload) =>
  apiPost(`${cartPath(sessionId)}/checkout`, payload)
