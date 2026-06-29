import { type EmailOtpType } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Handles email links that carry a `token_hash` + `type` (signup confirmation,
 * password recovery, email change). Verifies the OTP — which establishes the
 * session via cookies — then redirects onward.
 *
 * Requires the Supabase email templates to point here, e.g.:
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type={{ .Type }}
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  const fallback = type === 'recovery' ? '/reset-password' : '/dashboard'
  const next = searchParams.get('next') ?? fallback

  if (tokenHash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) {
      redirect(next)
    }
  }

  redirect('/auth/auth-code-error')
}
