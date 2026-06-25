import { resolveProductImageUrl } from '../lib/productMappers.js'

const getEntityId = (value) => {
  if (!value) return ''
  if (typeof value === 'object') {
    return value._id || value.id || ''
  }
  return String(value)
}

export const mapShippingOption = (option = {}) => ({
  id: getEntityId(option),
  code: option.code || '',
  name: option.displayName || option.name || 'Shipping method',
  description: option.description || '',
  charge: Number(option.charge ?? 0),
})

export const mapPaymentOption = (option = {}) => ({
  id: getEntityId(option),
  code: option.code || '',
  name: option.displayName || option.name || 'Payment option',
  description: option.description || '',
  type: option.type || '',
  provider: option.provider || '',
})

export const mapShippingOptionsResponse = (data = {}) => ({
  shippingEnabled: data.shippingEnabled !== false,
  shippingOptions: (Array.isArray(data.shippingOptions) ? data.shippingOptions : []).map(
    mapShippingOption,
  ),
  selectedShippingMethodId: getEntityId(data.selectedShippingMethod),
  selectedShippingMethodCode: data.selectedShippingMethodCode || '',
  shippingAmount: Number(data.shippingAmount ?? 0),
})

export const mapPaymentOptionsResponse = (data = {}) => ({
  paymentOptions: (Array.isArray(data.paymentOptions) ? data.paymentOptions : []).map(
    mapPaymentOption,
  ),
  selectedPaymentMethodId: getEntityId(data.selectedPaymentMethod),
  selectedPaymentMethodCode: data.selectedPaymentMethodCode || '',
})

const mapSelectedMethod = (methodRef, code = '') => {
  const id = getEntityId(methodRef)
  const name =
    methodRef && typeof methodRef === 'object'
      ? methodRef.displayName || methodRef.name || ''
      : ''

  return {
    id,
    code: code || (typeof methodRef === 'object' ? methodRef.code || '' : ''),
    name,
  }
}

export const mapCartFromApi = (cart) => {
  if (!cart) {
    return {
      raw: null,
      items: [],
      itemCount: 0,
      subtotal: 0,
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      totalAmount: 0,
      selectedShippingMethod: { id: '', code: '', name: '' },
      selectedPaymentMethod: { id: '', code: '', name: '' },
    }
  }

  const items = (Array.isArray(cart.items) ? cart.items : []).map((item) => {
    const productId = getEntityId(item.product)
    const product =
      item.product && typeof item.product === 'object' ? item.product : null
    const slug = product?.slug || ''

    return {
      productId,
      slug,
      name: item.productName || product?.name || 'Product',
      sku: item.sku || '',
      price: Number(item.price ?? 0),
      quantity: Number(item.quantity ?? 0),
      total: Number(item.total ?? 0),
      image: resolveProductImageUrl(
        item.featuredImage || product?.featuredImage || '',
      ),
      detailPath: slug ? `/products/${slug}` : '#',
      maxQuantity:
        product?.quantity != null ? Number(product.quantity) : undefined,
    }
  })

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    raw: cart,
    items,
    itemCount,
    subtotal: Number(cart.subtotal ?? 0),
    taxAmount: Number(cart.taxAmount ?? 0),
    shippingAmount: Number(cart.shippingAmount ?? 0),
    discountAmount: Number(cart.discountAmount ?? 0),
    totalAmount: Number(cart.totalAmount ?? 0),
    selectedShippingMethod: mapSelectedMethod(
      cart.shippingMethod,
      cart.shippingMethodCode,
    ),
    selectedPaymentMethod: mapSelectedMethod(
      cart.paymentMethodRef,
      cart.paymentMethodCode,
    ),
  }
}
