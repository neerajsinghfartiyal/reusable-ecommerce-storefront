import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoryPageCta() {
  return (
    <section className="velmora-categories-cta">
      <div className="velmora-categories-cta-inner">
        <div>
          <h2 className="velmora-categories-cta-title">Explore all products</h2>
          <p className="velmora-categories-cta-desc">
            Browse the full live catalog with filters, search, and category sorting.
          </p>
        </div>
        <Link to="/shop" className="velmora-categories-cta-btn">
          Shop all products
        </Link>
      </div>
    </section>
  )
}
