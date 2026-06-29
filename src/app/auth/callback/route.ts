import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * OAuth / PKCE code-exchange callback. Not used by email/password flows today,
 * but wired up so adding social login later is a config-only change.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next.startsWith('/') ? next : '/dashboard'}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
