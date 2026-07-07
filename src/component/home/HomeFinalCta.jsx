import React from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_FINAL_CTA } from '../../lib/cmsMappers.js'
import { getFinalCtaOverlayClasses } from '../../lib/cmsOverlayUtils.js'

export default function HomeFinalCta({ section = null }) {
  const data = {
    ...DEFAULT_FINAL_CTA,
    ...(section || {}),
  }

  if (section && section.isActive === false) return null

  const hasImage = Boolean(data.image)

  return (
    <section className="container mt-5 mb-2">
      <div
        className={`relative overflow-hidden rounded-2xl px-6 py-8 md:px-10 md:py-10 text-center ${
          hasImage ? '' : 'bg-[#111827]'
        }`}
      >
        {hasImage ? (
          <>
            <img
              src={data.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 ${getFinalCtaOverlayClasses(data.overlay)}`} />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.2),transparent_50%)]" />
          </>
        )}
        <div className="relative max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white">{data.heading}</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">{data.subheading}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link to={data.buttonLink || '/shop'} className="velmora-btn-accent">
              {data.buttonText || 'Shop Now'}
            </Link>
            {data.secondaryButtonText ? (
              <Link
                to={data.secondaryButtonLink || '/cart'}
                className="velmora-btn-outline-light"
              >
                {data.secondaryButtonText}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
