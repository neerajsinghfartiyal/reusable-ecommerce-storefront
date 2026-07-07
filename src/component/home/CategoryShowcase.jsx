import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FiActivity,
  FiGrid,
  FiHeadphones,
  FiShoppingBag,
  FiSmartphone,
  FiStar,
  FiTag,
  FiUser,
  FiZap,
} from 'react-icons/fi'
import { buildCategoryShowcaseCards } from '../../lib/categoryHelpers.js'

const CATEGORY_ICONS = {
  fashion: FiShoppingBag,
  electronics: FiSmartphone,
  footwear: FiGrid,
  fitness: FiActivity,
  accessories: FiTag,
  men: FiUser,
  women: FiUser,
  mobiles: FiSmartphone,
  audio: FiHeadphones,
  yoga: FiActivity,
  'fitness-accessories': FiTag,
  'new-arrivals': FiStar,
  deals: FiZap,
}

const CATEGORY_ACCENTS = {
  fashion: 'from-rose-500 via-rose-600/90 to-[#831843]',
  electronics: 'from-sky-500 via-blue-600/90 to-[#1e3a8a]',
  footwear: 'from-amber-400 via-orange-500/90 to-[#78350f]',
  fitness: 'from-emerald-400 via-emerald-600/90 to-[#14532d]',
  accessories: 'from-violet-400 via-violet-600/90 to-[#312e81]',
  men: 'from-slate-500 via-slate-600/90 to-[#111827]',
  women: 'from-pink-400 via-pink-600/90 to-[#831843]',
  mobiles: 'from-cyan-400 via-sky-600/90 to-[#0c4a6e]',
  audio: 'from-indigo-400 via-indigo-600/90 to-[#312e81]',
  yoga: 'from-teal-400 via-teal-600/90 to-[#134e4a]',
  'new-arrivals': 'from-[#2563EB] via-blue-600/90 to-[#1e3a8a]',
  deals: 'from-[#F59E0B] via-amber-500/90 to-[#b45309]',
}

const getIcon = (slug = '') => CATEGORY_ICONS[String(slug).toLowerCase()] || FiShoppingBag

const getAccent = (slug = '') =>
  CATEGORY_ACCENTS[String(slug).toLowerCase()] || 'from-[#2563EB] via-blue-500/90 to-[#111827]'

const renderCategoryIcon = (slug = '') => {
  const Icon = getIcon(slug)
  return <Icon className="size-8" />
}

function CategoryShowcaseCard({ category }) {
  const accent = getAccent(category.slug)

  return (
    <Link
      to={category.link}
      className="velmora-category-showcase-card group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/90 dark:border-gray-800 bg-white dark:bg-slate-900 hover:-translate-y-1 hover:shadow-lg hover:border-[#2563EB]/35 transition-all duration-200"
    >
      <div className="relative aspect-[5/4] bg-[#F8FAFC] dark:bg-slate-800 overflow-hidden">
        {category.hasImage ? (
          <>
            <img
              src={category.image}
              alt={category.displayName}
              className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#111827]/55 via-[#111827]/10 to-transparent" />
          </>
        ) : (
          <div className={`size-full bg-linear-to-br ${accent} flex items-center justify-center`}>
            <span className="inline-flex items-center justify-center size-16 rounded-2xl bg-white/20 text-white backdrop-blur-sm shadow-inner ring-1 ring-white/25">
              {renderCategoryIcon(category.slug)}
            </span>
          </div>
        )}

        {category.parentName ? (
          <span className="absolute top-2 start-2 rounded-md bg-[#111827]/75 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/95">
            Under {category.parentName}
          </span>
        ) : null}
      </div>

      <div className="p-3 flex flex-col gap-0.5 min-h-[3.75rem] bg-linear-to-b from-white to-[#F8FAFC]/80 dark:from-slate-900 dark:to-slate-900/80">
        <h3 className="text-sm sm:text-[0.9375rem] font-extrabold text-[#111827] dark:text-white line-clamp-1 group-hover:text-[#2563EB] transition-colors">
          {category.displayName}
        </h3>
        <p className="text-[11px] text-[#64748B] line-clamp-1 font-medium">{category.subtitle}</p>
      </div>
    </Link>
  )
}

export default function CategoryShowcase({
  cmsSection = {},
  categoryTree = [],
  rawCategories = [],
  loading = false,
}) {
  const cards = useMemo(
    () => buildCategoryShowcaseCards(categoryTree, rawCategories, 10),
    [categoryTree, rawCategories],
  )

  if (loading) {
    return (
      <section className="container velmora-home-discovery">
        <div className="velmora-category-showcase-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl bg-slate-200/70 dark:bg-slate-800 animate-pulse aspect-[5/6]"
            />
          ))}
        </div>
      </section>
    )
  }

  if (!cards.length) return null

  const heading = cmsSection.heading || 'Shop by category'
  const subheading =
    cmsSection.subheading ||
    'Jump into fashion, electronics, fitness, footwear, and more — curated from live catalog.'
  const viewAllText = cmsSection.buttonText || 'View all categories'
  const viewAllLink = cmsSection.buttonLink || '/categories'

  return (
    <section className="container velmora-home-discovery">
      <div className="velmora-home-rail-header mb-4">
        <div className="min-w-0">
          <span className="velmora-home-rail-badge">Shop the catalog</span>
          <h2 className="velmora-home-rail-title">{heading}</h2>
          <p className="velmora-home-rail-desc">{subheading}</p>
        </div>
        <Link to={viewAllLink} className="velmora-home-rail-link shrink-0">
          {viewAllText}
        </Link>
      </div>

      <div className="velmora-category-showcase-grid velmora-category-showcase-mobile-rail">
        {cards.map((category) => (
          <CategoryShowcaseCard key={category.id || category.slug} category={category} />
        ))}
      </div>
    </section>
  )
}
