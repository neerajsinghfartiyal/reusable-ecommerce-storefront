import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock, FiPackage, FiRefreshCw } from 'react-icons/fi'
import { LuSearch } from 'react-icons/lu'

import { STORE_TAGLINE } from '../../lib/productMappers.js'

const TRUST_CHIPS = [
  { icon: FiLock, label: 'Secure checkout' },
  { icon: FiRefreshCw, label: 'Easy returns' },
  { icon: FiPackage, label: 'Curated products' },
]

export default function HomeHero() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    const query = searchQuery.trim()

    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`)
      return
    }

    navigate('/shop')
  }

  return (
    <section className="relative mt-20">
      <div className="container md:px-4 px-2">
        <div className="relative overflow-hidden rounded-2xl shadow-lg border border-slate-200/60 dark:border-gray-800">
          <div className="absolute inset-0 bg-linear-to-br from-[#111827] via-[#1e3a8a] to-[#2563EB]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(245,158,11,0.35),transparent_42%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(255,255,255,0.12),transparent_40%)]" />
          <div className="absolute inset-0 bg-white/10" />

          <div className="relative px-5 py-10 md:px-10 md:py-14">
            <div className="max-w-3xl">
              <p className="text-[#F59E0B] font-semibold mb-2 tracking-wide text-xs md:text-sm uppercase">
                {STORE_TAGLINE}
              </p>
              <h1 className="font-bold text-white leading-tight text-3xl md:text-4xl lg:text-[2.75rem] mb-3">
                Shop Fashion, Tech, Fitness and Everyday Essentials
              </h1>
              <p className="text-white/90 text-sm md:text-base max-w-2xl mb-6">
                Discover curated products, smart deals and everyday essentials across top categories.
              </p>

              <form onSubmit={handleSearch} className="max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-2 rounded-xl bg-white p-2 shadow-xl">
                  <div className="relative flex-1">
                    <LuSearch className="absolute start-3 top-1/2 -translate-y-1/2 text-[#64748B] size-5" />
                    <input
                      id="home-product-search"
                      name="search"
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="w-full h-12 ps-10 pe-3 rounded-lg border border-slate-200 bg-[#F8FAFC] text-[#111827] outline-none focus:border-primary"
                      placeholder="Search fashion, electronics, footwear, fitness..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-primary hover:bg-white/90 font-semibold text-sm px-5 py-2.5 shadow-sm"
                >
                  Shop Now
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/35 font-medium text-sm px-5 py-2.5"
                >
                  Explore Categories
                </Link>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/12 border border-white/20 px-3 py-1.5 text-xs text-white/95 backdrop-blur-sm"
                  >
                    <Icon className="size-3.5 text-[#F59E0B]" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
