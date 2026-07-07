import React from 'react'
import { FiExternalLink, FiTruck } from 'react-icons/fi'
import {
  formatOrderDate,
  hasTrackingDetails,
  shouldShowTrackingPendingMessage,
} from '../../lib/orderStatusHelpers.js'

export default function OrderSuccessTracking({ order = {} }) {
  if (hasTrackingDetails(order)) {
    return (
      <div className="velmora-order-card">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 shrink-0">
            <FiTruck className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="velmora-order-card-title mb-2">Shipment tracking</h2>
            {order.courierName ? (
              <p className="text-sm text-[#111827] dark:text-white">
                <span className="text-[#64748B]">Courier: </span>
                {order.courierName}
              </p>
            ) : null}
            {order.trackingNumber ? (
              <p className="text-sm text-[#111827] dark:text-white mt-1">
                <span className="text-[#64748B]">Tracking number: </span>
                <span className="font-medium">{order.trackingNumber}</span>
              </p>
            ) : null}
            {order.shippedAt ? (
              <p className="text-xs text-[#64748B] mt-2">
                Shipped on {formatOrderDate(order.shippedAt)}
              </p>
            ) : null}
            {order.trackingUrl ? (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 transition-colors"
              >
                Track shipment
                <FiExternalLink className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  if (shouldShowTrackingPendingMessage(order)) {
    return (
      <div className="velmora-order-card velmora-order-card-muted">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-slate-500/10 text-slate-600 shrink-0">
            <FiTruck className="size-5" />
          </span>
          <div>
            <h2 className="velmora-order-card-title mb-1">Shipment tracking</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Tracking will be available once your order ships.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
