import React from 'react'
import { FiHeadphones, FiPackage, FiRotateCcw, FiShield } from 'react-icons/fi'

const TRUST_ITEMS = [
  { icon: FiShield, title: 'Secure checkout', text: 'Encrypted guest checkout when you place an order' },
  { icon: FiRotateCcw, title: 'Easy returns', text: 'Contact support for straightforward return help' },
  { icon: FiPackage, title: 'Quality checked', text: 'Items sourced from our published live catalog' },
  { icon: FiHeadphones, title: 'Support available', text: 'Help with orders, payment, or delivery questions' },
]

export default function ProductTrustDelivery({ compact = false }) {
  return (
    <div className="velmora-section-panel overflow-hidden">
      <div className="velmora-pdp-panel-header">
        <h2 className="text-sm font-bold text-[#111827] dark:text-white">Shop with confidence</h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Honest marketplace information — no fake delivery dates or offers.
        </p>
      </div>

      <div className={`grid gap-2.5 p-3 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
        {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-start gap-2.5 rounded-lg border border-slate-200/80 dark:border-gray-700 bg-[#F8FAFC]/70 dark:bg-slate-800/40 p-3"
          >
            <span className="inline-flex items-center justify-center size-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0">
              <Icon className="size-4" />
            </span>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-[#111827] dark:text-white">{title}</h3>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
