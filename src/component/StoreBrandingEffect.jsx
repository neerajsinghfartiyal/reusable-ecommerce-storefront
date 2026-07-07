import { useEffect } from 'react'
import { getPublicSettings } from '../api/publicSettingsApi.js'
import { applyDocumentFavicon } from '../lib/storeFavicon.js'

export default function StoreBrandingEffect() {
  useEffect(() => {
    let active = true

    const loadBranding = async () => {
      try {
        const settings = await getPublicSettings()
        if (!active) return
        const favicon = settings?.faviconUrl || settings?.favicon || ''
        applyDocumentFavicon(favicon)
      } catch {
        // Keep default favicon from index.html.
      }
    }

    loadBranding()

    return () => {
      active = false
    }
  }, [])

  return null
}
