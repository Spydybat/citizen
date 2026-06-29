import type { Metadata } from 'next'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { Card, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Reset password' }

export default function ResetPasswordPage() {
  return (
    <Card>
      <CardHeader title="Set a new password" description="Choose a strong password you'll remember" />
      <ResetPasswordForm />
    </Card>
  )
}
