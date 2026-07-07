import React from 'react'
import { Link } from 'react-router-dom'

export default function PromoBanner() {
  return (
    <section className="container lg:mt-24 mt-16">
      <div className="rounded-2xl bg-[#111827] overflow-hidden">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
          <div className="p-8 md:p-12">
            <p className="text-[#F59E0B] font-medium mb-2 tracking-wide">New arrivals</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              New Arrivals for Every Lifestyle
            </h3>
            <p className="text-slate-300 mb-6 max-w-md">
              From daily essentials to premium picks, discover products curated for the way you shop.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn bg-primary hover:bg-primary-dark text-white rounded-md">
                Explore the Shop
              </Link>
              <Link
                to="/categories"
                className="btn bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-md"
              >
                Explore Categories
              </Link>
            </div>
          </div>
          <div className="h-full min-h-48 bg-linear-to-br from-primary/30 to-[#7C3AED]/20 md:min-h-72" />
        </div>
      </div>
    </section>
  )
}
