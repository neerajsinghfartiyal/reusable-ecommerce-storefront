import React from 'react'

export default function PageHeader({ title, subtitle, actions, className = '' }) {
  return (
    <header className={`velmora-page-header ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="velmora-page-title">{title}</h1>
          {subtitle ? <p className="velmora-page-subtitle">{subtitle}</p> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </header>
  )
}
