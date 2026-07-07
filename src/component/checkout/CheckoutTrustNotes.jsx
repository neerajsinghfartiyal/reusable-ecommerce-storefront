import React from 'react'
import { FiHeadphones, FiRotateCcw, FiShield } from 'react-icons/fi'

const TRUST_ITEMS = [
  { icon: FiShield, title: 'Secure checkout', text: 'Protected guest checkout flow' },
  { icon: FiRotateCcw, title: 'Easy returns', text: 'Contact support for return assistance' },
  { icon: FiHeadphones, title: 'Support available', text: 'Help with orders, payment, and delivery' },
]

export default function CheckoutTrustNotes({ variant = 'compact' }) {
  if (variant === 'inline') {
    return (
      <ul className="list-none space-y-2 text-xs text-[#64748B]">
        {TRUST_ITEMS.map(({ title }) => (
          <li key={title} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
            {title}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200/90 dark:border-gray-700 bg-[#F8FAFC]/80 dark:bg-slate-800/50 p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
        Shop with confidence
      </p>
      <div className="space-y-3">
        {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-2.5">
            <Icon className="size-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#111827] dark:text-white">{title}</p>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
