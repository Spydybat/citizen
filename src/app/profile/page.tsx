import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getProfile } from '@/features/profile/data'
import { ProfileForm } from '@/features/profile/components/profile-form'
import { AppHeader } from '@/components/layout/app-header'
import { Card, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Profile' }

export default async function ProfilePage() {
  const profile = await getProfile()
  // Middleware guards this route, but never trust that alone in a Server Component.
  if (!profile) redirect('/login')

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl p-4 sm:p-6">
        <Card>
          <CardHeader title="Your profile" description={`Role: ${profile.role}`} />
          <ProfileForm profile={profile} />
        </Card>
      </main>
    </>
  )
}
