'use client'

import { useActionState } from 'react'
import { updateProfileAction } from '../actions'
import type { Profile } from '../types'
import { initialAuthState } from '@/features/auth/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError, FormMessage } from '@/components/ui/form-message'

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action, isPending] = useActionState(updateProfileAction, initialAuthState)

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error ? <FormMessage variant="error">{state.error}</FormMessage> : null}
      {state.success ? <FormMessage variant="success">{state.success}</FormMessage> : null}

      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          defaultValue={profile.fullName ?? ''}
          required
        />
        <FieldError messages={state.fieldErrors?.fullName} />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  )
}
