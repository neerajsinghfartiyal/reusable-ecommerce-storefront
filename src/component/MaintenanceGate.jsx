import { useEffect, useState } from 'react'
import { getPublicSettings } from '../api/publicSettingsApi.js'
import MaintenanceScreen from './MaintenanceScreen.jsx'

export default function MaintenanceGate({ children }) {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    let active = true

    const loadSettings = async () => {
      try {
        const data = await getPublicSettings()
        if (active) setSettings(data || null)
      } catch {
        if (active) setSettings(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadSettings()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div className="velmora-special-page velmora-maintenance-page">
        <div className="text-center">
          <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <p className="text-sm text-slate-300">Loading store...</p>
        </div>
      </div>
    )
  }

  if (settings?.maintenanceMode === true) {
    return <MaintenanceScreen settings={settings} />
  }

  return children
}
