import React from 'react'
import { Link } from 'react-router-dom'
import { FiCreditCard, FiLock, FiTruck } from 'react-icons/fi'
import { formatProductPrice, getProductSavingsAmount } from '../../lib/productMappers.js'

export default function ProductInfoPanel({
  product,
  currencySymbol,
  highlights = [],
  atGlanceSpecs = [],
}) {
  if (!product) return null

  const savings = getProductSavingsAmount(product.price, product.compareAtPrice, currencySymbol)
  const quickHighlights = highlights.slice(0, 5)

  return (
    <div className="velmora-pdp-info-inner">
      <div className="velmora-pdp-info-block">
        {product.brandName ? (
          <p className="velmora-pdp-brand">
            {product.brandId ? (
              <Link to={`/shop?brand=${encodeURIComponent(product.brandId)}`} className="hover:underline">
                {product.brandName}
              </Link>
            ) : (
              product.brandName
            )}
          </p>
        ) : null}

        <h1 className="velmora-pdp-title">{product.name}</h1>

        {product.categoryPath?.length > 0 ? (
          <nav className="velmora-pdp-category-chips" aria-label="Category">
            {product.categoryPath.map((crumb) => (
              <Link
                key={crumb.id || crumb.name}
                to={`/shop?category=${encodeURIComponent(crumb.id)}`}
                className="velmora-pdp-category-chip"
              >
                {crumb.name}
              </Link>
            ))}
          </nav>
        ) : product.categoryName && product.categoryId ? (
          <Link
            to={`/shop?category=${encodeURIComponent(product.categoryId)}`}
            className="velmora-pdp-category-chip"
          >
            {product.categoryName}
          </Link>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {product.sku ? (
            <span className="velmora-pdp-meta-chip">
              SKU <strong>{product.sku}</strong>
            </span>
          ) : null}
          <span
            className={`velmora-pdp-stock-chip ${
              product.inStock ? 'is-in-stock' : 'is-out-of-stock'
            }`}
          >
            {product.availabilityLabel}
          </span>
        </div>
      </div>

      <div className="velmora-pdp-info-divider" />

      <div className="velmora-pdp-info-block velmora-pdp-price-hero">
        <p className="velmora-pdp-price-label">Deal price</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="velmora-pdp-price-main">
            {formatProductPrice(product.price, currencySymbol)}
          </span>
          {product.compareAtPrice != null ? (
            <span className="velmora-pdp-price-mrp">
              M.R.P. {formatProductPrice(product.compareAtPrice, currencySymbol)}
            </span>
          ) : null}
        </div>
        {product.discountPercent ? (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="velmora-pdp-discount-pill">{product.discountPercent}% off</span>
            {savings ? (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                You save {savings}
              </span>
            ) : null}
          </div>
        ) : (
          <p className="mt-1.5 text-xs font-semibold text-[#64748B]">Live catalog price</p>
        )}
        <p className="mt-2 text-[11px] text-[#64748B] leading-relaxed">
          Shipping and payment options are selected at checkout.
        </p>
      </div>

      {product.shortDescription ? (
        <>
          <div className="velmora-pdp-info-divider" />
          <div className="velmora-pdp-info-block">
            <p className="text-sm text-[#64748B] dark:text-slate-300 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
        </>
      ) : null}

      {quickHighlights.length > 0 ? (
        <>
          <div className="velmora-pdp-info-divider" />
          <div className="velmora-pdp-info-block">
            <h2 className="velmora-pdp-info-subhead">Key highlights</h2>
            <ul className="velmora-pdp-highlight-list">
              {quickHighlights.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  {item.value ? (
                    <>
                      <strong>{item.label}:</strong> {item.value}
                    </>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {atGlanceSpecs.length > 0 ? (
        <>
          <div className="velmora-pdp-info-divider" />
          <div className="velmora-pdp-info-block">
            <h2 className="velmora-pdp-info-subhead">At a glance</h2>
            <dl className="velmora-pdp-glance-grid">
              {atGlanceSpecs.map((spec) => (
                <div key={spec.label} className="velmora-pdp-glance-item">
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      ) : null}
    </div>
  )
}
