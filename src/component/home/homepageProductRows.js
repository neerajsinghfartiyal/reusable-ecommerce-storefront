import { getProductCardId } from '../../lib/productMappers.js'

export const HOMEPAGE_PRODUCTS_PER_ROW = 8
export const HOMEPAGE_MIN_ROW_PRODUCTS = 3

/** Category rows shown on homepage, in display order. */
export const HOMEPAGE_CATEGORY_ROW_SLUGS = ['electronics', 'fashion', 'fitness']

export const HOMEPAGE_EXTRA_CATEGORY_SLUGS = ['footwear', 'accessories', 'home', 'beauty']

const CATEGORY_SECTION_COPY = {
  fashion: {
    title: "Fashion's Top Picks",
    badge: 'Live catalog prices',
    description: 'Fresh styles and essentials from fashion and subcategories.',
  },
  electronics: {
    title: 'Top Electronics Deals',
    badge: 'Fresh products from inventory',
    description: 'Devices and tech with current published pricing.',
  },
  fitness: {
    title: 'Fitness Gear Deals',
    badge: 'Fresh products from inventory',
    description: 'Training and wellness gear from the live catalog.',
  },
  footwear: {
    title: 'Footwear Highlights',
    badge: 'Live catalog prices',
    description: 'Comfort and performance for every step.',
  },
  accessories: {
    title: 'Accessories & More',
    badge: 'Live catalog prices',
    description: 'Finishing touches across top collections.',
  },
}

export const getHomepageCategoryCopy = (category = {}) => {
  const slug = String(category.slug || '').toLowerCase()
  return (
    CATEGORY_SECTION_COPY[slug] || {
      title: category.name,
      badge: 'Live catalog prices',
      description: `Top picks from ${String(category.name || 'this category').toLowerCase()}.`,
    }
  )
}

export const pickHomepageDealCategories = (categories = []) => {
  const bySlug = new Map(
    categories.map((category) => [String(category.slug || '').toLowerCase(), category]),
  )
  const ordered = []

  ;[...HOMEPAGE_CATEGORY_ROW_SLUGS, ...HOMEPAGE_EXTRA_CATEGORY_SLUGS].forEach((slug) => {
    const category = bySlug.get(slug)
    if (category) ordered.push(category)
  })

  return ordered
}

export class UsedProductTracker {
  constructor() {
    this.used = new Set()
  }

  has(product) {
    const id = getProductCardId(product)
    return Boolean(id && this.used.has(id))
  }

  takeUnique(products = [], limit = HOMEPAGE_PRODUCTS_PER_ROW) {
    const picked = []

    products.forEach((product) => {
      if (picked.length >= limit) return
      const id = getProductCardId(product)
      if (!id || this.used.has(id)) return
      this.used.add(id)
      picked.push(product)
    })

    return picked
  }

  overlapRatio(products = []) {
    if (!products.length) return 1
    const overlap = products.filter((product) => this.has(product)).length
    return overlap / products.length
  }
}

const hasSaleDiscount = (product = {}) =>
  (product.discountPercent || 0) > 0 ||
  (product.compareAtPrice != null && product.compareAtPrice > product.price)

const sortByDiscount = (products = []) =>
  [...products].sort((left, right) => {
    const leftScore = (left.discountPercent || 0) * 10 + (left.inStock ? 1 : 0)
    const rightScore = (right.discountPercent || 0) * 10 + (right.inStock ? 1 : 0)
    return rightScore - leftScore
  })

export const pickBestPicksProducts = (latestProducts = [], tracker, limit = HOMEPAGE_PRODUCTS_PER_ROW) =>
  tracker.takeUnique(latestProducts, limit)

export const pickTrendingDealProducts = (
  latestProducts = [],
  tracker,
  { limit = HOMEPAGE_PRODUCTS_PER_ROW, minProducts = HOMEPAGE_MIN_ROW_PRODUCTS } = {},
) => {
  const discounted = sortByDiscount(latestProducts.filter(hasSaleDiscount))
  const picked = tracker.takeUnique(discounted, limit)

  if (picked.length < minProducts) {
    picked.forEach((product) => {
      const id = getProductCardId(product)
      if (id) tracker.used.delete(id)
    })
    return []
  }

  return picked
}

export const pickCategoryRowProducts = (
  products = [],
  tracker,
  { limit = HOMEPAGE_PRODUCTS_PER_ROW, minProducts = HOMEPAGE_MIN_ROW_PRODUCTS } = {},
) => {
  if (!products.length) return []

  if (tracker.overlapRatio(products) >= 0.7) return []

  const picked = tracker.takeUnique(products, limit)
  if (picked.length < minProducts) {
    picked.forEach((product) => tracker.used.delete(getProductCardId(product)))
    return []
  }

  return picked
}

export const pickRecommendedProducts = (
  latestProducts = [],
  tracker,
  extras = [],
  { limit = HOMEPAGE_PRODUCTS_PER_ROW, minProducts = HOMEPAGE_MIN_ROW_PRODUCTS } = {},
) => {
  const pool = [...extras, ...latestProducts]
  const picked = tracker.takeUnique(pool, limit)

  if (picked.length < minProducts) {
    picked.forEach((product) => tracker.used.delete(getProductCardId(product)))
    return []
  }

  return picked
}

const rowSignature = (products = []) =>
  products.map((product) => getProductCardId(product)).join('|')

export const rowsHaveSameProducts = (left = [], right = []) => {
  if (!left.length || !right.length) return false
  return rowSignature(left) === rowSignature(right)
}
