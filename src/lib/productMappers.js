import { getApiBaseUrl } from './apiConfig.js'
import fallbackProductImage from '../assets/images/product-placeholder.svg'

export const DEFAULT_STORE_NAME = 'VELMORA'
export const STORE_TAGLINE = 'Shop Smarter. Live Better.'

const getEntityId = (value) => {
  if (!value) return ''
  if (typeof value === 'object') {
    return value._id || value.id || ''
  }
  return String(value)
}

/** Stable product key for homepage dedupe and list keys (_id, id, or slug). */
export const getProductCardId = (product = {}) => {
  const id = getEntityId(product)
  if (id) return String(id)
  return String(product.slug || product.title || '')
}

/** Compare mapped card fields used by ProductCard display. */
export const areProductCardViewsEqual = (left = {}, right = {}) =>
  getProductCardId(left) === getProductCardId(right) &&
  left.slug === right.slug &&
  left.title === right.title &&
  left.price === right.price &&
  left.compareAtPrice === right.compareAtPrice &&
  left.discountPercent === right.discountPercent &&
  left.inStock === right.inStock &&
  left.quantity === right.quantity &&
  left.image === right.image &&
  left.categoryName === right.categoryName &&
  left.brandName === right.brandName &&
  left.detailPath === right.detailPath

export const resolveOptionalImageUrl = (imageUrl) => {
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

export const resolveProductImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return fallbackProductImage
  }

  const trimmed = imageUrl.trim()
  if (!trimmed) return fallbackProductImage

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${getApiBaseUrl()}${path}`
}

export const resolveStoreLogoUrl = (logoUrl) => {
  if (!logoUrl || typeof logoUrl !== 'string') {
    return ''
  }

  const trimmed = logoUrl.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${getApiBaseUrl()}${path}`
}

export const formatProductPrice = (amount, currencySymbol = '$') => {
  const value = Number(amount)
  if (Number.isNaN(value)) return `${currencySymbol}0.00`
  return `${currencySymbol}${value.toFixed(2)}`
}

export const getDiscountPercent = (price, compareAtPrice) => {
  const current = Number(price)
  const original = Number(compareAtPrice)
  if (Number.isNaN(current) || Number.isNaN(original) || original <= current) return null
  return Math.round(((original - current) / original) * 100)
}

export const getProductSavingsAmount = (price, compareAtPrice, currencySymbol = '$') => {
  const current = Number(price)
  const original = Number(compareAtPrice)
  if (Number.isNaN(current) || Number.isNaN(original) || original <= current) return null
  return formatProductPrice(original - current, currencySymbol)
}

const RECENTLY_VIEWED_KEY = 'velmora_recently_viewed'
const RECENTLY_VIEWED_LIMIT = 8

export const trackRecentlyViewedProduct = (product = {}) => {
  if (!product?.id || !product?.slug) return

  try {
    const entry = {
      id: String(product.id),
      slug: product.slug,
      name: product.name || 'Product',
      image: product.images?.[0] || '',
      price: product.price ?? null,
      compareAtPrice: product.compareAtPrice ?? null,
      brandName: product.brandName || '',
      categoryName: product.categoryName || '',
      viewedAt: Date.now(),
    }

    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY)
    const list = raw ? JSON.parse(raw) : []
    const filtered = (Array.isArray(list) ? list : []).filter(
      (item) => String(item?.id) !== String(product.id),
    )
    const next = [entry, ...filtered].slice(0, RECENTLY_VIEWED_LIMIT)
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

export const getRecentlyViewedProducts = (excludeProductId = '') => {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY)
    const list = raw ? JSON.parse(raw) : []
    return (Array.isArray(list) ? list : [])
      .filter((item) => item?.id && item?.slug)
      .filter((item) => String(item.id) !== String(excludeProductId))
      .slice(0, RECENTLY_VIEWED_LIMIT)
      .map((item) => ({
        id: String(item.id),
        slug: item.slug,
        title: item.name || 'Product',
        image: item.image || resolveProductImageUrl(''),
        price: item.price != null ? Number(item.price) : 0,
        compareAtPrice: item.compareAtPrice != null ? Number(item.compareAtPrice) : null,
        discountPercent: getDiscountPercent(item.price, item.compareAtPrice),
        brandName: item.brandName || '',
        categoryName: item.categoryName || '',
        detailPath: `/products/${item.slug}`,
        inStock: true,
      }))
  } catch {
    return []
  }
}

export const getProductCardOfferLine = (product = {}) => {
  if (!product) return ''
  if (product.discountPercent) return 'Live catalog price'
  if (product.inStock) return 'In stock'
  return ''
}

export const getProductRowGridClass = (count = 4, variant = 'compact') => {
  const gap = variant === 'compact' ? 'gap-3' : 'gap-7.5'
  const safeCount = Math.min(Math.max(Number(count) || 1, 1), 4)

  if (safeCount === 1) {
    return `grid grid-cols-1 sm:max-w-xs ${gap}`
  }
  if (safeCount === 2) {
    return `grid grid-cols-2 ${gap}`
  }
  if (safeCount === 3) {
    return `grid grid-cols-2 lg:grid-cols-3 ${gap}`
  }

  return `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${gap}`
}

export const mapProductToCard = (product = {}) => {
  const salePrice = product.salePrice != null ? Number(product.salePrice) : null
  const basePrice = Number(product.price ?? 0)
  const displayPrice = salePrice != null && !Number.isNaN(salePrice) ? salePrice : basePrice
  const quantity = Number(product.quantity ?? 0)

  const compareAtPrice =
    salePrice != null && !Number.isNaN(salePrice) && salePrice < basePrice ? basePrice : null

  return {
    id: getEntityId(product),
    slug: product.slug || '',
    title: product.name || 'Product',
    image: resolveProductImageUrl(product.featuredImage),
    price: displayPrice,
    compareAtPrice,
    discountPercent: getDiscountPercent(displayPrice, compareAtPrice),
    categoryName: product.category?.name || '',
    categoryId: getEntityId(product.category),
    brandName: product.brand?.name || '',
    sku: product.sku || '',
    description: product.shortDescription || product.description || '',
    inStock: !Number.isNaN(quantity) && quantity > 0,
    quantity: Number.isNaN(quantity) ? 0 : quantity,
    detailPath: product.slug ? `/products/${product.slug}` : '#',
  }
}

export const mapProductsToCards = (products = []) =>
  (Array.isArray(products) ? products : []).map(mapProductToCard)

export const mapCategoryToCard = (category = {}) => {
  const id = getEntityId(category)
  const image = resolveOptionalImageUrl(category.image)
  const parentId =
    getEntityId(category.parent) ||
    (category.parentId ? String(category.parentId) : '') ||
    (category.parent ? String(category.parent) : '')

  return {
    id,
    slug: category.slug || '',
    name: category.name || 'Category',
    title: 'Shop collection',
    link: id ? `/shop?category=${encodeURIComponent(id)}` : '/shop',
    image,
    hasImage: Boolean(image),
    parentId: parentId || null,
    path: category.path || '',
    sortOrder: Number(category.sortOrder || 0),
    children: Array.isArray(category.children)
      ? category.children.map(mapCategoryToCard)
      : [],
  }
}

export const mapCategoriesToCards = (categories = []) =>
  (Array.isArray(categories) ? categories : []).map(mapCategoryToCard)

const normalizeImageList = (images = []) => {
  const seen = new Set()
  const resolved = []

  images.forEach((image) => {
    const url = resolveProductImageUrl(image)
    if (!url || seen.has(url)) return
    seen.add(url)
    resolved.push(url)
  })

  return resolved.length > 0 ? resolved : [fallbackProductImage]
}

export const buildProductGalleryImages = (product = {}) => {
  const rawImages = [
    product.featuredImage,
    ...(Array.isArray(product.galleryImages) ? product.galleryImages : []),
  ].filter(Boolean)

  return normalizeImageList(rawImages)
}

const mapAttributeSpecifications = (attributes = []) =>
  (Array.isArray(attributes) ? attributes : [])
    .filter((item) => item?.isVisible !== false && item?.isVariationAttribute === false)
    .map((item) => {
      const values = Array.isArray(item.values)
        ? item.values
            .map((entry) => entry?.label || entry?.value)
            .filter(Boolean)
            .join(', ')
        : ''

      return {
        name: item.name || item.code || 'Attribute',
        value: values,
      }
    })
    .filter((item) => item.value)

const mapProductVariations = (variations = []) =>
  (Array.isArray(variations) ? variations : []).map((variation) => {
    const salePrice =
      variation.salePrice != null ? Number(variation.salePrice) : null
    const basePrice = Number(variation.price ?? 0)
    const quantity = Number(variation.quantity ?? 0)

    return {
      sku: variation.sku || '',
      price: basePrice,
      salePrice: salePrice != null && !Number.isNaN(salePrice) ? salePrice : null,
      quantity: Number.isNaN(quantity) ? 0 : quantity,
      status: variation.status || 'active',
      image: variation.image ? resolveProductImageUrl(variation.image) : null,
      options: (Array.isArray(variation.attributes) ? variation.attributes : [])
        .map((attr) => {
          const label = attr.label || attr.value || ''
          const name = attr.name || attr.code || ''
          if (label && name) return `${name}: ${label}`
          return label || name
        })
        .filter(Boolean)
        .join(' · '),
      inStock: !Number.isNaN(quantity) && quantity > 0 && variation.status === 'active',
    }
  })

export const getAtGlanceSpecs = (product = {}, limit = 4) => {
  const specs = Array.isArray(product.specifications) ? product.specifications : []
  return specs
    .slice(0, limit)
    .map((spec) => ({
      label: spec.name || '',
      value: spec.value || '',
    }))
    .filter((spec) => spec.label && spec.value)
}

export const getProductHighlights = (product = {}) => {
  const specs = Array.isArray(product.specifications) ? product.specifications : []
  if (specs.length > 0) {
    return specs.slice(0, 5).map((spec) => ({
      label: spec.name,
      value: spec.value,
    }))
  }

  const shortDescription = String(product.shortDescription || '').trim()
  if (!shortDescription) return []

  return shortDescription
    .split(/\n|•|·/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 5)
    .map((line) => ({ label: line, value: '' }))
}

export const mapProductToDetail = (product = {}) => {
  const salePrice = product.salePrice != null ? Number(product.salePrice) : null
  const basePrice = Number(product.price ?? 0)
  const displayPrice =
    salePrice != null && !Number.isNaN(salePrice) ? salePrice : basePrice
  const quantity = Number(product.quantity ?? 0)
  const inStock = !Number.isNaN(quantity) && quantity > 0
  const compareAtPrice =
    salePrice != null && !Number.isNaN(salePrice) && salePrice < basePrice ? basePrice : null

  return {
    id: getEntityId(product),
    name: product.name || 'Product',
    slug: product.slug || '',
    sku: product.sku || '',
    price: displayPrice,
    compareAtPrice,
    discountPercent: getDiscountPercent(displayPrice, compareAtPrice),
    categoryName: product.category?.name || '',
    categorySlug: product.category?.slug || '',
    categoryId: getEntityId(product.category),
    categoryPath: Array.isArray(product.categoryPath)
      ? product.categoryPath.map((item) => ({
          id: getEntityId(item),
          name: item.name || '',
          slug: item.slug || '',
        }))
      : [],
    categoryBreadcrumb: product.categoryBreadcrumb || product.category?.name || '',
    brandName: product.brand?.name || '',
    brandSlug: product.brand?.slug || '',
    brandId: getEntityId(product.brand),
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    status: product.status || '',
    quantity: Number.isNaN(quantity) ? 0 : quantity,
    inStock,
    availabilityLabel: inStock ? 'In stock' : 'Out of stock',
    images: buildProductGalleryImages(product),
    specifications: mapAttributeSpecifications(product.attributes),
    variations: mapProductVariations(product.variations),
  }
}
