import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiRefreshCw, FiShoppingBag } from 'react-icons/fi'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import StorePageShell from '../../component/layout/StorePageShell.jsx'
import PageHeader from '../../component/layout/PageHeader.jsx'
import CartLineItem from '../../component/cart/CartLineItem.jsx'
import OrderSummaryCard from '../../component/checkout/OrderSummaryCard.jsx'
import CheckoutTrustNotes from '../../component/checkout/CheckoutTrustNotes.jsx'
import MethodOptionList from '../../component/checkout/MethodOptionList.jsx'
import { useCart } from '../../context/useCart.js'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../lib/pageTitle.js'

export default function CartPage() {
  const {
    items,
    itemCount,
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
    document.title = formatDocumentTitle('Shopping Cart')

    return () => {
      document.title = getDefaultDocumentTitle()
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

  const shippingNote =
    shippingOptions.length === 0 && shippingEnabled
      ? 'Final shipping is calculated from available methods at checkout after you enter your address.'
      : 'Shipping method can be updated during checkout if your address changes.'

  return (
    <>
      <Navbar />
      <StorePageShell>
          <PageHeader
            title="Shopping Cart"
            subtitle={
              !loading && items.length > 0
                ? itemCount === 1
                  ? '1 item in your cart'
                  : `${itemCount} items in your cart`
                : undefined
            }
            actions={
              <button
                type="button"
                onClick={() => refreshCart()}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <FiRefreshCw className="size-4" />
                Refresh cart
              </button>
            }
          />

          {loading ? (
            <div className="velmora-section-panel p-12 text-center">
              <p className="text-[#64748B]">Loading cart...</p>
            </div>
          ) : null}

          {!loading && error ? (
            <div className="velmora-section-panel p-6 mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
              <button
                type="button"
                onClick={() => refreshCart()}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2"
              >
                <FiRefreshCw className="size-4" />
                Refresh cart
              </button>
            </div>
          ) : null}

          {!loading && itemError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6 text-sm">
              {itemError}
            </div>
          ) : null}

          {!loading && (checkoutOptionsError || selectionError) ? (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6 text-sm">
              {selectionError || checkoutOptionsError}
            </div>
          ) : null}

          {!loading && items.length === 0 && !error ? (
            <div className="velmora-section-panel p-10 sm:p-14 text-center max-w-lg mx-auto">
              <span className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary mb-5">
                <FiShoppingBag className="size-8" />
              </span>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Your cart is empty</h2>
              <p className="text-[#64748B] mt-3 leading-relaxed">
                Browse the shop and add products to start your order.
              </p>
              <Link
                to="/shop"
                className="inline-block mt-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3"
              >
                Continue shopping
              </Link>
            </div>
          ) : null}

          {!loading && items.length > 0 ? (
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                <ul className="list-none space-y-4 m-0 p-0">
                  {items.map((item) => (
                    <li key={item.productId}>
                      <CartLineItem
                        item={item}
                        currencySymbol={currencySymbol}
                        isUpdating={actionProductId === item.productId}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                      />
                    </li>
                  ))}
                </ul>

                {shippingEnabled || shippingOptions.length > 0 ? (
                  <section className="velmora-section-panel p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-1">
                      Shipping method
                    </h2>
                    <p className="text-sm text-[#64748B] mb-4">
                      Select a shipping option if available. Address-based options load at checkout.
                    </p>
                    <MethodOptionList
                      name="cart-shipping-method"
                      options={shippingOptions}
                      selectedId={selectedShippingMethod.id}
                      selectingId={selectingShippingId}
                      onSelect={handleSelectShipping}
                      currencySymbol={currencySymbol}
                      loading={checkoutOptionsLoading}
                      loadingMessage="Loading shipping methods..."
                      emptyMessage={
                        !shippingEnabled
                          ? 'Shipping is not enabled for this store.'
                          : 'Shipping options are selected at checkout after you enter your delivery address.'
                      }
                    />
                  </section>
                ) : null}

                {paymentOptions.length > 0 || checkoutOptionsLoading ? (
                  <section className="velmora-section-panel p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-1">
                      Payment method
                    </h2>
                    <p className="text-sm text-[#64748B] mb-4">
                      Choose how you would like to pay. Payment is confirmed during checkout.
                    </p>
                    <MethodOptionList
                      name="cart-payment-method"
                      options={paymentOptions}
                      selectedId={selectedPaymentMethod.id}
                      selectingId={selectingPaymentId}
                      onSelect={handleSelectPayment}
                      currencySymbol={currencySymbol}
                      loading={checkoutOptionsLoading}
                      loadingMessage="Loading payment options..."
                      emptyMessage="No payment methods are available. Please configure them in admin."
                    />
                  </section>
                ) : null}
              </div>

              <div className="lg:col-span-5 xl:col-span-4 space-y-4 lg:sticky lg:top-24">
                <OrderSummaryCard
                  items={items}
                  itemCount={itemCount}
                  subtotal={subtotal}
                  shippingAmount={shippingAmount}
                  discountAmount={discountAmount}
                  totalAmount={totalAmount}
                  currencySymbol={currencySymbol}
                  selectedShippingMethod={selectedShippingMethod}
                  selectedPaymentMethod={selectedPaymentMethod}
                  shippingNote={shippingNote}
                  showLineItems={false}
                >
                  {checkoutReadinessMessage ? (
                    <p className="text-sm text-amber-800 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300 rounded-lg px-3 py-2">
                      {checkoutReadinessMessage}
                    </p>
                  ) : null}

                  {canProceedToCheckout ? (
                    <Link
                      to="/checkout"
                      className="block w-full text-center rounded-lg bg-[#F59E0B] hover:bg-[#d97706] text-white font-semibold py-3 px-4 transition-colors"
                    >
                      Proceed to checkout
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-lg bg-primary/50 text-white font-semibold py-3 px-4 cursor-not-allowed"
                    >
                      Proceed to checkout
                    </button>
                  )}

                  <Link
                    to="/shop"
                    className="block w-full text-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2.5 px-4 transition-colors"
                  >
                    Continue shopping
                  </Link>
                </OrderSummaryCard>

                <CheckoutTrustNotes />
              </div>
            </div>
          ) : null}
      </StorePageShell>
      <Footer />
      <Switcher />
    </>
  )
}
