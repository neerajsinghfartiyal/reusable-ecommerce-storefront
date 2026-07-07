import React from 'react'
import { formatProductPrice } from '../../lib/productMappers.js'

export default function ProductVariantSelector({
  variants = [],
  selectedVariantId = '',
  onSelect,
  currencySymbol = '$',
}) {
  if (!variants.length) return null

  return (
    <div className="velmora-pdp-variant-selector">
      <h3 className="velmora-pdp-variant-selector-title">Choose options</h3>
      <div className="velmora-pdp-variant-options" role="listbox" aria-label="Product variants">
        {variants.map((variant) => {
          const isSelected = String(selectedVariantId) === String(variant.variantId)
          const isDisabled = !variant.inStock
          const optionLabel = variant.optionsLabel || variant.title || 'Option'

          return (
            <button
              key={variant.variantId}
              type="button"
              role="option"
              aria-selected={isSelected}
              disabled={isDisabled}
              onClick={() => onSelect(variant.variantId)}
              className={`velmora-pdp-variant-option ${isSelected ? 'is-selected' : ''} ${
                isDisabled ? 'is-disabled' : ''
              }`}
            >
              <span className="velmora-pdp-variant-option-title">{variant.title || optionLabel}</span>
              {variant.optionsLabel && variant.title ? (
                <span className="velmora-pdp-variant-option-meta">{variant.optionsLabel}</span>
              ) : null}
              <span className="velmora-pdp-variant-option-price">
                {formatProductPrice(variant.price, currencySymbol)}
              </span>
              <span
                className={`velmora-pdp-variant-option-stock ${
                  variant.inStock ? 'is-in-stock' : 'is-out-of-stock'
                }`}
              >
                {variant.inStock
                  ? variant.stockQuantity <= 5
                    ? `Only ${variant.stockQuantity} left`
                    : 'In stock'
                  : 'Out of stock'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
