const getCategoryId = (category = {}) =>
  String(category.id || category._id || category.categoryId || '')

const getParentId = (category = {}) => {
  const parent = category.parentId ?? category.parent
  if (!parent) return null
  if (typeof parent === 'object') {
    return String(parent.id || parent._id || '') || null
  }
  return String(parent) || null
}

export const buildCategoryTree = (categories = []) => {
  const nodes = (Array.isArray(categories) ? categories : []).map((category) => ({
    ...category,
    id: getCategoryId(category),
    parentId: getParentId(category),
    children: [],
  }))

  const byId = new Map(nodes.map((node) => [node.id, node]))
  const roots = []

  nodes.forEach((node) => {
    if (node.parentId && byId.has(node.parentId)) {
      byId.get(node.parentId).children.push(node)
    } else if (!node.parentId) {
      roots.push(node)
    }
  })

  const sortNodes = (list) => {
    list.sort((left, right) => {
      const sortDiff = Number(left.sortOrder || 0) - Number(right.sortOrder || 0)
      if (sortDiff !== 0) return sortDiff
      return String(left.name || '').localeCompare(String(right.name || ''))
    })
    list.forEach((node) => sortNodes(node.children))
    return list
  }

  return sortNodes(roots)
}

export const flattenCategoryTree = (nodes = [], depth = 0) => {
  const items = []

  nodes.forEach((node) => {
    items.push({ ...node, depth })
    items.push(...flattenCategoryTree(node.children || [], depth + 1))
  })

  return items
}

export const getRootCategories = (categories = []) => {
  const tree = buildCategoryTree(categories)
  return tree
}

export const getCategoryPathFromFlat = (categoryId, categories = []) => {
  const byId = new Map(
    (Array.isArray(categories) ? categories : []).map((category) => [
      getCategoryId(category),
      category,
    ]),
  )

  const parts = []
  let current = byId.get(String(categoryId))

  while (current) {
    parts.unshift({
      id: getCategoryId(current),
      name: current.name,
      slug: current.slug,
    })
    const parentId = getParentId(current)
    current = parentId ? byId.get(parentId) : null
  }

  return parts
}
