'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import type { AuthActionState } from '@/features/auth/types'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
})

export async function updateProfileAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = profileSchema.safeParse({
    fullName: String(formData.get('fullName') ?? ''),
  })
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You are not signed in.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: parsed.data.fullName })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/profile')
  revalidatePath('/dashboard')
  return { success: 'Profile updated.' }
}
