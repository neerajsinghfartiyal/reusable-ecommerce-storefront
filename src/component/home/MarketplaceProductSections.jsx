import React, { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../../api/catalogApi.js'
import { mapProductsToCards } from '../../lib/productMappers.js'
import ProductRowSection from './ProductRowSection.jsx'
import {
  HOMEPAGE_CATEGORY_ROW_SLUGS,
  HOMEPAGE_EXTRA_CATEGORY_SLUGS,
  HOMEPAGE_MIN_ROW_PRODUCTS,
  HOMEPAGE_PRODUCTS_PER_ROW,
  UsedProductTracker,
  getHomepageCategoryCopy,
  pickBestPicksProducts,
  pickCategoryRowProducts,
  pickRecommendedProducts,
  pickTrendingDealProducts,
  rowsHaveSameProducts,
} from './homepageProductRows.js'

const PRIMARY_CATEGORY_SLUGS = new Set(HOMEPAGE_CATEGORY_ROW_SLUGS)
const EXTRA_CATEGORY_SLUGS = new Set(HOMEPAGE_EXTRA_CATEGORY_SLUGS)
const MAX_EXTRA_CATEGORY_ROWS = 2

function MarketplaceRow({ section, currencySymbol }) {
  return (
    <ProductRowSection
      products={section.products}
      loading={section.loading}
      error={section.error}
      currencySymbol={currencySymbol}
      title={section.title}
      badge={section.badge}
      description={section.description}
      viewAllHref={section.viewAllHref}
      viewAllLabel={section.viewAllLabel}
      minProducts={HOMEPAGE_MIN_ROW_PRODUCTS}
      commercial
      tinted={section.tinted}
    />
  )
}

export default function MarketplaceProductSections({
  categories = [],
  latestProducts = [],
  currencySymbol = '$',
  loadingLatest = false,
  latestError = '',
}) {
  const [categoryProductsBySlug, setCategoryProductsBySlug] = useState({})
  const [loadingCategories, setLoadingCategories] = useState(true)

  const fetchCategories = useMemo(
    () =>
      categories.filter((category) => {
        const slug = String(category.slug || '').toLowerCase()
        return PRIMARY_CATEGORY_SLUGS.has(slug) || EXTRA_CATEGORY_SLUGS.has(slug)
      }),
    [categories],
  )

  useEffect(() => {
    let active = true

    const loadCategoryProducts = async () => {
      if (!fetchCategories.length) {
        setCategoryProductsBySlug({})
        setLoadingCategories(false)
        return
      }

      setLoadingCategories(true)

      try {
        const entries = await Promise.all(
          fetchCategories.map(async (category) => {
            const slug = String(category.slug || '').toLowerCase()

            try {
              const result = await getProducts({
                category: category.id,
                limit: HOMEPAGE_PRODUCTS_PER_ROW + 2,
                sortBy: 'createdAt',
                sortOrder: 'desc',
              })

              return [slug, mapProductsToCards(result.products || [])]
            } catch {
              return [slug, []]
            }
          }),
        )

        if (!active) return
        setCategoryProductsBySlug(Object.fromEntries(entries))
      } finally {
        if (active) setLoadingCategories(false)
      }
    }

    loadCategoryProducts()

    return () => {
      active = false
    }
  }, [fetchCategories])

  const sections = useMemo(() => {
    if (loadingLatest) {
      return [
        {
          key: 'best-picks',
          loading: true,
          products: [],
          title: "Today's Best Picks",
          badge: 'Fresh products from inventory',
          description: 'New and noteworthy products with live catalog pricing.',
          viewAllHref: '/shop',
          viewAllLabel: 'Shop all',
          tinted: false,
        },
      ]
    }

    const tracker = new UsedProductTracker()
    const built = []

    const bestPicks = pickBestPicksProducts(latestProducts, tracker)
    if (bestPicks.length >= HOMEPAGE_MIN_ROW_PRODUCTS) {
      built.push({
        key: 'best-picks',
        products: bestPicks,
        title: "Today's Best Picks",
        badge: 'Fresh products from inventory',
        description: 'New and noteworthy products with live catalog pricing.',
        viewAllHref: '/shop',
        viewAllLabel: 'Shop all',
        tinted: false,
      })
    }

    const trending = pickTrendingDealProducts(latestProducts, tracker)
    if (
      trending.length >= HOMEPAGE_MIN_ROW_PRODUCTS &&
      !rowsHaveSameProducts(built[built.length - 1]?.products, trending)
    ) {
      built.push({
        key: 'trending-deals',
        products: trending,
        title: 'Trending Deals',
        badge: 'Live catalog prices',
        description: 'Discounted picks with strong value from the current catalog.',
        viewAllHref: '/shop',
        viewAllLabel: 'View deals',
        tinted: true,
      })
    }

    let extraRowsAdded = 0
    const sparseProducts = []

    HOMEPAGE_CATEGORY_ROW_SLUGS.forEach((slug, index) => {
      const category = categories.find((item) => String(item.slug || '').toLowerCase() === slug)
      if (!category) return

      const products = pickCategoryRowProducts(categoryProductsBySlug[slug] || [], tracker)
      if (!products.length) {
        const leftovers = (categoryProductsBySlug[slug] || []).filter((product) => !tracker.has(product))
        sparseProducts.push(...leftovers)
        return
      }

      const previous = built[built.length - 1]?.products
      if (rowsHaveSameProducts(previous, products)) return

      const copy = getHomepageCategoryCopy(category)
      built.push({
        key: `category-${slug}`,
        products,
        title: copy.title,
        badge: copy.badge,
        description: copy.description,
        viewAllHref: category.link || '/shop',
        viewAllLabel: `Shop ${category.name}`,
        tinted: (built.length + index) % 2 === 1,
      })
    })

    HOMEPAGE_EXTRA_CATEGORY_SLUGS.forEach((slug) => {
      if (extraRowsAdded >= MAX_EXTRA_CATEGORY_ROWS) return

      const category = categories.find((item) => String(item.slug || '').toLowerCase() === slug)
      if (!category) return

      const products = pickCategoryRowProducts(categoryProductsBySlug[slug] || [], tracker)
      if (!products.length) return

      const previous = built[built.length - 1]?.products
      if (rowsHaveSameProducts(previous, products)) return

      const copy = getHomepageCategoryCopy(category)
      built.push({
        key: `category-${slug}`,
        products,
        title: copy.title,
        badge: copy.badge,
        description: copy.description,
        viewAllHref: category.link || '/shop',
        viewAllLabel: `Shop ${category.name}`,
        tinted: built.length % 2 === 1,
      })
      extraRowsAdded += 1
    })

    const recommended = pickRecommendedProducts(latestProducts, tracker, sparseProducts)
    if (
      recommended.length >= HOMEPAGE_MIN_ROW_PRODUCTS &&
      !rowsHaveSameProducts(built[built.length - 1]?.products, recommended)
    ) {
      built.push({
        key: 'recommended',
        products: recommended,
        title: 'Recommended For You',
        badge: 'Live catalog prices',
        description:
          sparseProducts.length > 0
            ? 'Hand-picked products including highlights from smaller collections.'
            : 'Curated picks from across categories in the live catalog.',
        viewAllHref: '/shop',
        viewAllLabel: 'Explore more',
        tinted: built.length % 2 === 1,
      })
    }

    return built
  }, [categories, categoryProductsBySlug, latestProducts, loadingLatest])

  return (
    <>
      {sections.map((section) => (
        <MarketplaceRow
          key={section.key}
          section={{
            ...section,
            loading: section.loading || (section.key.startsWith('category-') && loadingCategories),
            error: section.key === 'best-picks' ? latestError : '',
          }}
          currencySymbol={currencySymbol}
        />
      ))}
    </>
  )
}
