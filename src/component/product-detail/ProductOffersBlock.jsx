import React from 'react'
import { FiHeadphones, FiPackage, FiRotateCcw, FiShield } from 'react-icons/fi'

const TRUST_ITEMS = [
  { icon: FiShield, title: 'Secure checkout', text: 'Encrypted guest checkout' },
  { icon: FiRotateCcw, title: 'Easy returns', text: 'Contact support for help' },
  { icon: FiPackage, title: 'Quality checked', text: 'Live catalog listing' },
  { icon: FiHeadphones, title: 'Support available', text: 'Order & delivery help' },
]

export default function ProductOffersBlock({ className = '' }) {
  return (
    <div className={`velmora-pdp-trust-strip ${className}`} role="list">
      {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
        <div key={title} className="velmora-pdp-trust-chip" role="listitem">
          <span className="velmora-pdp-trust-chip-icon" aria-hidden>
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="velmora-pdp-trust-chip-title">{title}</p>
            <p className="velmora-pdp-trust-chip-text">{text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
