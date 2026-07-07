import React from 'react'
import { Link } from 'react-router-dom'

import velmoraMark from '../../assets/images/velmora-mark.svg'
import { DEFAULT_STORE_NAME, STORE_TAGLINE } from '../../lib/productMappers.js'
import Switcher from '../../component/switcher'

export default function Page404() {
  return (
    <>
      <section className="velmora-special-page">
        <div className="w-full max-w-lg text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src={velmoraMark} alt="" className="size-10 rounded-lg" aria-hidden="true" />
            <span className="font-semibold text-lg tracking-[0.16em] uppercase text-white">
              {DEFAULT_STORE_NAME}
            </span>
          </Link>

          <p className="text-[#F59E0B] text-sm font-semibold mt-8 uppercase tracking-widest">404</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Page not found</h1>
          <p className="text-slate-300 mt-4 leading-relaxed">
            The page you are looking for may have moved or is no longer available. Head back to the
            shop to continue browsing.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="velmora-btn-accent">
              Go to Shop
            </Link>
            <Link to="/" className="velmora-btn-outline-light">
              Back to Home
            </Link>
          </div>

          <p className="mt-10 text-xs text-slate-400">{STORE_TAGLINE}</p>
        </div>
      </section>
      <Switcher />
    </>
  )
}
