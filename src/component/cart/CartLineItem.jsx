import React from 'react'
import { Link } from 'react-router-dom'
import { formatProductPrice } from '../../lib/productMappers.js'

export default function CartLineItem({
  item,
  currencySymbol,
  isUpdating,
  onQuantityChange,
  onRemove,
}) {
  return (
    <article className="velmora-section-panel p-4 sm:p-5">
      <div className="flex gap-4">
        <Link to={item.detailPath} className="velmora-cart-line-media block shrink-0">
          <img src={item.image} alt={item.name} />
        </Link>

        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:gap-4">
          <div className="flex-1 min-w-0">
            <Link
              to={item.detailPath}
              className="text-base font-semibold text-[#111827] dark:text-white hover:text-primary line-clamp-2"
            >
              {item.name}
            </Link>
            {item.sku ? (
              <p className="text-xs text-[#64748B] mt-1 uppercase tracking-wide">
                SKU: {item.sku}
              </p>
            ) : null}
            <p className="mt-2 text-sm font-semibold text-[#111827] dark:text-white">
              {formatProductPrice(item.price, currencySymbol)}
              <span className="text-[#64748B] font-normal"> each</span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label
                className="text-xs font-semibold text-[#64748B] uppercase tracking-wide"
                htmlFor={`qty-${item.productId}`}
              >
                Qty
              </label>
              <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-gray-700 overflow-hidden">
                <button
                  type="button"
                  disabled={isUpdating || item.quantity <= 1}
                  onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
                  className="px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span
                  id={`qty-${item.productId}`}
                  className="px-3 py-1.5 min-w-10 text-center text-sm font-semibold border-x border-slate-200 dark:border-gray-700"
                >
                  {item.quantity}
                </span>
                <button
                  type="button"
                  disabled={
                    isUpdating ||
                    (item.maxQuantity != null && item.quantity >= item.maxQuantity)
                  }
                  onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
                  className="px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                disabled={isUpdating}
                onClick={() => onRemove(item.productId)}
                className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="mt-3 sm:mt-0 text-start sm:text-end shrink-0">
            <p className="text-xs text-[#64748B] uppercase tracking-wide sm:hidden">Line total</p>
            <p className="text-lg font-bold text-[#111827] dark:text-white">
              {formatProductPrice(item.total, currencySymbol)}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
