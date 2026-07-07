import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeadphones, FiRefreshCw, FiShield } from 'react-icons/fi'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import velmoraMark from '../assets/images/velmora-mark.svg'
import { getPublicSettings } from '../api/publicSettingsApi.js'
import { useStoreCategories } from '../hooks/useStoreCategories.js'
import { FEATURED_CATEGORY_SLUGS } from '../lib/categoryHelpers.js'
import { DEFAULT_STORE_NAME, resolveStoreLogoUrl, STORE_TAGLINE } from '../lib/productMappers.js'

const FOOTER_TRUST = [
  { icon: FiShield, label: 'Secure checkout' },
  { icon: FiRefreshCw, label: 'Easy returns' },
  { icon: FiHeadphones, label: 'Support available' },
]

const formatContactAddress = (address) => {
  if (!address) return ''
  if (typeof address === 'string') return address

  const parts = [
    address.street || address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(', '),
    address.postalCode,
    address.country,
  ].filter((part) => Boolean(part && String(part).trim()))

  return parts.join(', ')
}

const resolveFooterCategories = (categories = []) => {
  const bySlug = new Map(
    categories.map((category) => [String(category.slug || '').toLowerCase(), category]),
  )

  const preferred = FEATURED_CATEGORY_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean)
  if (preferred.length > 0) return preferred

  return categories.slice(0, 4)
}

export default function Footer() {
  const [storeSettings, setStoreSettings] = useState(null)
  const { categories: allCategories } = useStoreCategories({ featuredOnly: false })

  useEffect(() => {
    let active = true

    const loadSettings = async () => {
      try {
        const settings = await getPublicSettings()
        if (active) setStoreSettings(settings || null)
      } catch {
        // Keep defaults.
      }
    }

    loadSettings()

    return () => {
      active = false
    }
  }, [])

  const storeName = storeSettings?.storeName?.trim() || DEFAULT_STORE_NAME
  const logoUrl = resolveStoreLogoUrl(storeSettings?.logo)
  const contactEmail =
    storeSettings?.storeEmail || storeSettings?.contactEmail || storeSettings?.email || ''
  const contactPhone =
    storeSettings?.storePhone || storeSettings?.contactPhone || storeSettings?.phone || ''
  const contactAddress = formatContactAddress(storeSettings?.address || storeSettings?.storeAddress)
  const footerCategories = resolveFooterCategories(allCategories)

  return (
    <footer className="velmora-footer">
      <div className="velmora-container py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 focus:outline-none">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt=""
                  className="h-10 w-10 lg:h-[2.625rem] lg:w-[2.625rem] object-contain shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <img
                  src={velmoraMark}
                  alt=""
                  className="h-10 w-10 lg:h-[2.625rem] lg:w-[2.625rem] rounded-xl shrink-0 shadow-sm"
                  aria-hidden="true"
                />
              )}
              <span className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-[0.14em] uppercase">
                  {storeName}
                </span>
                <span className="text-[#F59E0B] text-xs font-semibold tracking-wide mt-1">
                  {STORE_TAGLINE}
                </span>
              </span>
            </Link>
            <p className="mt-5 text-slate-400 text-sm leading-relaxed max-w-sm">
              Premium fashion, electronics, footwear, fitness, and lifestyle products curated for
              modern everyday shopping.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="velmora-footer-heading">Shop</h2>
            <ul className="list-none mt-5 space-y-2.5 p-0 m-0">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop', to: '/shop' },
                { label: 'Categories', to: '/categories' },
                { label: 'Cart', to: '/cart' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="velmora-footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="velmora-footer-heading">Categories</h2>
            <ul className="list-none mt-5 space-y-2.5 p-0 m-0">
              {footerCategories.map((category) => (
                <li key={category.id || category.slug}>
                  <Link to={category.link} className="velmora-footer-link">
                    {category.name}
                  </Link>
                </li>
              ))}
              {!footerCategories.length ? (
                <li className="text-slate-500 text-sm">Categories load from your catalog.</li>
              ) : null}
              <li>
                <Link to="/categories" className="velmora-footer-link text-primary">
                  View all categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="velmora-footer-heading">Customer support</h2>
            <ul className="list-none mt-5 space-y-3 p-0 m-0 text-sm">
              {contactEmail ? (
                <li className="flex items-start gap-2.5">
                  <FiMail className="size-4 text-primary shrink-0 mt-0.5" />
                  <Link to={`mailto:${contactEmail}`} className="velmora-footer-link break-all">
                    {contactEmail}
                  </Link>
                </li>
              ) : null}
              {contactPhone ? (
                <li className="flex items-start gap-2.5">
                  <FiPhone className="size-4 text-primary shrink-0 mt-0.5" />
                  <Link to={`tel:${contactPhone}`} className="velmora-footer-link">
                    {contactPhone}
                  </Link>
                </li>
              ) : null}
              {contactAddress ? (
                <li className="flex items-start gap-2.5">
                  <FiMapPin className="size-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-400 leading-relaxed">{contactAddress}</span>
                </li>
              ) : null}
              <li className="text-slate-500 text-xs leading-relaxed pt-1">
                Support is available for orders, delivery, and returns. Contact us using the details
                above when configured in store settings.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="velmora-footer-heading">Legal</h2>
            <ul className="list-none mt-5 space-y-2.5 p-0 m-0">
              <li>
                <Link to="/terms" className="velmora-footer-link">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="velmora-footer-link">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="velmora-container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm text-center md:text-start mb-0">
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 list-none m-0 p-0">
            {FOOTER_TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <Icon className="size-3.5 text-[#F59E0B]" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
