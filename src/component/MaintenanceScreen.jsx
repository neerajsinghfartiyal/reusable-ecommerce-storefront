import velmoraMark from '../assets/images/velmora-mark.svg'
import { DEFAULT_STORE_NAME, resolveStoreLogoUrl } from '../lib/productMappers.js'
import Switcher from './switcher'

const DEFAULT_MAINTENANCE_TITLE = "We'll be back soon"
const DEFAULT_MAINTENANCE_MESSAGE =
  'Our store is temporarily unavailable while we make improvements. Please check back shortly.'

export default function MaintenanceScreen({ settings = null }) {
  const storeName = settings?.storeName?.trim() || DEFAULT_STORE_NAME
  const logoUrl = resolveStoreLogoUrl(settings?.logo)
  const title = settings?.maintenanceTitle?.trim() || DEFAULT_MAINTENANCE_TITLE
  const message = settings?.maintenanceMessage?.trim() || DEFAULT_MAINTENANCE_MESSAGE
  const storeEmail = settings?.storeEmail?.trim() || ''
  const storePhone = settings?.storePhone?.trim() || ''

  return (
    <>
      <section className="velmora-special-page velmora-maintenance-page">
        <div className="w-full max-w-xl text-center">
          <div className="inline-flex items-center justify-center gap-2.5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={storeName}
                className="h-12 w-auto max-w-[180px] object-contain rounded-lg"
              />
            ) : (
              <img src={velmoraMark} alt="" className="size-12 rounded-lg" aria-hidden="true" />
            )}
            <span className="font-semibold text-xl tracking-[0.16em] uppercase text-white">
              {storeName}
            </span>
          </div>

          <h1 className="text-white mb-4 mt-8 md:text-4xl text-3xl font-bold">{title}</h1>
          <p className="text-slate-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            {message}
          </p>

          {(storeEmail || storePhone) && (
            <div className="mt-8 space-y-2 text-sm text-slate-300">
              {storeEmail ? (
                <p>
                  <span className="text-slate-400">Email:</span>{' '}
                  <a href={`mailto:${storeEmail}`} className="text-white hover:text-blue-200">
                    {storeEmail}
                  </a>
                </p>
              ) : null}
              {storePhone ? (
                <p>
                  <span className="text-slate-400">Phone:</span>{' '}
                  <a href={`tel:${storePhone}`} className="text-white hover:text-blue-200">
                    {storePhone}
                  </a>
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>
      <Switcher />
    </>
  )
}
