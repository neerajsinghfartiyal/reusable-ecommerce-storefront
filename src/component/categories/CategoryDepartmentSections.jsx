import React from 'react'
import { Link } from 'react-router-dom'
import { formatChildCollectionMeta } from '../../lib/categoryHelpers.js'
import { CategoryIcon, getCategoryAccent } from './categoryVisuals.js'

function ChildMiniCard({ child, rootName }) {
  const accent = getCategoryAccent(child.slug)
  const meta = formatChildCollectionMeta(child)

  return (
    <Link to={child.link} className="velmora-categories-child-card group">
      <div
        className={`velmora-categories-child-thumb ${
          child.hasImage ? '' : `bg-linear-to-br ${accent}`
        }`}
      >
        {child.hasImage ? (
          <img
            src={child.image}
            alt={child.displayName}
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <CategoryIcon slug={child.slug} className="size-5 text-white/90" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="velmora-categories-child-name">{child.displayName}</p>
        <p className="velmora-categories-child-meta">
          {meta || `Under ${rootName}`}
        </p>
      </div>
    </Link>
  )
}

export default function CategoryDepartmentSections({ roots = [] }) {
  const sections = roots.filter((root) => (root.children || []).length > 0)
  if (!sections.length) return null

  return (
    <div className="velmora-categories-departments space-y-6">
      {sections.map((root) => (
        <section key={root.id || root.slug} className="velmora-categories-department">
          <div className="velmora-categories-department-head">
            <div>
              <h2 className="velmora-categories-department-title">{root.displayName}</h2>
              <p className="velmora-categories-department-desc">
                Browse collections under {root.displayName.toLowerCase()}
              </p>
            </div>
            <Link to={root.link} className="velmora-categories-department-link">
              Shop all
            </Link>
          </div>

          <div className="velmora-categories-child-grid">
            {root.children.map((child) => (
              <ChildMiniCard
                key={child.id || child.slug}
                child={child}
                rootName={root.displayName}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
