import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import StorePageShell from '../../component/layout/StorePageShell.jsx'
import ProductGallery from '../../component/product-detail/ProductGallery.jsx'
import ProductInfoPanel from '../../component/product-detail/ProductInfoPanel.jsx'
import ProductPurchaseCard from '../../component/product-detail/ProductPurchaseCard.jsx'
import ProductOffersBlock from '../../component/product-detail/ProductOffersBlock.jsx'
import ProductDetailsSections from '../../component/product-detail/ProductDetailsSections.jsx'
import RelatedProducts from '../../component/product-detail/RelatedProducts.jsx'
import RecentlyViewedProducts from '../../component/product-detail/RecentlyViewedProducts.jsx'
import { getProductBySlug } from '../../api/catalogApi.js'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { ApiError } from '../../lib/apiClient.js'
import {
  buildDisplayProduct,
  getAtGlanceSpecs,
  getProductHighlights,
  mapProductToDetail,
  trackRecentlyViewedProduct,
} from '../../lib/productMappers.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../lib/pageTitle.js'
import { useCart } from '../../context/useCart.js'

const DEFAULT_TITLE = getDefaultDocumentTitle()

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart, isAdding, actionProductId } = useCart()
  const [product, setProduct] = useState(null)
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedVariantId, setSelectedVariantId] = useState('')
  const [addError, setAddError] = useState('')
  const [addSuccess, setAddSuccess] = useState('')

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

    const loadProduct = async () => {
      if (!slug) {
        setProduct(null)
        setError('Product not found.')
        setLoading(false)
        document.title = DEFAULT_TITLE
        return
      }

      setLoading(true)
      setError('')
      setProduct(null)

      try {
        const data = await getProductBySlug(slug)
        if (!active) return

        const mapped = mapProductToDetail(data)
        setProduct(mapped)
        setQuantity(1)
        setSelectedVariantId('')
        setAddError('')
        setAddSuccess('')
        trackRecentlyViewedProduct(mapped)
        document.title = mapped.name
          ? formatDocumentTitle(mapped.name)
          : DEFAULT_TITLE
      } catch (err) {
        if (!active) return

        setProduct(null)
        document.title = DEFAULT_TITLE

        if (err instanceof ApiError && err.status === 404) {
          setError('This product is unavailable or no longer published.')
        } else {
          setError(err?.message || 'Could not load product details.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      active = false
      document.title = DEFAULT_TITLE
    }
  }, [slug])

  const displayProduct = useMemo(
    () => buildDisplayProduct(product, selectedVariantId),
    [product, selectedVariantId],
  )

  const handleQuantityChange = (nextQuantity) => {
    const maxQuantity = Number(displayProduct?.quantity || 0)
    if (maxQuantity > 0 && nextQuantity > maxQuantity) {
      setQuantity(maxQuantity)
      return
    }
    setQuantity(nextQuantity)
  }

  const handleVariantSelect = (variantId) => {
    setSelectedVariantId(String(variantId))
    setAddError('')
    setAddSuccess('')
    setQuantity(1)
  }

  const handleAddToCart = async () => {
    if (!product?.id || !displayProduct) return

    setAddError('')
    setAddSuccess('')

    try {
      await addToCart(product, {
        quantity,
        variantId: product.hasVariants ? selectedVariantId : undefined,
      })
      setAddSuccess('Added to cart.')
    } catch (err) {
      setAddError(err?.message || 'Could not add to cart.')
    }
  }

  const handleBuyNow = async () => {
    if (!product?.id || !displayProduct) return

    setAddError('')
    setAddSuccess('')

    try {
      await addToCart(product, {
        quantity,
        variantId: product.hasVariants ? selectedVariantId : undefined,
      })
      navigate('/cart')
    } catch (err) {
      setAddError(err?.message || 'Could not add to cart.')
    }
  }

  const cartLineKey = product?.hasVariants
    ? selectedVariantId
      ? `${product.id}:${selectedVariantId}`
      : String(product?.id || '')
    : String(product?.id || '')

  const isAddingThisProduct = isAdding && actionProductId === cartLineKey

  const highlights = useMemo(
    () => (displayProduct ? getProductHighlights(displayProduct) : []),
    [displayProduct],
  )

  const atGlanceSpecs = useMemo(
    () => (displayProduct ? getAtGlanceSpecs(displayProduct, 4) : []),
    [displayProduct],
  )

  return (
    <>
      <Navbar />
      <StorePageShell containerClassName="velmora-pdp-page">
        {loading ? (
          <div className="velmora-pdp-skeleton text-center py-20">
            <div className="inline-block size-10 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin mb-4" />
            <p className="text-[#64748B]">Loading product...</p>
          </div>
        ) : null}

        {!loading && error ? (
          <div className="text-center py-20 velmora-section-panel max-w-lg mx-auto p-8">
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white">
              Product unavailable
            </h1>
            <p className="text-[#64748B] mt-4">{error}</p>
            <Link
              to="/shop"
              className="inline-block mt-6 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-2.5"
            >
              Back to shop
            </Link>
          </div>
        ) : null}

        {!loading && product && displayProduct ? (
          <div className="velmora-pdp">
            <nav className="velmora-pdp-breadcrumb" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 list-none p-0 m-0">
                <li>
                  <Link to="/" className="hover:text-[#2563EB]">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link to="/shop" className="hover:text-[#2563EB]">
                    Shop
                  </Link>
                </li>
                {product.categoryPath?.length > 0
                  ? product.categoryPath.map((crumb) => (
                      <React.Fragment key={crumb.id || crumb.name}>
                        <li aria-hidden>/</li>
                        <li>
                          <Link
                            to={`/shop?category=${encodeURIComponent(crumb.id)}`}
                            className="hover:text-[#2563EB]"
                          >
                            {crumb.name}
                          </Link>
                        </li>
                      </React.Fragment>
                    ))
                  : product.categoryName && product.categoryId ? (
                      <>
                        <li aria-hidden>/</li>
                        <li>
                          <Link
                            to={`/shop?category=${encodeURIComponent(product.categoryId)}`}
                            className="hover:text-[#2563EB]"
                          >
                            {product.categoryName}
                          </Link>
                        </li>
                      </>
                    ) : null}
                <li aria-hidden>/</li>
                <li className="text-[#111827] dark:text-white font-medium line-clamp-1">
                  {product.name}
                </li>
              </ol>
            </nav>

            <section className="velmora-pdp-top" aria-label="Product overview">
              <div className="velmora-pdp-top-grid">
                <div className="velmora-pdp-top-gallery">
                  <ProductGallery
                    images={displayProduct.images}
                    productName={displayProduct.name}
                  />
                </div>

                <div className="velmora-pdp-top-info">
                  <ProductInfoPanel
                    product={displayProduct}
                    currencySymbol={currencySymbol}
                    highlights={highlights}
                    atGlanceSpecs={atGlanceSpecs}
                  />

                  <div className="lg:hidden velmora-pdp-mobile-buy">
                    <ProductPurchaseCard
                      product={displayProduct}
                      baseProduct={product}
                      currencySymbol={currencySymbol}
                      quantity={quantity}
                      onQuantityChange={handleQuantityChange}
                      selectedVariantId={selectedVariantId}
                      onVariantSelect={handleVariantSelect}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      isAdding={isAddingThisProduct}
                      addError={addError}
                      addSuccess={addSuccess}
                      actionOnly
                    />
                  </div>
                </div>

                <div className="velmora-pdp-top-buy hidden lg:block">
                  <div className="velmora-pdp-buy-sticky">
                    <ProductPurchaseCard
                      product={displayProduct}
                      baseProduct={product}
                      currencySymbol={currencySymbol}
                      quantity={quantity}
                      onQuantityChange={handleQuantityChange}
                      selectedVariantId={selectedVariantId}
                      onVariantSelect={handleVariantSelect}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      isAdding={isAddingThisProduct}
                      addError={addError}
                      addSuccess={addSuccess}
                      actionOnly
                    />
                  </div>
                </div>
              </div>

              <ProductOffersBlock />
            </section>

            <div className="velmora-pdp-below">
              <ProductDetailsSections product={displayProduct} currencySymbol={currencySymbol} />
            </div>

            <RelatedProducts
              key={product.id}
              productId={product.id}
              categoryId={product.categoryId}
              categoryName={product.categoryName}
              currencySymbol={currencySymbol}
            />

            <RecentlyViewedProducts
              excludeProductId={product.id}
              currencySymbol={currencySymbol}
            />

            <div className="mt-8 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-semibold px-6 py-2.5 transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        ) : null}
      </StorePageShell>

      <Footer />
      <Switcher />
    </>
  )
}
