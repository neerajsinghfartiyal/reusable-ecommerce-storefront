import { useEffect, useState } from 'react'
import { getCategories } from '../api/catalogApi.js'
import { pickFeaturedCategories, mapRawCategories } from '../lib/categoryHelpers.js'
import { buildCategoryTree } from '../lib/categoryTree.js'
import { mapCategoryToCard } from '../lib/productMappers.js'

const mapTreeNodes = (nodes = []) =>
  nodes.map((node) => {
    const mapped = mapCategoryToCard(node)
    return {
      ...mapped,
      children: mapTreeNodes(node.children || []),
    }
  })

export function useStoreCategories({ featuredOnly = false, featuredLimit = 4 } = {}) {
  const [categories, setCategories] = useState([])
  const [categoryTree, setCategoryTree] = useState([])
  const [rawCategories, setRawCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getCategories({ tree: true })
        if (!active) return

        const flatList = Array.isArray(data?.categories)
          ? data.categories
          : Array.isArray(data)
            ? data
            : []
        const tree = mapTreeNodes(
          Array.isArray(data?.tree) ? data.tree : buildCategoryTree(flatList),
        )

        setRawCategories(flatList)
        setCategoryTree(tree)

        const mapped = mapRawCategories(flatList)
        setCategories(
          featuredOnly ? pickFeaturedCategories(flatList, { limit: featuredLimit }) : mapped,
        )
      } catch (err) {
        if (!active) return
        setCategories([])
        setCategoryTree([])
        setRawCategories([])
        setError(err?.message || 'Could not load categories.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [featuredLimit, featuredOnly])

  return { categories, categoryTree, rawCategories, loading, error }
}
