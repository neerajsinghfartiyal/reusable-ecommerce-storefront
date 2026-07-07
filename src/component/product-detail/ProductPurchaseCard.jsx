import React from 'react'
import { Link } from 'react-router-dom'
import { FiCreditCard, FiLock, FiTruck } from 'react-icons/fi'
import { formatProductPrice } from '../../lib/productMappers.js'
import ProductVariantSelector from './ProductVariantSelector.jsx'

export default function ProductPurchaseCard({
  product,
  baseProduct,
  currencySymbol,
  quantity,
  onQuantityChange,
  selectedVariantId = '',
  onVariantSelect,
  onAddToCart,
  onBuyNow,
  isAdding,
  addError,
  addSuccess,
  actionOnly = false,
  className = '',
}) {
  if (!product) return null

  const variantSource = baseProduct || product
  const hasVariants = Boolean(variantSource?.hasVariants && variantSource?.variants?.length)
  const requiresSelection = hasVariants && product.requiresVariantSelection
  const canPurchase = product.inStock && !requiresSelection
  const maxQuantity = product.quantity > 0 ? product.quantity : 1

  return (
    <aside className={`velmora-pdp-buybox velmora-pdp-buybox-premium ${className}`}>
      {!actionOnly ? (
        <div className="velmora-pdp-buybox-pricehead">
          <p className="velmora-pdp-price-label">Your price</p>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="velmora-pdp-price-main text-2xl">
              {formatProductPrice(product.price, currencySymbol)}
            </span>
            {product.compareAtPrice != null ? (
              <span className="velmora-pdp-price-mrp text-sm line-through text-[#64748B]">
                {formatProductPrice(product.compareAtPrice, currencySymbol)}
              </span>
            ) : null}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span
              className={`velmora-pdp-stock-chip ${
                product.inStock && !requiresSelection ? 'is-in-stock' : 'is-out-of-stock'
              }`}
            >
              {product.availabilityLabel}
            </span>
            {canPurchase && product.quantity > 0 ? (
              <span className="text-xs font-semibold text-[#64748B]">{product.quantity} in stock</span>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="velmora-pdp-buybox-actionhead">
          <p className="text-sm font-bold text-[#111827] dark:text-white">Purchase this item</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <span
              className={`velmora-pdp-stock-chip ${
                product.inStock && !requiresSelection ? 'is-in-stock' : 'is-out-of-stock'
              }`}
            >
              {product.availabilityLabel}
            </span>
            {canPurchase && product.quantity > 0 ? (
              <span className="text-xs font-semibold text-[#64748B]">{product.quantity} available</span>
            ) : null}
          </div>
        </div>
      )}

      <div className="velmora-pdp-buybox-body">
        {hasVariants ? (
          <ProductVariantSelector
            variants={variantSource.variants}
            selectedVariantId={selectedVariantId}
            onSelect={onVariantSelect}
            currencySymbol={currencySymbol}
          />
        ) : null}

        {requiresSelection ? (
          <p className="text-sm text-[#64748B] bg-slate-50 dark:bg-slate-900/40 rounded-lg px-3 py-2 border border-slate-200/80 dark:border-slate-800">
            Please select an option
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <label htmlFor="product-quantity" className="text-sm font-bold text-[#111827] dark:text-white">
            Quantity
          </label>
          <div className="velmora-pdp-qty-control">
            <button
              type="button"
              disabled={quantity <= 1 || isAdding || requiresSelection}
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="velmora-pdp-qty-btn"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              id="product-quantity"
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              disabled={requiresSelection}
              onChange={(event) => {
                const next = Number(event.target.value)
                if (!Number.isFinite(next) || next < 1) {
                  onQuantityChange(1)
                  return
                }
                onQuantityChange(
                  product.quantity > 0 ? Math.min(next, product.quantity) : next,
                )
              }}
              className="velmora-pdp-qty-input"
            />
            <button
              type="button"
              disabled={
                isAdding ||
                requiresSelection ||
                (product.quantity > 0 && quantity >= product.quantity)
              }
              onClick={() =>
                onQuantityChange(
                  product.quantity > 0 ? Math.min(quantity + 1, product.quantity) : quantity + 1,
                )
              }
              className="velmora-pdp-qty-btn"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {addError ? (
          <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{addError}</p>
        ) : null}
        {addSuccess ? (
          <p className="text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-3 py-2 font-semibold">
            {addSuccess}
          </p>
        ) : null}

        <button
          type="button"
          disabled={!canPurchase || isAdding}
          onClick={onAddToCart}
          className="velmora-pdp-btn-cart"
        >
          {isAdding ? 'Adding...' : hasVariants && requiresSelection ? 'Choose options' : 'Add to Cart'}
        </button>

        <button
          type="button"
          disabled={!canPurchase || isAdding}
          onClick={onBuyNow}
          className="velmora-pdp-btn-buy"
        >
          {isAdding ? 'Please wait...' : hasVariants && requiresSelection ? 'Choose options' : 'Buy Now'}
        </button>

        {addSuccess ? (
          <Link to="/cart" className="velmora-pdp-btn-outline block text-center">
            View cart
          </Link>
        ) : null}

        <div className="velmora-pdp-buybox-notes">
          <p>
            <FiLock className="size-3.5 shrink-0" />
            Secure guest checkout when you place your order.
          </p>
          <p>
            <FiTruck className="size-3.5 shrink-0" />
            Delivery is calculated at checkout based on your address and cart.
          </p>
          <p>
            <FiCreditCard className="size-3.5 shrink-0" />
            Payment method is selected at checkout.
          </p>
        </div>
      </div>
    </aside>
  )
}
