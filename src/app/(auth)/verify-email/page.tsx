import Link from 'next/link'
import type { Metadata } from 'next'
import { Card, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Verify your email' }

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams

  return (
    <Card>
      <CardHeader
        title="Check your email"
        description={
          email
            ? `We sent a verification link to ${email}.`
            : 'We sent you a verification link.'
        }
      />
      <p className="text-sm text-muted-foreground">
        Click the link in that email to activate your account. You can close this tab afterwards.
      </p>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </Card>
  )
}
