import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiChevronDown,
  FiChevronRight,
  FiGrid,
  FiShoppingBag,
  FiStar,
  FiTag,
} from 'react-icons/fi'
import {
  formatMegaMenuChildCountLabel,
  getMegaMenuDepartmentChildCount,
  getMegaMenuInitialRootId,
  getMegaMenuRootAccent,
  MEGA_MENU_FEATURED_CARDS,
  MEGA_MENU_FOOTER_LINKS,
} from '../../lib/categoryHelpers.js'

const MEGA_MENU_CLOSE_DELAY_MS = 150

const MOBILE_QUICK_LINKS = [
  { label: 'Shop all', href: '/shop' },
  { label: 'Deals', href: '/shop' },
  { label: 'New arrivals', href: '/shop?sortBy=createdAt&sortOrder=desc' },
]

const SHORTCUT_ICONS = {
  sparkles: FiStar,
  tag: FiTag,
  bag: FiShoppingBag,
}

function MegaMenuChildRow({ child }) {
  const grandchildren = child.children || []

  return (
    <li className="velmora-mega__child-item">
      <Link to={child.link} className="velmora-mega__child-link">
        {child.displayName || child.name}
      </Link>
      {grandchildren.length ? (
        <p className="velmora-mega__grandchild-line">
          {grandchildren.map((grandchild, index) => (
            <React.Fragment key={grandchild.id || grandchild.slug}>
              {index > 0 ? <span className="velmora-mega__grandchild-sep"> · </span> : null}
              <Link to={grandchild.link} className="velmora-mega__grandchild-link">
                {grandchild.displayName || grandchild.name}
              </Link>
            </React.Fragment>
          ))}
        </p>
      ) : null}
    </li>
  )
}

function MegaMenuDetails({ category }) {
  if (!category) {
    return (
      <div className="velmora-mega__details-empty">
        <p>Select a department to browse collections.</p>
      </div>
    )
  }

  const label = category.displayName || category.name || 'Department'
  const children = category.children || []

  return (
    <div className="velmora-mega__details">
      <div className="velmora-mega__details-head">
        <div className="min-w-0">
          <p className="velmora-mega__details-kicker">Popular in {label}</p>
          <p className="velmora-mega__details-desc">Browse collections under {label}</p>
        </div>
        <Link to={category.link || '/shop'} className="velmora-mega__details-cta">
          Shop {label}
        </Link>
      </div>

      {children.length ? (
        <ul className="velmora-mega__child-list">
          {children.map((child) => (
            <MegaMenuChildRow key={child.id || child.slug} child={child} />
          ))}
        </ul>
      ) : (
        <div className="velmora-mega__browse-card">
          <p className="velmora-mega__browse-title">Browse all products in {label}</p>
          <p className="velmora-mega__browse-desc">
            Explore the full {label.toLowerCase()} catalog on VELMORA.
          </p>
          <Link to={category.link || '/shop'} className="velmora-mega__browse-btn">
            Browse department
          </Link>
        </div>
      )}
    </div>
  )
}

function MegaMenuShortcuts() {
  return (
    <aside className="velmora-mega__shortcuts">
      <p className="velmora-mega__section-label">Marketplace shortcuts</p>
      <div className="velmora-mega__shortcut-list">
        {MEGA_MENU_FEATURED_CARDS.map((card) => {
          const Icon = SHORTCUT_ICONS[card.icon] || FiShoppingBag
          return (
            <Link
              key={card.id}
              to={card.href}
              className={`velmora-mega__shortcut velmora-mega__shortcut--${card.tone}`}
            >
              <span className="velmora-mega__shortcut-icon" aria-hidden="true">
                <Icon className="size-4" />
              </span>
              <span className="velmora-mega__shortcut-copy">
                <span className="velmora-mega__shortcut-title">{card.label}</span>
                <span className="velmora-mega__shortcut-sub">{card.subtitle}</span>
              </span>
              <span className="velmora-mega__shortcut-action">{card.cta}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export function DesktopAllCategoriesMegaMenu({
  categories = [],
  isActive = false,
  onOpenChange,
}) {
  const [open, setOpen] = useState(false)
  const [hoveredRootId, setHoveredRootId] = useState('')
  const closeTimerRef = useRef(null)
  const wrapRef = useRef(null)

  const resolvedRootId = useMemo(() => {
    if (hoveredRootId && categories.some((item) => item.id === hoveredRootId)) {
      return hoveredRootId
    }
    return getMegaMenuInitialRootId(categories)
  }, [categories, hoveredRootId])

  const activeRoot = useMemo(
    () => categories.find((item) => item.id === resolvedRootId) || categories[0] || null,
    [categories, resolvedRootId],
  )

  const setMenuOpen = useCallback(
    (nextOpen) => {
      setOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [onOpenChange],
  )

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const handleOpen = useCallback(() => {
    clearCloseTimer()
    setMenuOpen(true)
  }, [clearCloseTimer, setMenuOpen])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => setMenuOpen(false), MEGA_MENU_CLOSE_DELAY_MS)
  }, [clearCloseTimer, setMenuOpen])

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer])

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (wrapRef.current?.contains(event.target)) return
      clearCloseTimer()
      setMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open, clearCloseTimer, setMenuOpen])

  if (!categories.length) {
    return (
      <Link
        to="/categories"
        className={`velmora-nav-category-link ${isActive ? 'is-active' : ''}`}
      >
        All Categories
      </Link>
    )
  }

  return (
    <div
      ref={wrapRef}
      className={`velmora-nav-mega-wrap ${open ? 'is-open' : ''}`}
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={`velmora-nav-category-link velmora-nav-mega-trigger ${isActive ? 'is-active' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={handleOpen}
      >
        All Categories
        <FiChevronDown className="size-3.5 opacity-70" />
      </button>

      <div className="velmora-nav-mega-bridge" aria-hidden="true" />

      <div
        className={`velmora-nav-mega-panel ${open ? 'is-open' : ''}`}
        onMouseEnter={handleOpen}
        onMouseLeave={scheduleClose}
      >
        <div className="velmora-mega">
          <header className="velmora-mega__header">
            <div className="velmora-mega__header-copy">
              <h2 className="velmora-mega__header-title">Shop all categories</h2>
              <p className="velmora-mega__header-sub">
                Browse departments, collections, and popular product groups.
              </p>
            </div>
            <Link to="/categories" className="velmora-mega__header-link">
              View all categories
            </Link>
          </header>

          <div className="velmora-mega__body">
            <aside className="velmora-mega__rail">
              <p className="velmora-mega__section-label">Departments</p>
              <ul className="velmora-mega__dept-list">
                {categories.map((category) => {
                  const accent = getMegaMenuRootAccent(category.slug)
                  const childCount = getMegaMenuDepartmentChildCount(category)
                  const isActiveDept = activeRoot?.id === category.id

                  return (
                    <li key={category.id || category.slug}>
                      <button
                        type="button"
                        className={`velmora-mega__dept-row ${isActiveDept ? 'is-active' : ''}`}
                        onMouseEnter={() => setHoveredRootId(category.id)}
                        onFocus={() => setHoveredRootId(category.id)}
                      >
                        <span
                          className={`velmora-mega__dept-icon velmora-mega__dept-icon--${accent}`}
                        >
                          <FiGrid className="size-3.5" />
                        </span>
                        <span className="velmora-mega__dept-copy">
                          <span className="velmora-mega__dept-name">
                            {category.displayName || category.name}
                          </span>
                          <span className="velmora-mega__dept-meta">
                            {formatMegaMenuChildCountLabel(childCount)}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </aside>

            <section className="velmora-mega__main" aria-live="polite">
              <MegaMenuDetails category={activeRoot} />
            </section>

            <MegaMenuShortcuts />
          </div>

          <footer className="velmora-mega__footer">
            {MEGA_MENU_FOOTER_LINKS.map((item) => (
              <Link key={item.label} to={item.href} className="velmora-mega__footer-link">
                {item.label}
              </Link>
            ))}
          </footer>
        </div>
      </div>
    </div>
  )
}

function MobileAccordionNode({ category, depth = 0, onNavigate }) {
  const [expanded, setExpanded] = useState(depth === 0)
  const children = category.children || []
  const hasChildren = children.length > 0

  return (
    <li className="velmora-nav-mobile-acc-item">
      <div className="flex items-center gap-1" style={{ paddingLeft: `${depth * 12}px` }}>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="velmora-nav-mobile-acc-toggle"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <FiChevronDown className="size-4" /> : <FiChevronRight className="size-4" />}
          </button>
        ) : (
          <span className="size-7 shrink-0" />
        )}
        <Link
          to={category.link}
          onClick={onNavigate}
          className={`velmora-nav-mobile-acc-link flex-1 ${depth === 0 ? 'is-root' : ''}`}
        >
          {category.displayName || category.name}
        </Link>
      </div>
      {hasChildren && expanded ? (
        <ul className="mt-1 space-y-0.5">
          {children.map((child) => (
            <MobileAccordionNode
              key={child.id || child.slug}
              category={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function MobileAllCategoriesAccordion({ categories = [], onNavigate }) {
  const [open, setOpen] = useState(false)

  if (!categories.length) {
    return (
      <Link to="/categories" onClick={onNavigate} className="velmora-nav-mobile-pill">
        All Categories
      </Link>
    )
  }

  return (
    <div className="velmora-nav-mobile-accordion">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="velmora-nav-mobile-pill w-full justify-between"
        aria-expanded={open}
      >
        <span>All Categories</span>
        <FiChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <>
          <ul className="velmora-nav-mobile-acc-list mt-2 max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <MobileAccordionNode
                key={category.id || category.slug}
                category={category}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
          <div className="velmora-nav-mobile-quick-links">
            {MOBILE_QUICK_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={onNavigate}
                className="velmora-nav-mobile-quick-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
