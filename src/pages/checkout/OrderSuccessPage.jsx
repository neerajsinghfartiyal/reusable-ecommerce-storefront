import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import { getPublicSettings } from '../../api/publicSettingsApi.js'
import { formatProductPrice } from '../../lib/productMappers.js'
import { clearOrderSuccess, loadOrderSuccess } from '../../lib/orderSession.js'

export default function OrderSuccessPage() {
  const location = useLocation()
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [order] = useState(() => location.state?.order || loadOrderSuccess())

  useEffect(() => {
    document.title = 'Order Confirmed'

    return () => {
      document.title = 'Reusable Ecommerce Storefront'
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
        <section className="relative md:pb-24 pb-16 mt-20">
          <div className="container md:mt-24 mt-16 text-center py-16">
            <h4 className="text-2xl font-medium">No order details found</h4>
            <p className="text-slate-400 mt-4">
              If you just placed an order, details may have expired from this session.
            </p>
            <Link
              to="/products"
              className="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-6"
            >
              Continue shopping
            </Link>
          </div>
        </section>
        <Footer />
        <Switcher />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <section className="relative md:pb-24 pb-16 mt-20">
        <div className="container md:mt-24 mt-16 max-w-2xl">
          <div className="rounded-md bg-slate-50 dark:bg-slate-800 p-8 text-center shadow-sm">
            <h4 className="text-2xl font-medium text-emerald-600">Thank you for your order!</h4>
            <p className="text-slate-500 mt-3">
              Your order has been placed successfully.
            </p>
          </div>

          <div className="rounded-md border border-slate-100 dark:border-gray-800 p-6 mt-8">
            <h5 className="text-xl font-medium mb-4">Order Details</h5>
            <ul className="list-none space-y-3 text-sm">
              {order.orderNumber ? (
                <li className="flex justify-between gap-4">
                  <span className="text-slate-500">Order number</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </li>
              ) : null}
              {order.customerName ? (
                <li className="flex justify-between gap-4">
                  <span className="text-slate-500">Customer</span>
                  <span>{order.customerName}</span>
                </li>
              ) : null}
              {order.email ? (
                <li className="flex justify-between gap-4">
                  <span className="text-slate-500">Email</span>
                  <span>{order.email}</span>
                </li>
              ) : null}
              <li className="flex justify-between gap-4">
                <span className="text-slate-500">Shipping Method</span>
                <span>{order.shippingMethod}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-500">Payment Option</span>
                <span>{order.paymentMethod}</span>
              </li>
              <li className="flex justify-between gap-4 font-medium text-base pt-3 border-t border-slate-200 dark:border-gray-700">
                <span>Total</span>
                <span>{formatProductPrice(order.totalAmount, currencySymbol)}</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="btn bg-primary hover:bg-primary-dark text-white rounded-md"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <Switcher />
    </>
  )
}
