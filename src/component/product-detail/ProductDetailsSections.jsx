import React from 'react'
import { Link } from 'react-router-dom'
import { formatProductPrice } from '../../lib/productMappers.js'

function SpecTable({ title, rows = [] }) {
  if (!rows.length) return null

  return (
    <div className="velmora-pdp-details-card">
      <h2 className="velmora-pdp-details-title">{title}</h2>
      <dl className="velmora-pdp-spec-list">
        {rows.map((row) => (
          <div key={row.label} className="velmora-pdp-spec-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function ProductDetailsSections({ product, currencySymbol }) {
  if (!product) return null

  const metaRows = [
    product.categoryName
      ? {
          label: 'Category',
          value: product.categoryId ? (
            <Link
              to={`/shop?category=${encodeURIComponent(product.categoryId)}`}
              className="text-[#2563EB] hover:underline font-medium"
            >
              {product.categoryName}
            </Link>
          ) : (
            product.categoryName
          ),
        }
      : null,
    product.brandName ? { label: 'Brand', value: product.brandName } : null,
    product.sku ? { label: 'SKU', value: product.sku } : null,
    {
      label: 'Availability',
      value: (
        <span className={product.inStock ? 'text-emerald-600 font-semibold' : 'text-slate-500'}>
          {product.availabilityLabel}
        </span>
      ),
    },
    product.quantity > 0 ? { label: 'Stock quantity', value: String(product.quantity) } : null,
    {
      label: 'Price',
      value: formatProductPrice(product.price, currencySymbol),
    },
  ].filter(Boolean)

  const specRows =
    product.specifications.length > 0
      ? product.specifications.map((spec) => ({
          label: spec.name,
          value: spec.value,
        }))
      : []

  return (
    <div className="velmora-pdp-details-shell">
      <h2 className="velmora-pdp-details-heading">Product information</h2>

      <div className="velmora-pdp-details-grid">
        <div className="velmora-pdp-details-column">
          {product.description ? (
            <div className="velmora-pdp-details-card">
              <h3 className="velmora-pdp-details-title">Description</h3>
              <div className="velmora-pdp-details-prose">{product.description}</div>
            </div>
          ) : null}

          {product.variations.length > 0 ? (
            <div className="velmora-pdp-details-card">
              <h3 className="velmora-pdp-details-title">Available options</h3>
              <p className="text-xs text-amber-800 dark:text-amber-300 mb-2">
                Variant-specific cart selection is not enabled yet.
              </p>
              <div className="overflow-x-auto -mx-1">
                <table className="velmora-pdp-variant-table w-full text-sm">
                  <thead>
                    <tr>
                      <th>Variant</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variations.map((variation) => (
                      <tr key={variation.sku || variation.options}>
                        <td>{variation.options || 'Default'}</td>
                        <td>{variation.sku || '—'}</td>
                        <td>
                          <span className="font-semibold text-[#111827] dark:text-white">
                            {formatProductPrice(
                              variation.salePrice ?? variation.price,
                              currencySymbol,
                            )}
                          </span>
                          {variation.salePrice != null ? (
                            <span className="ms-2 text-xs text-[#64748B] line-through">
                              {formatProductPrice(variation.price, currencySymbol)}
                            </span>
                          ) : null}
                        </td>
                        <td>
                          <span
                            className={
                              variation.inStock ? 'text-emerald-600 font-semibold' : 'text-slate-500'
                            }
                          >
                            {variation.inStock ? 'In stock' : 'Out of stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>

        <div className="velmora-pdp-details-column">
          <SpecTable title="Product details" rows={metaRows} />
          {specRows.length > 0 ? <SpecTable title="Specifications" rows={specRows} /> : null}
        </div>
      </div>
    </div>
  )
}
