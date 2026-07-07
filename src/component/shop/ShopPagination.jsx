import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function ShopPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null

  return (
    <nav className="velmora-shop-pagination" aria-label="Product pagination">
      <button
        type="button"
        className="velmora-shop-page-btn"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FiChevronLeft className="size-4" />
        Previous
      </button>
      <span className="velmora-shop-page-meta">
        Page <strong>{currentPage}</strong> of {totalPages}
      </span>
      <button
        type="button"
        className="velmora-shop-page-btn"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <FiChevronRight className="size-4" />
      </button>
    </nav>
  )
}
