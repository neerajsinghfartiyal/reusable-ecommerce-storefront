import React from 'react'
import { Link } from 'react-router-dom'
import { getCategoryChildMeta } from '../../lib/categoryHelpers.js'

export default function CategoryChildRail({ children = [], parentName = '' }) {
  if (!children.length) return null

  return (
    <div className="velmora-cat-child-rail" role="list">
      {children.map((child) => {
        const meta = getCategoryChildMeta(child)
        const showParent =
          parentName &&
          child.displayName &&
          ['footwear', 'accessories'].includes(String(child.slug || '').toLowerCase())

        return (
          <Link
            key={child.id || child.slug}
            to={child.link}
            className="velmora-cat-child-chip"
            role="listitem"
            title={child.path || child.displayName}
          >
            <span className="velmora-cat-child-chip-label">
              {showParent ? `${parentName} · ${child.displayName}` : child.displayName}
            </span>
            {meta ? <span className="velmora-cat-child-chip-meta">{meta}</span> : null}
          </Link>
        )
      })}
    </div>
  )
}
