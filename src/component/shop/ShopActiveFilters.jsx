import React from 'react'
import { FiX } from 'react-icons/fi'
import { isDefaultShopSort } from '../../lib/shopFilters.js'

export default function ShopActiveFilters({
  search = '',
  categoryName = '',
  brandName = '',
  sort,
  onClearSearch,
  onClearCategory,
  onClearBrand,
  onClearSort,
  onClearAll,
}) {
  const chips = []

  if (search) {
    chips.push({
      key: 'search',
      label: `Search: ${search}`,
      onClear: onClearSearch,
    })
  }

  if (categoryName) {
    chips.push({
      key: 'category',
      label: categoryName,
      onClear: onClearCategory,
    })
  }

  if (brandName) {
    chips.push({
      key: 'brand',
      label: brandName,
      onClear: onClearBrand,
    })
  }

  if (sort && !isDefaultShopSort(sort)) {
    chips.push({
      key: 'sort',
      label: sort.label,
      onClear: onClearSort,
    })
  }

  if (!chips.length) return null

  return (
    <div className="velmora-shop-active-filters">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] me-1">
          Active
        </span>
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={chip.onClear}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/15"
          >
            <span>{chip.label}</span>
            <FiX className="size-3.5" />
          </button>
        ))}
        {chips.length > 1 ? (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-[#64748B] hover:text-primary ms-1"
          >
            Clear all
          </button>
        ) : null}
      </div>
    </div>
  )
}
