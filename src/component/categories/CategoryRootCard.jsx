import React from 'react'
import { Link } from 'react-router-dom'
import { buildChildChipLabel } from '../../lib/categoryHelpers.js'
import { CategoryIcon, getCategoryAccent } from './categoryVisuals.js'

export default function CategoryRootCard({ category }) {
  const accent = getCategoryAccent(category.slug)
  const childCount = category.childCount || category.children?.length || 0

  return (
    <article className="velmora-categories-root-card">
      <Link to={category.link} className="velmora-categories-root-media group">
        {category.hasImage ? (
          <>
            <img
              src={category.image}
              alt={category.displayName}
              className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#111827]/75 via-[#111827]/20 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${accent} flex items-center justify-center`}>
            <span className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/20 text-white backdrop-blur-sm ring-1 ring-white/25">
              <CategoryIcon slug={category.slug} className="size-7" />
            </span>
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 p-3.5">
          <h2 className="text-lg font-extrabold text-white leading-tight">{category.displayName}</h2>
        </div>
      </Link>

      <div className="velmora-categories-root-body">
        <p className="velmora-categories-root-desc line-clamp-2">{category.description}</p>
        <p className="velmora-categories-root-meta">
          {childCount > 0
            ? `${childCount} ${childCount === 1 ? 'subcategory' : 'subcategories'}`
            : 'Shop all products'}
        </p>

        {childCount > 0 ? (
          <div className="velmora-categories-chip-rail" role="list">
            {category.children.map((child) => (
              <Link
                key={child.id || child.slug}
                to={child.link}
                className="velmora-categories-chip"
                role="listitem"
                title={buildChildChipLabel(child, category.displayName)}
              >
                <span className="velmora-categories-chip-label">{child.displayName}</span>
                {child.children?.length ? (
                  <span className="velmora-categories-chip-meta">
                    {child.children.length}{' '}
                    {child.children.length === 1 ? 'collection' : 'collections'}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        ) : null}

        <Link to={category.link} className="velmora-categories-root-cta">
          Shop {category.displayName}
        </Link>
      </div>
    </article>
  )
}
