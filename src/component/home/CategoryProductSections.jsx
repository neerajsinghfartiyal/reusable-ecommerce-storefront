import React, { useEffect, useState } from 'react'
import { getProducts } from '../../api/catalogApi.js'
import { mapProductsToCards } from '../../lib/productMappers.js'
import ProductShowcaseSection from './ProductShowcaseSection.jsx'

const CATEGORY_SECTION_COPY = {
  fashion: {
    title: 'Fashion Finds',
    description: 'Curated styles and everyday essentials for the way you dress.',
  },
  electronics: {
    title: 'Electronics Essentials',
    description: 'Smart devices and gear for work, home, and on the go.',
  },
  footwear: {
    title: 'Footwear Picks',
    description: 'Step into comfort and performance with our latest footwear.',
  },
  fitness: {
    title: 'Fitness Essentials',
    description: 'Equipment and activewear to support your routine.',
  },
}

const getSectionCopy = (category = {}) => {
  const slug = String(category.slug || '').toLowerCase()
  return (
    CATEGORY_SECTION_COPY[slug] || {
      title: category.name,
      description: `Curated ${String(category.name || 'category').toLowerCase()} picks from our catalog.`,
    }
  )
}

export default function CategoryProductSections({
  categories = [],
  currencySymbol = '$',
  productsPerCategory = 4,
}) {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadSections = async () => {
      if (!categories.length) {
        setSections([])
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            try {
              const result = await getProducts({
                category: category.id,
                limit: productsPerCategory,
                sortBy: 'createdAt',
                sortOrder: 'desc',
              })

              return {
                category,
                products: mapProductsToCards(result.products),
              }
            } catch {
              return {
                category,
                products: [],
              }
            }
          }),
        )

        if (!active) return
        setSections(results.filter((section) => section.products.length > 0))
      } finally {
        if (active) setLoading(false)
      }
    }

    loadSections()

    return () => {
      active = false
    }
  }, [categories, productsPerCategory])

  if (loading) {
    return (
      <ProductShowcaseSection
        loading
        title="Shop by Category"
        description="Fetching curated category collections."
        currencySymbol={currencySymbol}
      />
    )
  }

  if (!sections.length) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        const copy = getSectionCopy(section.category)

        return (
          <ProductShowcaseSection
            key={section.category.id || section.category.slug}
            products={section.products}
            title={copy.title}
            description={copy.description}
            currencySymbol={currencySymbol}
            viewAllHref={section.category.link}
            viewAllLabel={`Shop all ${section.category.name}`}
            gridClass="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5"
            emptyMessage={`No ${section.category.name.toLowerCase()} products yet.`}
          />
        )
      })}
    </>
  )
}
