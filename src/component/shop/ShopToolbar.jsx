import React from 'react'
import { FiFilter, FiRotateCcw } from 'react-icons/fi'
import { SHOP_SORT_OPTIONS } from '../../lib/shopFilters.js'

export default function ShopToolbar({
  productCount = 0,
  search = '',
  categoryName = '',
  brandName = '',
  sortSelectValue = '',
  onSortChange,
  filtersOpen = false,
  onToggleFilters,
  filtersActive = false,
  onClearAll,
  kicker = 'VELMORA Marketplace',
  title = 'Shop VELMORA',
  subtitle = '',
  coverImage = '',
  hasCover = false,
}) {
  const contextParts = []
  if (search) contextParts.push(`"${search}"`)
  if (categoryName) contextParts.push(categoryName)
  if (brandName) contextParts.push(brandName)

  const showCover = hasCover && coverImage

  return (
    <div
      className={`velmora-shop-toolbar ${showCover ? 'velmora-shop-toolbar--cover' : ''}`}
      style={showCover ? { '--velmora-shop-cover-image': `url("${coverImage}")` } : undefined}
    >
      {showCover ? (
        <>
          <div className="velmora-shop-toolbar-bg" aria-hidden="true" />
          <div className="velmora-shop-toolbar-overlay" aria-hidden="true" />
        </>
      ) : null}

      <div className="velmora-shop-toolbar-main">
        <div className="min-w-0 flex-1">
          <span className="velmora-shop-toolbar-kicker">{kicker}</span>
          <h1 className="velmora-shop-toolbar-title">{title}</h1>
          {subtitle ? (
            <p className="velmora-shop-toolbar-lead">{subtitle}</p>
          ) : null}
          <p className="velmora-shop-toolbar-meta">
            <span className="velmora-shop-toolbar-count">{productCount}</span>
            {productCount === 1 ? ' product' : ' products'}
            {contextParts.length ? (
              <span>
                {' '}
                for <span className="velmora-shop-toolbar-context">{contextParts.join(' · ')}</span>
              </span>
            ) : (
              <span> in the live catalog</span>
            )}
          </p>
        </div>

        <div className="velmora-shop-toolbar-actions-card">
          <div className="velmora-shop-toolbar-actions">
            <button
              type="button"
              onClick={onToggleFilters}
              className="velmora-shop-filter-btn lg:hidden"
            >
              <FiFilter className="size-4" />
              {filtersOpen ? 'Hide filters' : 'Filters'}
            </button>

            {filtersActive ? (
              <button type="button" onClick={onClearAll} className="velmora-shop-clear-btn">
                <FiRotateCcw className="size-3.5" />
                Clear filters
              </button>
            ) : null}

            <label htmlFor="shop-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="shop-sort"
              value={sortSelectValue}
              onChange={onSortChange}
              className="velmora-shop-sort-select"
            >
              {SHOP_SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
