import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/** Served at /manifest.webmanifest — drives PWA installability. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    orientation: 'portrait-primary',
    categories: ['government', 'utilities', 'social'],
    icons: [
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      // TODO: add raster icons for full installability on all platforms:
      //   /icons/icon-192.png (192x192) and /icons/icon-512.png (512x512, maskable).
    ],
  }
}
