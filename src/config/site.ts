/** Single source of truth for app-wide identity / metadata. */
export const siteConfig = {
  name: 'Citizen — Civic Reporting & Public Safety',
  shortName: 'Citizen',
  description:
    'Report civic issues and public-safety incidents, and track them from submission to resolution.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const

export type SiteConfig = typeof siteConfig
