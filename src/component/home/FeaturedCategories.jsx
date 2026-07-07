import React from 'react'
import { Link } from 'react-router-dom'

const CATEGORY_ACCENTS = {
  fashion: 'from-pink-500/20 to-rose-500/10',
  electronics: 'from-blue-500/20 to-cyan-500/10',
  footwear: 'from-amber-500/20 to-orange-500/10',
  fitness: 'from-emerald-500/20 to-green-500/10',
}

const getAccentClass = (slug = '') =>
  CATEGORY_ACCENTS[String(slug).toLowerCase()] || 'from-primary/20 to-primary/5'

export default function FeaturedCategories({
  categories = [],
  loading = false,
  error = '',
  title = 'Featured Categories',
  description = 'Explore curated collections across fashion, electronics, footwear, fitness, and more.',
}) {
  if (loading) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
        {error}
      </div>
    )
  }

  if (!categories.length) {
    return (
      <div className="mt-8 rounded-xl border border-slate-200 bg-[#F8FAFC] p-8 text-center text-[#64748B] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        No categories are available yet.
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 pb-8 text-center">
        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-[#111827] dark:text-white">
          {title}
        </h3>
        <p className="text-[#64748B] max-w-xl mx-auto">{description}</p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id || category.slug}
            to={category.link}
            className={`group rounded-xl border border-slate-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
              category.hasImage
                ? 'bg-[#111827]'
                : `bg-linear-to-br ${getAccentClass(category.slug)} bg-white dark:bg-slate-900`
            }`}
          >
            {category.hasImage ? (
              <div className="relative h-36 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111827]/90 via-[#111827]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h4 className="text-lg font-semibold text-white group-hover:text-[#F59E0B] transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-slate-300 text-sm mt-1">
                    Shop {category.name.toLowerCase()} products
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <span className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary text-xl font-semibold mb-4">
                  {String(category.name || 'C').charAt(0).toUpperCase()}
                </span>
                <h4 className="text-xl font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </h4>
                <p className="text-[#64748B] text-sm mt-2">
                  Shop {category.name.toLowerCase()} products
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </>
  )
}
