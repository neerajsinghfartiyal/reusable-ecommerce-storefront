import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../api/catalogApi.js'
import { mapCategoriesToCards } from '../lib/productMappers.js'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadCategories = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getCategories()
        if (!active) return
        setCategories(mapCategoriesToCards(data))
      } catch (err) {
        if (!active) return
        setCategories([])
        setError(err?.message || 'Could not load categories.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCategories()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-8 md:gap-7.5 gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-pulse"
          >
            <div className="h-32 bg-slate-200 dark:bg-slate-800" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
        {error}
      </div>
    )
  }

  if (!categories.length) {
    return (
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        No categories are available yet.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-8 md:gap-7.5 gap-3">
      {categories.map((item) => (
        <div
          className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
          key={item.id || item.slug}
        >
          <div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-3xl font-semibold text-primary">
              {String(item.name || 'C').charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="p-4">
            <Link to={item.link} className="text-xl font-medium hover:text-primary">
              {item.name}
            </Link>
            <p className="text-slate-400 text-sm mt-1">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
