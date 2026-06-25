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

export const mapOrderToSuccessSummary = (order = {}) => {
  const customer =
    order.customer && typeof order.customer === 'object' ? order.customer : null

  return {
    orderId: getEntityId(order),
    orderNumber: order.orderNumber || '',
    email: customer?.email || '',
    customerName: [customer?.firstName, customer?.lastName].filter(Boolean).join(' '),
    totalAmount: Number(order.totalAmount ?? 0),
    subtotal: Number(order.subtotal ?? 0),
    shippingAmount: Number(order.shippingAmount ?? 0),
    discountAmount: Number(order.discountAmount ?? 0),
    paymentMethod:
      getMethodLabel(order.paymentMethodRef, order.paymentMethodSnapshot, order.paymentMethod) ||
      '—',
    shippingMethod:
      getMethodLabel(order.shippingMethod, order.shippingMethodSnapshot) || '—',
    paymentStatus: order.paymentStatus || '',
    orderStatus: order.orderStatus || '',
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
