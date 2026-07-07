import React, { useEffect, useState } from 'react'

import { getHomePageContent } from '../../api/cmsApi.js'
import { homeBanners as localHomeBanners } from '../../data/homeBanners.js'
import { pickCmsBannerSections } from '../../lib/cmsMappers.js'
import HomeBannerSection from './HomeBannerSection.jsx'

export default function HomeBannerLoader({ onHomePageMeta }) {
  const [banners, setBanners] = useState(localHomeBanners)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadHomeBanners = async () => {
      try {
        const page = await getHomePageContent()
        if (!active) return

        onHomePageMeta?.(page)

        const cmsBanners = pickCmsBannerSections(page?.sections, 4)
        if (cmsBanners.length > 0) {
          setBanners(cmsBanners)
        } else {
          setBanners(localHomeBanners)
        }
      } catch {
        if (active) {
          setBanners(localHomeBanners)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadHomeBanners()

    return () => {
      active = false
    }
  }, [onHomePageMeta])

  if (loading) {
    return (
      <section
        className="relative velmora-main-offset bg-[#F8FAFC] dark:bg-transparent"
        aria-label="Featured promotions"
      >
        <div className="container md:px-4 px-2 py-4 md:py-6">
          <div className="rounded-2xl border border-slate-200/80 dark:border-gray-800 bg-slate-100 dark:bg-slate-800 min-h-56 sm:min-h-64 md:min-h-72 lg:min-h-[22rem] animate-pulse" />
        </div>
      </section>
    )
  }

  return <HomeBannerSection banners={banners} />
}
