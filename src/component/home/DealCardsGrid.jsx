import React from 'react'
import { Link } from 'react-router-dom'

const DEAL_CARD_COPY = {
  fashion: {
    title: 'Fashion Picks',
    subtitle: 'Styles for every day',
    accent: 'from-rose-500/20 via-[#111827] to-[#1f2937]',
    badge: 'bg-rose-500/20 text-rose-200',
  },
  electronics: {
    title: 'Electronics Essentials',
    subtitle: 'Tech you will use daily',
    accent: 'from-blue-500/25 via-[#111827] to-[#1e3a8a]',
    badge: 'bg-blue-500/20 text-blue-200',
  },
  fitness: {
    title: 'Fitness Must-Haves',
    subtitle: 'Gear for your routine',
    accent: 'from-emerald-500/20 via-[#111827] to-[#14532d]',
    badge: 'bg-emerald-500/20 text-emerald-200',
  },
  footwear: {
    title: 'Footwear Deals',
    subtitle: 'Comfort meets style',
    accent: 'from-amber-500/25 via-[#111827] to-[#78350f]',
    badge: 'bg-amber-500/20 text-amber-200',
  },
}

const PREFERRED_SLUGS = ['fashion', 'electronics', 'footwear', 'fitness']

export default function DealCardsGrid({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="container velmora-home-discovery">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-36 rounded-xl bg-slate-200/70 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  const bySlug = new Map(
    categories.map((category) => [String(category.slug || '').toLowerCase(), category]),
  )

  const dealCategories = PREFERRED_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean)

  if (!dealCategories.length) return null

  return (
    <section className="container velmora-home-discovery">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#111827] dark:text-white">
            Today&apos;s collections
          </h2>
          <p className="text-sm text-[#64748B] mt-0.5">Curated entry points into live inventory</p>
        </div>
        <Link to="/shop" className="text-primary text-sm font-semibold hover:underline shrink-0">
          Shop all
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {dealCategories.map((category) => {
          const slug = String(category.slug || '').toLowerCase()
          const copy = DEAL_CARD_COPY[slug] || {
            title: category.name,
            subtitle: `Shop ${category.name}`,
            accent: 'from-primary/25 via-[#111827] to-[#1e293b]',
            badge: 'bg-primary/20 text-blue-200',
          }

          return (
            <Link
              key={category.id || category.slug}
              to={category.link}
              className={`group relative overflow-hidden rounded-xl p-4 min-h-36 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg transition-all border border-white/10 ${
                category.hasImage ? 'bg-[#111827]' : `bg-linear-to-br ${copy.accent}`
              }`}
            >
              {category.hasImage ? (
                <>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 size-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#111827]/95 via-[#111827]/55 to-[#111827]/25" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_55%)]" />
              )}
              <div className="relative">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${copy.badge}`}
                >
                  Collection
                </span>
                <h3 className="text-sm md:text-base font-bold text-white group-hover:text-[#F59E0B] line-clamp-2 mt-2">
                  {copy.title}
                </h3>
              </div>
              <p className="relative text-xs text-slate-300 mt-2 line-clamp-1">{copy.subtitle}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
