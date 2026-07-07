/**
 * Local fallback homepage banner configuration.
 * The storefront loads banners from the published CMS Home page first
 * (sections with type banner, hero, or homepage-banner).
 *
 * To replace fallback banners locally:
 * 1. Put your image files in src/assets/images/banners/
 * 2. Update the imports below (banner1, banner2, banner3)
 * 3. Keep recommended image size: 1600×500 or 1600×600 for wide homepage banners
 * 4. Use compressed WebP or JPG — aim for under 300KB per banner when possible
 * 5. Replace imports banner1, banner2, banner3 below
 *
 * Example:
 *   import banner1 from '../assets/images/banners/banner1.webp'
 */

import banner1 from '../assets/images/banners/banner1.svg'
import banner2 from '../assets/images/banners/banner2.svg'
import banner3 from '../assets/images/banners/banner3.svg'

export const homeBanners = [
  {
    id: 'banner-1',
    title: 'Upgrade Your Everyday Shopping',
    subtitle: 'Discover fashion, electronics, footwear and fitness essentials.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    image: banner1,
    overlay: 'medium',
  },
  {
    id: 'banner-2',
    title: 'Deals Across Top Categories',
    subtitle: 'Find smart picks across tech, lifestyle and daily essentials.',
    buttonText: 'Explore Deals',
    buttonLink: '/shop',
    image: banner2,
    overlay: 'medium',
  },
  {
    id: 'banner-3',
    title: 'New Arrivals for Every Lifestyle',
    subtitle: 'Fresh products curated for modern shoppers.',
    buttonText: 'View Categories',
    buttonLink: '/categories',
    image: banner3,
    overlay: 'medium',
  },
]
