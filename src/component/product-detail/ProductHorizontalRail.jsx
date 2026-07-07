import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../Properties/ProductCard.jsx'

export default function ProductHorizontalRail({
  title,
  subtitle,
  badge = '',
  products = [],
  currencySymbol = '$',
  viewAllLink = '',
  viewAllLabel = 'View all',
  emptyMessage = '',
}) {
  if (!products.length) {
    return emptyMessage ? (
      <section className="velmora-pdp-rail-section mt-8 md:mt-10">
        <h2 className="velmora-home-rail-title">{title}</h2>
        <p className="text-sm text-[#64748B] mt-2">{emptyMessage}</p>
      </section>
    ) : null
  }

  return (
    <section className="velmora-pdp-rail-section mt-8 md:mt-10">
      <div className="velmora-home-rail-header mb-3">
        <div className="min-w-0">
          {badge ? <span className="velmora-home-rail-badge">{badge}</span> : null}
          <h2 className="velmora-home-rail-title">{title}</h2>
          {subtitle ? <p className="velmora-home-rail-desc">{subtitle}</p> : null}
        </div>
        {viewAllLink ? (
          <Link to={viewAllLink} className="velmora-home-rail-link shrink-0">
            {viewAllLabel}
          </Link>
        ) : null}
      </div>

      <div className="velmora-product-scroll-rail velmora-pdp-rail">
        {products.map((item) => (
          <div key={item.id} className="velmora-product-scroll-item velmora-pdp-rail-item">
            <ProductCard product={item} currencySymbol={currencySymbol} variant="compact" />
          </div>
        ))}
      </div>
    </section>
  )
}
