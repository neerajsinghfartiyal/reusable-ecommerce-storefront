import React from 'react'
import ProductGrid from './ProductGrid.jsx'

export default function Property({
  products = [],
  loading = false,
  error = '',
  title = 'Featured Products',
  description = 'Browse the latest products from our store catalog.',
  currencySymbol = '$',
}) {
  return (
    <div className="container lg:mt-24 mt-16">
      <div className="grid grid-cols-1 pb-8 text-center">
        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
          {title}
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
      </div>

      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        currencySymbol={currencySymbol}
        emptyMessage="No featured products are available right now."
      />
    </div>
  )
}
