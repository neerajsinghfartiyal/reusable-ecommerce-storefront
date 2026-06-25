import { apiPost } from '../lib/apiClient.js'

/**
 * POST /api/public/customers/checkout
 * Creates or updates a guest customer record for storefront checkout.
 */
export const upsertCheckoutCustomer = (payload) =>
  apiPost('/api/public/customers/checkout', payload)
