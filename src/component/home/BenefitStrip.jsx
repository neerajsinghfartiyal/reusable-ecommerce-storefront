import React from 'react'
import { FiLock, FiPackage, FiRefreshCw, FiZap } from 'react-icons/fi'

const BENEFITS = [
  { icon: FiZap, label: 'Fast checkout' },
  { icon: FiLock, label: 'Secure payments' },
  { icon: FiRefreshCw, label: 'Easy returns' },
  { icon: FiPackage, label: 'Curated products' },
]

export default function BenefitStrip() {
  return (
    <div className="bg-[#111827] text-white border-b border-white/10">
      <div className="container py-2">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] sm:text-xs">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5 text-white/90">
              <Icon className="size-3 text-[#F59E0B] shrink-0" />
              <span className="font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
