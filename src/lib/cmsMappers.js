import { getApiBaseUrl } from './apiConfig.js'
import { normalizeCmsOverlay } from './cmsOverlayUtils.js'

export const BANNER_SECTION_TYPES = new Set(['banner', 'hero', 'homepage-banner'])

export const MANAGED_SECTION_TYPES = {
  DUAL_PROMO: 'dual-promo',
  FINAL_CTA: 'final-cta',
  CATEGORY_SHOWCASE: 'category-showcase',
  PROMO_CARD: 'promo-card',
}

const getSectionContent = (section = {}) => {
  if (section?.contentJson && typeof section.contentJson === 'object') {
    return section.contentJson
  }
  if (section?.content && typeof section.content === 'object') {
    return section.content
  }
  if (typeof section?.contentJson === 'string' && section.contentJson.trim()) {
    try {
      return JSON.parse(section.contentJson)
    } catch {
      return {}
    }
  }
  return {}
}

const isSectionActive = (section = {}) => section?.isActive !== false

const findSectionByType = (sections = [], sectionType, sectionKey = '') => {
  const type = String(sectionType || '').trim().toLowerCase()
  const key = String(sectionKey || '').trim().toLowerCase()

  return (Array.isArray(sections) ? sections : []).find((section) => {
    const sectionTypeKey = String(section?.sectionType || '').trim().toLowerCase()
    const sectionKeyValue = String(section?.sectionKey || '').trim().toLowerCase()
    if (key && sectionKeyValue === key) return true
    return sectionTypeKey === type
  })
}

export const resolveCmsImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return ''
  }

  const trimmed = imageUrl.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${getApiBaseUrl()}${path}`
}

export const mapCmsSectionToBanner = (section = {}, index = 0) => {
  const content = getSectionContent(section)
  const subtitle =
    section.subheading?.trim() ||
    section.description?.trim() ||
    ''

  return {
    id: section.sectionKey?.trim() || `cms-banner-${index + 1}`,
    title: section.heading?.trim() || 'Shop Now',
    subtitle,
    buttonText: section.buttonText?.trim() || 'Shop Now',
    buttonLink: section.buttonLink?.trim() || '/shop',
    image: resolveCmsImageUrl(section.image),
    overlay: normalizeCmsOverlay(content.overlay),
    accent: content.accent || '',
    badge: content.badge || '',
    alignment: content.alignment || 'left',
  }
}

export const mapCmsPromoCard = (card = {}, fallback = {}) => ({
  badge: card.badge?.trim() || fallback.badge || '',
  heading:
    (card.heading || card.title || '').trim() || fallback.heading || '',
  subheading:
    (card.subheading || card.subtitle || card.description || '').trim() ||
    fallback.subheading ||
    '',
  buttonText: card.buttonText?.trim() || fallback.buttonText || 'Shop Now',
  buttonLink: card.buttonLink?.trim() || fallback.buttonLink || '/shop',
  image: resolveCmsImageUrl(card.image),
  variant: card.variant?.trim() || fallback.variant || 'primary',
  overlay: normalizeCmsOverlay(card.overlay || fallback.overlay),
})

export const DEFAULT_DUAL_PROMO = {
  left: {
    badge: 'Latest picks',
    heading: 'Deals Across Fashion, Tech and Fitness',
    subheading: 'Browse live category collections with real pricing from the VELMORA catalog.',
    buttonText: 'Explore the Shop',
    buttonLink: '/shop',
    variant: 'primary',
  },
  right: {
    badge: 'New arrivals',
    heading: 'Fresh Finds This Season',
    subheading: 'Discover the newest products added to the store.',
    buttonText: 'View New Arrivals',
    buttonLink: '/shop?sortBy=createdAt&sortOrder=desc',
    variant: 'dark',
  },
}

export const DEFAULT_FINAL_CTA = {
  heading: 'Ready to shop smarter?',
  subheading:
    'Browse live inventory, add to cart, and complete guest checkout with delivery and payment options at checkout.',
  buttonText: 'Shop Now',
  buttonLink: '/shop',
  secondaryButtonText: 'View Cart',
  secondaryButtonLink: '/cart',
}

export const DEFAULT_CATEGORY_SHOWCASE = {
  heading: 'Shop by category',
  subheading: 'Explore top collections across fashion, electronics, footwear, fitness, and more.',
  buttonText: 'View all categories',
  buttonLink: '/categories',
}

export const isBannerSectionType = (sectionType = '') =>
  BANNER_SECTION_TYPES.has(String(sectionType || '').trim().toLowerCase())

export const pickCmsBannerSections = (sections = [], limit = 4) =>
  (Array.isArray(sections) ? sections : [])
    .filter((section) => isBannerSectionType(section.sectionType))
    .filter((section) => isSectionActive(section))
    .sort((left, right) => Number(left.sortOrder ?? 0) - Number(right.sortOrder ?? 0))
    .slice(0, limit)
    .map((section, index) => mapCmsSectionToBanner(section, index))

export const pickDualPromoSection = (sections = []) => {
  const section =
    findSectionByType(sections, MANAGED_SECTION_TYPES.DUAL_PROMO, 'homepage-dual-promo') ||
    findSectionByType(sections, 'promo-banner')

  if (!section || !isSectionActive(section)) {
    return { isActive: true, left: DEFAULT_DUAL_PROMO.left, right: DEFAULT_DUAL_PROMO.right }
  }

  const content = getSectionContent(section)
  const sectionOverlay = normalizeCmsOverlay(content.overlay)
  return {
    isActive: true,
    left: mapCmsPromoCard(content.left || {}, { ...DEFAULT_DUAL_PROMO.left, overlay: sectionOverlay }),
    right: mapCmsPromoCard(content.right || {}, { ...DEFAULT_DUAL_PROMO.right, overlay: sectionOverlay }),
  }
}

export const pickFinalCtaSection = (sections = []) => {
  const section = findSectionByType(sections, MANAGED_SECTION_TYPES.FINAL_CTA, 'homepage-final-cta')

  if (!section || !isSectionActive(section)) {
    return { isActive: true, ...DEFAULT_FINAL_CTA }
  }

  const content = getSectionContent(section)
  const image = resolveCmsImageUrl(section.image || content.image || '')
  return {
    isActive: true,
    heading: section.heading?.trim() || DEFAULT_FINAL_CTA.heading,
    subheading: section.subheading?.trim() || DEFAULT_FINAL_CTA.subheading,
    buttonText: section.buttonText?.trim() || DEFAULT_FINAL_CTA.buttonText,
    buttonLink: section.buttonLink?.trim() || DEFAULT_FINAL_CTA.buttonLink,
    secondaryButtonText:
      content.secondaryButtonText?.trim() || DEFAULT_FINAL_CTA.secondaryButtonText,
    secondaryButtonLink:
      content.secondaryButtonLink?.trim() || DEFAULT_FINAL_CTA.secondaryButtonLink,
    image,
    overlay: normalizeCmsOverlay(content.overlay),
  }
}

export const pickCategoryShowcaseSection = (sections = []) => {
  const section =
    findSectionByType(sections, MANAGED_SECTION_TYPES.CATEGORY_SHOWCASE, 'homepage-category-showcase') ||
    findSectionByType(sections, 'category-feature')

  if (!section || !isSectionActive(section)) {
    return { isActive: true, ...DEFAULT_CATEGORY_SHOWCASE }
  }

  return {
    isActive: true,
    heading: section.heading?.trim() || DEFAULT_CATEGORY_SHOWCASE.heading,
    subheading: section.subheading?.trim() || DEFAULT_CATEGORY_SHOWCASE.subheading,
    buttonText: section.buttonText?.trim() || DEFAULT_CATEGORY_SHOWCASE.buttonText,
    buttonLink: section.buttonLink?.trim() || DEFAULT_CATEGORY_SHOWCASE.buttonLink,
  }
}

const isManagedHomepageSection = (section = {}) => {
  const type = String(section?.sectionType || '').trim().toLowerCase()
  const key = String(section?.sectionKey || '').trim().toLowerCase()
  if (isBannerSectionType(type)) return true
  if (type === MANAGED_SECTION_TYPES.DUAL_PROMO || key === 'homepage-dual-promo') return true
  if (type === MANAGED_SECTION_TYPES.FINAL_CTA || key === 'homepage-final-cta') return true
  if (type === MANAGED_SECTION_TYPES.CATEGORY_SHOWCASE || key === 'homepage-category-showcase') {
    return true
  }
  return false
}

export const mapCmsPromoCardSection = (section = {}) =>
  mapCmsPromoCard(
    {
      badge: getSectionContent(section).badge,
      heading: section.heading,
      subheading: section.subheading || section.description,
      buttonText: section.buttonText,
      buttonLink: section.buttonLink,
      image: section.image,
      variant: getSectionContent(section).variant,
    },
    {},
  )

export const pickPromoCardSections = (sections = []) =>
  (Array.isArray(sections) ? sections : [])
    .filter((section) => String(section?.sectionType || '').trim().toLowerCase() === MANAGED_SECTION_TYPES.PROMO_CARD)
    .filter((section) => isSectionActive(section))
    .filter((section) => !isManagedHomepageSection(section))
    .sort((left, right) => Number(left.sortOrder ?? 0) - Number(right.sortOrder ?? 0))
    .map((section, index) => ({
      id: section.sectionKey?.trim() || `promo-card-${index + 1}`,
      ...mapCmsPromoCardSection(section),
    }))

export const SHOP_HERO_SECTION_TYPES = new Set([
  'shop-hero',
  'catalog-hero',
  'hero',
  'banner',
])

export const DEFAULT_SHOP_PAGE_HERO = {
  kicker: 'VELMORA Marketplace',
  title: 'Shop VELMORA',
  subtitle: '',
  coverImage: '',
  hasCover: false,
}

export const mapShopPageHero = (page = {}) => {
  const sections = Array.isArray(page.sections) ? page.sections : []
  const featuredImage = resolveCmsImageUrl(page.featuredImage)

  const heroSection = sections
    .filter((section) => section?.isActive !== false)
    .filter((section) =>
      SHOP_HERO_SECTION_TYPES.has(String(section?.sectionType || '').trim().toLowerCase()),
    )
    .sort((left, right) => Number(left.sortOrder ?? 0) - Number(right.sortOrder ?? 0))[0]

  const sectionImage = heroSection?.image ? resolveCmsImageUrl(heroSection.image) : ''
  const coverImage = sectionImage || featuredImage

  const seoTitle = String(page.seoTitle || '').trim()
  const pageTitle = String(page.title || '').trim()
  const seoDescription = String(page.seoDescription || '').trim()

  return {
    kicker:
      String(heroSection?.subheading || '').trim() || DEFAULT_SHOP_PAGE_HERO.kicker,
    title:
      String(heroSection?.heading || '').trim() ||
      seoTitle ||
      pageTitle ||
      DEFAULT_SHOP_PAGE_HERO.title,
    subtitle:
      String(heroSection?.description || '').trim() || seoDescription || '',
    coverImage,
    hasCover: Boolean(coverImage),
  }
}

export const mapCmsPageMeta = (page = {}) => ({
  title: page.title || '',
  slug: page.slug || '',
  pageType: page.pageType || '',
  seoTitle: page.seoTitle || '',
  seoDescription: page.seoDescription || '',
  featuredImage: resolveCmsImageUrl(page.featuredImage),
})
