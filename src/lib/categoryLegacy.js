const getCategoryId = (category = {}) =>
  String(category.id || category._id || category.categoryId || '')

export const getParentId = (category = {}) => {
  const parent = category.parentId ?? category.parent
  if (!parent) return null
  if (typeof parent === 'object') {
    return String(parent.id || parent._id || '') || null
  }
  return String(parent) || null
}

const normalizeName = (value = '') => String(value || '').trim().replace(/\s+/g, ' ')

const KNOWN_ROOT_PREFIXES = ['fashion', 'electronics', 'footwear', 'fitness']

export const parseLegacyCategoryName = (name = '') => {
  const text = normalizeName(name)
  if (!text) return []

  if (text.includes('>')) {
    return text
      .split('>')
      .map((part) => normalizeName(part))
      .filter(Boolean)
  }

  if (text.includes('/')) {
    return text
      .split('/')
      .map((part) => normalizeName(part))
      .filter(Boolean)
  }

  const lower = text.toLowerCase()

  for (const root of KNOWN_ROOT_PREFIXES) {
    if (lower.startsWith(`${root} `) && lower !== root) {
      const child = normalizeName(text.slice(root.length))
      if (child) {
        const rootLabel = text.slice(0, root.length).trim()
        return [normalizeName(rootLabel || root), child]
      }
    }
  }

  if (lower.endsWith(' accessories') && lower !== 'accessories') {
    const splitAt = lower.lastIndexOf(' accessories')
    const root = normalizeName(text.slice(0, splitAt))
    if (root) return [root, 'Accessories']
  }

  return [text]
}

export const isLegacyFlatCategory = (category = {}) => {
  if (category.isLegacyFlat || category.categoryRole === 'legacy-flat') return true
  if (getParentId(category)) return false
  const parts = parseLegacyCategoryName(category.name)
  return parts.length > 1
}

export const hasLegacyFlatCategoryName = (name = '') => {
  const text = normalizeName(name)
  if (!text) return false
  if (text.includes(' / ') || text.includes(' > ')) return true
  return parseLegacyCategoryName(text).length > 1
}

export const shouldHideAsRootCard = (category = {}) => {
  if (getParentId(category)) return true
  if (isLegacyFlatCategory(category)) return true
  if (hasLegacyFlatCategoryName(category.name)) return true
  return false
}

export const isDisplayRootCategory = (category = {}) => {
  if (shouldHideAsRootCard(category)) return false
  return true
}

export const getCategoryDisplayName = (category = {}, { asChild = false } = {}) => {
  const name = normalizeName(category?.name || category?.displayName || '')
  if (!name) return 'Category'

  const showChildSegment =
    asChild || Boolean(getParentId(category)) || isLegacyFlatCategory(category)

  if (showChildSegment) {
    const parts = parseLegacyCategoryName(name)
    if (parts.length > 1) {
      return parts[parts.length - 1]
    }
  }

  return name
}

export const getCategoryRole = (category = {}, allCategories = []) => {
  if (isLegacyFlatCategory(category, allCategories)) return 'legacy-flat'
  if (!getParentId(category)) return 'root'

  const parent = (Array.isArray(allCategories) ? allCategories : []).find(
    (item) => getCategoryId(item) === getParentId(category),
  )

  if (!parent || !getParentId(parent)) return 'subcategory'
  return 'child'
}

export const filterNavRootCategories = (tree = [], flatCategories = []) => {
  const flat = Array.isArray(flatCategories) ? flatCategories : []
  return (Array.isArray(tree) ? tree : []).filter((node) => isDisplayRootCategory(node, flat))
}

export const isTestDemoCategoryName = (name = '') => {
  const lower = String(name || '').toLowerCase()
  return /\b(test|demo|sample)\b/.test(lower)
}

export const isTestDemoCategory = (category = {}) =>
  isTestDemoCategoryName(category?.name)

export const filterDisplayRootFlatList = (categories = []) => {
  const flat = Array.isArray(categories) ? categories : []
  return flat.filter(
    (category) =>
      isDisplayRootCategory(category) && !isTestDemoCategoryName(category?.name),
  )
}

const cloneTreeNode = (node = {}) => ({
  ...node,
  id: getCategoryId(node),
  children: (node.children || []).map(cloneTreeNode),
})

export const buildShopSidebarTree = (tree = [], flatCategories = []) => {
  const flat = Array.isArray(flatCategories) ? flatCategories : []
  const displayRoots = filterNavRootCategories(tree, flat).map(cloneTreeNode)
  const rootByName = new Map(
    displayRoots.map((node) => [String(node.name || '').toLowerCase(), node]),
  )

  flat.filter(isLegacyFlatCategory).forEach((legacy) => {
    const parts = parseLegacyCategoryName(legacy.name)
    if (parts.length < 2) return

    const rootKey = parts[0].toLowerCase()
    const rootNode = rootByName.get(rootKey)
    if (!rootNode) return

    const leafName = parts[parts.length - 1]
    const legacyId = getCategoryId(legacy)
    const alreadyNested = rootNode.children.some(
      (child) => getCategoryId(child) === legacyId,
    )

    if (!alreadyNested) {
      rootNode.children.push({
        ...legacy,
        id: legacyId,
        name: leafName,
        children: [],
      })
    }
  })

  const sortNodes = (list) => {
    list.sort((left, right) =>
      String(left.name || '').localeCompare(String(right.name || '')),
    )
    list.forEach((node) => sortNodes(node.children || []))
    return list
  }

  return sortNodes(displayRoots)
}
