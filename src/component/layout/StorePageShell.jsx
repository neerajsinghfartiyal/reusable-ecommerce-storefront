import React from 'react'

export default function StorePageShell({
  children,
  className = '',
  withOffset = true,
  containerClassName = '',
}) {
  return (
    <section
      className={`velmora-page-shell min-h-screen ${withOffset ? 'velmora-page-offset' : ''} ${className}`}
    >
      <div className={`velmora-container py-6 md:py-10 ${containerClassName}`}>{children}</div>
    </section>
  )
}
