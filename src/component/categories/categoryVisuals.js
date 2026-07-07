import React from 'react'
import {
  FiActivity,
  FiGrid,
  FiHeadphones,
  FiShoppingBag,
  FiSmartphone,
  FiTag,
  FiUser,
} from 'react-icons/fi'

export const CATEGORY_ICONS = {
  fashion: FiShoppingBag,
  electronics: FiSmartphone,
  footwear: FiGrid,
  fitness: FiActivity,
  accessories: FiTag,
  men: FiUser,
  women: FiUser,
  mobiles: FiSmartphone,
  audio: FiHeadphones,
  yoga: FiActivity,
  'fitness-accessories': FiTag,
}

export const CATEGORY_ACCENTS = {
  fashion: 'from-rose-500 via-rose-600/90 to-[#831843]',
  electronics: 'from-sky-500 via-blue-600/90 to-[#1e3a8a]',
  footwear: 'from-amber-400 via-orange-500/90 to-[#78350f]',
  fitness: 'from-emerald-400 via-emerald-600/90 to-[#14532d]',
  accessories: 'from-violet-400 via-violet-600/90 to-[#312e81]',
  men: 'from-slate-500 via-slate-600/90 to-[#111827]',
  women: 'from-pink-400 via-pink-600/90 to-[#831843]',
  mobiles: 'from-cyan-400 via-sky-600/90 to-[#0c4a6e]',
  audio: 'from-indigo-400 via-indigo-600/90 to-[#312e81]',
  yoga: 'from-teal-400 via-teal-600/90 to-[#134e4a]',
}

export const getCategoryIcon = (slug = '') =>
  CATEGORY_ICONS[String(slug).toLowerCase()] || FiShoppingBag

export function CategoryIcon({ slug = '', className = '' }) {
  const IconComponent = getCategoryIcon(slug)
  return React.createElement(IconComponent, { className })
}

export const getCategoryAccent = (slug = '') =>
  CATEGORY_ACCENTS[String(slug).toLowerCase()] ||
  'from-[#2563EB] via-blue-500/90 to-[#111827]'
