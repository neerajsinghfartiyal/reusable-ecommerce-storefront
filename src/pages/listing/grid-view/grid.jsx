import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Navbar from '../../../component/navbar'
import Footer from '../../../component/footer'
import StorePageShell from '../../../component/layout/StorePageShell.jsx'
import ProductGrid from '../../../component/Properties/ProductGrid.jsx'
import ShopSidebar from '../../../component/shop/ShopSidebar.jsx'
import ShopToolbar from '../../../component/shop/ShopToolbar.jsx'
import ShopActiveFilters from '../../../component/shop/ShopActiveFilters.jsx'
import ShopEmptyState from '../../../component/shop/ShopEmptyState.jsx'
import ShopCategoryQuickStrip from '../../../component/shop/ShopCategoryQuickStrip.jsx'
import ShopPagination from '../../../component/shop/ShopPagination.jsx'
import Switcher from '../../../component/switcher'
import { getProducts, getBrands } from '../../../api/catalogApi.js'
import { getShopPageContent } from '../../../api/cmsApi.js'
import { getPublicSettings } from '../../../api/publicSettingsApi.js'
import { mapShopPageHero } from '../../../lib/cmsMappers.js'
import { mapProductsToCards } from '../../../lib/productMappers.js'
import {
  buildShopQueryPatch,
  DEFAULT_SHOP_SORT,
  hasActiveShopFilters,
  mapBrandsForFilter,
  parseShopSort,
  SHOP_PRODUCT_GRID_CLASS,
  SHOP_SORT_OPTIONS,
} from '../../../lib/shopFilters.js'
import { useStoreCategories } from '../../../hooks/useStoreCategories.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../../lib/pageTitle.js'

export default function Grid() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1) > 0 ? Number(searchParams.get('page') || 1) : 1
  const category = searchParams.get('category') || ''
  const brand = searchParams.get('brand') || ''
  const search = searchParams.get('search') || ''
  const currentSort = useMemo(() => parseShopSort(searchParams), [searchParams])

  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({})
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchDraft, setSearchDraft] = useState(search)
  const [syncedSearch, setSyncedSearch] = useState(search)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [reloadKey, setReloadKey] = useState(0)
  const [shopHero, setShopHero] = useState(() => mapShopPageHero())

  if (search !== syncedSearch) {
    setSyncedSearch(search)
    setSearchDraft(search)
  }

  const { categories, categoryTree, rawCategories, loading: categoriesLoading } =
    useStoreCategories({ featuredOnly: false })

  useEffect(() => {
    document.title = formatDocumentTitle(shopHero.title || 'Shop')

    return () => {
      document.title = getDefaultDocumentTitle()
    }
  }, [shopHero.title])

  useEffect(() => {
    let active = true

    const loadShopPage = async () => {
      try {
        const page = await getShopPageContent()
        if (!active) return
        setShopHero(mapShopPageHero(page))
      } catch {
        if (!active) return
        setShopHero(mapShopPageHero())
      }
    }

    loadShopPage()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    const loadSettings = async () => {
      try {
        const settings = await getPublicSettings()
        if (active && settings?.currencySymbol) {
          setCurrencySymbol(settings.currencySymbol)
        }
      } catch {
        // Keep default currency symbol.
      }
    }

    loadSettings()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    const loadBrands = async () => {
      try {
        const data = await getBrands()
        if (active) setBrands(mapBrandsForFilter(data))
      } catch {
        if (active) setBrands([])
      }
    }

    loadBrands()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    const loadProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await getProducts({
          page,
          limit: 12,
          search: search || undefined,
          category: category || undefined,
          brand: brand || undefined,
          sortBy: currentSort.sortBy,
          sortOrder: currentSort.sortOrder,
        })

        if (!active) return

        setProducts(mapProductsToCards(result.products))
        setPagination(result.pagination || {})
      } catch (err) {
        if (!active) return
        setProducts([])
        setPagination({})
        setError(err?.message || 'Could not load products.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [page, category, brand, search, currentSort.sortBy, currentSort.sortOrder, reloadKey])

  const updateParams = (updates) => {
    const next = buildShopQueryPatch(searchParams, updates)
    setSearchParams(next)
  }

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams())
    setSearchDraft('')
    setFiltersOpen(false)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    updateParams({
      search: searchDraft.trim(),
      page: 1,
    })
    setFiltersOpen(false)
  }

  const handleCategorySelect = (categoryId) => {
    updateParams({
      category: categoryId,
      page: 1,
    })
    setFiltersOpen(false)
  }

  const handleBrandSelect = (brandId) => {
    updateParams({
      brand: brandId,
      page: 1,
    })
    setFiltersOpen(false)
  }

  const handleSortChange = (event) => {
    const option =
      SHOP_SORT_OPTIONS.find((item) => item.id === event.target.value) || DEFAULT_SHOP_SORT

    if (option.id === DEFAULT_SHOP_SORT.id) {
      updateParams({
        sortBy: undefined,
        sortOrder: undefined,
        page: 1,
      })
      return
    }

    updateParams({
      sortBy: option.sortBy,
      sortOrder: option.sortOrder,
      page: 1,
    })
  }

  const activeCategoryName =
    categories.find((item) => item.id === category)?.name || ''
  const activeBrandName = brands.find((item) => item.id === brand)?.name || ''
  const productCount = Number(pagination.totalProducts || products.length || 0)
  const totalPages = Number(pagination.totalPages || 1)
  const currentPage = Number(pagination.currentPage || page)
  const sortSelectValue =
    SHOP_SORT_OPTIONS.find(
      (option) =>
        option.sortBy === currentSort.sortBy && option.sortOrder === currentSort.sortOrder,
    )?.id || DEFAULT_SHOP_SORT.id

  const showEmptyState = !loading && !error && products.length === 0
  const filtersActive = hasActiveShopFilters({
    search,
    category,
    brand,
    sort: currentSort,
  })

  return (
    <>
      <Navbar />

      <StorePageShell className="velmora-shop-page" containerClassName="velmora-shop-container">
        <ShopToolbar
          productCount={productCount}
          search={search}
          categoryName={activeCategoryName}
          brandName={activeBrandName}
          sortSelectValue={sortSelectValue}
          onSortChange={handleSortChange}
          filtersOpen={filtersOpen}
          onToggleFilters={() => setFiltersOpen((open) => !open)}
          filtersActive={filtersActive}
          onClearAll={clearAllFilters}
          kicker={shopHero.kicker}
          title={shopHero.title}
          subtitle={shopHero.subtitle}
          coverImage={shopHero.coverImage}
          hasCover={shopHero.hasCover}
        />

        <ShopCategoryQuickStrip
          categoryTree={categoryTree}
          rawCategories={rawCategories}
          activeCategory={category}
        />

        <ShopActiveFilters
          search={search}
          categoryName={activeCategoryName}
          brandName={activeBrandName}
          sort={currentSort}
          onClearSearch={() => updateParams({ search: undefined, page: 1 })}
          onClearCategory={() => updateParams({ category: undefined, page: 1 })}
          onClearBrand={() => updateParams({ brand: undefined, page: 1 })}
          onClearSort={() =>
            updateParams({ sortBy: undefined, sortOrder: undefined, page: 1 })
          }
          onClearAll={clearAllFilters}
        />

        <div className="velmora-shop-layout">
          <div className={`velmora-shop-sidebar-wrap ${filtersOpen ? 'is-open' : ''}`}>
            <ShopSidebar
              categories={categories}
              categoryTree={categoryTree}
              brands={brands}
              activeCategory={category}
              activeBrand={brand}
              searchDraft={searchDraft}
              onSearchDraftChange={setSearchDraft}
              onSearchSubmit={handleSearchSubmit}
              onCategorySelect={handleCategorySelect}
              onBrandSelect={handleBrandSelect}
              onClearAll={clearAllFilters}
              filtersActive={filtersActive}
            />
          </div>

          <main className="velmora-shop-main">
            {categoriesLoading && !categories.length ? (
              <div className="velmora-shop-sidebar-skeleton" />
            ) : null}

            {showEmptyState ? (
              <ShopEmptyState onClearFilters={clearAllFilters} />
            ) : (
              <ProductGrid
                products={products}
                loading={loading}
                error={error}
                currencySymbol={currencySymbol}
                variant="compact"
                layout="grid"
                gridClass={`${SHOP_PRODUCT_GRID_CLASS} velmora-shop-product-grid`}
                skeletonClass="velmora-shop-skeleton-card"
                skeletonCount={12}
                onRetry={() => setReloadKey((value) => value + 1)}
                emptyState={<ShopEmptyState onClearFilters={clearAllFilters} />}
              />
            )}

            {!loading && !error && products.length > 0 ? (
              <ShopPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(nextPage) => updateParams({ page: nextPage })}
              />
            ) : null}
          </main>
        </div>
      </StorePageShell>

      <Footer />
      <Switcher />
    </>
  )
}
