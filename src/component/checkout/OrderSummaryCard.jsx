import React from 'react'
import { formatProductPrice } from '../../lib/productMappers.js'

export default function OrderSummaryCard({
  title = 'Order Summary',
  items = [],
  itemCount = 0,
  subtotal = 0,
  shippingAmount = 0,
  discountAmount = 0,
  totalAmount = 0,
  currencySymbol = '$',
  selectedShippingMethod,
  selectedPaymentMethod,
  shippingNote,
  children,
  footer,
  showLineItems = true,
}) {
  const countLabel = itemCount === 1 ? '1 item' : `${itemCount} items`

  return (
    <aside className="velmora-order-summary">
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-gray-800">
        <h2 className="text-lg font-bold text-[#111827] dark:text-white">{title}</h2>
        {itemCount > 0 ? (
          <p className="text-sm text-[#64748B] mt-1">{countLabel}</p>
        ) : null}
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {showLineItems && items.length > 0 ? (
          <ul className="list-none space-y-3 text-sm max-h-48 overflow-y-auto">
            {items.map((item) => (
              <li key={item.lineKey || item.productId} className="flex justify-between gap-3">
                <span className="text-[#64748B] line-clamp-3 min-w-0">
                  <span className="block text-[#111827] dark:text-white font-medium">{item.name}</span>
                  {item.variantTitle ? (
                    <span className="block text-xs mt-0.5">{item.variantTitle}</span>
                  ) : null}
                  {item.variantOptionsLabel ? (
                    <span className="block text-xs mt-0.5">{item.variantOptionsLabel}</span>
                  ) : null}
                  <span className="text-[#111827] dark:text-white font-medium">
                    {' '}
                    × {item.quantity}
                  </span>
                </span>
                <span className="font-semibold text-[#111827] dark:text-white shrink-0">
                  {formatProductPrice(item.total, currencySymbol)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <dl className="space-y-2.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-[#64748B]">Subtotal</dt>
            <dd className="font-medium text-[#111827] dark:text-white">
              {formatProductPrice(subtotal, currencySymbol)}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#64748B]">Shipping</dt>
            <dd className="font-medium text-[#111827] dark:text-white">
              {formatProductPrice(shippingAmount, currencySymbol)}
            </dd>
          </div>
          {shippingNote ? (
            <p className="text-xs text-[#64748B] leading-relaxed">{shippingNote}</p>
          ) : null}
          {discountAmount > 0 ? (
            <div className="flex justify-between gap-3">
              <dt className="text-[#64748B]">Discount</dt>
              <dd className="font-medium text-emerald-600">
                -{formatProductPrice(discountAmount, currencySymbol)}
              </dd>
            </div>
          ) : null}
          {selectedShippingMethod?.name ? (
            <p className="text-xs text-[#64748B]">
              Shipping: <span className="font-medium">{selectedShippingMethod.name}</span>
            </p>
          ) : null}
          {selectedPaymentMethod?.name ? (
            <p className="text-xs text-[#64748B]">
              Payment: <span className="font-medium">{selectedPaymentMethod.name}</span>
            </p>
          ) : null}
          <div className="flex justify-between gap-3 pt-3 border-t border-slate-200 dark:border-gray-700 text-base">
            <dt className="font-bold text-[#111827] dark:text-white">Total</dt>
            <dd className="font-bold text-[#111827] dark:text-white">
              {formatProductPrice(totalAmount, currencySymbol)}
            </dd>
          </div>
        </dl>

        {children}
        {footer}
      </div>
    </aside>
  )
}
