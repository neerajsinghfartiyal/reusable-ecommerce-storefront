import { apiGet } from '../lib/apiClient.js'

/**
 * Public store settings (branding, currency display, maintenance flag).
 * GET /api/public/settings
 */
export const getPublicSettings = () => apiGet('/api/public/settings')
