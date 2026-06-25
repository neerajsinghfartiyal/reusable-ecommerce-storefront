import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { AiOutlineCamera } from 'react-icons/ai'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import { getProductBySlug } from '../../api/catalogApi.js'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { ApiError } from '../../lib/apiClient.js'
import {
  formatProductPrice,
  mapProductToDetail,
} from '../../lib/productMappers.js'
import { useCart } from '../../context/useCart.js'

const DEFAULT_TITLE = 'Product Details'

export default function ProductDetail() {
  const { slug } = useParams()
  const { addToCart, isAdding, actionProductId } = useCart()
  const [product, setProduct] = useState(null)
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addError, setAddError] = useState('')
  const [addSuccess, setAddSuccess] = useState('')
  const [photoIndex, setActiveIndex] = useState(0)
  const [isOpen, setOpen] = useState(false)

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
        setAddError('')
        setAddSuccess('')
        document.title = mapped.name || DEFAULT_TITLE
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

  const handleAddToCart = async () => {
    if (!product?.id) return

    setAddError('')
    setAddSuccess('')

    try {
      await addToCart(product, { quantity })
      setAddSuccess('Added to cart.')
    } catch (err) {
      setAddError(err?.message || 'Could not add to cart.')
    }
  }

  const isAddingThisProduct =
    isAdding && actionProductId === String(product?.id || '')

  const slides = (product?.images || []).map((image) => ({ src: image }))
  const mainImage = product?.images?.[0]
  const secondaryImages = product?.images?.slice(1, 5) || []

  const handleGalleryClick = (index) => {
    setActiveIndex(index)
    setOpen(true)
  }

  const renderGallery = () => {
    if (!product?.images?.length) return null

    if (product.images.length === 1) {
      return (
        <div className="p-1">
          <div className="group relative overflow-hidden rounded-md">
            <img src={mainImage} alt={product.name} className="w-full h-[28rem] object-cover" />
            <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out" />
            <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
              <button
                type="button"
                onClick={() => handleGalleryClick(0)}
                className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full!"
              >
                <AiOutlineCamera className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="md:flex mt-4">
        <div className="lg:w-1/2 md:w-1/2 p-1">
          <div className="group relative overflow-hidden rounded-md">
            <img src={mainImage} alt={product.name} className="w-full h-[28rem] object-cover" />
            <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out" />
            <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
              <button
                type="button"
                onClick={() => handleGalleryClick(0)}
                className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full!"
              >
                <AiOutlineCamera className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 md:w-1/2">
          <div className="flex flex-wrap">
            {secondaryImages.map((image, index) => {
              const slideIndex = index + 1
              return (
                <div key={`${image}-${slideIndex}`} className="w-1/2 p-1">
                  <div className="group relative overflow-hidden rounded-md">
                    <img
                      src={image}
                      alt={`${product.name} ${slideIndex + 1}`}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out" />
                    <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
                      <button
                        type="button"
                        onClick={() => handleGalleryClick(slideIndex)}
                        className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full!"
                      >
                        <AiOutlineCamera className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <section className="relative md:pb-24 pb-16 mt-20">
        <div className="container-fluid">
          {loading ? (
            <div className="container md:mt-24 mt-16 text-center py-16">
              <p className="text-slate-500">Loading product...</p>
            </div>
          ) : null}

          {!loading && error ? (
            <div className="container md:mt-24 mt-16 text-center py-16">
              <h4 className="text-2xl font-medium text-slate-900 dark:text-white">
                Product unavailable
              </h4>
              <p className="text-slate-400 mt-4">{error}</p>
              <Link to="/products" className="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-6">
                Back to products
              </Link>
            </div>
          ) : null}

          {!loading && product ? (
            <>
              {renderGallery()}

              <div className="container md:mt-24 mt-16">
                <div className="md:flex">
                  <div className="lg:w-2/3 md:w-1/2 md:p-4 px-3">
                    <h4 className="text-2xl font-medium">{product.name}</h4>

                    <ul className="py-6 flex flex-wrap items-center gap-4 list-none text-slate-500">
                      {product.sku ? <li>SKU: {product.sku}</li> : null}
                      {product.categoryName ? <li>Category: {product.categoryName}</li> : null}
                      {product.brandName ? <li>Brand: {product.brandName}</li> : null}
                      <li>Availability: {product.availabilityLabel}</li>
                    </ul>

                    {product.shortDescription ? (
                      <p className="text-slate-600 dark:text-slate-300">{product.shortDescription}</p>
                    ) : null}

                    {product.description ? (
                      <div className="mt-8">
                        <h5 className="text-xl font-medium mb-4">Description</h5>
                        <div className="text-slate-400 whitespace-pre-line">{product.description}</div>
                      </div>
                    ) : null}

                    {product.specifications.length > 0 ? (
                      <div className="mt-8">
                        <h5 className="text-xl font-medium mb-4">Specifications</h5>
                        <ul className="list-none border border-slate-100 dark:border-gray-800 rounded-md overflow-hidden">
                          {product.specifications.map((spec) => (
                            <li
                              key={`${spec.name}-${spec.value}`}
                              className="flex justify-between gap-4 px-4 py-3 border-b border-slate-100 dark:border-gray-800 last:border-b-0"
                            >
                              <span className="text-slate-500">{spec.name}</span>
                              <span className="font-medium text-end">{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {product.variations.length > 0 ? (
                      <div className="mt-8">
                        <h5 className="text-xl font-medium mb-4">Options</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border border-slate-100 dark:border-gray-800 rounded-md">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                              <tr>
                                <th className="text-start px-4 py-3">Variant</th>
                                <th className="text-start px-4 py-3">SKU</th>
                                <th className="text-start px-4 py-3">Price</th>
                                <th className="text-start px-4 py-3">Availability</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.variations.map((variation) => (
                                <tr
                                  key={variation.sku || variation.options}
                                  className="border-t border-slate-100 dark:border-gray-800"
                                >
                                  <td className="px-4 py-3">{variation.options || 'Default'}</td>
                                  <td className="px-4 py-3">{variation.sku || '—'}</td>
                                  <td className="px-4 py-3">
                                    {formatProductPrice(
                                      variation.salePrice ?? variation.price,
                                      currencySymbol,
                                    )}
                                    {variation.salePrice != null ? (
                                      <span className="ms-2 text-slate-400 line-through">
                                        {formatProductPrice(variation.price, currencySymbol)}
                                      </span>
                                    ) : null}
                                  </td>
                                  <td className="px-4 py-3">
                                    {variation.inStock ? 'In stock' : 'Out of stock'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="lg:w-1/3 md:w-1/2 md:p-4 px-3 mt-8 md:mt-0">
                    <div className="sticky top-20">
                      <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                        <div className="p-6">
                          <h5 className="text-2xl font-medium">Price</h5>

                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xl font-medium">
                              {formatProductPrice(product.price, currencySymbol)}
                              {product.compareAtPrice != null ? (
                                <span className="ms-2 text-sm text-slate-400 line-through">
                                  {formatProductPrice(product.compareAtPrice, currencySymbol)}
                                </span>
                              ) : null}
                            </span>

                            <span
                              className={`text-sm px-2.5 py-0.75 rounded-sm h-6 ${
                                product.inStock
                                  ? 'bg-emerald-500/10 text-emerald-600'
                                  : 'bg-slate-500/10 text-slate-600'
                              }`}
                            >
                              {product.availabilityLabel}
                            </span>
                          </div>

                          <ul className="list-none mt-4 space-y-2">
                            {product.sku ? (
                              <li className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">SKU</span>
                                <span className="font-medium text-sm">{product.sku}</span>
                              </li>
                            ) : null}
                            {product.categoryName ? (
                              <li className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Category</span>
                                <span className="font-medium text-sm">{product.categoryName}</span>
                              </li>
                            ) : null}
                            {product.brandName ? (
                              <li className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Brand</span>
                                <span className="font-medium text-sm">{product.brandName}</span>
                              </li>
                            ) : null}
                            <li className="flex justify-between items-center">
                              <span className="text-slate-400 text-sm">Stock</span>
                              <span className="font-medium text-sm">{product.quantity}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 border-t border-slate-100 dark:border-gray-700 space-y-3">
                          {product.variations.length > 0 ? (
                            <p className="text-xs text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300 rounded-md px-3 py-2">
                              Variant selection is not supported yet. The main product will be added to your cart.
                            </p>
                          ) : null}

                          <div className="flex items-center justify-between gap-3">
                            <label htmlFor="product-quantity" className="text-sm text-slate-500">
                              Quantity
                            </label>
                            <div className="inline-flex items-center rounded-md border border-slate-200 dark:border-gray-700">
                              <button
                                type="button"
                                disabled={quantity <= 1 || isAddingThisProduct}
                                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                className="px-3 py-1 disabled:opacity-50"
                              >
                                −
                              </button>
                              <input
                                id="product-quantity"
                                type="number"
                                min={1}
                                max={product.quantity > 0 ? product.quantity : 1}
                                value={quantity}
                                onChange={(event) => {
                                  const next = Number(event.target.value)
                                  if (!Number.isFinite(next) || next < 1) {
                                    setQuantity(1)
                                    return
                                  }
                                  setQuantity(
                                    product.quantity > 0
                                      ? Math.min(next, product.quantity)
                                      : next,
                                  )
                                }}
                                className="w-14 text-center py-1 bg-transparent border-0 focus:outline-none"
                              />
                              <button
                                type="button"
                                disabled={
                                  isAddingThisProduct ||
                                  (product.quantity > 0 && quantity >= product.quantity)
                                }
                                onClick={() =>
                                  setQuantity((value) =>
                                    product.quantity > 0
                                      ? Math.min(value + 1, product.quantity)
                                      : value + 1,
                                  )
                                }
                                className="px-3 py-1 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {addError ? (
                            <p className="text-sm text-red-600">{addError}</p>
                          ) : null}
                          {addSuccess ? (
                            <p className="text-sm text-emerald-600">{addSuccess}</p>
                          ) : null}

                          <button
                            type="button"
                            disabled={!product.inStock || isAddingThisProduct}
                            onClick={handleAddToCart}
                            className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {isAddingThisProduct ? 'Adding...' : 'Add to cart'}
                          </button>

                          {addSuccess ? (
                            <Link
                              to="/cart"
                              className="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md w-full block text-center"
                            >
                              View cart
                            </Link>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 text-center">
                        <Link
                          to="/products"
                          className="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md"
                        >
                          Back to products
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {product?.images?.length ? (
        <Lightbox
          open={isOpen}
          close={() => setOpen(false)}
          slides={slides}
          index={photoIndex}
        />
      ) : null}

      <Footer />
      <Switcher />
    </>
  )
}
