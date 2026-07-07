import { apiGet } from '../lib/apiClient.js'

const HOME_PAGE_SLUG = 'home'

/**
 * GET /api/public/pages/home
 * Falls back to GET /api/public/pages/home via slug if dedicated route unavailable.
 */
export const getHomePageContent = async () => {
  try {
    return await apiGet('/api/public/pages/home')
  } catch (error) {
    if (error?.status === 404) {
      return apiGet(`/api/public/pages/${encodeURIComponent(HOME_PAGE_SLUG)}`)
    }
    throw error
  }
}

/**
 * GET /api/public/pages/:slug
 */
export const getCmsPageBySlug = (slug) =>
  apiGet(`/api/public/pages/${encodeURIComponent(slug)}`)

const SHOP_PAGE_SLUG = 'shop'

/** Published CMS page for /shop hero cover and copy. */
export const getShopPageContent = () => getCmsPageBySlug(SHOP_PAGE_SLUG)
