import React, { useMemo } from 'react'
import { getRecentlyViewedProducts } from '../../lib/productMappers.js'
import ProductHorizontalRail from './ProductHorizontalRail.jsx'

export default function RecentlyViewedProducts({ excludeProductId, currencySymbol = '$' }) {
  const products = useMemo(
    () => getRecentlyViewedProducts(excludeProductId),
    [excludeProductId],
  )

  if (!products.length) return null

  return (
    <ProductHorizontalRail
      title="Recently viewed"
      badge="Your browsing"
      subtitle="Compact picks from products you opened earlier"
      products={products}
      currencySymbol={currencySymbol}
      viewAllLink="/shop"
      viewAllLabel="Browse shop"
    />
  )
}
