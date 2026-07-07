import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import StorePageShell from '../../component/layout/StorePageShell.jsx'
import PageHeader from '../../component/layout/PageHeader.jsx'
import CheckoutStepIndicator from '../../component/checkout/CheckoutStepIndicator.jsx'
import OrderSummaryCard from '../../component/checkout/OrderSummaryCard.jsx'
import CheckoutTrustNotes from '../../component/checkout/CheckoutTrustNotes.jsx'
import MethodOptionList from '../../component/checkout/MethodOptionList.jsx'
import { useCart } from '../../context/useCart.js'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../lib/pageTitle.js'
import {
  buildCheckoutCustomerPayload,
  mapOrderToSuccessSummary,
  resolveCheckoutStep,
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

function FormField({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-[#111827] dark:text-white">
        {label}
        {required ? <span className="text-red-500 ms-0.5">*</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null}
    </div>
  )
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const {
    items,
    itemCount,
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
    document.title = formatDocumentTitle('Checkout')

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
    if (!loading && items.length === 0) {
      navigate('/cart', { replace: true })
    }
  }, [items.length, loading, navigate])

  useEffect(() => {
    if (!loading && items.length > 0 && !canProceedToCheckout) {
      navigate('/cart', { replace: true })
    }
  }, [canProceedToCheckout, items.length, loading, navigate])

  const currentStep = useMemo(
    () =>
      resolveCheckoutStep({
        customerCheckoutPrepared,
        customerShippingRequired,
        customerPaymentRequired,
        selectedShippingMethod,
        selectedPaymentMethod,
      }),
    [
      customerCheckoutPrepared,
      customerShippingRequired,
      customerPaymentRequired,
      selectedShippingMethod,
      selectedPaymentMethod,
    ],
  )

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

  if (loading || items.length === 0) {
    return (
      <>
        <Navbar />
        <StorePageShell>
          <p className="text-[#64748B] text-center py-16">Loading checkout...</p>
        </StorePageShell>
        <Footer />
        <Switcher />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <StorePageShell containerClassName="pb-12">
          <PageHeader
            title="Checkout"
            subtitle="Complete your order securely"
            actions={
              <Link to="/cart" className="text-sm font-semibold text-primary hover:underline">
                Back to cart
              </Link>
            }
          />

          <CheckoutStepIndicator currentStep={currentStep} />

          {prepareError || checkoutOptionsError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6 text-sm">
              {prepareError || checkoutOptionsError}
            </div>
          ) : null}

          {selectionError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6 text-sm">
              {selectionError}
            </div>
          ) : null}

          {submitError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-6 text-sm">
              {submitError}
            </div>
          ) : null}

          <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <section className="velmora-section-panel p-5 sm:p-6">
                <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-1">
                  Customer details
                </h2>
                <p className="text-sm text-[#64748B] mb-5">
                  Required fields are marked with an asterisk.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField id="firstName" label="First name" required error={fieldErrors.firstName}>
                    <input
                      id="firstName"
                      value={form.firstName}
                      onChange={(event) => updateField('firstName', event.target.value)}
                      className="velmora-form-field"
                      autoComplete="given-name"
                    />
                  </FormField>
                  <FormField id="lastName" label="Last name" required error={fieldErrors.lastName}>
                    <input
                      id="lastName"
                      value={form.lastName}
                      onChange={(event) => updateField('lastName', event.target.value)}
                      className="velmora-form-field"
                      autoComplete="family-name"
                    />
                  </FormField>
                  <FormField id="email" label="Email" required error={fieldErrors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      className="velmora-form-field"
                      autoComplete="email"
                    />
                  </FormField>
                  <FormField id="phone" label="Phone" required error={fieldErrors.phone}>
                    <input
                      id="phone"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className="velmora-form-field"
                      autoComplete="tel"
                    />
                  </FormField>
                </div>
              </section>

              <section className="velmora-section-panel p-5 sm:p-6">
                <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-1">
                  Delivery address
                </h2>
                <p className="text-sm text-[#64748B] mb-5">
                  Shipping is calculated from available methods for this address.
                </p>
                <div className="space-y-4">
                  <FormField id="street" label="Street address" required error={fieldErrors.street}>
                    <input
                      id="street"
                      value={form.street}
                      onChange={(event) => updateField('street', event.target.value)}
                      className="velmora-form-field"
                      autoComplete="street-address"
                    />
                  </FormField>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField id="city" label="City" required error={fieldErrors.city}>
                      <input
                        id="city"
                        value={form.city}
                        onChange={(event) => updateField('city', event.target.value)}
                        className="velmora-form-field"
                        autoComplete="address-level2"
                      />
                    </FormField>
                    <FormField id="state" label="State / region" required error={fieldErrors.state}>
                      <input
                        id="state"
                        value={form.state}
                        onChange={(event) => updateField('state', event.target.value)}
                        className="velmora-form-field"
                        autoComplete="address-level1"
                      />
                    </FormField>
                    <FormField id="postalCode" label="Postal code" required error={fieldErrors.postalCode}>
                      <input
                        id="postalCode"
                        value={form.postalCode}
                        onChange={(event) => updateField('postalCode', event.target.value)}
                        className="velmora-form-field"
                        autoComplete="postal-code"
                      />
                    </FormField>
                    <FormField id="country" label="Country" required error={fieldErrors.country}>
                      <input
                        id="country"
                        value={form.country}
                        onChange={(event) => updateField('country', event.target.value)}
                        className="velmora-form-field"
                        autoComplete="country-name"
                      />
                    </FormField>
                  </div>
                </div>

                {!customerCheckoutPrepared ? (
                  <button
                    type="button"
                    onClick={handlePrepareCheckout}
                    disabled={customerCheckoutLoading}
                    className="mt-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {customerCheckoutLoading
                      ? 'Loading delivery options...'
                      : 'Continue to delivery & payment'}
                  </button>
                ) : (
                  <p className="text-sm text-[#64748B] mt-4 leading-relaxed">
                    Delivery options loaded for this address. Change the address above to reload
                    options.
                  </p>
                )}
              </section>

              {customerCheckoutPrepared ? (
                <section className="velmora-section-panel p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-1">
                    Delivery
                  </h2>
                  <p className="text-sm text-[#64748B] mb-4">
                    Shipping calculated from available methods. No delivery dates are estimated here.
                  </p>

                  {!customerCheckoutLoading &&
                  customerShippingEnabled &&
                  customerShippingOptions.length === 0 ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                      No shipping methods are available for this address. Try a different address or
                      contact the store.
                    </div>
                  ) : (
                    <MethodOptionList
                      name="checkout-shipping-method"
                      options={customerShippingOptions}
                      selectedId={selectedShippingMethod.id}
                      selectingId={selectingShippingId}
                      onSelect={handleSelectShipping}
                      currencySymbol={currencySymbol}
                      loading={customerCheckoutLoading}
                      loadingMessage="Loading shipping methods..."
                      emptyMessage={
                        !customerShippingEnabled
                          ? 'Shipping is not enabled for this store.'
                          : null
                      }
                    />
                  )}
                </section>
              ) : null}

              {customerCheckoutPrepared ? (
                <section className="velmora-section-panel p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-1">Payment</h2>
                  <p className="text-sm text-[#64748B] mb-4">
                    Select a payment method. This store does not process live card payments in the
                    browser — your selection is recorded with the order.
                  </p>

                  {!customerCheckoutLoading && customerPaymentOptions.length === 0 ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                      No payment methods are available. Please contact the store.
                    </div>
                  ) : (
                    <MethodOptionList
                      name="checkout-payment-method"
                      options={customerPaymentOptions}
                      selectedId={selectedPaymentMethod.id}
                      selectingId={selectingPaymentId}
                      onSelect={handleSelectPayment}
                      currencySymbol={currencySymbol}
                      loading={customerCheckoutLoading}
                      loadingMessage="Loading payment options..."
                    />
                  )}
                </section>
              ) : null}

              <section className="velmora-section-panel p-5 sm:p-6">
                <FormField id="notes" label="Order notes (optional)" error={null}>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    className="velmora-form-field resize-y min-h-24"
                    placeholder="Special instructions for your order"
                  />
                </FormField>
              </section>

              <div className="lg:hidden">
                <CheckoutTrustNotes />
              </div>
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
                shippingNote="Shipping is calculated from the methods available for your address."
              >
                {fieldErrors.shipping || fieldErrors.payment ? (
                  <div className="text-sm text-red-600 space-y-1">
                    {fieldErrors.shipping ? <p>{fieldErrors.shipping}</p> : null}
                    {fieldErrors.payment ? <p>{fieldErrors.payment}</p> : null}
                  </div>
                ) : null}

                {!customerCheckoutPrepared ? (
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Enter your details and continue to delivery & payment before placing your order.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={checkoutSubmitting || !canPlaceOrder}
                  className="w-full rounded-lg bg-[#F59E0B] hover:bg-[#d97706] text-white font-semibold py-3 px-4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkoutSubmitting ? 'Placing order...' : 'Place order'}
                </button>

                <button
                  type="button"
                  onClick={() => refreshCart()}
                  className="text-sm font-semibold text-primary hover:underline block mx-auto"
                >
                  Refresh cart totals
                </button>
              </OrderSummaryCard>

              <div className="hidden lg:block">
                <CheckoutTrustNotes />
              </div>
            </div>
          </form>
      </StorePageShell>
      <Footer />
      <Switcher />
    </>
  )
}
