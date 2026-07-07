import React from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_DUAL_PROMO } from '../../lib/cmsMappers.js'
import { getPromoCardOverlayClasses } from '../../lib/cmsOverlayUtils.js'

export function PromoCard({ card = {}, wide = false }) {
  const isPrimary = card.variant !== 'dark'
  const hasImage = Boolean(card.image)

  return (
    <div
      className={`relative overflow-hidden rounded-2xl min-h-48 ${
        wide ? 'md:min-h-56 p-6 md:p-8' : 'p-6'
      } flex flex-col justify-between shadow-md border border-slate-200/60 dark:border-gray-800`}
    >
      {hasImage ? (
        <>
          <img
            src={card.image}
            alt={card.heading}
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          <div
            className={`absolute inset-0 ${getPromoCardOverlayClasses(card.overlay, isPrimary ? 'primary' : 'dark')}`}
          />
        </>
      ) : isPrimary ? (
        <>
          <div className="absolute inset-0 bg-linear-to-br from-[#111827] via-[#1e3a8a] to-[#2563EB]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.32),transparent_48%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#111827]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.45),transparent_55%)]" />
        </>
      )}

      <div className="relative">
        {card.badge ? (
          <p className="text-[#F59E0B] text-xs font-bold uppercase tracking-widest mb-2">
            {card.badge}
          </p>
        ) : null}
        <h3
          className={`font-bold text-white mb-2 max-w-lg ${
            wide ? 'text-xl md:text-2xl' : 'text-lg'
          }`}
        >
          {card.heading}
        </h3>
        {card.subheading ? (
          <p className={`text-sm max-w-xl ${isPrimary ? 'text-white/90' : 'text-slate-300'}`}>
            {card.subheading}
          </p>
        ) : null}
      </div>

      <Link
        to={card.buttonLink || '/shop'}
        className={`relative mt-5 inline-flex w-fit rounded-lg font-semibold text-sm px-5 py-2.5 transition-colors ${
          isPrimary
            ? 'bg-[#F59E0B] hover:bg-[#d97706] text-white shadow-sm'
            : 'border border-white/30 text-white hover:bg-white/10'
        }`}
      >
        {card.buttonText || 'Shop Now'}
      </Link>
    </div>
  )
}

export default function PromoBanners({ section = null }) {
  const left = section?.left || DEFAULT_DUAL_PROMO.left
  const right = section?.right || DEFAULT_DUAL_PROMO.right

  if (section && section.isActive === false) return null

  return (
    <section className="container mt-5 velmora-home-discovery">
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <PromoCard card={left} wide />
        </div>
        <PromoCard card={right} />
      </div>
    </section>
  )
}
