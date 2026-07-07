import { resolveProductImageUrl, formatVariantOptionsLabel } from '../lib/productMappers.js'

const getEntityId = (value) => {
  if (!value) return ''
  if (typeof value === 'object') {
    return value._id || value.id || ''
  }
  return String(value)
}

export const mapShippingOption = (option) => {
  const safeOption = option && typeof option === 'object' ? option : {}

  return {
    id: getEntityId(safeOption),
    code: safeOption.code || '',
    name: safeOption.displayName || safeOption.name || 'Shipping method',
    description: safeOption.description || '',
    charge: Number(safeOption.charge ?? 0),
  }
}

export const mapPaymentOption = (option) => {
  const safeOption = option && typeof option === 'object' ? option : {}

  return {
    id: getEntityId(safeOption),
    code: safeOption.code || '',
    name: safeOption.displayName || safeOption.name || 'Payment option',
    description: safeOption.description || '',
    type: safeOption.type || '',
    provider: safeOption.provider || '',
  }
}

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

const emptySelectedMethod = () => ({ id: '', code: '', name: '' })

const mapSelectedMethod = (methodRef, code = '') => {
  const hasMethodObject = methodRef != null && typeof methodRef === 'object'
  const normalizedCode = code || (hasMethodObject ? methodRef.code || '' : '')

  return {
    id: getEntityId(methodRef),
    code: normalizedCode,
    name: hasMethodObject
      ? methodRef.displayName || methodRef.name || ''
      : '',
  }
}

export const getCartLineKey = (productId, variantId = '') => {
  const normalizedProductId = String(productId || '')
  const normalizedVariantId = variantId ? String(variantId) : ''
  return normalizedVariantId
    ? `${normalizedProductId}:${normalizedVariantId}`
    : normalizedProductId
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
      selectedShippingMethod: emptySelectedMethod(),
      selectedPaymentMethod: emptySelectedMethod(),
    }
  }

  const items = (Array.isArray(cart.items) ? cart.items : []).map((item) => {
    const productId = getEntityId(item.product)
    const variantId = getEntityId(item.variantId)
    const product =
      item.product && typeof item.product === 'object' ? item.product : null
    const slug = product?.slug || ''
    const variantOptionsLabel = formatVariantOptionsLabel(item.variantOptions)
    const variantStockQuantity =
      item.variantStockQuantity != null ? Number(item.variantStockQuantity) : undefined
    const stockQuantity =
      item.stockQuantity != null
        ? Number(item.stockQuantity)
        : variantStockQuantity != null
          ? variantStockQuantity
          : product?.quantity != null
            ? Number(product.quantity)
            : undefined
    const maxQuantity =
      item.maxQuantity != null
        ? Number(item.maxQuantity)
        : stockQuantity != null
          ? stockQuantity
          : undefined
    const inStock =
      item.inStock !== undefined && item.inStock !== null
        ? Boolean(item.inStock)
        : maxQuantity != null
          ? maxQuantity > 0
          : true

    return {
      lineKey: getCartLineKey(productId, variantId),
      productId,
      variantId,
      slug,
      name: item.productName || product?.name || 'Product',
      variantTitle: item.variantTitle || '',
      variantOptionsLabel,
      sku: item.sku || '',
      price: Number(item.price ?? 0),
      quantity: Number(item.quantity ?? 0),
      total: Number(item.total ?? 0),
      image: resolveProductImageUrl(
        item.featuredImage || item.image || product?.featuredImage || '',
      ),
      detailPath: slug ? `/products/${slug}` : '#',
      stockQuantity,
      variantStockQuantity,
      maxQuantity,
      inStock,
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
