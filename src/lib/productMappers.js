import { getApiBaseUrl } from './apiConfig.js'
import fallbackProductImage from '../assets/images/property/1.jpg'

const getEntityId = (value) => {
  if (!value) return ''
  if (typeof value === 'object') {
    return value._id || value.id || ''
  }
  return String(value)
}

export const resolveProductImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return fallbackProductImage
  }

  const trimmed = imageUrl.trim()
  if (!trimmed) return fallbackProductImage

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${getApiBaseUrl()}${path}`
}

export const formatProductPrice = (amount, currencySymbol = '$') => {
  const value = Number(amount)
  if (Number.isNaN(value)) return `${currencySymbol}0.00`
  return `${currencySymbol}${value.toFixed(2)}`
}

export const mapProductToCard = (product = {}) => {
  const salePrice = product.salePrice != null ? Number(product.salePrice) : null
  const basePrice = Number(product.price ?? 0)
  const displayPrice = salePrice != null && !Number.isNaN(salePrice) ? salePrice : basePrice
  const quantity = Number(product.quantity ?? 0)

  return {
    id: getEntityId(product),
    slug: product.slug || '',
    title: product.name || 'Product',
    image: resolveProductImageUrl(product.featuredImage),
    price: displayPrice,
    compareAtPrice:
      salePrice != null && !Number.isNaN(salePrice) && salePrice < basePrice ? basePrice : null,
    categoryName: product.category?.name || '',
    categoryId: getEntityId(product.category),
    brandName: product.brand?.name || '',
    sku: product.sku || '',
    description: product.shortDescription || product.description || '',
    inStock: !Number.isNaN(quantity) && quantity > 0,
    quantity: Number.isNaN(quantity) ? 0 : quantity,
    detailPath: product.slug ? `/products/${product.slug}` : '#',
  }
}

export const mapProductsToCards = (products = []) =>
  (Array.isArray(products) ? products : []).map(mapProductToCard)

export const mapCategoryToCard = (category = {}) => {
  const id = getEntityId(category)

  return {
    id,
    slug: category.slug || '',
    name: category.name || 'Category',
    title: 'Browse products',
    link: id ? `/products?category=${encodeURIComponent(id)}` : '/products',
  }
}

export const mapCategoriesToCards = (categories = []) =>
  (Array.isArray(categories) ? categories : []).map(mapCategoryToCard)

const normalizeImageList = (images = []) => {
  const seen = new Set()
  const resolved = []

  images.forEach((image) => {
    const url = resolveProductImageUrl(image)
    if (!url || seen.has(url)) return
    seen.add(url)
    resolved.push(url)
  })

  return resolved.length > 0 ? resolved : [fallbackProductImage]
}

export const buildProductGalleryImages = (product = {}) => {
  const rawImages = [
    product.featuredImage,
    ...(Array.isArray(product.galleryImages) ? product.galleryImages : []),
  ].filter(Boolean)

  return normalizeImageList(rawImages)
}

const mapAttributeSpecifications = (attributes = []) =>
  (Array.isArray(attributes) ? attributes : [])
    .filter((item) => item?.isVisible !== false && item?.isVariationAttribute === false)
    .map((item) => {
      const values = Array.isArray(item.values)
        ? item.values
            .map((entry) => entry?.label || entry?.value)
            .filter(Boolean)
            .join(', ')
        : ''

      return {
        name: item.name || item.code || 'Attribute',
        value: values,
      }
    })
    .filter((item) => item.value)

const mapProductVariations = (variations = []) =>
  (Array.isArray(variations) ? variations : []).map((variation) => {
    const salePrice =
      variation.salePrice != null ? Number(variation.salePrice) : null
    const basePrice = Number(variation.price ?? 0)
    const quantity = Number(variation.quantity ?? 0)

    return {
      sku: variation.sku || '',
      price: basePrice,
      salePrice: salePrice != null && !Number.isNaN(salePrice) ? salePrice : null,
      quantity: Number.isNaN(quantity) ? 0 : quantity,
      status: variation.status || 'active',
      image: variation.image ? resolveProductImageUrl(variation.image) : null,
      options: (Array.isArray(variation.attributes) ? variation.attributes : [])
        .map((attr) => {
          const label = attr.label || attr.value || ''
          const name = attr.name || attr.code || ''
          if (label && name) return `${name}: ${label}`
          return label || name
        })
        .filter(Boolean)
        .join(' · '),
      inStock: !Number.isNaN(quantity) && quantity > 0 && variation.status === 'active',
    }
  })

export const mapProductToDetail = (product = {}) => {
  const salePrice = product.salePrice != null ? Number(product.salePrice) : null
  const basePrice = Number(product.price ?? 0)
  const displayPrice =
    salePrice != null && !Number.isNaN(salePrice) ? salePrice : basePrice
  const quantity = Number(product.quantity ?? 0)
  const inStock = !Number.isNaN(quantity) && quantity > 0

  return {
    id: getEntityId(product),
    name: product.name || 'Product',
    slug: product.slug || '',
    sku: product.sku || '',
    price: displayPrice,
    compareAtPrice:
      salePrice != null && !Number.isNaN(salePrice) && salePrice < basePrice ? basePrice : null,
    categoryName: product.category?.name || '',
    categorySlug: product.category?.slug || '',
    categoryId: getEntityId(product.category),
    brandName: product.brand?.name || '',
    brandSlug: product.brand?.slug || '',
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    status: product.status || '',
    quantity: Number.isNaN(quantity) ? 0 : quantity,
    inStock,
    availabilityLabel: inStock ? 'In stock' : 'Out of stock',
    images: buildProductGalleryImages(product),
    specifications: mapAttributeSpecifications(product.attributes),
    variations: mapProductVariations(product.variations),
  }
}
