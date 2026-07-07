import { getApiBaseUrl } from './apiConfig.js'

const FAVICON_LINK_ID = 'velmora-store-favicon'

export const resolveStoreFaviconUrl = (faviconUrl) => {
  if (!faviconUrl || typeof faviconUrl !== 'string') {
    return ''
  }

  const trimmed = faviconUrl.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${getApiBaseUrl()}${path}`
}

const getFaviconMimeType = (url) => {
  const ext = String(url || '').split('?')[0].split('.').pop()?.toLowerCase()
  if (ext === 'svg') return 'image/svg+xml'
  if (ext === 'png') return 'image/png'
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'ico') return 'image/x-icon'
  return ''
}

export const applyDocumentFavicon = (faviconUrl) => {
  const resolved = resolveStoreFaviconUrl(faviconUrl)
  const managedLink = document.getElementById(FAVICON_LINK_ID)

  if (!resolved) {
    managedLink?.remove()
    return
  }

  document
    .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
    .forEach((element) => {
      if (element.id !== FAVICON_LINK_ID) {
        element.remove()
      }
    })

  const link = managedLink || document.createElement('link')
  link.id = FAVICON_LINK_ID
  link.rel = 'icon'
  link.href = resolved

  const mimeType = getFaviconMimeType(resolved)
  if (mimeType) {
    link.type = mimeType
  } else {
    link.removeAttribute('type')
  }

  if (!managedLink) {
    document.head.appendChild(link)
  }
}
