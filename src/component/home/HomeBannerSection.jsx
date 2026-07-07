import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { homeBanners } from '../../data/homeBanners.js'
import {
  getHeroBannerGlowClasses,
  getHeroBannerOverlayClasses,
  getHeroThumbOverlayClasses,
} from '../../lib/cmsOverlayUtils.js'

const AUTO_ADVANCE_MS = 7000

function BannerSlide({ banner, isActive, imageFailed, onImageError }) {
  const showImage = banner.image && !imageFailed
  const overlayClass = banner.accent
    ? `bg-linear-to-r ${banner.accent}`
    : getHeroBannerOverlayClasses(banner.overlay)
  const glowClass = getHeroBannerGlowClasses(banner.overlay)

  return (
    <article
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
      }`}
      aria-hidden={!isActive}
    >
      {showImage ? (
        <img
          src={banner.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={onImageError}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-[#111827] via-[#1e3a8a] to-[#2563EB]" />
      )}

      <div className={`absolute inset-0 ${overlayClass}`} />
      {showImage ? <div className={`absolute inset-0 ${glowClass}`} /> : null}

      <div className="relative h-full flex items-center px-6 sm:px-10 md:px-14 py-10 md:py-14">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-white leading-tight">
            {banner.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
            {banner.subtitle}
          </p>
          <Link
            to={banner.buttonLink || '/shop'}
            className="inline-flex mt-6 rounded-lg bg-[#F59E0B] hover:bg-[#d97706] text-white font-semibold text-sm px-6 py-3 shadow-lg transition-colors"
          >
            {banner.buttonText || 'Shop Now'}
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function HomeBannerSection({ banners = homeBanners }) {
  const slides = banners.length > 0 ? banners : homeBanners
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [failedImages, setFailedImages] = useState({})

  const goTo = useCallback(
    (index) => {
      if (!slides.length) return
      setActiveIndex((index + slides.length) % slides.length)
    },
    [slides.length],
  )

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(timer)
  }, [isPaused, slides.length])

  const handleImageError = (bannerId) => {
    setFailedImages((current) => ({ ...current, [bannerId]: true }))
  }

  if (!slides.length) return null

  return (
    <section
      className="relative velmora-main-offset bg-[#F8FAFC] dark:bg-transparent"
      aria-label="Featured promotions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container md:px-4 px-2 py-4 md:py-6">
        <div className="grid lg:grid-cols-12 gap-3 md:gap-4">
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-gray-800 shadow-lg min-h-56 sm:min-h-64 md:min-h-72 lg:min-h-[22rem]">
              {slides.map((banner, index) => (
                <BannerSlide
                  key={banner.id}
                  banner={banner}
                  isActive={index === activeIndex}
                  imageFailed={Boolean(failedImages[banner.id])}
                  onImageError={() => handleImageError(banner.id)}
                />
              ))}

              {slides.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-2 inline-flex items-center justify-center size-10 rounded-full bg-white/90 hover:bg-white text-[#111827] shadow-md transition-colors"
                    aria-label="Previous banner"
                  >
                    <FiChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-2 inline-flex items-center justify-center size-10 rounded-full bg-white/90 hover:bg-white text-[#111827] shadow-md transition-colors"
                    aria-label="Next banner"
                  >
                    <FiChevronRight className="size-5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-2 flex gap-2">
                    {slides.map((banner, index) => (
                      <button
                        key={banner.id}
                        type="button"
                        onClick={() => goTo(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === activeIndex
                            ? 'w-7 bg-[#F59E0B]'
                            : 'w-2 bg-white/70 hover:bg-white'
                        }`}
                        aria-label={`Show banner ${index + 1}`}
                        aria-current={index === activeIndex ? 'true' : undefined}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-4 xl:col-span-3 grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {slides.map((banner, index) => {
              const isActive = index === activeIndex
              const showThumbImage = banner.image && !failedImages[banner.id]

              return (
                <button
                  key={`thumb-${banner.id}`}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`relative overflow-hidden rounded-xl border text-start min-h-28 lg:min-h-[calc(50%-0.375rem)] transition-all ${
                    isActive
                      ? 'border-primary ring-2 ring-primary/25 shadow-md'
                      : 'border-slate-200/80 dark:border-gray-800 hover:border-primary/40'
                  }`}
                  aria-label={`View ${banner.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {showThumbImage ? (
                    <img
                      src={banner.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => handleImageError(banner.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-[#111827] to-[#2563EB]" />
                  )}
                  <div className={`absolute inset-0 ${getHeroThumbOverlayClasses(banner.overlay)}`} />
                  <div className="relative p-4 flex flex-col justify-end h-full min-h-28">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-1">
                      {index + 1} / {slides.length}
                    </p>
                    <p className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {banner.title}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
