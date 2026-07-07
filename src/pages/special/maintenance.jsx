import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import velmoraMark from '../../assets/images/velmora-mark.svg'
import { DEFAULT_STORE_NAME, STORE_TAGLINE } from '../../lib/productMappers.js'
import Switcher from '../../component/switcher'

export default function Maintenance() {
  const [minutes, setMinutes] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  useEffect(() => {
    let seconds = 3599
    const intervalId = setInterval(() => {
      const nextMinutes = Math.floor((seconds - 1) / 60)
      const nextSeconds = (seconds - 1) % 60

      setMinutes(nextMinutes)
      setRemainingSeconds(nextSeconds)

      if (seconds <= 1) {
        clearInterval(intervalId)
      } else {
        seconds -= 1
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <section className="velmora-special-page">
        <div className="w-full max-w-xl text-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2.5">
            <img src={velmoraMark} alt="" className="size-12 rounded-lg" aria-hidden="true" />
            <span className="font-semibold text-xl tracking-[0.16em] uppercase text-white">
              {DEFAULT_STORE_NAME}
            </span>
          </Link>

          <h1 className="text-white mb-4 mt-8 md:text-4xl text-3xl font-bold">
            We&apos;ll be back soon
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {STORE_TAGLINE} Our store is undergoing maintenance and will return shortly.
          </p>

          <p className="mt-8 text-5xl font-bold text-white tabular-nums">
            {minutes}:{String(remainingSeconds).padStart(2, '0')}
          </p>
          <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">Estimated window</p>

          <div className="mt-8">
            <Link to="/shop" className="velmora-btn-accent">
              Browse when we&apos;re back
            </Link>
          </div>
        </div>
      </section>
      <Switcher />
    </>
  )
}
