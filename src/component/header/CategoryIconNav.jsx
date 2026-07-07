import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiActivity,
  FiBook,
  FiBox,
  FiCpu,
  FiGift,
  FiHeart,
  FiHome,
  FiMonitor,
  FiShoppingBag,
  FiSmartphone,
  FiSmile,
  FiTag,
} from 'react-icons/fi'
import { MdOutlineCheckroom, MdOutlineDirectionsRun } from 'react-icons/md'

const STATIC_LEADING = {
  id: 'for-you',
  slug: 'for-you',
  displayName: 'For You',
  link: '/',
  isStatic: true,
}

const STATIC_TAIL = [
  {
    id: 'deals',
    slug: 'deals',
    displayName: 'Deals',
    link: '/shop',
    isStatic: true,
  },
  {
    id: 'new-arrivals',
    slug: 'new-arrivals',
    displayName: 'New Arrivals',
    link: '/shop?sortBy=createdAt&sortOrder=desc',
    isStatic: true,
  },
]

const CATEGORY_ICON_COMPONENTS = {
  'for-you': FiHome,
  fashion: MdOutlineCheckroom,
  mobiles: FiSmartphone,
  beauty: FiHeart,
  electronics: FiMonitor,
  home: FiHome,
  appliances: FiCpu,
  'home-appliances': FiCpu,
  'toys-baby': FiSmile,
  toys: FiGift,
  baby: FiGift,
  'food-health': FiHeart,
  food: FiHeart,
  health: FiHeart,
  sports: MdOutlineDirectionsRun,
  'books-stationery': FiBook,
  books: FiBook,
  furniture: FiBox,
  fitness: FiActivity,
  footwear: FiShoppingBag,
  deals: FiTag,
  'new-arrivals': FiTag,
}

const getNavIcon = (slug = '') =>
  CATEGORY_ICON_COMPONENTS[String(slug).toLowerCase()] || FiShoppingBag

function CategoryNavItem({ item, isActive, compact }) {
  const label = item.displayName || item.name || 'Category'
  const iconClassName = 'velmora-cat-icon-nav__icon'

  return (
    <Link
      to={item.link}
      className={`velmora-cat-icon-nav__item ${isActive ? 'is-active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={`velmora-cat-icon-nav__icon-wrap ${compact ? 'is-hidden' : ''}`}>
        {item.hasImage ? (
          <img
            src={item.image}
            alt=""
            className="velmora-cat-icon-nav__image"
            loading="lazy"
          />
        ) : (
          React.createElement(getNavIcon(item.slug), {
            className: iconClassName,
            'aria-hidden': true,
          })
        )}
      </span>
      <span className="velmora-cat-icon-nav__label">{label}</span>
    </Link>
  )
}

export default function CategoryIconNav({ categories = [], compact = false }) {
  const location = useLocation()

  const items = useMemo(
    () => [STATIC_LEADING, ...categories, ...STATIC_TAIL],
    [categories],
  )

  const activeCategoryId = useMemo(() => {
    if (location.pathname !== '/shop' && location.pathname !== '/products') return ''
    const params = new URLSearchParams(location.search)
    return params.get('category') || ''
  }, [location.pathname, location.search])

  const isItemActive = (item) => {
    if (item.id === 'for-you') {
      return location.pathname === '/' && !activeCategoryId
    }

    if (item.id === 'deals') {
      return (
        (location.pathname === '/shop' || location.pathname === '/products') &&
        !activeCategoryId &&
        !location.search.includes('sortBy=')
      )
    }

    if (item.id === 'new-arrivals') {
      return (
        (location.pathname === '/shop' || location.pathname === '/products') &&
        location.search.includes('sortBy=createdAt') &&
        location.search.includes('sortOrder=desc')
      )
    }

    if (item.id && activeCategoryId) {
      return String(item.id) === String(activeCategoryId)
    }

    return false
  }

  if (!items.length) return null

  return (
    <nav
      className={`velmora-cat-icon-nav ${compact ? 'is-compact' : ''}`}
      aria-label="Shop categories"
    >
      <div className="velmora-cat-icon-nav__scroll scrollbar-hide">
        {items.map((item) => (
          <CategoryNavItem
            key={item.id || item.slug}
            item={item}
            isActive={isItemActive(item)}
            compact={compact}
          />
        ))}
      </div>
    </nav>
  )
}
