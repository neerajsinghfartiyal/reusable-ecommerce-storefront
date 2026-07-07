import React from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiShoppingBag } from 'react-icons/fi'

export default function ShopEmptyState({ onClearFilters }) {
  return (
    <div className="velmora-shop-empty">
      <div className="velmora-shop-empty-icon" aria-hidden="true">
        <FiShoppingBag className="size-7 text-primary" />
      </div>
      <h3 className="velmora-shop-empty-title">No products match your filters</h3>
      <p className="velmora-shop-empty-desc">
        Try a broader category, remove brand filters, or search with different keywords to
        discover more from the VELMORA catalog.
      </p>
      <div className="velmora-shop-empty-actions">
        <button type="button" onClick={onClearFilters} className="velmora-shop-empty-btn">
          Clear filters
        </button>
        <Link to="/shop" className="velmora-shop-empty-link">
          <FiSearch className="size-4" />
          Browse all products
        </Link>
      </div>
    </div>
  )
}
