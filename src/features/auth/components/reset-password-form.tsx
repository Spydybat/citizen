'use client'

import { useActionState } from 'react'
import { resetPasswordAction } from '../actions'
import { initialAuthState } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError, FormMessage } from '@/components/ui/form-message'

export function ResetPasswordForm() {
  const [state, action, isPending] = useActionState(resetPasswordAction, initialAuthState)

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error ? <FormMessage variant="error">{state.error}</FormMessage> : null}

      <div className="space-y-1.5">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <FieldError messages={state.fieldErrors?.password} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
        <FieldError messages={state.fieldErrors?.confirmPassword} />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Updating…' : 'Update password'}
      </Button>
    </form>
  )
}
