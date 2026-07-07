import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  addCartItem,
  checkoutCart as checkoutCartApi,
  clearCart as clearCartApi,
  getCart,
  getPaymentOptions,
  getShippingOptions,
  removeCartItem,
  selectPaymentMethod as selectPaymentMethodApi,
  selectShippingMethod as selectShippingMethodApi,
  updateCartItem,
} from '../api/cartApi.js'
import { upsertCheckoutCustomer } from '../api/customerApi.js'
import { getCartSessionId } from '../lib/cartSession.js'
import { CartContext } from './cartContextState.js'
import {
  mapCartFromApi,
  mapPaymentOptionsResponse,
  mapShippingOptionsResponse,
} from './cartUtils.js'

const emptyCartState = mapCartFromApi(null)

export function CartProvider({ children }) {
  const [sessionId] = useState(() => getCartSessionId())
  const [cartState, setCartState] = useState(emptyCartState)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionProductId, setActionProductId] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [paymentOptions, setPaymentOptions] = useState([])
  const [shippingEnabled, setShippingEnabled] = useState(true)
  const [checkoutOptionsLoading, setCheckoutOptionsLoading] = useState(false)
  const [checkoutOptionsError, setCheckoutOptionsError] = useState('')
  const [selectingShippingId, setSelectingShippingId] = useState('')
  const [selectingPaymentId, setSelectingPaymentId] = useState('')
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false)
  const [checkoutCustomerId, setCheckoutCustomerId] = useState('')
  const [customerShippingOptions, setCustomerShippingOptions] = useState([])
  const [customerPaymentOptions, setCustomerPaymentOptions] = useState([])
  const [customerShippingEnabled, setCustomerShippingEnabled] = useState(true)
  const [customerCheckoutPrepared, setCustomerCheckoutPrepared] = useState(false)
  const [customerCheckoutLoading, setCustomerCheckoutLoading] = useState(false)

  const applyCartResponse = useCallback((cart) => {
    setCartState(mapCartFromApi(cart))
    setError('')
  }, [])

  const refreshCart = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const cart = await getCart(sessionId)
      applyCartResponse(cart)
      return cart
    } catch (err) {
      setError(err?.message || 'Could not load cart.')
      setCartState(emptyCartState)
      throw err
    } finally {
      setLoading(false)
    }
  }, [applyCartResponse, sessionId])

  useEffect(() => {
    let active = true

    const loadCart = async () => {
      setLoading(true)
      setError('')

      try {
        const cart = await getCart(sessionId)
        if (!active) return
        applyCartResponse(cart)
      } catch (err) {
        if (!active) return
        setError(err?.message || 'Could not load cart.')
        setCartState(emptyCartState)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCart()

    return () => {
      active = false
    }
  }, [applyCartResponse, sessionId])

  const clearCustomerCheckout = useCallback(() => {
    setCheckoutCustomerId('')
    setCustomerShippingOptions([])
    setCustomerPaymentOptions([])
    setCustomerShippingEnabled(true)
    setCustomerCheckoutPrepared(false)
  }, [])

  const clearCheckoutOptions = useCallback(() => {
    setShippingOptions([])
    setPaymentOptions([])
    setShippingEnabled(true)
    setCheckoutOptionsError('')
    clearCustomerCheckout()
  }, [clearCustomerCheckout])

  const loadShippingOptions = useCallback(async () => {
    if (cartState.itemCount === 0) {
      clearCheckoutOptions()
      return null
    }

    setCheckoutOptionsLoading(true)
    setCheckoutOptionsError('')

    try {
      const data = await getShippingOptions(sessionId)
      const mapped = mapShippingOptionsResponse(data)
      setShippingOptions(mapped.shippingOptions)
      setShippingEnabled(mapped.shippingEnabled)
      return mapped
    } catch (err) {
      const message = err?.message || 'Could not load shipping methods.'
      setCheckoutOptionsError(message)
      setShippingOptions([])
      throw err
    } finally {
      setCheckoutOptionsLoading(false)
    }
  }, [cartState.itemCount, clearCheckoutOptions, sessionId])

  const loadPaymentOptions = useCallback(async () => {
    if (cartState.itemCount === 0) {
      clearCheckoutOptions()
      return null
    }

    setCheckoutOptionsLoading(true)
    setCheckoutOptionsError('')

    try {
      const data = await getPaymentOptions(sessionId)
      const mapped = mapPaymentOptionsResponse(data)
      setPaymentOptions(mapped.paymentOptions)
      return mapped
    } catch (err) {
      const message = err?.message || 'Could not load payment methods.'
      setCheckoutOptionsError(message)
      setPaymentOptions([])
      throw err
    } finally {
      setCheckoutOptionsLoading(false)
    }
  }, [cartState.itemCount, clearCheckoutOptions, sessionId])

  const loadCheckoutOptions = useCallback(async () => {
    if (cartState.itemCount === 0) {
      clearCheckoutOptions()
      return
    }

    setCheckoutOptionsLoading(true)
    setCheckoutOptionsError('')

    try {
      const [shipping, payment] = await Promise.all([
        getShippingOptions(sessionId),
        getPaymentOptions(sessionId),
      ])
      const mappedShipping = mapShippingOptionsResponse(shipping)
      const mappedPayment = mapPaymentOptionsResponse(payment)
      setShippingOptions(mappedShipping.shippingOptions)
      setShippingEnabled(mappedShipping.shippingEnabled)
      setPaymentOptions(mappedPayment.paymentOptions)
    } catch (err) {
      const message = err?.message || 'Could not load checkout options.'
      setCheckoutOptionsError(message)
      setShippingOptions([])
      setPaymentOptions([])
      throw err
    } finally {
      setCheckoutOptionsLoading(false)
    }
  }, [cartState.itemCount, clearCheckoutOptions, sessionId])

  const selectShippingMethod = useCallback(
    async (shippingMethodId, { customerId } = {}) => {
      const normalizedId = String(shippingMethodId || '')

      if (!normalizedId) {
        const message = 'Shipping method is required.'
        setCheckoutOptionsError(message)
        throw new Error(message)
      }

      setSelectingShippingId(normalizedId)
      setCheckoutOptionsError('')

      try {
        const payload = { shippingMethodId: normalizedId }
        if (customerId) {
          payload.customer = customerId
        }

        const cart = await selectShippingMethodApi(sessionId, payload)
        applyCartResponse(cart)

        if (customerId) {
          const shippingData = await getShippingOptions(sessionId, { customer: customerId })
          const mapped = mapShippingOptionsResponse(shippingData)
          setCustomerShippingOptions(mapped.shippingOptions)
          setCustomerShippingEnabled(mapped.shippingEnabled)
        } else {
          await loadShippingOptions()
        }

        return cart
      } catch (err) {
        const message = err?.message || 'Could not select shipping method.'
        setCheckoutOptionsError(message)
        throw err
      } finally {
        setSelectingShippingId('')
      }
    },
    [applyCartResponse, loadShippingOptions, sessionId],
  )

  const selectPaymentMethod = useCallback(
    async (paymentMethodId, { customerId } = {}) => {
      const normalizedId = String(paymentMethodId || '')

      if (!normalizedId) {
        const message = 'Payment method is required.'
        setCheckoutOptionsError(message)
        throw new Error(message)
      }

      setSelectingPaymentId(normalizedId)
      setCheckoutOptionsError('')

      try {
        const payload = { paymentMethodId: normalizedId }
        if (customerId) {
          payload.customer = customerId
        }

        const cart = await selectPaymentMethodApi(sessionId, payload)
        applyCartResponse(cart)

        if (customerId) {
          const paymentData = await getPaymentOptions(sessionId, { customer: customerId })
          const mapped = mapPaymentOptionsResponse(paymentData)
          setCustomerPaymentOptions(mapped.paymentOptions)
        } else {
          await loadPaymentOptions()
        }

        return cart
      } catch (err) {
        const message = err?.message || 'Could not select payment method.'
        setCheckoutOptionsError(message)
        throw err
      } finally {
        setSelectingPaymentId('')
      }
    },
    [applyCartResponse, loadPaymentOptions, sessionId],
  )

  const prepareCustomerCheckout = useCallback(
    async (customerPayload) => {
      setCustomerCheckoutLoading(true)
      setCheckoutOptionsError('')
      setCustomerCheckoutPrepared(false)

      try {
        const savedCustomer = await upsertCheckoutCustomer(customerPayload)
        const customerId = savedCustomer?._id || savedCustomer?.id

        if (!customerId) {
          throw new Error('Could not save customer details for checkout.')
        }

        const [shippingData, paymentData] = await Promise.all([
          getShippingOptions(sessionId, { customer: customerId }),
          getPaymentOptions(sessionId, { customer: customerId }),
        ])

        const mappedShipping = mapShippingOptionsResponse(shippingData)
        const mappedPayment = mapPaymentOptionsResponse(paymentData)

        setCheckoutCustomerId(customerId)
        setCustomerShippingOptions(mappedShipping.shippingOptions)
        setCustomerPaymentOptions(mappedPayment.paymentOptions)
        setCustomerShippingEnabled(mappedShipping.shippingEnabled)

        let shippingMethodId = cartState.selectedShippingMethod?.id || ''
        let paymentMethodId = cartState.selectedPaymentMethod?.id || ''

        if (mappedShipping.shippingEnabled && mappedShipping.shippingOptions.length > 0) {
          const shippingStillValid = mappedShipping.shippingOptions.some(
            (option) => option.id === shippingMethodId,
          )

          if (!shippingMethodId || !shippingStillValid) {
            if (mappedShipping.shippingOptions.length === 1) {
              shippingMethodId = mappedShipping.shippingOptions[0].id
            } else {
              shippingMethodId = ''
            }
          }

          if (shippingMethodId) {
            await selectShippingMethod(shippingMethodId, { customerId })
          }
        }

        if (mappedPayment.paymentOptions.length > 0) {
          const paymentStillValid = mappedPayment.paymentOptions.some(
            (option) => option.id === paymentMethodId,
          )

          if (!paymentMethodId || !paymentStillValid) {
            if (mappedPayment.paymentOptions.length === 1) {
              paymentMethodId = mappedPayment.paymentOptions[0].id
            } else {
              paymentMethodId = ''
            }
          }

          if (paymentMethodId) {
            await selectPaymentMethod(paymentMethodId, { customerId })
          }
        }

        setCustomerCheckoutPrepared(true)

        return {
          customerId,
          shippingOptions: mappedShipping.shippingOptions,
          shippingEnabled: mappedShipping.shippingEnabled,
          paymentOptions: mappedPayment.paymentOptions,
        }
      } catch (err) {
        const message = err?.message || 'Could not prepare checkout options.'
        setCheckoutOptionsError(message)
        clearCustomerCheckout()
        throw err
      } finally {
        setCustomerCheckoutLoading(false)
      }
    },
    [
      cartState.selectedPaymentMethod,
      cartState.selectedShippingMethod,
      clearCustomerCheckout,
      selectPaymentMethod,
      selectShippingMethod,
      sessionId,
    ],
  )

  const paymentSelectionRequired = paymentOptions.length > 0
  const customerShippingRequired =
    customerShippingEnabled && customerShippingOptions.length > 0
  const customerPaymentRequired = customerPaymentOptions.length > 0

  const canProceedToCheckout =
    cartState.itemCount > 0 &&
    !checkoutOptionsLoading &&
    (!paymentSelectionRequired || Boolean(cartState.selectedPaymentMethod.id))

  const checkoutReadinessMessage = useMemo(() => {
    if (cartState.itemCount === 0) return ''
    if (checkoutOptionsLoading) return 'Loading checkout options...'
    if (paymentSelectionRequired && !cartState.selectedPaymentMethod.id) {
      return 'Select a payment method to proceed to checkout.'
    }
    return ''
  }, [
    cartState.itemCount,
    cartState.selectedPaymentMethod.id,
    checkoutOptionsLoading,
    paymentSelectionRequired,
  ])

  const placeOrder = useCallback(
    async ({ customer, notes = '' }) => {
      if (cartState.itemCount === 0) {
        const message = 'Your cart is empty.'
        setCheckoutOptionsError(message)
        throw new Error(message)
      }

      if (!customerCheckoutPrepared) {
        const message = 'Continue to delivery and payment options before placing your order.'
        setCheckoutOptionsError(message)
        throw new Error(message)
      }

      setCheckoutSubmitting(true)
      setCheckoutOptionsError('')

      try {
        const savedCustomer = await upsertCheckoutCustomer(customer)
        const customerId = savedCustomer?._id || savedCustomer?.id

        if (!customerId) {
          throw new Error('Could not save customer details for checkout.')
        }

        const [shippingData, paymentData] = await Promise.all([
          getShippingOptions(sessionId, { customer: customerId }),
          getPaymentOptions(sessionId, { customer: customerId }),
        ])

        const mappedShipping = mapShippingOptionsResponse(shippingData)
        const mappedPayment = mapPaymentOptionsResponse(paymentData)

        setCustomerShippingOptions(mappedShipping.shippingOptions)
        setCustomerPaymentOptions(mappedPayment.paymentOptions)
        setCustomerShippingEnabled(mappedShipping.shippingEnabled)
        setCheckoutCustomerId(customerId)

        let shippingMethodId = cartState.selectedShippingMethod?.id || ''
        let shippingMethodCode = cartState.selectedShippingMethod?.code || ''
        let paymentMethodId = cartState.selectedPaymentMethod?.id || ''
        let paymentMethodCode = cartState.selectedPaymentMethod?.code || ''

        const shippingRequired =
          mappedShipping.shippingEnabled && mappedShipping.shippingOptions.length > 0
        const paymentRequired = mappedPayment.paymentOptions.length > 0

        if (shippingRequired) {
          const selectedStillValid = mappedShipping.shippingOptions.some(
            (option) => option.id === shippingMethodId,
          )

          if (!shippingMethodId || !selectedStillValid) {
            if (mappedShipping.shippingOptions.length === 1) {
              shippingMethodId = mappedShipping.shippingOptions[0].id
              shippingMethodCode = mappedShipping.shippingOptions[0].code
            } else {
              throw new Error('Select a shipping method before placing your order.')
            }
          }

          const cartAfterShipping = await selectShippingMethodApi(sessionId, {
            shippingMethodId,
            shippingMethodCode: shippingMethodCode || undefined,
            customer: customerId,
          })
          applyCartResponse(cartAfterShipping)
        } else if (mappedShipping.shippingEnabled && mappedShipping.shippingOptions.length === 0) {
          throw new Error(
            'No shipping methods are available for this address. Please configure them in admin or try a different address.',
          )
        }

        if (paymentRequired) {
          const selectedPaymentStillValid = mappedPayment.paymentOptions.some(
            (option) => option.id === paymentMethodId,
          )

          if (!paymentMethodId || !selectedPaymentStillValid) {
            if (mappedPayment.paymentOptions.length === 1) {
              paymentMethodId = mappedPayment.paymentOptions[0].id
              paymentMethodCode = mappedPayment.paymentOptions[0].code
            } else {
              throw new Error('Select a payment method before placing your order.')
            }
          }

          const cartAfterPayment = await selectPaymentMethodApi(sessionId, {
            paymentMethodId,
            paymentMethodCode: paymentMethodCode || undefined,
            customer: customerId,
          })
          applyCartResponse(cartAfterPayment)
        }

        const checkoutPayload = {
          customer: customerId,
          notes: notes?.trim() || undefined,
        }

        if (shippingMethodId) {
          checkoutPayload.shippingMethodId = shippingMethodId
        } else if (shippingMethodCode) {
          checkoutPayload.shippingMethodCode = shippingMethodCode
        }

        if (paymentMethodId) {
          checkoutPayload.paymentMethodId = paymentMethodId
        } else if (paymentMethodCode) {
          checkoutPayload.paymentMethodCode = paymentMethodCode
        }

        const result = await checkoutCartApi(sessionId, checkoutPayload)
        clearCheckoutOptions()
        await refreshCart()
        return result
      } catch (err) {
        const message = err?.message || 'Could not place order.'
        setCheckoutOptionsError(message)
        throw err
      } finally {
        setCheckoutSubmitting(false)
      }
    },
    [
      applyCartResponse,
      cartState.itemCount,
      cartState.selectedPaymentMethod,
      cartState.selectedShippingMethod,
      clearCheckoutOptions,
      customerCheckoutPrepared,
      refreshCart,
      sessionId,
    ],
  )

  const addToCart = useCallback(
    async (product, options = {}) => {
      const productId = product?.id || product?._id || product?.productId
      const quantity = Number(options.quantity ?? 1)
      const variantId = options.variantId ? String(options.variantId) : ''

      if (!productId) {
        const message = 'Product is missing an ID.'
        setError(message)
        throw new Error(message)
      }

      if (product?.hasVariants && !variantId) {
        const message = 'Please select an option before adding this product to your cart.'
        setError(message)
        throw new Error(message)
      }

      if (!Number.isFinite(quantity) || quantity < 1) {
        const message = 'Quantity must be at least 1.'
        setError(message)
        throw new Error(message)
      }

      const lineKey = variantId ? `${productId}:${variantId}` : String(productId)
      setActionProductId(lineKey)
      setError('')

      try {
        const payload = { productId, quantity }
        if (variantId) payload.variantId = variantId

        const cart = await addCartItem(sessionId, payload)
        applyCartResponse(cart)
        if (cart?.items?.length) {
          loadCheckoutOptions().catch(() => {
            // Error stored in checkoutOptionsError.
          })
        }
        return cart
      } catch (err) {
        const message =
          err?.message ||
          (product?.hasVariants
            ? 'Please choose an option for this product before adding it to your cart.'
            : 'Could not add item to cart.')
        setError(message)
        throw err instanceof Error ? err : new Error(message, { cause: err })
      } finally {
        setActionProductId('')
      }
    },
    [applyCartResponse, loadCheckoutOptions, sessionId],
  )

  const updateQuantity = useCallback(
    async (productId, quantity, variantId = '') => {
      const normalizedId = String(productId)
      const nextQuantity = Number(quantity)
      const normalizedVariantId = variantId ? String(variantId) : ''
      const lineKey = normalizedVariantId
        ? `${normalizedId}:${normalizedVariantId}`
        : normalizedId

      if (!normalizedId) {
        const message = 'Cart item is missing a product ID.'
        setError(message)
        throw new Error(message)
      }

      setActionProductId(lineKey)
      setError('')

      try {
        const payload = { quantity: nextQuantity }
        if (normalizedVariantId) payload.variantId = normalizedVariantId

        const cart = await updateCartItem(sessionId, normalizedId, payload)
        applyCartResponse(cart)
        if (!cart?.items?.length) {
          clearCheckoutOptions()
        } else {
          loadCheckoutOptions().catch(() => {})
        }
        return cart
      } catch (err) {
        const message = err?.message || 'Could not update cart item.'
        setError(message)
        throw err
      } finally {
        setActionProductId('')
      }
    },
    [applyCartResponse, clearCheckoutOptions, loadCheckoutOptions, sessionId],
  )

  const removeItem = useCallback(
    async (productId, variantId = '') => {
      const normalizedId = String(productId)
      const normalizedVariantId = variantId ? String(variantId) : ''
      const lineKey = normalizedVariantId
        ? `${normalizedId}:${normalizedVariantId}`
        : normalizedId

      if (!normalizedId) {
        const message = 'Cart item is missing a product ID.'
        setError(message)
        throw new Error(message)
      }

      setActionProductId(lineKey)
      setError('')

      try {
        const cart = await removeCartItem(sessionId, normalizedId, {
          variantId: normalizedVariantId || undefined,
        })
        applyCartResponse(cart)
        if (!cart?.items?.length) {
          clearCheckoutOptions()
        } else {
          loadCheckoutOptions().catch(() => {})
        }
        return cart
      } catch (err) {
        const message = err?.message || 'Could not remove cart item.'
        setError(message)
        throw err
      } finally {
        setActionProductId('')
      }
    },
    [applyCartResponse, clearCheckoutOptions, loadCheckoutOptions, sessionId],
  )

  const clearCart = useCallback(async () => {
    setActionProductId('__clear__')
    setError('')

    try {
      const cart = await clearCartApi(sessionId)
      applyCartResponse(cart)
      clearCheckoutOptions()
      return cart
    } catch (err) {
      const message = err?.message || 'Could not clear cart.'
      setError(message)
      throw err
    } finally {
      setActionProductId('')
    }
  }, [applyCartResponse, clearCheckoutOptions, sessionId])

  const canPlaceOrder =
    customerCheckoutPrepared &&
    (!customerShippingRequired || Boolean(cartState.selectedShippingMethod.id)) &&
    (!customerPaymentRequired || Boolean(cartState.selectedPaymentMethod.id))

  const value = useMemo(
    () => ({
      sessionId,
      cart: cartState.raw,
      items: cartState.items,
      itemCount: cartState.itemCount,
      subtotal: cartState.subtotal,
      taxAmount: cartState.taxAmount,
      shippingAmount: cartState.shippingAmount,
      discountAmount: cartState.discountAmount,
      totalAmount: cartState.totalAmount,
      selectedShippingMethod: cartState.selectedShippingMethod,
      selectedPaymentMethod: cartState.selectedPaymentMethod,
      shippingOptions,
      paymentOptions,
      shippingEnabled,
      checkoutCustomerId,
      customerShippingOptions,
      customerPaymentOptions,
      customerShippingEnabled,
      customerCheckoutPrepared,
      customerCheckoutLoading,
      customerShippingRequired,
      customerPaymentRequired,
      checkoutOptionsLoading,
      checkoutOptionsError,
      selectingShippingId,
      selectingPaymentId,
      checkoutSubmitting,
      paymentSelectionRequired,
      canProceedToCheckout,
      canPlaceOrder,
      checkoutReadinessMessage,
      loading,
      error,
      actionProductId,
      isAdding: Boolean(actionProductId) && actionProductId !== '__clear__',
      refreshCart,
      loadShippingOptions,
      loadPaymentOptions,
      loadCheckoutOptions,
      prepareCustomerCheckout,
      clearCustomerCheckout,
      selectShippingMethod,
      selectPaymentMethod,
      placeOrder,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      sessionId,
      cartState,
      shippingOptions,
      paymentOptions,
      shippingEnabled,
      checkoutCustomerId,
      customerShippingOptions,
      customerPaymentOptions,
      customerShippingEnabled,
      customerCheckoutPrepared,
      customerCheckoutLoading,
      customerShippingRequired,
      customerPaymentRequired,
      checkoutOptionsLoading,
      checkoutOptionsError,
      selectingShippingId,
      selectingPaymentId,
      checkoutSubmitting,
      paymentSelectionRequired,
      canProceedToCheckout,
      canPlaceOrder,
      checkoutReadinessMessage,
      loading,
      error,
      actionProductId,
      refreshCart,
      loadShippingOptions,
      loadPaymentOptions,
      loadCheckoutOptions,
      prepareCustomerCheckout,
      clearCustomerCheckout,
      selectShippingMethod,
      selectPaymentMethod,
      placeOrder,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
