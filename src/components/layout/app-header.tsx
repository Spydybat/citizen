import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { signOut } from '@/features/auth/actions'
import { siteConfig } from '@/config/site'

/** Header for authenticated/app pages: nav, theme toggle, and sign-out. */
export function AppHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 p-4">
        <Link href="/dashboard" className="font-semibold tracking-tight">
          {siteConfig.shortName}
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <ThemeToggle />
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md border border-border px-3 py-1.5 font-medium transition-colors hover:bg-foreground/5"
            >
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
