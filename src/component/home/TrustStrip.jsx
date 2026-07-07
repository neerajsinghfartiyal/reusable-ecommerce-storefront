import React from 'react'
import { FiHeadphones, FiShield, FiShoppingBag, FiTruck } from 'react-icons/fi'

const TRUST_ITEMS = [
  { icon: FiShield, title: 'Secure checkout', text: 'Protected guest checkout flow' },
  { icon: FiShoppingBag, title: 'Quality products', text: 'Curated catalog from live inventory' },
  { icon: FiTruck, title: 'Simple returns', text: 'Clear policies and support-ready store' },
  { icon: FiHeadphones, title: 'Store support', text: 'Contact us for orders and delivery help' },
]

export default function TrustStrip() {
  return (
    <section className="container mt-5 mb-1">
      <div className="rounded-xl border border-slate-200/80 dark:border-gray-800 bg-white dark:bg-slate-900 px-4 py-5 md:px-6 md:py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary shrink-0">
                <Icon className="size-4.5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">{title}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
