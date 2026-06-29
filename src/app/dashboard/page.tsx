import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getProfile } from '@/features/profile/data'
import { AppHeader } from '@/components/layout/app-header'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Belt-and-braces: middleware already guards /dashboard, but a Server
  // Component should never assume that and must re-check.
  if (!user) redirect('/login')

  const profile = await getProfile()
  const displayName = profile?.fullName ?? user.email

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome, {displayName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>
        </div>

        <Card>
          <h2 className="text-base font-medium">Your reports</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Reporting lands in the next phase. For now, your account is set up and secured.
          </p>
          <Link
            href="/profile"
            className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Edit your profile →
          </Link>
        </Card>
      </main>
    </>
  )
}
