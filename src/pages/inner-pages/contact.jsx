import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeadphones, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import StorePageShell from '../../component/layout/StorePageShell.jsx'
import PageHeader from '../../component/layout/PageHeader.jsx'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { DEFAULT_STORE_NAME } from '../../lib/productMappers.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../lib/pageTitle.js'

const formatStoreAddress = (address = {}) => {
  const parts = [
    address.street || address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(', '),
    address.postalCode,
    address.country,
  ].filter((part) => Boolean(part && String(part).trim()))

  return parts.join(', ')
}

export default function Contact() {
  const [storeSettings, setStoreSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = formatDocumentTitle('Contact')

    let active = true

    const loadSettings = async () => {
      try {
        const settings = await getPublicSettings()
        if (active) setStoreSettings(settings || null)
      } catch {
        if (active) setStoreSettings(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadSettings()

    return () => {
      active = false
      document.title = getDefaultDocumentTitle()
    }
  }, [])

  const storeName = storeSettings?.storeName?.trim() || DEFAULT_STORE_NAME
  const storeEmail = storeSettings?.storeEmail || ''
  const storePhone = storeSettings?.storePhone || ''
  const storeAddress = formatStoreAddress(storeSettings?.address)

  return (
    <>
      <Navbar />
      <StorePageShell containerClassName="pb-12">
        <PageHeader
          title={`Contact ${storeName}`}
          subtitle="Questions about products, orders, or delivery? Reach our store team using the details below."
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 velmora-section-panel p-6 md:p-8">
            <h2 className="text-lg font-bold text-[#111827] dark:text-white">Customer support</h2>
            <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
              Orders are placed online through checkout. For help with an existing order, include
              your order number when you contact us.
            </p>

            {loading ? (
              <p className="text-[#64748B] text-sm mt-6">Loading store contact details...</p>
            ) : (
              <ul className="list-none space-y-5 mt-6 p-0 m-0">
                {storeEmail ? (
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary shrink-0">
                      <FiMail className="size-4.5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        Email
                      </p>
                      <Link
                        to={`mailto:${storeEmail}`}
                        className="text-primary hover:underline font-medium text-sm mt-1 inline-block"
                      >
                        {storeEmail}
                      </Link>
                    </div>
                  </li>
                ) : null}
                {storePhone ? (
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary shrink-0">
                      <FiPhone className="size-4.5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        Phone
                      </p>
                      <Link
                        to={`tel:${storePhone}`}
                        className="text-primary hover:underline font-medium text-sm mt-1 inline-block"
                      >
                        {storePhone}
                      </Link>
                    </div>
                  </li>
                ) : null}
                {storeAddress ? (
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary shrink-0">
                      <FiMapPin className="size-4.5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        Address
                      </p>
                      <p className="text-sm text-[#111827] dark:text-slate-200 mt-1 leading-relaxed">
                        {storeAddress}
                      </p>
                    </div>
                  </li>
                ) : null}
                {!storeEmail && !storePhone && !storeAddress ? (
                  <li className="text-sm text-[#64748B] leading-relaxed">
                    Store contact details are not configured yet. You can still browse products and
                    place orders online.
                  </li>
                ) : null}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="velmora-btn-primary">
                Continue shopping
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-sm px-5 py-2.5 transition-colors"
              >
                View cart
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="velmora-section-panel p-6">
              <div className="flex items-start gap-3">
                <FiHeadphones className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#111827] dark:text-white">
                    Support available
                  </h3>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    We help with product questions, order updates, delivery, and returns when contact
                    details are configured in admin store settings.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 dark:border-gray-800 bg-[#111827] p-6 text-white">
              <p className="text-[#F59E0B] text-xs font-bold uppercase tracking-widest">
                Guest checkout
              </p>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                No account is required. Add items to cart, enter your details at checkout, and place
                your order securely.
              </p>
              <Link
                to="/shop"
                className="inline-block mt-4 text-sm font-semibold text-white hover:text-[#F59E0B]"
              >
                Browse the shop →
              </Link>
            </div>
          </div>
        </div>
      </StorePageShell>
      <Footer />
      <Switcher />
    </>
  )
}
