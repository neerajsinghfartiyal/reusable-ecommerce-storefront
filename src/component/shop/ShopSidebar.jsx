import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiRotateCcw } from 'react-icons/fi'
import { buildShopSidebarTree, getCategoryDisplayName } from '../../lib/categoryHelpers.js'
import { buildCategoryTree } from '../../lib/categoryTree.js'

function CategoryFilterNode({
  category,
  depth = 0,
  activeCategory = '',
  onCategorySelect,
}) {
  const [expanded, setExpanded] = useState(depth < 1)
  const hasChildren = Array.isArray(category.children) && category.children.length > 0
  const isActive = activeCategory === category.id
  const displayName = category.displayName || category.name

  return (
    <li className="velmora-shop-tree-item">
      <div
        className="velmora-shop-tree-row"
        style={{ paddingLeft: `${depth * 14}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="velmora-shop-tree-toggle"
            aria-label={expanded ? 'Collapse category' : 'Expand category'}
          >
            {expanded ? '−' : '+'}
          </button>
        ) : (
          <span className="velmora-shop-tree-spacer" />
        )}
        <button
          type="button"
          onClick={() => onCategorySelect(category.id)}
          className={`velmora-shop-tree-link ${isActive ? 'is-active' : ''}`}
        >
          {displayName}
        </button>
      </div>
      {hasChildren && expanded ? (
        <ul className="velmora-shop-tree-children">
          {category.children.map((child) => (
            <CategoryFilterNode
              key={child.id || child.slug}
              category={{
                ...child,
                displayName: getCategoryDisplayName(child, { asChild: true }),
                name: getCategoryDisplayName(child, { asChild: true }),
              }}
              depth={depth + 1}
              activeCategory={activeCategory}
              onCategorySelect={onCategorySelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default function ShopSidebar({
  categories = [],
  categoryTree = [],
  brands = [],
  activeCategory = '',
  activeBrand = '',
  searchDraft = '',
  onSearchDraftChange,
  onSearchSubmit,
  onCategorySelect,
  onBrandSelect,
  onClearAll,
  filtersActive = false,
}) {
  const flatList = Array.isArray(categories) ? categories : []
  const baseTree =
    categoryTree.length > 0 ? categoryTree : buildCategoryTree(flatList)
  const tree = buildShopSidebarTree(baseTree, flatList).map((node) => ({
    ...node,
    displayName: getCategoryDisplayName(node),
    name: getCategoryDisplayName(node),
  }))

  return (
    <aside className="velmora-shop-sidebar">
      <div className="velmora-shop-sidebar-head">
        <h2 className="velmora-shop-sidebar-title">Refine results</h2>
        {filtersActive ? (
          <button type="button" onClick={onClearAll} className="velmora-shop-sidebar-clear">
            <FiRotateCcw className="size-3.5" />
            Clear all
          </button>
        ) : null}
      </div>

      <form onSubmit={onSearchSubmit} className="velmora-shop-sidebar-block">
        <label htmlFor="shop-sidebar-search" className="velmora-shop-sidebar-label">
          Search
        </label>
        <input
          id="shop-sidebar-search"
          type="search"
          value={searchDraft}
          onChange={(event) => onSearchDraftChange(event.target.value)}
          placeholder="Products or SKU"
          className="velmora-shop-sidebar-input"
        />
        <button type="submit" className="velmora-shop-sidebar-submit">
          Search
        </button>
      </form>

      <div className="velmora-shop-sidebar-block">
        <h3 className="velmora-shop-sidebar-label">Categories</h3>
        <div className="velmora-shop-tree-scroll">
          <ul className="velmora-shop-tree">
            <li className="velmora-shop-tree-item">
              <div className="velmora-shop-tree-row">
                <span className="velmora-shop-tree-spacer" />
                <button
                  type="button"
                  onClick={() => onCategorySelect('')}
                  className={`velmora-shop-tree-link ${!activeCategory ? 'is-active' : ''}`}
                >
                  All products
                </button>
              </div>
            </li>
            {tree.map((category) => (
              <CategoryFilterNode
                key={category.id || category.slug}
                category={category}
                activeCategory={activeCategory}
                onCategorySelect={onCategorySelect}
              />
            ))}
          </ul>
        </div>
      </div>

      {brands.length ? (
        <div className="velmora-shop-sidebar-block">
          <h3 className="velmora-shop-sidebar-label">Brands</h3>
          <div className="velmora-shop-brand-scroll">
            <ul className="velmora-shop-brand-list">
              <li>
                <button
                  type="button"
                  onClick={() => onBrandSelect('')}
                  className={`velmora-shop-brand-link ${!activeBrand ? 'is-active' : ''}`}
                >
                  All brands
                </button>
              </li>
              {brands.map((brand) => (
                <li key={brand.id || brand.slug}>
                  <button
                    type="button"
                    onClick={() => onBrandSelect(brand.id)}
                    className={`velmora-shop-brand-link ${
                      activeBrand === brand.id ? 'is-active' : ''
                    }`}
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <Link to="/categories" className="velmora-shop-sidebar-browse">
        Browse all categories
      </Link>
    </aside>
  )
}
