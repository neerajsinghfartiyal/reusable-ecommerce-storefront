import React from 'react'
import { formatProductPrice } from '../../lib/productMappers.js'

export default function MethodOptionList({
  name,
  options = [],
  selectedId = '',
  selectingId = '',
  onSelect,
  currencySymbol = '$',
  emptyMessage,
  loading = false,
  loadingMessage = 'Loading options...',
}) {
  if (loading) {
    return <p className="text-sm text-[#64748B]">{loadingMessage}</p>
  }

  if (options.length === 0) {
    return emptyMessage ? (
      <p className="text-sm text-[#64748B] leading-relaxed">{emptyMessage}</p>
    ) : null
  }

  return (
    <ul className="list-none space-y-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id
        const isSelecting = selectingId === option.id

        return (
          <li key={option.id}>
            <label
              className={`velmora-method-option flex items-start gap-3 rounded-xl border border-slate-200 dark:border-gray-700 p-4 cursor-pointer transition-colors ${
                isSelected ? 'is-selected' : 'hover:border-primary/40'
              }`}
            >
              <input
                type="radio"
                name={name}
                className="mt-1 accent-primary"
                checked={isSelected}
                disabled={Boolean(selectingId)}
                onChange={() => onSelect(option.id)}
              />
              <span className="flex-1 min-w-0">
                <span className="font-semibold text-[#111827] dark:text-white block">
                  {option.name}
                </span>
                {option.description ? (
                  <span className="text-sm text-[#64748B] block mt-1 leading-relaxed">
                    {option.description}
                  </span>
                ) : null}
              </span>
              {option.charge != null ? (
                <span className="font-semibold text-[#111827] dark:text-white whitespace-nowrap shrink-0">
                  {isSelecting
                    ? 'Updating...'
                    : formatProductPrice(option.charge, currencySymbol)}
                </span>
              ) : isSelecting ? (
                <span className="text-sm text-[#64748B] shrink-0">Saving...</span>
              ) : null}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
