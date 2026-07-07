import React, { useEffect, useState } from 'react'
import { getProducts } from '../../api/catalogApi.js'
import { mapProductsToCards } from '../../lib/productMappers.js'
import ProductHorizontalRail from './ProductHorizontalRail.jsx'

export default function RelatedProducts({
  productId,
  categoryId,
  categoryName = '',
  currencySymbol = '$',
}) {
  const [relatedProducts, setRelatedProducts] = useState(null)

  useEffect(() => {
    if (!categoryId) return undefined

    let active = true

    const loadRelated = async () => {
      try {
        const { products } = await getProducts({
          category: categoryId,
          limit: 12,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        })

        if (!active) return

        const cards = mapProductsToCards(products)
          .filter((item) => item.id !== productId)
          .slice(0, 10)

        setRelatedProducts(cards)
      } catch {
        if (active) setRelatedProducts([])
      }
    }

    loadRelated()

    return () => {
      active = false
    }
  }, [categoryId, productId])

  if (!categoryId) return null

  if (relatedProducts === null) {
    return (
      <section className="velmora-pdp-rail-section mt-10 md:mt-14">
        <h2 className="text-xl font-bold text-[#111827] dark:text-white">Related products</h2>
        <p className="text-sm text-[#64748B] mt-2">Loading related products...</p>
      </section>
    )
  }

  return (
    <ProductHorizontalRail
      title="More like this"
      badge="Live catalog prices"
      subtitle={categoryName ? `Customers also viewed in ${categoryName}` : 'Similar products from this category'}
      products={relatedProducts}
      currencySymbol={currencySymbol}
      viewAllLink={`/shop?category=${encodeURIComponent(categoryId)}`}
      viewAllLabel="View all in category"
    />
  )
}
