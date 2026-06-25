import React from 'react'
import { Link } from 'react-router-dom'
import { formatProductPrice } from '../../lib/productMappers.js'

export default function ProductCard({ product, currencySymbol = '$' }) {
  if (!product) return null

  return (
    <div className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
      <div className="relative">
        <img src={product.image} alt={product.title} className="h-56 w-full object-cover" />

        <div className="absolute top-4 inset-e-4">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              product.inStock
                ? 'bg-emerald-500/90 text-white'
                : 'bg-slate-700/90 text-white'
            }`}
          >
            {product.inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="pb-4">
          <Link
            to={product.detailPath || '#'}
            className="text-lg hover:text-primary font-medium ease-in-out duration-500 line-clamp-2"
          >
            {product.title}
          </Link>
          {product.categoryName ? (
            <p className="text-slate-400 text-sm mt-2">{product.categoryName}</p>
          ) : null}
        </div>

        <ul className="py-4 border-y border-slate-100 dark:border-gray-800 flex flex-wrap items-center gap-4 list-none text-sm text-slate-500">
          {product.sku ? <li>SKU: {product.sku}</li> : null}
          {product.brandName ? <li>{product.brandName}</li> : null}
          {product.quantity != null ? <li>Qty: {product.quantity}</li> : null}
        </ul>

        <div className="pt-6 flex justify-between items-center">
          <div>
            <span className="text-slate-400 text-sm">Price</span>
            <p className="text-lg font-medium">
              {formatProductPrice(product.price, currencySymbol)}
              {product.compareAtPrice != null ? (
                <span className="ms-2 text-sm text-slate-400 line-through">
                  {formatProductPrice(product.compareAtPrice, currencySymbol)}
                </span>
              ) : null}
            </p>
          </div>

          <Link
            to={product.detailPath || '#'}
            className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md text-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
