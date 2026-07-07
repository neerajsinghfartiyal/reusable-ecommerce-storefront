import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import velmoraMark from '../../assets/images/velmora-mark.svg'
import { DEFAULT_STORE_NAME, STORE_TAGLINE } from '../../lib/productMappers.js'
import Switcher from '../../component/switcher'

export default function Comingsoon() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const deadline = 'December, 31, 2027'

  useEffect(() => {
    const getTime = () => {
      const time = Date.parse(deadline) - Date.now()
      setDays(Math.max(0, Math.floor(time / (1000 * 60 * 60 * 24))))
      setHours(Math.max(0, Math.floor((time / (1000 * 60 * 60)) % 24)))
      setMinutes(Math.max(0, Math.floor((time / 1000 / 60) % 60)))
      setSeconds(Math.max(0, Math.floor((time / 1000) % 60)))
    }

    getTime()
    const interval = setInterval(getTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="velmora-special-page">
        <div className="w-full max-w-xl text-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2.5">
            <img src={velmoraMark} alt="" className="size-10 rounded-lg" aria-hidden="true" />
            <span className="font-semibold text-lg tracking-[0.16em] uppercase text-white">
              {DEFAULT_STORE_NAME}
            </span>
          </Link>

          <h1 className="text-white mt-8 mb-4 md:text-4xl text-3xl font-bold">Coming soon</h1>
          <p className="text-slate-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {STORE_TAGLINE} A new shopping experience is on the way.
          </p>

          <ul className="grid grid-cols-4 gap-3 mt-10 max-w-md mx-auto list-none p-0 m-0">
            {[
              { value: days, label: 'Days' },
              { value: hours, label: 'Hours' },
              { value: minutes, label: 'Mins' },
              { value: seconds, label: 'Secs' },
            ].map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-white/15 bg-white/5 px-2 py-3"
              >
                <span className="block text-2xl font-bold text-white tabular-nums">{item.value}</span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-slate-400">
            © {new Date().getFullYear()} {DEFAULT_STORE_NAME}. All rights reserved.
          </p>
        </div>
      </section>
      <Switcher />
    </>
  )
}
