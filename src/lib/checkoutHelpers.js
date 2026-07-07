const getEntityId = (value) => {
  if (!value) return ''
  if (typeof value === 'object') {
    return value._id || value.id || ''
  }
  return String(value)
}

const getMethodLabel = (methodRef, snapshot, fallback = '') => {
  if (snapshot?.displayName) return snapshot.displayName
  if (snapshot?.name) return snapshot.name
  if (methodRef && typeof methodRef === 'object') {
    return methodRef.displayName || methodRef.name || ''
  }
  return fallback
}

const mapCustomerTimelineEntry = (entry = {}) => ({
  status: entry.status || '',
  label: entry.label || '',
  message: entry.message || '',
  note: entry.note || '',
  createdAt: entry.createdAt || null,
  actorType: entry.actorType || 'system',
  metadata: entry.metadata || {},
})

export const mapOrderToSuccessSummary = (order = {}) => {
  const customer =
    order.customer && typeof order.customer === 'object' ? order.customer : null
  const shippingAddress = order.shippingAddressSnapshot || {}

  const items = (Array.isArray(order.items) ? order.items : []).map((item) => {
    const variantOptions = item.variantOptions || {}
    const optionEntries =
      variantOptions instanceof Map
        ? Object.fromEntries(variantOptions.entries())
        : variantOptions
    const variantOptionsLabel = Object.entries(optionEntries || {})
      .filter(([key, value]) => String(key).trim() && String(value ?? '').trim())
      .map(([key, value]) => `${key}: ${value}`)
      .join(' · ')

    const productImage =
      item.image ||
      (item.product && typeof item.product === 'object'
        ? item.product.featuredImage || item.product.image
        : '')

    return {
      productName: item.productName || 'Product',
      variantTitle: item.variantTitle || '',
      variantOptionsLabel,
      sku: item.sku || '',
      quantity: Number(item.quantity || 0),
      total: Number(item.total || item.lineTotal || 0),
      price: Number(item.price || item.unitPrice || 0),
      image: productImage || '',
    }
  })

  return {
    orderId: getEntityId(order),
    orderNumber: order.orderNumber || '',
    email: customer?.email || shippingAddress.email || '',
    phone: customer?.phone || shippingAddress.phone || '',
    customerName:
      [customer?.firstName, customer?.lastName].filter(Boolean).join(' ') ||
      [shippingAddress.firstName, shippingAddress.lastName].filter(Boolean).join(' '),
    totalAmount: Number(order.totalAmount ?? 0),
    subtotal: Number(order.subtotal ?? 0),
    shippingAmount: Number(order.shippingAmount ?? 0),
    discountAmount: Number(order.discountAmount ?? 0),
    taxAmount: Number(order.taxAmount ?? 0),
    paymentMethod:
      getMethodLabel(order.paymentMethodRef, order.paymentMethodSnapshot, order.paymentMethod) ||
      '—',
    shippingMethod:
      getMethodLabel(order.shippingMethod, order.shippingMethodSnapshot) || '—',
    paymentStatus: order.paymentStatus || 'pending',
    orderStatus: order.orderStatus || 'pending',
    statusLabel: order.statusLabel || '',
    orderTimeline: (Array.isArray(order.orderTimeline) ? order.orderTimeline : []).map(
      mapCustomerTimelineEntry,
    ),
    trackingNumber: order.trackingNumber || '',
    trackingUrl: order.trackingUrl || '',
    courierName: order.courierName || '',
    shippedAt: order.shippedAt || null,
    deliveredAt: order.deliveredAt || null,
    createdAt: order.createdAt || null,
    shippingAddress: {
      street: shippingAddress.street || '',
      city: shippingAddress.city || '',
      state: shippingAddress.state || '',
      postalCode: shippingAddress.postalCode || '',
      country: shippingAddress.country || '',
    },
    items,
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateCheckoutForm = (form, { shippingRequired, paymentRequired } = {}) => {
  const errors = {}

  if (!form.firstName?.trim()) {
    errors.firstName = 'First name is required.'
  }

  if (!form.lastName?.trim()) {
    errors.lastName = 'Last name is required.'
  }

  if (!form.email?.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.phone?.trim()) {
    errors.phone = 'Phone is required.'
  }

  if (!form.street?.trim()) {
    errors.street = 'Street address is required.'
  }

  if (!form.city?.trim()) {
    errors.city = 'City is required.'
  }

  if (!form.state?.trim()) {
    errors.state = 'State is required.'
  }

  if (!form.postalCode?.trim()) {
    errors.postalCode = 'Postal code is required.'
  }

  if (!form.country?.trim()) {
    errors.country = 'Country is required.'
  }

  if (shippingRequired) {
    errors.shipping = 'Select a shipping method before placing your order.'
  }

  if (paymentRequired) {
    errors.payment = 'Select a payment method before placing your order.'
  }

  return errors
}

export const buildCheckoutCustomerPayload = (form) => ({
  firstName: form.firstName.trim(),
  lastName: form.lastName.trim(),
  email: form.email.trim(),
  phone: form.phone.trim(),
  address: {
    street: form.street.trim(),
    city: form.city.trim(),
    state: form.state.trim(),
    postalCode: form.postalCode.trim(),
    country: form.country.trim(),
  },
})

export const resolveCheckoutStep = ({
  customerCheckoutPrepared,
  customerShippingRequired,
  customerPaymentRequired,
  selectedShippingMethod,
  selectedPaymentMethod,
}) => {
  if (!customerCheckoutPrepared) return 1

  if (customerShippingRequired && !selectedShippingMethod?.id) {
    return 2
  }

  if (customerPaymentRequired && !selectedPaymentMethod?.id) {
    return 3
  }

  return 4
}
