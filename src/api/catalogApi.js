import { apiGet } from '../lib/apiClient.js'
import { buildQueryString } from '../lib/queryString.js'

/**
 * GET /api/public/products
 * @returns {{ products: Array, pagination: Object }}
 */
export const getProducts = async (params = {}) => {
  const data = await apiGet(`/api/public/products${buildQueryString(params)}`)

  return {
    products: Array.isArray(data?.products) ? data.products : [],
    pagination: data?.pagination || {},
  }
}

/**
 * Featured / latest products for home sections.
 */
export const getFeaturedProducts = (params = {}) =>
  getProducts({
    limit: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...params,
  })

/**
 * GET /api/public/categories
 * @returns {Array}
 */
export const getCategories = async (params = {}) => {
  const data = await apiGet(`/api/public/categories${buildQueryString(params)}`)

  if (Array.isArray(data)) {
    return data
  }

  return Array.isArray(data?.categories) ? data.categories : []
}

/**
 * GET /api/public/products/:slug
 * @returns {Object} Published product
 */
export const getProductBySlug = (slug) =>
  apiGet(`/api/public/products/${encodeURIComponent(slug)}`)
