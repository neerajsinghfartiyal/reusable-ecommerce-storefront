import React from 'react'
import { Link } from 'react-router-dom'
import { CategoryIcon, getCategoryAccent } from './categoryVisuals.js'

function PopularCard({ item }) {
  const accent = getCategoryAccent(item.slug)

  return (
    <Link to={item.link} className="velmora-categories-popular-card group">
      <div
        className={`velmora-categories-popular-thumb ${
          item.hasImage ? '' : `bg-linear-to-br ${accent}`
        }`}
      >
        {item.hasImage ? (
          <img src={item.image} alt={item.displayName} className="size-full object-cover" loading="lazy" />
        ) : (
          <CategoryIcon slug={item.slug} className="size-4 text-white/90" />
        )}
      </div>
      <div className="min-w-0">
        <p className="velmora-categories-popular-name">{item.displayName}</p>
        <p className="velmora-categories-popular-meta">{item.subtitle}</p>
      </div>
    </Link>
  )
}

export default function CategoryPopularSection({ items = [] }) {
  if (!items.length) return null

  return (
    <section className="velmora-categories-popular">
      <div className="velmora-categories-section-head">
        <div>
          <span className="velmora-categories-kicker">Popular collections</span>
          <h2 className="velmora-categories-section-title">Shop by collection</h2>
          <p className="velmora-categories-section-desc">
            Quick shortcuts to top subcategories across the catalog.
          </p>
        </div>
      </div>

      <div className="velmora-categories-popular-grid">
        {items.map((item) => (
          <PopularCard key={item.id || item.slug} item={item} />
        ))}
      </div>
    </section>
  )
}
