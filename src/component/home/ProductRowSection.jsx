import React from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../Properties/ProductGrid.jsx'

const resolveRowLayout = (count = 0) => {
  if (count >= 5) {
    return { layout: 'scroll', fitContent: false, mini: false }
  }
  if (count >= 3) {
    return { layout: 'grid', fitContent: true, mini: false }
  }
  if (count >= 1) {
    return { layout: 'grid', fitContent: true, mini: true }
  }
  return { layout: 'grid', fitContent: true, mini: false }
}

function ProductRowSection({
  products = [],
  loading = false,
  error = '',
  title = 'Featured Products',
  badge = '',
  description = '',
  currencySymbol = '$',
  viewAllHref = '/shop',
  viewAllLabel = 'View all',
  variant = 'compact',
  minProducts = 2,
  emptyMessage = 'No products are available right now.',
  tinted = false,
  commercial = false,
}) {
  if (!loading && !error && products.length < minProducts) {
    return null
  }

  const { layout, fitContent, mini } = resolveRowLayout(products.length)

  const shellClass = [
    tinted ? 'velmora-home-rail-panel' : '',
    fitContent ? 'velmora-home-rail-fit' : '',
    mini ? 'velmora-home-rail-mini' : '',
    commercial ? 'velmora-home-rail-commercial' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="container velmora-home-rail">
      <div className={shellClass}>
        <div className="velmora-home-rail-header mb-3">
          <div className="min-w-0">
            {badge ? <span className="velmora-home-rail-badge">{badge}</span> : null}
            <h2 className="velmora-home-rail-title">{title}</h2>
            {description ? <p className="velmora-home-rail-desc">{description}</p> : null}
          </div>
          <Link to={viewAllHref} className="velmora-home-rail-link shrink-0">
            {viewAllLabel}
          </Link>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          currencySymbol={currencySymbol}
          emptyMessage={emptyMessage}
          variant={variant}
          layout={layout}
          fitContent={fitContent}
          hideEmpty
        />
      </div>
    </section>
  )
}

export default React.memo(ProductRowSection)
