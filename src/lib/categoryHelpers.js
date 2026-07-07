import { mapCategoriesToCards } from './productMappers.js'
import { buildCategoryTree } from './categoryTree.js'
import {
  filterDisplayRootFlatList,
  filterNavRootCategories,
  buildShopSidebarTree,
  getCategoryDisplayName,
} from './categoryLegacy.js'

/** Preferred catalog slugs for nav and homepage sections (matched against live API). */
export const FEATURED_CATEGORY_SLUGS = [
  'accessories',
  'electronics',
  'fashion',
  'fitness',
  'footwear',
]

const SHOWCASE_ROOT_ORDER = ['fashion', 'electronics', 'footwear', 'fitness', 'accessories']

const SHOWCASE_CHILD_SLUGS = [
  'men',
  'women',
  'mobiles',
  'audio',
  'yoga',
  'fitness-accessories',
  'accessories',
  'footwear',
]

const getCategoryId = (category = {}) =>
  String(category.id || category._id || category.categoryId || '')

const sortRootsForShowcase = (roots = []) => {
  const order = new Map(SHOWCASE_ROOT_ORDER.map((slug, index) => [slug, index]))
  return [...roots].sort((left, right) => {
    const leftOrder = order.get(String(left.slug || '').toLowerCase()) ?? 99
    const rightOrder = order.get(String(right.slug || '').toLowerCase()) ?? 99
    if (leftOrder !== rightOrder) return leftOrder - rightOrder
    return String(left.name || '').localeCompare(String(right.name || ''))
  })
}

const childPriority = (slug = '') => {
  const index = SHOWCASE_CHILD_SLUGS.indexOf(String(slug).toLowerCase())
  return index === -1 ? 99 : index
}

const toShowcaseCard = (node = {}, parentNode = null) => {
  const mapped = mapCategoriesToCards([node])[0] || {}
  const parentName = parentNode ? getCategoryDisplayName(parentNode) : ''
  const displayName = getCategoryDisplayName(node, { asChild: Boolean(parentNode) })

  return {
    ...mapped,
    displayName,
    parentName,
    subtitle: parentName ? `Under ${parentName}` : 'Shop collection',
    link: mapped.link || '/shop',
  }
}

const SYNTHETIC_LAUNCHERS = [
  {
    id: 'launcher-new-arrivals',
    slug: 'new-arrivals',
    displayName: 'New Arrivals',
    subtitle: 'Latest additions',
    parentName: '',
    link: '/shop?sortBy=createdAt&sortOrder=desc',
    image: '',
    hasImage: false,
  },
  {
    id: 'launcher-deals',
    slug: 'deals',
    displayName: 'Deals',
    subtitle: 'Value across categories',
    parentName: '',
    link: '/shop',
    image: '',
    hasImage: false,
  },
]

const sortCategoriesPageRoots = (roots = []) => sortRootsForShowcase(roots)

const mapCategoryBrowseNode = (node = {}, parentNode = null, rootNode = null) => {
  const card = mapCategoriesToCards([node])[0] || {}
  const isChild = Boolean(parentNode)
  const displayName = getCategoryDisplayName(node, { asChild: isChild })
  const parentName = parentNode ? getCategoryDisplayName(parentNode) : ''
  const effectiveRoot = rootNode || node
  const children = (node.children || []).map((child) =>
    mapCategoryBrowseNode(child, node, effectiveRoot),
  )

  return {
    ...card,
    displayName,
    parentName,
    rootName: getCategoryDisplayName(effectiveRoot),
    description:
      String(node.description || '').trim() ||
      (isChild
        ? `Browse ${displayName.toLowerCase()} products from the live catalog.`
        : `Browse ${displayName.toLowerCase()} products and collections.`),
    childCount: children.length,
    children,
  }
}

export const pickCategoriesPageTree = (categoryTree = [], flatCategories = []) =>
  buildShopSidebarTree(categoryTree, flatCategories)

export const formatChildCollectionMeta = (child = {}) => {
  const grandCount = Array.isArray(child.children) ? child.children.length : 0
  if (grandCount > 0) {
    return `${grandCount} ${grandCount === 1 ? 'collection' : 'collections'}`
  }
  return ''
}

export const getCategoryChildMeta = (child = {}) => formatChildCollectionMeta(child)

export const buildChildChipLabel = (child = {}, parentName = '') => {
  const meta = formatChildCollectionMeta(child)
  if (meta) {
    return `${child.displayName} · ${meta}`
  }
  if (parentName && child.parentName && child.parentName !== parentName) {
    return `${child.displayName} · ${child.parentName}`
  }
  return child.displayName || 'Category'
}

/** Root categories for /categories landing page (sorted, with nested children). */
export const buildCategoriesPageRoots = (categoryTree = [], flatCategories = []) => {
  const tree = pickCategoriesPageTree(categoryTree, flatCategories)
  return sortCategoriesPageRoots(tree).map((node) => mapCategoryBrowseNode(node))
}

/** Flat list of child and grandchild categories for "Popular collections". */
export const buildPopularCategoryCollections = (roots = [], limit = 12) => {
  const items = []
  const seen = new Set()

  const pushItem = (node, root) => {
    const id = getCategoryId(node)
    if (!id || seen.has(id)) return
    seen.add(id)
    const meta = formatChildCollectionMeta(node)
    items.push({
      ...node,
      rootName: root.displayName,
      subtitle: meta ? `${meta} under ${root.displayName}` : `Under ${root.displayName}`,
    })
  }

  roots.forEach((root) => {
    ;(root.children || []).forEach((child) => {
      if (items.length >= limit) return
      pushItem(child, root)
      ;(child.children || []).forEach((grandchild) => {
        if (items.length >= limit) return
        pushItem(grandchild, root)
      })
    })
  })

  return items.slice(0, limit)
}

/**
 * Build 8–10 homepage category cards from roots + useful subcategories.
 */
export const buildCategoryShowcaseCards = (categoryTree = [], flatCategories = [], limit = 10) => {
  const roots = sortRootsForShowcase(pickCategoriesPageTree(categoryTree, flatCategories))
  const cards = []
  const seen = new Set()

  const pushCard = (node, parentNode = null) => {
    const id = getCategoryId(node)
    if (!id || seen.has(id) || cards.length >= limit) return false
    seen.add(id)
    cards.push(toShowcaseCard(node, parentNode))
    return true
  }

  roots.forEach((root) => pushCard(root))

  const childCandidates = []

  roots.forEach((root) => {
    const children = [...(root.children || [])].sort(
      (left, right) => childPriority(left.slug) - childPriority(right.slug),
    )

    children.forEach((child) => {
      childCandidates.push({ node: child, parent: root })

      const grandchildren = [...(child.children || [])].sort(
        (left, right) => childPriority(left.slug) - childPriority(right.slug),
      )
      grandchildren.forEach((grandchild) => {
        childCandidates.push({ node: grandchild, parent: root })
      })
    })
  })

  childCandidates
    .sort((left, right) => childPriority(left.node.slug) - childPriority(right.node.slug))
    .forEach(({ node, parent }) => pushCard(node, parent))

  if (cards.length < limit) {
    const flatRoots = mapRawCategories(filterDisplayRootFlatList(flatCategories))
    flatRoots.forEach((root) => {
      if (cards.length >= limit) return
      const match = roots.find((item) => getCategoryId(item) === root.id)
      if (!match) pushCard({ ...root, children: [] })
    })
  }

  SYNTHETIC_LAUNCHERS.forEach((launcher) => {
    if (cards.length >= limit) return
    if (!seen.has(launcher.id)) {
      seen.add(launcher.id)
      cards.push(launcher)
    }
  })

  return cards.slice(0, limit)
}

export const mapRawCategories = (categories = []) => mapCategoriesToCards(categories)

export const pickFeaturedCategories = (categories = [], { limit = 8 } = {}) => {
  const displayRoots = filterDisplayRootFlatList(categories)
  const mappedRoots = mapRawCategories(displayRoots)

  const bySlug = new Map(
    mappedRoots.map((category) => [String(category.slug || '').toLowerCase(), category]),
  )

  const preferred = FEATURED_CATEGORY_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean)

  if (preferred.length > 0) {
    const preferredIds = new Set(preferred.map((category) => category.id))
    const others = mappedRoots.filter((category) => !preferredIds.has(category.id))
    return [...preferred, ...others].slice(0, limit)
  }

  return mappedRoots.slice(0, limit)
}

/** Preferred top-nav and shop quick-filter department slugs (max 5 in nav). */
export const TOP_NAV_DEPARTMENT_SLUGS = [
  'fashion',
  'electronics',
  'fitness',
  'home',
  'beauty',
]

export const TOP_NAV_DEPARTMENT_LIMIT = 5

/**
 * Preferred root category order for the header icon navigation row.
 * Each entry is a slug or list of slug aliases (first match wins).
 */
export const CATEGORY_ICON_NAV_SLUGS = [
  'fashion',
  'mobiles',
  'beauty',
  'electronics',
  'home',
  ['appliances', 'home-appliances'],
  ['toys-baby', 'toys', 'baby'],
  ['food-health', 'food', 'health'],
  'sports',
  ['books-stationery', 'books'],
  'furniture',
  'fitness',
  'footwear',
]

const resolveIconNavSlug = (entry) => (Array.isArray(entry) ? entry : [entry])

const mapIconNavRoot = (node = {}) => {
  const id = getCategoryId(node)
  const displayName = getCategoryDisplayName(node)
  const mapped = mapCategoriesToCards([node])[0] || {}

  return {
    ...node,
    id,
    slug: node.slug || mapped.slug || '',
    name: displayName,
    displayName,
    link: id ? `/shop?category=${encodeURIComponent(id)}` : '/shop',
    image: mapped.image || '',
    hasImage: Boolean(mapped.hasImage),
  }
}

/** Root categories for the Flipkart-style header icon navigation row. */
export const buildCategoryIconNavRoots = (categoryTree = [], flatCategories = []) => {
  const roots = buildShopSidebarTree(categoryTree, flatCategories)
  const bySlug = new Map(
    roots.map((node) => [String(node.slug || '').toLowerCase(), node]),
  )
  const picked = []
  const pickedIds = new Set()

  CATEGORY_ICON_NAV_SLUGS.forEach((entry) => {
    const aliases = resolveIconNavSlug(entry)
    const node = aliases.map((slug) => bySlug.get(String(slug).toLowerCase())).find(Boolean)
    if (!node) return

    const id = getCategoryId(node)
    if (!id || pickedIds.has(id)) return

    pickedIds.add(id)
    picked.push(mapIconNavRoot(node))
  })

  const extras = roots
    .filter((node) => {
      const id = getCategoryId(node)
      return id && !pickedIds.has(id)
    })
    .sort((left, right) =>
      String(left.name || '').localeCompare(String(right.name || '')),
    )
    .map((node) => mapIconNavRoot(node))

  return [...picked, ...extras]
}

const mapNavCategoryNode = (node = {}, { asChild = false } = {}) => {
  const id = getCategoryId(node)
  const displayName = getCategoryDisplayName(node, { asChild })
  const children = (node.children || []).map((child) =>
    mapNavCategoryNode(child, { asChild: true }),
  )

  return {
    ...node,
    id,
    name: displayName,
    displayName,
    children,
    link: node.link || `/shop?category=${encodeURIComponent(id)}`,
  }
}

/** Full category tree for All Categories mega menu and mobile accordion. */
export const buildAllCategoriesMenuTree = (categoryTree = [], flatCategories = []) =>
  buildShopSidebarTree(categoryTree, flatCategories).map((node) => mapNavCategoryNode(node))

/** Featured shortcuts in the All Categories mega menu right rail. */
export const MEGA_MENU_FEATURED_CARDS = [
  {
    id: 'new-arrivals',
    label: 'New Arrivals',
    subtitle: 'Latest products added',
    cta: 'Explore',
    href: '/shop?sortBy=createdAt&sortOrder=desc',
    tone: 'amber',
    icon: 'sparkles',
  },
  {
    id: 'deals',
    label: "Today's Deals",
    subtitle: 'Value across categories',
    cta: 'View deals',
    href: '/shop',
    tone: 'blue',
    icon: 'tag',
  },
  {
    id: 'shop-all',
    label: 'Shop All Products',
    subtitle: 'Browse the full catalog',
    cta: 'Shop now',
    href: '/shop',
    tone: 'slate',
    icon: 'bag',
  },
]

export const MEGA_MENU_FOOTER_LINKS = [
  { label: 'View all categories', href: '/categories' },
  { label: 'Shop all products', href: '/shop' },
  { label: 'Browse deals', href: '/shop' },
  { label: 'New arrivals', href: '/shop?sortBy=createdAt&sortOrder=desc' },
]

export const getMegaMenuDepartmentChildCount = (category = {}) => {
  const children = Array.isArray(category.children) ? category.children : []
  if (!children.length) return 0
  return children.length
}

export const formatMegaMenuChildCountLabel = (count = 0) => {
  if (!count) return 'Shop department'
  return `${count} ${count === 1 ? 'collection' : 'collections'}`
}

const MEGA_MENU_ROOT_ACCENTS = {
  fashion: 'rose',
  electronics: 'sky',
  fitness: 'emerald',
  footwear: 'amber',
  accessories: 'violet',
  home: 'slate',
  beauty: 'pink',
  books: 'cyan',
  food: 'lime',
  mobiles: 'indigo',
}

export const getMegaMenuRootAccent = (slug = '') =>
  MEGA_MENU_ROOT_ACCENTS[String(slug).toLowerCase()] || 'blue'

export const getMegaMenuInitialRootId = (categories = []) =>
  categories[0]?.id || categories[0]?.slug || ''

/** Limited root departments for the main top navigation bar. */
export const pickTopNavDepartments = (
  categoryTree = [],
  flatCategories = [],
  limit = TOP_NAV_DEPARTMENT_LIMIT,
) => {
  const roots = buildShopSidebarTree(categoryTree, flatCategories)
  const bySlug = new Map(roots.map((node) => [String(node.slug || '').toLowerCase(), node]))
  const picked = []

  TOP_NAV_DEPARTMENT_SLUGS.forEach((slug) => {
    if (picked.length >= limit) return
    const node = bySlug.get(slug)
    if (node) picked.push(mapNavCategoryNode(node))
  })

  return picked
}

/** Root categories for the shop page quick-filter strip. */
export const pickShopQuickFilterRoots = (categoryTree = [], flatCategories = []) => {
  const allRoots = buildAllCategoriesMenuTree(categoryTree, flatCategories)
  const preferred = pickTopNavDepartments(categoryTree, flatCategories)
  const preferredIds = new Set(preferred.map((item) => item.id))
  const more = allRoots.filter((item) => !preferredIds.has(item.id))

  return { preferred, more, all: allRoots }
}

export const pickNavRootCategories = (categoryTree = [], flatCategories = []) =>
  filterNavRootCategories(categoryTree, flatCategories)

export { buildShopSidebarTree, getCategoryDisplayName } from './categoryLegacy.js'

export const isShopPath = (pathname = '') =>
  pathname === '/products' ||
  pathname === '/shop' ||
  pathname.startsWith('/products/')

export const buildStoreCategoryTree = (categories = []) => buildCategoryTree(categories)
