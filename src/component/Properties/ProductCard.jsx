import React from 'react'
import { Link } from 'react-router-dom'
import {
  areProductCardViewsEqual,
  formatProductPrice,
  getProductCardOfferLine,
} from '../../lib/productMappers.js'

function ProductCard({ product, currencySymbol = '$', variant = 'default' }) {
  if (!product) return null

  const isCompact = variant === 'compact'
  const metaLine = [product.brandName, product.categoryName].filter(Boolean).join(' · ')
  const offerLine = getProductCardOfferLine(product)

  const imageBlock = (
    <div className={`velmora-product-media ${isCompact ? 'velmora-product-media-compact' : ''}`}>
      <Link to={product.detailPath || '#'} className="block h-full w-full" tabIndex={-1}>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
        />
      </Link>

      {product.discountPercent ? (
        <span className="velmora-product-badge-discount">-{product.discountPercent}%</span>
      ) : null}

      <span
        className={`velmora-product-badge-stock ${
          product.inStock ? 'is-in-stock' : 'is-out-of-stock'
        }`}
      >
        {product.inStock ? 'In stock' : 'Sold out'}
      </span>
    </div>
  )

  if (isCompact) {
    return (
      <article className="velmora-product-card-compact velmora-shop-product-card group h-full">
        <div className="relative">{imageBlock}</div>

        <div className="velmora-product-card-body">
          {metaLine ? <p className="velmora-product-card-meta">{metaLine}</p> : null}

          <Link to={product.detailPath || '#'} className="velmora-product-card-title">
            {product.title}
          </Link>

          {offerLine ? <p className="velmora-product-card-offer">{offerLine}</p> : null}

          <div className="velmora-product-card-footer">
            <div className="velmora-product-price-block min-w-0">
              <p className="velmora-product-card-price">
                {formatProductPrice(product.price, currencySymbol)}
              </p>
              {product.compareAtPrice != null ? (
                <p className="velmora-product-card-compare">
                  {formatProductPrice(product.compareAtPrice, currencySymbol)}
                </p>
              ) : null}
            </div>

            <Link to={product.detailPath || '#'} className="velmora-product-card-cta">
              Shop
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group rounded-xl border border-slate-200/90 dark:border-gray-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">{imageBlock}</div>

      <div className="p-4">
        <Link
          to={product.detailPath || '#'}
          className="text-base hover:text-[#2563EB] font-bold line-clamp-2 text-[#111827] dark:text-white"
        >
          {product.title}
        </Link>
        {metaLine ? <p className="text-[#64748B] text-xs mt-1.5 font-medium">{metaLine}</p> : null}
        {offerLine ? <p className="velmora-product-card-offer mt-1.5">{offerLine}</p> : null}

        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-gray-800 flex justify-between items-end gap-3">
          <div className="velmora-product-price-block">
            <p className="text-lg font-extrabold text-[#111827] dark:text-white">
              {formatProductPrice(product.price, currencySymbol)}
            </p>
            {product.compareAtPrice != null ? (
              <p className="text-xs text-[#64748B] line-through">
                {formatProductPrice(product.compareAtPrice, currencySymbol)}
              </p>
            ) : null}
          </div>

          <Link
            to={product.detailPath || '#'}
            className="velmora-product-card-cta px-4 py-2 text-xs"
          >
            Shop
          </Link>
        </div>
      </div>
    </article>
  )
}

function areProductCardPropsEqual(prev, next) {
  if (prev.currencySymbol !== next.currencySymbol || prev.variant !== next.variant) {
    return false
  }

  if (!prev.product && !next.product) return true
  if (!prev.product || !next.product) return false

  return areProductCardViewsEqual(prev.product, next.product)
}

export default React.memo(ProductCard, areProductCardPropsEqual)
