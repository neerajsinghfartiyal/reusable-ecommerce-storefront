import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiCheckCircle, FiHeadphones, FiShoppingBag } from 'react-icons/fi'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import StorePageShell from '../../component/layout/StorePageShell.jsx'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { formatProductPrice } from '../../lib/productMappers.js'
import { formatDocumentTitle, getDefaultDocumentTitle } from '../../lib/pageTitle.js'
import { clearOrderSuccess, loadOrderSuccess } from '../../lib/orderSession.js'

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
        <StorePageShell containerClassName="max-w-2xl mx-auto">
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

  return (
    <>
      <Navbar />
      <StorePageShell containerClassName="max-w-2xl mx-auto pb-12">
          <div className="velmora-section-panel p-8 sm:p-10 text-center">
            <span className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-500/10 text-emerald-600 mb-5">
              <FiCheckCircle className="size-9" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white">
              Order placed successfully
            </h1>
            <p className="text-[#64748B] mt-3 leading-relaxed">
              Thank you for shopping with VELMORA. Your order has been received.
            </p>
            {order.orderNumber ? (
              <p className="mt-4 text-sm">
                <span className="text-[#64748B]">Order number: </span>
                <span className="font-bold text-[#111827] dark:text-white">{order.orderNumber}</span>
              </p>
            ) : null}
            {order.email ? (
              <p className="mt-2 text-sm text-[#64748B]">
                Confirmation details for{' '}
                <span className="font-medium text-[#111827] dark:text-white">{order.email}</span>
              </p>
            ) : null}
          </div>

          <div className="velmora-section-panel mt-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-[#111827] dark:text-white">Order summary</h2>
            </div>
            <dl className="divide-y divide-slate-100 dark:divide-gray-800 text-sm">
              {order.customerName ? (
                <div className="flex justify-between gap-4 px-6 py-3.5">
                  <dt className="text-[#64748B]">Customer</dt>
                  <dd className="font-medium text-[#111827] dark:text-white text-end">
                    {order.customerName}
                  </dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4 px-6 py-3.5">
                <dt className="text-[#64748B]">Payment method</dt>
                <dd className="font-medium text-[#111827] dark:text-white text-end">
                  {order.paymentMethod || '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4 px-6 py-3.5">
                <dt className="text-[#64748B]">Shipping method</dt>
                <dd className="font-medium text-[#111827] dark:text-white text-end">
                  {order.shippingMethod || '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4 px-6 py-4 bg-slate-50/80 dark:bg-slate-800/40">
                <dt className="font-bold text-[#111827] dark:text-white">Total paid</dt>
                <dd className="font-bold text-lg text-[#111827] dark:text-white">
                  {formatProductPrice(order.totalAmount, currencySymbol)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="velmora-section-panel mt-6 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <FiHeadphones className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#111827] dark:text-white">
                  Need help with your order?
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  A confirmation email can be sent once email is configured in store settings. Until
                  then, save your order number for reference or contact store support.
                </p>
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
              to="/cart"
              className="inline-flex items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 transition-colors"
            >
              View cart
            </Link>
          </div>
      </StorePageShell>
      <Footer />
      <Switcher />
    </>
  )
}
