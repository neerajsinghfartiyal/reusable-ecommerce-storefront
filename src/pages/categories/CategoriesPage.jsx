import React, { useEffect } from 'react'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import CategoryBrowseGrid from '../../component/categories/CategoryBrowseGrid.jsx'
import { useStoreCategories } from '../../hooks/useStoreCategories.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../lib/pageTitle.js'

export default function CategoriesPage() {
  const { categoryTree, rawCategories, loading, error } = useStoreCategories()

  useEffect(() => {
    document.title = formatDocumentTitle('Shop by Category')

    return () => {
      document.title = getDefaultDocumentTitle()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="mt-20 velmora-categories-page">
        <section className="velmora-container velmora-categories-hero">
          <div className="velmora-categories-hero-inner">
            <span className="velmora-categories-kicker">Marketplace catalog</span>
            <h1 className="velmora-categories-hero-title">Shop by Category</h1>
            <p className="velmora-categories-hero-desc">
              Browse products by department, collection, and shopping need.
            </p>
          </div>
        </section>

        <section className="velmora-container pb-12 md:pb-16">
          <CategoryBrowseGrid
            categoryTree={categoryTree}
            rawCategories={rawCategories}
            loading={loading}
            error={error}
          />
        </section>
      </main>
      <Footer />
      <Switcher />
    </>
  )
}
