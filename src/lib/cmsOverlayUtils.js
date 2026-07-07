export const CMS_OVERLAY_LEVELS = ['light', 'medium', 'dark']

export const normalizeCmsOverlay = (value) => {
  const key = String(value || '').trim().toLowerCase()
  if (CMS_OVERLAY_LEVELS.includes(key)) return key
  return 'medium'
}

const HERO_MAIN_OVERLAY = {
  light: 'bg-linear-to-r from-[#111827]/55 via-[#111827]/20 to-transparent',
  medium: 'bg-linear-to-r from-[#111827]/70 via-[#111827]/30 to-transparent',
  dark: 'bg-linear-to-r from-[#111827]/85 via-[#1e3a8a]/55 to-transparent',
}

const HERO_MAIN_GLOW = {
  light: 'bg-[radial-gradient(circle_at_88%_18%,rgba(245,158,11,0.1),transparent_50%)]',
  medium: 'bg-[radial-gradient(circle_at_88%_18%,rgba(245,158,11,0.14),transparent_52%)]',
  dark: 'bg-[radial-gradient(circle_at_85%_20%,rgba(245,158,11,0.22),transparent_45%)]',
}

const HERO_THUMB_OVERLAY = {
  light: 'bg-linear-to-t from-[#111827]/50 via-[#111827]/15 to-transparent',
  medium: 'bg-linear-to-t from-[#111827]/65 via-[#111827]/22 to-transparent',
  dark: 'bg-linear-to-t from-[#111827]/90 via-[#111827]/40 to-transparent',
}

const PROMO_PRIMARY_OVERLAY = {
  light: 'bg-linear-to-t from-[#111827]/50 via-[#1e3a8a]/18 to-transparent',
  medium: 'bg-linear-to-t from-[#111827]/70 via-[#1e3a8a]/28 to-transparent',
  dark: 'bg-linear-to-br from-[#111827]/90 via-[#1e3a8a]/55 to-[#2563EB]/35',
}

const PROMO_DARK_OVERLAY = {
  light: 'bg-linear-to-t from-[#111827]/55 via-[#111827]/18 to-transparent',
  medium: 'bg-linear-to-t from-[#111827]/70 via-[#111827]/28 to-transparent',
  dark: 'bg-linear-to-t from-[#111827]/95 via-[#111827]/60 to-[#111827]/30',
}

const FINAL_CTA_OVERLAY = {
  light: 'bg-linear-to-t from-[#111827]/50 via-[#111827]/18 to-transparent',
  medium: 'bg-linear-to-t from-[#111827]/70 via-[#1e3a8a]/30 to-[#111827]/10',
  dark: 'bg-linear-to-t from-[#111827]/90 via-[#1e3a8a]/55 to-[#2563EB]/25',
}

export const getHeroBannerOverlayClasses = (overlay) =>
  HERO_MAIN_OVERLAY[normalizeCmsOverlay(overlay)]

export const getHeroBannerGlowClasses = (overlay) =>
  HERO_MAIN_GLOW[normalizeCmsOverlay(overlay)]

export const getHeroThumbOverlayClasses = (overlay) =>
  HERO_THUMB_OVERLAY[normalizeCmsOverlay(overlay)]

export const getPromoCardOverlayClasses = (overlay, variant = 'primary') => {
  const level = normalizeCmsOverlay(overlay)
  return variant === 'dark' ? PROMO_DARK_OVERLAY[level] : PROMO_PRIMARY_OVERLAY[level]
}

export const getFinalCtaOverlayClasses = (overlay) =>
  FINAL_CTA_OVERLAY[normalizeCmsOverlay(overlay)]
