export const SHOP_SORT_OPTIONS = [
  { id: 'newest', label: 'Newest', sortBy: 'createdAt', sortOrder: 'desc' },
  { id: 'price-asc', label: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
  { id: 'price-desc', label: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
  { id: 'name-asc', label: 'Name A-Z', sortBy: 'name', sortOrder: 'asc' },
]

export const DEFAULT_SHOP_SORT = SHOP_SORT_OPTIONS[0]

export const SHOP_PRODUCT_GRID_CLASS =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'

export const parseShopSort = (searchParams) => {
  const sortBy = searchParams.get('sortBy') || DEFAULT_SHOP_SORT.sortBy
  const sortOrder = searchParams.get('sortOrder') || DEFAULT_SHOP_SORT.sortOrder

  const matched = SHOP_SORT_OPTIONS.find(
    (option) => option.sortBy === sortBy && option.sortOrder === sortOrder,
  )

  if (matched) return matched

  return {
    id: 'custom',
    label: 'Custom sort',
    sortBy,
    sortOrder,
  }
}

export const isDefaultShopSort = (sort) =>
  sort.sortBy === DEFAULT_SHOP_SORT.sortBy && sort.sortOrder === DEFAULT_SHOP_SORT.sortOrder

export const getEntityId = (value) => {
  if (!value) return ''
  if (typeof value === 'object') return value._id || value.id || ''
  return String(value)
}

export const mapBrandsForFilter = (brands = []) =>
  (Array.isArray(brands) ? brands : []).map((brand) => ({
    id: getEntityId(brand),
    name: brand.name || 'Brand',
    slug: brand.slug || '',
  }))

export const buildShopQueryPatch = (searchParams, updates = {}) => {
  const next = new URLSearchParams(searchParams)

  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      next.delete(key)
    } else {
      next.set(key, String(value))
    }
  })

  return next
}

export const hasActiveShopFilters = ({ search = '', category = '', brand = '', sort } = {}) =>
  Boolean(search || category || brand || (sort && !isDefaultShopSort(sort)))
