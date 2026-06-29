import { createClient } from '@/lib/supabase/server'
import type { Profile, UserRole } from './types'

/** Loads the current user's profile row (created automatically on signup). */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role, created_at')
    .eq('id', user.id)
    .single()

  if (error || !data) return null

  return {
    id: data.id as string,
    fullName: (data.full_name as string | null) ?? null,
    role: data.role as UserRole,
    createdAt: data.created_at as string,
  }
}
