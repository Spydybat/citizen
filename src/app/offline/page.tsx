export const metadata = { title: 'Offline' }

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-semibold">You&apos;re offline</h1>
      <p className="text-sm opacity-70">
        Some features need a connection. Once you&apos;re back online, draft reports will be
        submittable again.
      </p>
    </main>
  )
}
