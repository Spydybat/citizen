'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker in production only. Kept out of dev so it never
 * interferes with hot-module reloading.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Non-fatal: the app still works fully online without the SW.
      })
    }

    window.addEventListener('load', register)
    return () => window.removeEventListener('load', register)
  }, [])

  return null
}
