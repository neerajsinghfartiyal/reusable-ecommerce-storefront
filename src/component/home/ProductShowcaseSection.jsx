import React from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../Properties/ProductGrid.jsx'

export default function ProductShowcaseSection({
  products = [],
  loading = false,
  error = '',
  title = 'Featured Products',
  description = 'Hand-picked products from our catalog.',
  currencySymbol = '$',
  viewAllHref = '/shop',
  viewAllLabel = 'View all products',
  gridClass = 'grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5',
  emptyMessage = 'No products are available right now.',
}) {
  return (
    <div className="container lg:mt-24 mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
        <div>
          <h3 className="mb-2 md:text-3xl text-2xl font-semibold text-[#111827] dark:text-white">{title}</h3>
          <p className="text-[#64748B] max-w-xl">{description}</p>
        </div>
        <Link to={viewAllHref} className="text-primary hover:underline text-sm font-medium">
          {viewAllLabel}
        </Link>
      </div>

      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        currencySymbol={currencySymbol}
        emptyMessage={emptyMessage}
        gridClass={gridClass}
      />
    </div>
  )
}
