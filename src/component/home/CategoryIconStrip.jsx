import React from 'react'
import { Link } from 'react-router-dom'
import { FiCpu, FiHeart, FiShoppingBag, FiWatch } from 'react-icons/fi'
import { getCategoryDisplayName } from '../../lib/categoryLegacy.js'

const CATEGORY_STYLES = {
  fashion: {
    icon: FiShoppingBag,
    ring: 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-100',
  },
  electronics: {
    icon: FiCpu,
    ring: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-100',
  },
  footwear: {
    icon: FiWatch,
    ring: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-100',
  },
  fitness: {
    icon: FiHeart,
    ring: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-100',
  },
}

const getCategoryStyle = (slug = '', name = '') => {
  const key = String(slug || name).toLowerCase()
  return (
    CATEGORY_STYLES[key] || {
      icon: FiShoppingBag,
      ring: 'bg-slate-50 text-primary border-slate-100 group-hover:bg-primary/10',
    }
  )
}

export default function CategoryIconStrip({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="container velmora-home-discovery">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="shrink-0 w-24 h-24 rounded-xl bg-slate-200/70 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      </section>
    )
  }

  if (!categories.length) return null

  return (
    <section className="container velmora-home-discovery">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-base md:text-lg font-bold text-[#111827] dark:text-white">
            Shop by category
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">Quick launch into top collections</p>
        </div>
        <Link to="/categories" className="text-primary text-sm font-semibold hover:underline shrink-0">
          View all
        </Link>
      </div>

      <div className="flex gap-2.5 md:gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
        {categories.map((category) => {
          const style = getCategoryStyle(category.slug, category.name)
          const Icon = style.icon
          const displayName = getCategoryDisplayName(category)

          return (
            <Link
              key={category.id || category.slug}
              to={category.link}
              className="snap-start shrink-0 w-[5.5rem] sm:w-28 text-center group"
            >
              <span
                className={`flex items-center justify-center size-14 sm:size-16 mx-auto rounded-2xl border bg-white dark:bg-slate-900 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md overflow-hidden ${category.hasImage ? 'border-slate-200' : style.ring}`}
              >
                {category.hasImage ? (
                  <img
                    src={category.image}
                    alt={displayName}
                    className="size-full object-contain p-1.5"
                    loading="lazy"
                  />
                ) : (
                  <Icon className="size-6" />
                )}
              </span>
              <span className="block mt-2 text-xs sm:text-sm font-semibold text-[#111827] dark:text-white line-clamp-2 group-hover:text-primary">
                {displayName}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
