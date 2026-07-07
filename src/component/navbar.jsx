import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiHeadphones, FiMenu, FiRefreshCw, FiShield, FiShoppingCart, FiX } from 'react-icons/fi'
import { LuSearch } from 'react-icons/lu'

import velmoraMark from '../assets/images/velmora-mark.svg'
import { getPublicSettings } from '../api/publicSettingsApi.js'
import { useCart } from '../context/useCart.js'
import { useStoreCategories } from '../hooks/useStoreCategories.js'
import { buildCategoryIconNavRoots } from '../lib/categoryHelpers.js'
import { DEFAULT_STORE_NAME, resolveStoreLogoUrl, STORE_TAGLINE } from '../lib/productMappers.js'
import CategoryIconNav from './header/CategoryIconNav.jsx'

const TOPBAR_ITEMS = [
  { icon: FiShield, label: 'Secure checkout' },
  { icon: FiRefreshCw, label: 'Easy returns' },
  { icon: FiHeadphones, label: 'Support available' },
]

const CAT_NAV_COMPACT_SCROLL_Y = 80

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const { categoryTree, rawCategories } = useStoreCategories({
    featuredOnly: false,
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scroll, setScroll] = useState(false)
  const [catNavCompact, setCatNavCompact] = useState(false)
  const scrollModesRef = useRef({ sticky: false, compact: false })
  const [storeSettings, setStoreSettings] = useState(null)
  const [navSearch, setNavSearch] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const nextSticky = scrollY > 8
        const nextCompact = scrollY > CAT_NAV_COMPACT_SCROLL_Y
        const modes = scrollModesRef.current

        if (modes.sticky !== nextSticky) {
          modes.sticky = nextSticky
          setScroll(nextSticky)
        }

        if (modes.compact !== nextCompact) {
          modes.compact = nextCompact
          setCatNavCompact(nextCompact)
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let active = true

    const loadSettings = async () => {
      try {
        const settings = await getPublicSettings()
        if (active) setStoreSettings(settings || null)
      } catch {
        // Keep fallback branding.
      }
    }

    loadSettings()

    return () => {
      active = false
    }
  }, [])

  const closeMobileMenu = () => setMobileOpen(false)

  const categoryIconNavRoots = useMemo(
    () => buildCategoryIconNavRoots(categoryTree, rawCategories),
    [categoryTree, rawCategories],
  )

  const handleNavSearch = (event) => {
    event.preventDefault()
    const query = navSearch.trim()
    closeMobileMenu()

    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`)
      return
    }

    navigate('/shop')
  }

  const storeName = storeSettings?.storeName?.trim() || DEFAULT_STORE_NAME
  const logoUrl = resolveStoreLogoUrl(storeSettings?.logo)

  return (
    <header
      id="topnav"
      className={`velmora-store-header velmora-ecommerce-header fixed inset-x-0 top-0 z-90 bg-white dark:bg-slate-900 transition-shadow ${
        scroll ? 'nav-sticky shadow-md' : 'shadow-sm'
      } ${catNavCompact ? 'is-cat-nav-compact' : ''}`}
    >
      <div className="velmora-header-topbar hidden md:block bg-[#111827] text-white border-b border-white/10">
        <div className="container flex items-center justify-between gap-4 py-2 text-[11px] lg:text-xs">
          <p className="font-medium text-white/95 truncate">{STORE_TAGLINE}</p>
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 list-none m-0 p-0">
            {TOPBAR_ITEMS.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5 text-white/85">
                <Icon className="size-3 text-[#F59E0B] shrink-0" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="velmora-header-main border-b border-slate-200/90 dark:border-gray-800">
        <div className="container flex items-center gap-3 py-3">
          <Link to="/" className="inline-flex items-center gap-2.5 min-w-0 shrink-0" onClick={closeMobileMenu}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt=""
                className="h-10 w-10 lg:h-[2.625rem] lg:w-[2.625rem] object-contain shrink-0"
                aria-hidden="true"
              />
            ) : (
              <img
                src={velmoraMark}
                alt=""
                className="h-10 w-10 lg:h-[2.625rem] lg:w-[2.625rem] rounded-lg shrink-0 shadow-sm"
                aria-hidden="true"
              />
            )}
            <span className="flex flex-col min-w-0 leading-tight">
              <span className="font-bold text-sm lg:text-base tracking-[0.12em] uppercase text-[#111827] dark:text-white truncate">
                {storeName}
              </span>
              <span className="hidden sm:block text-[10px] text-[#64748B] tracking-wide truncate md:hidden lg:block">
                {STORE_TAGLINE}
              </span>
            </span>
          </Link>

          <form
            onSubmit={handleNavSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-auto items-center"
          >
            <div className="flex w-full rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-[#F8FAFC] dark:bg-slate-800 overflow-hidden focus-within:border-primary transition-colors">
              <div className="relative flex-1">
                <LuSearch className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#64748B] size-4" />
                <input
                  type="search"
                  value={navSearch}
                  onChange={(event) => setNavSearch(event.target.value)}
                  placeholder="Search fashion, electronics, footwear, fitness..."
                  className="w-full h-11 ps-10 pe-3 text-sm text-[#111827] dark:text-white bg-transparent outline-none"
                  aria-label="Search products"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2 ms-auto shrink-0">
            <Link
              to="/contact"
              className="hidden xl:inline-flex text-xs font-semibold text-[#64748B] hover:text-primary transition-colors"
            >
              Support
            </Link>

            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 h-11 px-3 lg:px-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-slate-900 hover:border-primary/40 hover:shadow-sm text-[#111827] dark:text-white transition-all"
              aria-label="Cart"
              onClick={closeMobileMenu}
            >
              <FiShoppingCart className="size-5 stroke-[2.5px] text-primary" />
              <span className="hidden lg:inline text-sm font-semibold">Cart</span>
              {itemCount > 0 ? (
                <span className="absolute -top-1.5 -end-1 min-w-5 h-5 px-1 rounded-full bg-[#F59E0B] text-white text-[10px] leading-5 text-center font-bold shadow-sm">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center size-11 rounded-xl border border-slate-200 dark:border-gray-700 text-[#111827] dark:text-white"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
            </button>
          </div>
        </div>

        <form onSubmit={handleNavSearch} className="md:hidden container pb-3">
          <div className="flex rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden bg-[#F8FAFC] dark:bg-slate-800">
            <div className="relative flex-1">
              <LuSearch className="absolute start-3 top-1/2 -translate-y-1/2 text-[#64748B] size-4" />
              <input
                type="search"
                value={navSearch}
                onChange={(event) => setNavSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full h-10 ps-9 pe-3 text-sm bg-transparent outline-none"
                aria-label="Search products"
              />
            </div>
            <button type="submit" className="px-4 bg-primary text-white text-sm font-semibold">
              Go
            </button>
          </div>
        </form>
      </div>

      <div className="velmora-header-categories border-b border-slate-200/90 dark:border-gray-800 bg-white dark:bg-slate-900">
        <CategoryIconNav categories={categoryIconNavRoots} compact={catNavCompact} />
      </div>

      {mobileOpen ? (
        <div className="lg:hidden velmora-header-mobile-menu border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="container py-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="velmora-nav-mobile-pill"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={closeMobileMenu}
                className="velmora-nav-mobile-pill"
              >
                Shop
              </Link>
              <Link
                to="/categories"
                onClick={closeMobileMenu}
                className="velmora-nav-mobile-pill"
              >
                Categories
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="velmora-nav-mobile-pill"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
