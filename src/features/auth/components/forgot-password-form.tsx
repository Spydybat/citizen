'use client'

import { useActionState } from 'react'
import { forgotPasswordAction } from '../actions'
import { initialAuthState } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError, FormMessage } from '@/components/ui/form-message'

export function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, initialAuthState)

  if (state.success) {
    return <FormMessage variant="success">{state.success}</FormMessage>
  }

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error ? <FormMessage variant="error">{state.error}</FormMessage> : null}

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
        <FieldError messages={state.fieldErrors?.email} />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Sending…' : 'Send reset link'}
      </Button>
    </form>
  )
}
