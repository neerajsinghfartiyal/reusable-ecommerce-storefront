import React, { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import fallbackProductImage from '../../assets/images/product-placeholder.svg'

export default function ProductGallery({ images = [], productName = 'Product' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setOpen] = useState(false)

  const galleryImages = useMemo(() => {
    const unique = []
    const seen = new Set()
    ;(Array.isArray(images) ? images : []).forEach((src) => {
      if (!src || seen.has(src)) return
      seen.add(src)
      unique.push(src)
    })
    return unique.length > 0 ? unique : [fallbackProductImage]
  }, [images])

  const slides = galleryImages.map((src) => ({ src }))
  const mainImage = galleryImages[activeIndex] || galleryImages[0]
  const hasMultiple = galleryImages.length > 1

  const openLightbox = (index = activeIndex) => {
    setActiveIndex(index)
    setOpen(true)
  }

  return (
    <div className="velmora-pdp-gallery-shell w-full h-full">
      <div className="flex flex-col lg:flex-row gap-2.5 h-full">
        {hasMultiple ? (
          <div className="hidden lg:flex flex-col gap-2 shrink-0 velmora-pdp-thumb-column">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-thumb-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`velmora-pdp-thumb size-16 ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`View image ${index + 1}`}
                aria-pressed={index === activeIndex}
              >
                <img src={image} alt={`${productName} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={() => openLightbox(activeIndex)}
            className="velmora-pdp-gallery-main velmora-pdp-gallery-commerce w-full text-start"
            aria-label={`View larger image of ${productName}`}
          >
            <img src={mainImage} alt={productName} />
            {hasMultiple ? (
              <span className="velmora-pdp-gallery-count">
                {activeIndex + 1}/{galleryImages.length}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {hasMultiple ? (
        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1 lg:hidden velmora-pdp-thumb-rail">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-mobile-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`velmora-pdp-thumb shrink-0 size-14 ${index === activeIndex ? 'is-active' : ''}`}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img src={image} alt={`${productName} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      ) : null}

      {slides.length > 0 ? (
        <Lightbox
          open={isOpen}
          close={() => setOpen(false)}
          slides={slides}
          index={activeIndex}
          on={{ view: ({ index }) => setActiveIndex(index) }}
        />
      ) : null}
    </div>
  )
}
