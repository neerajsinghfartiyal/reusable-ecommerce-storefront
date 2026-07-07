import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Switcher from '../../component/switcher'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import HomeBannerLoader from '../../component/home/HomeBannerLoader.jsx'
import CategoryShowcase from '../../component/home/CategoryShowcase.jsx'
import MarketplaceProductSections from '../../component/home/MarketplaceProductSections.jsx'
import PromoBanners from '../../component/home/PromoBanners.jsx'
import HomepagePromoCards from '../../component/home/HomepagePromoCards.jsx'
import TrustStrip from '../../component/home/TrustStrip.jsx'
import HomeFinalCta from '../../component/home/HomeFinalCta.jsx'
import { getFeaturedProducts } from '../../api/catalogApi.js'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { DEFAULT_STORE_NAME, mapProductsToCards } from '../../lib/productMappers.js'
import { formatDocumentTitle } from '../../lib/pageTitle.js'
import { useStoreCategories } from '../../hooks/useStoreCategories.js'
import {
  pickCategoryShowcaseSection,
  pickDualPromoSection,
  pickFinalCtaSection,
  pickPromoCardSections,
} from '../../lib/cmsMappers.js'
import { pickHomepageDealCategories } from '../../component/home/homepageProductRows.js'

export default function Index() {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(true)
    const [productsError, setProductsError] = useState('')
    const [storeSettings, setStoreSettings] = useState(null)
    const [homePageMeta, setHomePageMeta] = useState(null)
    const { categories: rootCategories, categoryTree, rawCategories, loading: categoriesLoading } =
        useStoreCategories({ featuredOnly: true, featuredLimit: 12 })

    const handleHomePageMeta = useCallback((page) => {
        setHomePageMeta(page || null)
    }, [])

    const cmsSections = useMemo(() => homePageMeta?.sections || [], [homePageMeta?.sections])
    const categoryShowcase = useMemo(
        () => pickCategoryShowcaseSection(cmsSections),
        [cmsSections],
    )
    const dualPromo = useMemo(() => pickDualPromoSection(cmsSections), [cmsSections])
    const finalCta = useMemo(() => pickFinalCtaSection(cmsSections), [cmsSections])
    const promoCards = useMemo(() => pickPromoCardSections(cmsSections), [cmsSections])

    useEffect(() => {
        const cmsTitle = homePageMeta?.seoTitle?.trim() || homePageMeta?.title?.trim()
        const storeTitle = storeSettings?.storeName?.trim()

        if (cmsTitle) {
            document.title = formatDocumentTitle(cmsTitle)
            return
        }

        document.title = storeTitle || DEFAULT_STORE_NAME

        return () => {
            document.title = DEFAULT_STORE_NAME
        }
    }, [homePageMeta, storeSettings])

    useEffect(() => {
        let active = true

        const loadCatalogData = async () => {
            setProductsLoading(true)
            setProductsError('')

            try {
                const [settingsResult, featuredResult] = await Promise.allSettled([
                    getPublicSettings(),
                    getFeaturedProducts({ limit: 24 }),
                ])

                if (!active) return

                if (settingsResult.status === 'fulfilled') {
                    setStoreSettings(settingsResult.value || null)
                }

                if (featuredResult.status === 'fulfilled') {
                    setFeaturedProducts(mapProductsToCards(featuredResult.value?.products || []))
                } else {
                    setFeaturedProducts([])
                    setProductsError(
                        featuredResult.reason?.message || 'Could not load featured products.',
                    )
                }
            } catch (err) {
                if (!active) return
                setFeaturedProducts([])
                setProductsError(err?.message || 'Could not load featured products.')
            } finally {
                if (active) setProductsLoading(false)
            }
        }

        loadCatalogData()

        return () => {
            active = false
        }
    }, [])

    const dealCategories = useMemo(
        () => pickHomepageDealCategories(rootCategories),
        [rootCategories],
    )

    const currencySymbol = storeSettings?.currencySymbol || '$'

    return (
        <>
            <Navbar />
            <HomeBannerLoader onHomePageMeta={handleHomePageMeta} />

            <div className="velmora-page-shell pb-8">
                {categoryShowcase.isActive !== false ? (
                    <CategoryShowcase
                        cmsSection={categoryShowcase}
                        categoryTree={categoryTree}
                        rawCategories={rawCategories}
                        loading={categoriesLoading}
                    />
                ) : null}

                <MarketplaceProductSections
                    categories={dealCategories}
                    latestProducts={featuredProducts}
                    currencySymbol={currencySymbol}
                    loadingLatest={productsLoading}
                    latestError={productsError}
                />

                <PromoBanners section={dualPromo} />

                <HomepagePromoCards cards={promoCards} />

                <TrustStrip />

                <HomeFinalCta section={finalCta} />
            </div>

            <Footer />
            <Switcher />
        </>
    )
}
