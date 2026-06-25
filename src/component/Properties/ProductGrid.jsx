import React from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid({
  products = [],
  loading = false,
  error = '',
  emptyMessage = 'No products found.',
  currencySymbol = '$',
  gridClass = 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5',
}) {
  if (loading) {
    return (
      <div className={`${gridClass}`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl bg-white dark:bg-slate-900 shadow-sm p-6 animate-pulse"
          >
            <div className="h-56 bg-slate-200 dark:bg-slate-800 rounded-md mb-4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
        {error}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id || product.slug || product.title}
          product={product}
          currencySymbol={currencySymbol}
        />
      ))}
    </div>
  )
}
