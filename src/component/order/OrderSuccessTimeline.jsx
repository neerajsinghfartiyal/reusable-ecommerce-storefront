import React from 'react'
import { getCustomerTimeline, formatOrderDate } from '../../lib/orderStatusHelpers.js'

export default function OrderSuccessTimeline({ order = {} }) {
  const entries = getCustomerTimeline(order)

  if (entries.length === 0) {
    return (
      <div className="velmora-order-card">
        <h2 className="velmora-order-card-title">Order progress</h2>
        <p className="text-sm text-[#64748B] leading-relaxed">
          We will update this page when your order moves to the next step.
        </p>
      </div>
    )
  }

  return (
    <div className="velmora-order-card">
      <h2 className="velmora-order-card-title">Order progress</h2>
      <ol className="velmora-order-timeline">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1
          const key = `${entry.status}-${entry.createdAt || index}`

          return (
            <li
              key={key}
              className={`velmora-order-timeline-item ${isLast ? 'is-current' : 'is-complete'}`}
            >
              <div className="velmora-order-timeline-marker" aria-hidden />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">
                    {entry.label}
                  </p>
                  {entry.createdAt ? (
                    <span className="text-xs text-[#64748B]">{formatOrderDate(entry.createdAt)}</span>
                  ) : null}
                </div>
                {entry.message ? (
                  <p className="text-sm text-[#64748B] mt-1 leading-relaxed">{entry.message}</p>
                ) : null}
                {entry.note ? (
                  <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{entry.note}</p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
