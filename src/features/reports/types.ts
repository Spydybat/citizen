/**
 * Domain types for civic reports — the single source of truth shared across UI
 * and data access. These mirror the `public.reports` table (see
 * supabase/migrations). Keep this file framework-agnostic.
 */

export type ReportStatus = 'submitted' | 'triaged' | 'in_progress' | 'resolved' | 'rejected'

export type ReportSeverity = 'low' | 'medium' | 'high' | 'critical'

export type ReportCategory =
  | 'road_and_traffic'
  | 'public_lighting'
  | 'water_and_drainage'
  | 'waste'
  | 'public_safety'
  | 'environment'
  | 'other'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface Report {
  id: string
  title: string
  description: string
  category: ReportCategory
  severity: ReportSeverity
  status: ReportStatus
  location: GeoPoint
  address: string | null
  mediaUrls: string[]
  /** Null when the report was submitted anonymously. */
  reporterId: string | null
  createdAt: string
  updatedAt: string
}

/** Payload accepted when a citizen creates a report. */
export type NewReportInput = Pick<
  Report,
  'title' | 'description' | 'category' | 'severity' | 'location' | 'address' | 'mediaUrls'
>
