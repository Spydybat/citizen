import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { siteConfig } from '@/config/site'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 p-4">
          <span className="font-semibold tracking-tight">{siteConfig.shortName}</span>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="hover:underline">
              Sign in
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 p-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{siteConfig.shortName}</h1>
          <p className="text-balance text-base text-muted-foreground">{siteConfig.description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/register"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            Sign in
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">Phase 1 · Authentication</p>
      </main>
    </div>
  )
}
