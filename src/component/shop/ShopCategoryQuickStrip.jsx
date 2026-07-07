import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import { pickShopQuickFilterRoots } from '../../lib/categoryHelpers.js'

export default function ShopCategoryQuickStrip({
  categoryTree = [],
  rawCategories = [],
  activeCategory = '',
}) {
  const { preferred, more } = useMemo(
    () => pickShopQuickFilterRoots(categoryTree, rawCategories),
    [categoryTree, rawCategories],
  )
  const [moreOpen, setMoreOpen] = useState(false)

  if (!preferred.length && !more.length) return null

  const isAllActive = !activeCategory

  return (
    <div className="velmora-shop-quick-strip">
      <div className="velmora-shop-quick-strip-rail">
        <Link
          to="/shop"
          className={`velmora-shop-quick-pill ${isAllActive ? 'is-active' : ''}`}
        >
          All Products
        </Link>

        {preferred.map((category) => (
          <Link
            key={category.id || category.slug}
            to={category.link}
            className={`velmora-shop-quick-pill ${
              activeCategory === category.id ? 'is-active' : ''
            }`}
          >
            {category.displayName || category.name}
          </Link>
        ))}

        {more.length ? (
          <div className="velmora-shop-quick-more relative">
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              className={`velmora-shop-quick-pill velmora-shop-quick-more-btn ${
                more.some((item) => item.id === activeCategory) ? 'is-active' : ''
              }`}
              aria-expanded={moreOpen}
            >
              More
              <FiChevronDown className={`size-3.5 ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen ? (
              <div className="velmora-shop-quick-more-menu">
                {more.map((category) => (
                  <Link
                    key={category.id || category.slug}
                    to={category.link}
                    onClick={() => setMoreOpen(false)}
                    className={`velmora-shop-quick-more-item ${
                      activeCategory === category.id ? 'is-active' : ''
                    }`}
                  >
                    {category.displayName || category.name}
                  </Link>
                ))}
                <Link
                  to="/categories"
                  onClick={() => setMoreOpen(false)}
                  className="velmora-shop-quick-more-item is-muted"
                >
                  Browse all categories
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
