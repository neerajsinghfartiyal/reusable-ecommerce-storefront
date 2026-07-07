import React from 'react'
import { formatProductPrice, resolveProductImageUrl } from '../../lib/productMappers.js'

export default function OrderSuccessItems({ items = [], currencySymbol = '$' }) {
  if (!items.length) return null

  return (
    <div className="velmora-order-card p-0 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-gray-800">
        <h2 className="velmora-order-card-title mb-0">Items ordered</h2>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-gray-800">
        {items.map((item, index) => {
          const imageUrl = resolveProductImageUrl(item.image)
          const lineKey = `${item.sku || item.productName}-${index}`

          return (
            <li key={lineKey} className="px-5 sm:px-6 py-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="size-16 shrink-0 rounded-lg border border-slate-200 dark:border-gray-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.productName}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#64748B]">
                      {String(item.productName || 'P').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#111827] dark:text-white">{item.productName}</p>
                  {item.variantTitle ? (
                    <p className="text-sm text-[#64748B] mt-1">{item.variantTitle}</p>
                  ) : null}
                  {item.variantOptionsLabel ? (
                    <p className="text-xs text-[#64748B] mt-1">{item.variantOptionsLabel}</p>
                  ) : null}
                  {item.sku ? (
                    <p className="text-xs text-[#64748B] mt-1 uppercase tracking-wide">
                      SKU: {item.sku}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-[#64748B]">
                      Qty {item.quantity} · {formatProductPrice(item.price, currencySymbol)} each
                    </span>
                    <span className="font-semibold text-[#111827] dark:text-white">
                      {formatProductPrice(item.total, currencySymbol)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
