import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import { useCart } from '../../context/useCart.js'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { formatProductPrice } from '../../lib/productMappers.js'

export default function CartPage() {
  const {
    items,
    subtotal,
    shippingAmount,
    discountAmount,
    totalAmount,
    selectedShippingMethod,
    selectedPaymentMethod,
    shippingOptions,
    paymentOptions,
    shippingEnabled,
    checkoutOptionsLoading,
    checkoutOptionsError,
    selectingShippingId,
    selectingPaymentId,
    canProceedToCheckout,
    checkoutReadinessMessage,
    loading,
    error,
    actionProductId,
    updateQuantity,
    removeItem,
    refreshCart,
    loadCheckoutOptions,
    selectShippingMethod,
    selectPaymentMethod,
  } = useCart()
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [itemError, setItemError] = useState('')
  const [selectionError, setSelectionError] = useState('')

  useEffect(() => {
    document.title = 'Your Cart'

    return () => {
      document.title = 'Reusable Ecommerce Storefront'
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
    if (loading || items.length === 0) return

    loadCheckoutOptions().catch(() => {
      // Error stored in checkoutOptionsError.
    })
  }, [loading, items.length, subtotal, loadCheckoutOptions])

  const handleQuantityChange = async (productId, nextQuantity) => {
    setItemError('')

    try {
      await updateQuantity(productId, nextQuantity)
    } catch (err) {
      setItemError(err?.message || 'Could not update quantity.')
    }
  }

  const handleRemove = async (productId) => {
    setItemError('')

    try {
      await removeItem(productId)
    } catch (err) {
      setItemError(err?.message || 'Could not remove item.')
    }
  }

  const handleSelectShipping = async (shippingMethodId) => {
    setSelectionError('')

    try {
      await selectShippingMethod(shippingMethodId)
    } catch (err) {
      setSelectionError(err?.message || 'Could not select shipping method.')
    }
  }

  const handleSelectPayment = async (paymentMethodId) => {
    setSelectionError('')

    try {
      await selectPaymentMethod(paymentMethodId)
    } catch (err) {
      setSelectionError(err?.message || 'Could not select payment method.')
    }
  }

  const renderShippingSection = () => (
    <section className="mt-8 rounded-md border border-slate-100 dark:border-gray-800 p-6">
      <h5 className="text-xl font-medium mb-4">Shipping Method</h5>

      {checkoutOptionsLoading ? (
        <p className="text-slate-500 text-sm">Loading shipping methods...</p>
      ) : null}

      {!checkoutOptionsLoading && !shippingEnabled ? (
        <p className="text-slate-500 text-sm">
          Shipping is not enabled for this store.
        </p>
      ) : null}

      {!checkoutOptionsLoading && shippingEnabled && shippingOptions.length === 0 ? (
        <p className="text-slate-500 text-sm">
          Shipping options are selected at checkout after you enter your delivery address.
        </p>
      ) : null}

      {!checkoutOptionsLoading && shippingOptions.length > 0 ? (
        <ul className="list-none space-y-3">
          {shippingOptions.map((option) => {
            const isSelected = selectedShippingMethod.id === option.id
            const isSelecting = selectingShippingId === option.id

            return (
              <li key={option.id}>
                <label
                  className={`flex items-start gap-3 rounded-md border p-4 cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-100 dark:border-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping-method"
                    className="mt-1"
                    checked={isSelected}
                    disabled={Boolean(selectingShippingId)}
                    onChange={() => handleSelectShipping(option.id)}
                  />
                  <span className="flex-1">
                    <span className="font-medium block">{option.name}</span>
                    {option.description ? (
                      <span className="text-sm text-slate-500 block mt-1">
                        {option.description}
                      </span>
                    ) : null}
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    {isSelecting
                      ? 'Updating...'
                      : formatProductPrice(option.charge, currencySymbol)}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      ) : null}
    </section>
  )

  const renderPaymentSection = () => (
    <section className="mt-8 rounded-md border border-slate-100 dark:border-gray-800 p-6">
      <h5 className="text-xl font-medium mb-4">Payment Method</h5>

      {checkoutOptionsLoading ? (
        <p className="text-slate-500 text-sm">Loading payment options...</p>
      ) : null}

      {!checkoutOptionsLoading && paymentOptions.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No payment methods are available. Please configure them in admin.
        </p>
      ) : null}

      {!checkoutOptionsLoading && paymentOptions.length > 0 ? (
        <ul className="list-none space-y-3">
          {paymentOptions.map((option) => {
            const isSelected = selectedPaymentMethod.id === option.id
            const isSelecting = selectingPaymentId === option.id

            return (
              <li key={option.id}>
                <label
                  className={`flex items-start gap-3 rounded-md border p-4 cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-100 dark:border-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    className="mt-1"
                    checked={isSelected}
                    disabled={Boolean(selectingPaymentId)}
                    onChange={() => handleSelectPayment(option.id)}
                  />
                  <span className="flex-1">
                    <span className="font-medium block">{option.name}</span>
                    {option.description ? (
                      <span className="text-sm text-slate-500 block mt-1">
                        {option.description}
                      </span>
                    ) : null}
                  </span>
                  {isSelecting ? (
                    <span className="text-sm text-slate-500">Saving...</span>
                  ) : null}
                </label>
              </li>
            )
          })}
        </ul>
      ) : null}
    </section>
  )

  return (
    <>
      <Navbar />
      <section className="relative md:pb-24 pb-16 mt-20">
        <div className="container md:mt-24 mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h4 className="text-2xl font-medium">Shopping Cart</h4>
            <button
              type="button"
              onClick={() => refreshCart()}
              className="text-sm text-primary hover:underline"
            >
              Refresh cart
            </button>
          </div>

          {loading ? (
            <p className="text-slate-500 py-12 text-center">Loading cart...</p>
          ) : null}

          {!loading && error ? (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6">
              {error}
            </div>
          ) : null}

          {!loading && itemError ? (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6">
              {itemError}
            </div>
          ) : null}

          {!loading && (checkoutOptionsError || selectionError) ? (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6">
              {selectionError || checkoutOptionsError}
            </div>
          ) : null}

          {!loading && items.length === 0 ? (
            <div className="text-center py-16 rounded-md bg-slate-50 dark:bg-slate-800">
              <h5 className="text-xl font-medium">Your cart is empty</h5>
              <p className="text-slate-400 mt-3">Add products to start shopping.</p>
              <Link
                to="/products"
                className="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-6"
              >
                Continue shopping
              </Link>
            </div>
          ) : null}

          {!loading && items.length > 0 ? (
            <div className="md:flex gap-8">
              <div className="md:w-2/3">
                <ul className="list-none space-y-4">
                  {items.map((item) => {
                    const isUpdating = actionProductId === item.productId

                    return (
                      <li
                        key={item.productId}
                        className="rounded-md border border-slate-100 dark:border-gray-800 p-4"
                      >
                        <div className="flex gap-4">
                          <Link to={item.detailPath} className="shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link
                              to={item.detailPath}
                              className="font-medium hover:text-primary line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            {item.sku ? (
                              <p className="text-sm text-slate-400 mt-1">SKU: {item.sku}</p>
                            ) : null}
                            <p className="mt-2 font-medium">
                              {formatProductPrice(item.price, currencySymbol)}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              <label
                                className="text-sm text-slate-500"
                                htmlFor={`qty-${item.productId}`}
                              >
                                Qty
                              </label>
                              <div className="inline-flex items-center rounded-md border border-slate-200 dark:border-gray-700">
                                <button
                                  type="button"
                                  disabled={isUpdating || item.quantity <= 1}
                                  onClick={() =>
                                    handleQuantityChange(item.productId, item.quantity - 1)
                                  }
                                  className="px-3 py-1 disabled:opacity-50"
                                >
                                  −
                                </button>
                                <span
                                  id={`qty-${item.productId}`}
                                  className="px-3 py-1 min-w-10 text-center"
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  disabled={
                                    isUpdating ||
                                    (item.maxQuantity != null &&
                                      item.quantity >= item.maxQuantity)
                                  }
                                  onClick={() =>
                                    handleQuantityChange(item.productId, item.quantity + 1)
                                  }
                                  className="px-3 py-1 disabled:opacity-50"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleRemove(item.productId)}
                                className="text-sm text-red-600 hover:underline disabled:opacity-50"
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <div className="text-end font-medium">
                            {formatProductPrice(item.total, currencySymbol)}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                {renderShippingSection()}
                {renderPaymentSection()}
              </div>

              <div className="md:w-1/3 mt-8 md:mt-0">
                <div className="sticky top-20 rounded-md bg-slate-50 dark:bg-slate-800 p-6 shadow-sm">
                  <h5 className="text-xl font-medium mb-4">Order Summary</h5>
                  <ul className="list-none space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-slate-500">Subtotal</span>
                      <span>{formatProductPrice(subtotal, currencySymbol)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500">Delivery Fee</span>
                      <span>{formatProductPrice(shippingAmount, currencySymbol)}</span>
                    </li>
                    {discountAmount > 0 ? (
                      <li className="flex justify-between">
                        <span className="text-slate-500">Discount</span>
                        <span>-{formatProductPrice(discountAmount, currencySymbol)}</span>
                      </li>
                    ) : null}
                    {selectedShippingMethod.name ? (
                      <li className="text-slate-500 text-xs pt-1">
                        Shipping: {selectedShippingMethod.name}
                      </li>
                    ) : null}
                    {selectedPaymentMethod.name ? (
                      <li className="text-slate-500 text-xs">
                        Payment: {selectedPaymentMethod.name}
                      </li>
                    ) : null}
                    <li className="flex justify-between font-medium text-base pt-3 border-t border-slate-200 dark:border-gray-700">
                      <span>Total</span>
                      <span>{formatProductPrice(totalAmount, currencySymbol)}</span>
                    </li>
                  </ul>

                  {checkoutReadinessMessage ? (
                    <p className="text-sm text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300 rounded-md px-3 py-2 mt-4">
                      {checkoutReadinessMessage}
                    </p>
                  ) : null}

                  {canProceedToCheckout ? (
                    <Link
                      to="/checkout"
                      className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full mt-6 block text-center"
                    >
                      Proceed to checkout
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="btn bg-primary/60 text-white rounded-md w-full mt-6 cursor-not-allowed"
                    >
                      Proceed to checkout
                    </button>
                  )}

                  <Link
                    to="/products"
                    className="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md w-full mt-3 block text-center"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <Footer />
      <Switcher />
    </>
  )
}
