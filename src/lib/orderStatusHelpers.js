export const ORDER_STATUS_META = {
  pending: {
    label: 'Order placed',
    message: 'We received your order and will confirm it shortly.',
    tone: 'amber',
    progress: 1,
  },
  confirmed: {
    label: 'Confirmed',
    message: 'Your order has been confirmed.',
    tone: 'blue',
    progress: 2,
  },
  processing: {
    label: 'Processing',
    message: 'We are preparing your items.',
    tone: 'indigo',
    progress: 3,
  },
  packed: {
    label: 'Packed',
    message: 'Your order is packed and ready to ship.',
    tone: 'purple',
    progress: 4,
  },
  shipped: {
    label: 'Shipped',
    message: 'Your order is on the way.',
    tone: 'sky',
    progress: 5,
  },
  out_for_delivery: {
    label: 'Out for delivery',
    message: 'Your package is out for delivery.',
    tone: 'amber',
    progress: 6,
  },
  delivered: {
    label: 'Delivered',
    message: 'Your order has been delivered.',
    tone: 'green',
    progress: 7,
  },
  cancelled: {
    label: 'Cancelled',
    message: 'This order was cancelled.',
    tone: 'red',
    progress: 0,
  },
  return_requested: {
    label: 'Return requested',
    message: 'A return has been requested for this order.',
    tone: 'orange',
    progress: 0,
  },
  returned: {
    label: 'Returned',
    message: 'Returned items have been recorded.',
    tone: 'slate',
    progress: 0,
  },
  refunded: {
    label: 'Refunded',
    message: 'A refund has been recorded for this order.',
    tone: 'rose',
    progress: 0,
  },
}

export const PAYMENT_STATUS_META = {
  pending: { label: 'Payment pending', tone: 'amber' },
  paid: { label: 'Paid', tone: 'green' },
  failed: { label: 'Payment failed', tone: 'red' },
  refunded: { label: 'Refunded', tone: 'rose' },
  partially_refunded: { label: 'Partially refunded', tone: 'rose' },
  cod_pending: { label: 'Cash on delivery', tone: 'amber' },
}

const PROGRESS_STATUSES = [
  'pending',
  'confirmed',
  'processing',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered',
]

export const normalizeStatus = (status) => String(status || 'pending').trim().toLowerCase()

export const getOrderStatusMeta = (status) => {
  const key = normalizeStatus(status)
  return ORDER_STATUS_META[key] || {
    label: key.replace(/_/g, ' '),
    message: 'Order status updated.',
    tone: 'slate',
    progress: 0,
  }
}

export const getPaymentStatusMeta = (status) => {
  const key = normalizeStatus(status)
  return PAYMENT_STATUS_META[key] || {
    label: key.replace(/_/g, ' '),
    tone: 'slate',
  }
}

export const isCustomerSafeTimelineEntry = (entry = {}) => {
  if (!entry || typeof entry !== 'object') return false
  if (String(entry.actorType || '').toLowerCase() === 'admin') return false

  const metadata = entry.metadata || {}
  if (metadata.customerVisible === false) return false

  return true
}

export const getCustomerSafeNote = (entry = {}) => {
  if (!isCustomerSafeTimelineEntry(entry)) return ''
  if (String(entry.actorType || '').toLowerCase() === 'admin') return ''

  const note = String(entry.note || '').trim()
  if (!note) return ''

  const lowered = note.toLowerCase()
  if (lowered.startsWith('internal') || lowered.includes('admin only')) {
    return ''
  }

  return note
}

export const sortTimelineEntries = (timeline = []) =>
  [...(Array.isArray(timeline) ? timeline : [])].sort((left, right) => {
    const leftTime = new Date(left?.createdAt || 0).getTime()
    const rightTime = new Date(right?.createdAt || 0).getTime()
    return leftTime - rightTime
  })

export const getCustomerTimeline = (order = {}) => {
  const raw = Array.isArray(order?.orderTimeline) ? order.orderTimeline : []
  const filtered = sortTimelineEntries(raw).filter(isCustomerSafeTimelineEntry)

  if (filtered.length > 0) {
    return filtered.map((entry) => ({
      status: normalizeStatus(entry.status),
      label: entry.label || getOrderStatusMeta(entry.status).label,
      message: entry.message || getOrderStatusMeta(entry.status).message,
      note: getCustomerSafeNote(entry),
      createdAt: entry.createdAt || null,
    }))
  }

  return buildFallbackTimeline(order)
}

export const buildFallbackTimeline = (order = {}) => {
  const status = normalizeStatus(order?.orderStatus)
  const createdAt = order?.createdAt || new Date().toISOString()
  const meta = getOrderStatusMeta(status)

  if (['cancelled', 'return_requested', 'returned', 'refunded'].includes(status)) {
    return [
      {
        status: 'pending',
        label: ORDER_STATUS_META.pending.label,
        message: ORDER_STATUS_META.pending.message,
        note: '',
        createdAt,
      },
      {
        status,
        label: meta.label,
        message: meta.message,
        note: '',
        createdAt: order?.cancelledAt || order?.refundedAt || createdAt,
      },
    ]
  }

  const currentProgress = meta.progress || 1

  return PROGRESS_STATUSES.filter((step) => {
    const stepProgress = ORDER_STATUS_META[step]?.progress || 0
    return stepProgress > 0 && stepProgress <= currentProgress
  }).map((step, index) => ({
    status: step,
    label: ORDER_STATUS_META[step].label,
    message: ORDER_STATUS_META[step].message,
    note: '',
    createdAt: index === 0 ? createdAt : null,
  }))
}

export const hasTrackingDetails = (order = {}) =>
  Boolean(
    String(order?.trackingNumber || '').trim() ||
      String(order?.trackingUrl || '').trim() ||
      String(order?.courierName || '').trim(),
  )

export const shouldShowTrackingPendingMessage = (order = {}) => {
  const status = normalizeStatus(order?.orderStatus)
  return ['pending', 'confirmed', 'processing', 'packed'].includes(status) && !hasTrackingDetails(order)
}

export const formatOrderDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
