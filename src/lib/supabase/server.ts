import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

/**
 * Supabase client for Server Components, Server Actions and Route Handlers.
 * Reads/writes the auth session through Next.js cookies.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // `setAll` was called from a Server Component, where cookies are
          // read-only. Safe to ignore — the middleware refreshes the session.
        }
      },
    },
  })
}
