import React, { useMemo } from 'react'
import {
  buildCategoriesPageRoots,
  buildPopularCategoryCollections,
} from '../../lib/categoryHelpers.js'
import CategoryDepartmentSections from './CategoryDepartmentSections.jsx'
import CategoryPageCta from './CategoryPageCta.jsx'
import CategoryPopularSection from './CategoryPopularSection.jsx'
import CategoryRootCard from './CategoryRootCard.jsx'

export default function CategoryBrowseGrid({
  categoryTree = [],
  rawCategories = [],
  loading = false,
  error = '',
}) {
  const roots = useMemo(
    () => buildCategoriesPageRoots(categoryTree, rawCategories),
    [categoryTree, rawCategories],
  )

  const popularItems = useMemo(() => buildPopularCategoryCollections(roots, 12), [roots])

  if (loading) {
    return (
      <div className="velmora-categories-root-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="velmora-categories-root-card h-72 rounded-xl bg-slate-200/80 dark:bg-slate-800 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300 text-sm">
        {error}
      </div>
    )
  }

  if (!roots.length) {
    return (
      <div className="velmora-categories-empty">
        No categories are available yet.
      </div>
    )
  }

  return (
    <div className="velmora-categories-landing space-y-8 md:space-y-10">
      <section aria-label="Featured categories">
        <div className="velmora-categories-section-head mb-4">
          <div>
            <span className="velmora-categories-kicker">Departments</span>
            <h2 className="velmora-categories-section-title">Browse main categories</h2>
            <p className="velmora-categories-section-desc">
              Start with a department, then drill into collections and subcategories.
            </p>
          </div>
        </div>

        <div className="velmora-categories-root-grid">
          {roots.map((category) => (
            <CategoryRootCard key={category.id || category.slug} category={category} />
          ))}
        </div>
      </section>

      <CategoryDepartmentSections roots={roots} />

      <CategoryPopularSection items={popularItems} />

      <CategoryPageCta />
    </div>
  )
}
