import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiCheckCircle, FiHeadphones, FiShoppingBag, FiPackage } from 'react-icons/fi'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import StorePageShell from '../../component/layout/StorePageShell.jsx'
import OrderSuccessTimeline from '../../component/order/OrderSuccessTimeline.jsx'
import OrderSuccessTracking from '../../component/order/OrderSuccessTracking.jsx'
import OrderSuccessItems from '../../component/order/OrderSuccessItems.jsx'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { formatProductPrice } from '../../lib/productMappers.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../lib/pageTitle.js'
import { clearOrderSuccess, loadOrderSuccess } from '../../lib/orderSession.js'
import {
  getOrderStatusMeta,
  getPaymentStatusMeta,
  normalizeStatus,
} from '../../lib/orderStatusHelpers.js'

const formatAddressLine = (address = {}) => {
  const locality = [address.city, address.state, address.postalCode].filter(Boolean).join(', ')
  return [address.street, locality, address.country].filter(Boolean).join(' · ')
}

function StatusBadge({ tone, children }) {
  const toneClass = `velmora-order-status-badge is-${tone}`
  return <span className={toneClass}>{children}</span>
}

export default function OrderSuccessPage() {
  const location = useLocation()
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [order] = useState(() => location.state?.order || loadOrderSuccess())

  useEffect(() => {
    document.title = formatDocumentTitle('Order Placed')

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
    return () => {
      clearOrderSuccess()
    }
  }, [])

  if (!order) {
    return (
      <>
        <Navbar />
        <StorePageShell containerClassName="max-w-3xl mx-auto">
          <div className="velmora-section-panel p-10">
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white">
              No order details found
            </h1>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              If you just placed an order, details may have expired from this session.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3"
            >
              Continue shopping
            </Link>
          </div>
        </StorePageShell>
        <Footer />
        <Switcher />
      </>
    )
  }

  const orderStatus = normalizeStatus(order.orderStatus)
  const paymentStatus = normalizeStatus(order.paymentStatus)
  const orderMeta = getOrderStatusMeta(orderStatus)
  const paymentMeta = getPaymentStatusMeta(paymentStatus)
  const addressLine = formatAddressLine(order.shippingAddress || {})

  return (
    <>
      <Navbar />
      <StorePageShell containerClassName="max-w-3xl mx-auto pb-12">
        <div className="velmora-order-success-hero">
          <span className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-500/10 text-emerald-600 mb-5">
            <FiCheckCircle className="size-9" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white">
            Order placed successfully
          </h1>
          <p className="text-[#64748B] mt-3 leading-relaxed">
            Thank you for shopping with VELMORA. Your order has been received.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {order.orderNumber ? (
              <span className="text-sm font-semibold text-[#111827] dark:text-white">
                #{order.orderNumber}
              </span>
            ) : null}
            <StatusBadge tone={orderMeta.tone}>{order.statusLabel || orderMeta.label}</StatusBadge>
            <StatusBadge tone={paymentMeta.tone}>{paymentMeta.label}</StatusBadge>
          </div>

          <p className="mt-4 text-lg font-bold text-[#111827] dark:text-white">
            {formatProductPrice(order.totalAmount, currencySymbol)}
          </p>

          {order.email ? (
            <p className="mt-2 text-sm text-[#64748B]">
              Confirmation for{' '}
              <span className="font-medium text-[#111827] dark:text-white">{order.email}</span>
            </p>
          ) : null}
        </div>

        <div className="mt-6 space-y-4">
          <OrderSuccessTimeline order={order} />
          <OrderSuccessTracking order={order} />
          <OrderSuccessItems items={order.items} currencySymbol={currencySymbol} />

          <div className="velmora-order-card">
            <h2 className="velmora-order-card-title">Delivery details</h2>
            <dl className="space-y-3 text-sm">
              {order.customerName ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-[#64748B]">Customer</dt>
                  <dd className="font-medium text-[#111827] dark:text-white text-end">
                    {order.customerName}
                  </dd>
                </div>
              ) : null}
              {order.email ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-[#64748B]">Email</dt>
                  <dd className="font-medium text-[#111827] dark:text-white text-end">
                    {order.email}
                  </dd>
                </div>
              ) : null}
              {order.phone ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-[#64748B]">Phone</dt>
                  <dd className="font-medium text-[#111827] dark:text-white text-end">
                    {order.phone}
                  </dd>
                </div>
              ) : null}
              {addressLine ? (
                <div>
                  <dt className="text-[#64748B] mb-1">Shipping address</dt>
                  <dd className="font-medium text-[#111827] dark:text-white leading-relaxed">
                    {addressLine}
                  </dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt className="text-[#64748B]">Payment method</dt>
                <dd className="font-medium text-[#111827] dark:text-white text-end">
                  {order.paymentMethod || '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#64748B]">Shipping method</dt>
                <dd className="font-medium text-[#111827] dark:text-white text-end">
                  {order.shippingMethod || '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4 pt-2 border-t border-slate-100 dark:border-gray-800">
                <dt className="font-semibold text-[#111827] dark:text-white">Order total</dt>
                <dd className="font-bold text-[#111827] dark:text-white">
                  {formatProductPrice(order.totalAmount, currencySymbol)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="velmora-order-card velmora-order-card-muted">
            <div className="flex items-start gap-3">
              <FiHeadphones className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#111827] dark:text-white">
                  Need help with your order?
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Save your order number for reference. Our team can help with delivery or payment
                  questions.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex mt-3 text-sm font-semibold text-primary hover:underline"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 transition-colors"
          >
            <FiShoppingBag className="size-4" />
            Continue shopping
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 transition-colors"
          >
            <FiPackage className="size-4" />
            View all products
          </Link>
        </div>
      </StorePageShell>
      <Footer />
      <Switcher />
    </>
  )
}
