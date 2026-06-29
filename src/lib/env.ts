/**
 * Centralised, fail-fast access to environment variables.
 *
 * Values are validated **lazily** (on first access at request time) rather than
 * at import time, so `next build` succeeds without secrets present while still
 * throwing a clear error the moment the app actually needs a missing value.
 *
 * Only `NEXT_PUBLIC_*` values live here because this module is importable from
 * client components. Server-only secrets (e.g. the service-role key) must be
 * read directly from `process.env` inside server-only code.
 */

function required(name: string, value: string | undefined): string {
  if (!value || value.length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        'Copy .env.example to .env.local and fill it in.',
    )
  }
  return value
}

export const env = {
  get supabaseUrl(): string {
    return required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL)
  },
  get supabaseAnonKey(): string {
    return required('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  },
  get siteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  },
} as const
