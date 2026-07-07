import React from 'react'
import ProductCard from './ProductCard.jsx'
import { getProductCardId, getProductRowGridClass } from '../../lib/productMappers.js'

export default function ProductGrid({
  products = [],
  loading = false,
  error = '',
  emptyMessage = 'No products found.',
  currencySymbol = '$',
  gridClass = '',
  skeletonClass = '',
  variant = 'default',
  layout = 'grid',
  skeletonCount = 5,
  hideEmpty = false,
  fitContent = false,
  onRetry,
  emptyState = null,
}) {
  const resolvedGridClass =
    gridClass ||
    (layout === 'scroll'
      ? ''
      : fitContent
        ? 'velmora-product-grid-fit'
        : getProductRowGridClass(products.length || skeletonCount, variant))

  if (loading) {
    const count = layout === 'scroll' ? 6 : skeletonCount

    if (layout === 'scroll') {
      return (
        <div className="velmora-product-scroll-rail">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="velmora-product-scroll-item">
              <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-2.5 animate-pulse h-full">
                <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg mb-2.5" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className={resolvedGridClass}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={
              skeletonClass ||
              'rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-2.5 animate-pulse'
            }
          >
            <div className={`${variant === 'compact' ? 'aspect-square' : 'h-56'} bg-slate-200 dark:bg-slate-800 rounded-lg mb-2.5`} />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300 text-sm">
        <p>{error}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 btn bg-primary hover:bg-primary-dark text-white rounded-md text-sm px-4 py-2"
          >
            Retry
          </button>
        ) : null}
      </div>
    )
  }

  if (!products.length) {
    if (hideEmpty) return null
    if (emptyState) return emptyState

    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 text-sm">
        {emptyMessage}
      </div>
    )
  }

  if (layout === 'scroll') {
    return (
      <div className="velmora-product-scroll-rail">
        {products.map((product) => (
          <div key={getProductCardId(product)} className="velmora-product-scroll-item">
            <ProductCard product={product} currencySymbol={currencySymbol} variant={variant} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={resolvedGridClass}>
      {products.map((product) => (
        <ProductCard
          key={getProductCardId(product)}
          product={product}
          currencySymbol={currencySymbol}
          variant={variant}
        />
      ))}
    </div>
  )
}
