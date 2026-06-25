import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import { useCart } from '../../context/useCart.js'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { formatProductPrice } from '../../lib/productMappers.js'
import {
  buildCheckoutCustomerPayload,
  mapOrderToSuccessSummary,
  validateCheckoutForm,
} from '../../lib/checkoutHelpers.js'
import { saveOrderSuccess } from '../../lib/orderSession.js'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  notes: '',
}

const ADDRESS_FIELDS = ['street', 'city', 'state', 'postalCode', 'country']

export default function CheckoutPage() {
  const navigate = useNavigate()
  const {
    items,
    subtotal,
    shippingAmount,
    discountAmount,
    totalAmount,
    selectedShippingMethod,
    selectedPaymentMethod,
    checkoutCustomerId,
    customerShippingOptions,
    customerPaymentOptions,
    customerShippingEnabled,
    customerCheckoutPrepared,
    customerCheckoutLoading,
    customerShippingRequired,
    customerPaymentRequired,
    checkoutOptionsError,
    checkoutSubmitting,
    selectingShippingId,
    selectingPaymentId,
    canProceedToCheckout,
    canPlaceOrder,
    loading,
    prepareCustomerCheckout,
    clearCustomerCheckout,
    selectShippingMethod,
    selectPaymentMethod,
    placeOrder,
    refreshCart,
  } = useCart()

  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [prepareError, setPrepareError] = useState('')
  const [selectionError, setSelectionError] = useState('')
  const [currencySymbol, setCurrencySymbol] = useState('$')

  useEffect(() => {
    document.title = 'Checkout'

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
    if (!loading && items.length === 0) {
      navigate('/cart', { replace: true })
    }
  }, [items.length, loading, navigate])

  useEffect(() => {
    if (!loading && items.length > 0 && !canProceedToCheckout) {
      navigate('/cart', { replace: true })
    }
  }, [canProceedToCheckout, items.length, loading, navigate])

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })

    if (customerCheckoutPrepared && ADDRESS_FIELDS.includes(name)) {
      clearCustomerCheckout()
      setPrepareError('')
      setSelectionError('')
    }
  }

  const handlePrepareCheckout = async () => {
    setPrepareError('')
    setSelectionError('')
    setSubmitError('')

    const errors = validateCheckoutForm(form)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    try {
      await prepareCustomerCheckout(buildCheckoutCustomerPayload(form))
    } catch (err) {
      setPrepareError(err?.message || 'Could not load delivery and payment options.')
    }
  }

  const handleSelectShipping = async (shippingMethodId) => {
    setSelectionError('')

    try {
      await selectShippingMethod(shippingMethodId, { customerId: checkoutCustomerId })
    } catch (err) {
      setSelectionError(err?.message || 'Could not select shipping method.')
    }
  }

  const handleSelectPayment = async (paymentMethodId) => {
    setSelectionError('')

    try {
      await selectPaymentMethod(paymentMethodId, { customerId: checkoutCustomerId })
    } catch (err) {
      setSelectionError(err?.message || 'Could not select payment method.')
    }
  }

  const handlePlaceOrder = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const errors = validateCheckoutForm(form, {
      shippingRequired: customerShippingRequired && !selectedShippingMethod.id,
      paymentRequired: customerPaymentRequired && !selectedPaymentMethod.id,
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    if (!customerCheckoutPrepared) {
      setSubmitError('Continue to delivery and payment options before placing your order.')
      return
    }

    setFieldErrors({})

    try {
      const result = await placeOrder({
        customer: buildCheckoutCustomerPayload(form),
        notes: form.notes,
      })

      const summary = mapOrderToSuccessSummary(result?.order)
      saveOrderSuccess(summary)

      navigate('/order-success', {
        replace: true,
        state: { order: summary },
      })
    } catch (err) {
      setSubmitError(err?.message || 'Could not place your order.')
    }
  }

  const renderShippingSection = () => {
    if (!customerCheckoutPrepared) return null

    return (
      <section className="rounded-md border border-slate-100 dark:border-gray-800 p-6">
        <h5 className="text-xl font-medium mb-4">Shipping Method</h5>

        {customerCheckoutLoading ? (
          <p className="text-slate-500 text-sm">Loading shipping methods...</p>
        ) : null}

        {!customerCheckoutLoading && !customerShippingEnabled ? (
          <p className="text-slate-500 text-sm">
            Shipping is not enabled for this store.
          </p>
        ) : null}

        {!customerCheckoutLoading &&
        customerShippingEnabled &&
        customerShippingOptions.length === 0 ? (
          <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            No shipping methods are available for this address. Try a different address or
            contact the store.
          </div>
        ) : null}

        {!customerCheckoutLoading && customerShippingOptions.length > 0 ? (
          <ul className="list-none space-y-3">
            {customerShippingOptions.map((option) => {
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
                      name="checkout-shipping-method"
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
                      {customerShippingOptions.length === 1 && isSelected ? (
                        <span className="text-xs text-slate-500 block mt-1">
                          Only available option (auto-selected)
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
  }

  const renderPaymentSection = () => {
    if (!customerCheckoutPrepared) return null

    return (
      <section className="rounded-md border border-slate-100 dark:border-gray-800 p-6">
        <h5 className="text-xl font-medium mb-4">Payment Method</h5>

        {customerCheckoutLoading ? (
          <p className="text-slate-500 text-sm">Loading payment options...</p>
        ) : null}

        {!customerCheckoutLoading && customerPaymentOptions.length === 0 ? (
          <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            No payment methods are available. Please contact the store.
          </div>
        ) : null}

        {!customerCheckoutLoading && customerPaymentOptions.length > 0 ? (
          <ul className="list-none space-y-3">
            {customerPaymentOptions.map((option) => {
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
                      name="checkout-payment-method"
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
                      {customerPaymentOptions.length === 1 && isSelected ? (
                        <span className="text-xs text-slate-500 block mt-1">
                          Only available option (auto-selected)
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
  }

  if (loading || items.length === 0) {
    return (
      <>
        <Navbar />
        <section className="relative md:pb-24 pb-16 mt-20">
          <div className="container md:mt-24 mt-16 text-center py-16">
            <p className="text-slate-500">Loading checkout...</p>
          </div>
        </section>
        <Footer />
        <Switcher />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <section className="relative md:pb-24 pb-16 mt-20">
        <div className="container md:mt-24 mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h4 className="text-2xl font-medium">Checkout</h4>
            <Link to="/cart" className="text-sm text-primary hover:underline">
              Back to cart
            </Link>
          </div>

          {prepareError || checkoutOptionsError ? (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6">
              {prepareError || checkoutOptionsError}
            </div>
          ) : null}

          {selectionError ? (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6">
              {selectionError}
            </div>
          ) : null}

          {submitError ? (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6">
              {submitError}
            </div>
          ) : null}

          <form onSubmit={handlePlaceOrder} className="md:flex gap-8">
            <div className="md:w-2/3 space-y-8">
              <section className="rounded-md border border-slate-100 dark:border-gray-800 p-6">
                <h5 className="text-xl font-medium mb-4">Customer Information</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-500" htmlFor="firstName">
                      First name
                    </label>
                    <input
                      id="firstName"
                      value={form.firstName}
                      onChange={(event) => updateField('firstName', event.target.value)}
                      className="form-input mt-1 w-full"
                    />
                    {fieldErrors.firstName ? (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.firstName}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-sm text-slate-500" htmlFor="lastName">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      value={form.lastName}
                      onChange={(event) => updateField('lastName', event.target.value)}
                      className="form-input mt-1 w-full"
                    />
                    {fieldErrors.lastName ? (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.lastName}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-sm text-slate-500" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      className="form-input mt-1 w-full"
                    />
                    {fieldErrors.email ? (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-sm text-slate-500" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className="form-input mt-1 w-full"
                    />
                    {fieldErrors.phone ? (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.phone}</p>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="rounded-md border border-slate-100 dark:border-gray-800 p-6">
                <h5 className="text-xl font-medium mb-4">Shipping Address</h5>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-500" htmlFor="street">
                      Street address
                    </label>
                    <input
                      id="street"
                      value={form.street}
                      onChange={(event) => updateField('street', event.target.value)}
                      className="form-input mt-1 w-full"
                    />
                    {fieldErrors.street ? (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.street}</p>
                    ) : null}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-500" htmlFor="city">
                        City
                      </label>
                      <input
                        id="city"
                        value={form.city}
                        onChange={(event) => updateField('city', event.target.value)}
                        className="form-input mt-1 w-full"
                      />
                      {fieldErrors.city ? (
                        <p className="text-sm text-red-600 mt-1">{fieldErrors.city}</p>
                      ) : null}
                    </div>
                    <div>
                      <label className="text-sm text-slate-500" htmlFor="state">
                        State
                      </label>
                      <input
                        id="state"
                        value={form.state}
                        onChange={(event) => updateField('state', event.target.value)}
                        className="form-input mt-1 w-full"
                      />
                      {fieldErrors.state ? (
                        <p className="text-sm text-red-600 mt-1">{fieldErrors.state}</p>
                      ) : null}
                    </div>
                    <div>
                      <label className="text-sm text-slate-500" htmlFor="postalCode">
                        Postal code
                      </label>
                      <input
                        id="postalCode"
                        value={form.postalCode}
                        onChange={(event) => updateField('postalCode', event.target.value)}
                        className="form-input mt-1 w-full"
                      />
                      {fieldErrors.postalCode ? (
                        <p className="text-sm text-red-600 mt-1">{fieldErrors.postalCode}</p>
                      ) : null}
                    </div>
                    <div>
                      <label className="text-sm text-slate-500" htmlFor="country">
                        Country
                      </label>
                      <input
                        id="country"
                        value={form.country}
                        onChange={(event) => updateField('country', event.target.value)}
                        className="form-input mt-1 w-full"
                      />
                      {fieldErrors.country ? (
                        <p className="text-sm text-red-600 mt-1">{fieldErrors.country}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                {!customerCheckoutPrepared ? (
                  <button
                    type="button"
                    onClick={handlePrepareCheckout}
                    disabled={customerCheckoutLoading}
                    className="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {customerCheckoutLoading
                      ? 'Loading delivery options...'
                      : 'Continue to delivery & payment'}
                  </button>
                ) : (
                  <p className="text-sm text-slate-500 mt-4">
                    Delivery options loaded for this address. Change the address above to
                    reload options.
                  </p>
                )}
              </section>

              {renderShippingSection()}
              {renderPaymentSection()}

              <section className="rounded-md border border-slate-100 dark:border-gray-800 p-6">
                <label className="text-sm text-slate-500" htmlFor="notes">
                  Order notes (optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                  className="form-input mt-1 w-full"
                />
              </section>
            </div>

            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="sticky top-20 rounded-md bg-slate-50 dark:bg-slate-800 p-6 shadow-sm">
                <h5 className="text-xl font-medium mb-4">Order Summary</h5>

                <ul className="list-none space-y-3 text-sm mb-4">
                  {items.map((item) => (
                    <li key={item.productId} className="flex justify-between gap-3">
                      <span className="text-slate-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatProductPrice(item.total, currencySymbol)}</span>
                    </li>
                  ))}
                </ul>

                <ul className="list-none space-y-3 text-sm border-t border-slate-200 dark:border-gray-700 pt-4">
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
                    <li className="text-slate-500 text-xs">
                      Shipping Method: {selectedShippingMethod.name}
                    </li>
                  ) : null}
                  {selectedPaymentMethod.name ? (
                    <li className="text-slate-500 text-xs">
                      Payment Option: {selectedPaymentMethod.name}
                    </li>
                  ) : null}
                  <li className="flex justify-between font-medium text-base pt-3 border-t border-slate-200 dark:border-gray-700">
                    <span>Total</span>
                    <span>{formatProductPrice(totalAmount, currencySymbol)}</span>
                  </li>
                </ul>

                {fieldErrors.shipping || fieldErrors.payment ? (
                  <div className="text-sm text-red-600 mt-4 space-y-1">
                    {fieldErrors.shipping ? <p>{fieldErrors.shipping}</p> : null}
                    {fieldErrors.payment ? <p>{fieldErrors.payment}</p> : null}
                  </div>
                ) : null}

                {!customerCheckoutPrepared ? (
                  <p className="text-sm text-slate-500 mt-4">
                    Enter your details and continue to delivery & payment before placing your
                    order.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={checkoutSubmitting || !canPlaceOrder}
                  className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkoutSubmitting ? 'Placing order...' : 'Place Order'}
                </button>

                <button
                  type="button"
                  onClick={() => refreshCart()}
                  className="text-sm text-primary hover:underline mt-4 block mx-auto"
                >
                  Refresh cart totals
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
      <Switcher />
    </>
  )
}
