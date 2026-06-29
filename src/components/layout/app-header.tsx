'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { signOut } from '@/features/auth/actions'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string }

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/reports/new', label: 'Create Report' },
  { href: '/reports', label: 'My Reports' },
  { href: '/profile', label: 'Profile' },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/reports') {
    // "My Reports" owns /reports and its detail pages, but not /reports/new.
    return pathname === '/reports' || pathname.startsWith('/reports/mine')
  }
  return pathname === href
}

/** Header for authenticated/app pages: nav, theme toggle, and sign-out. */
export function AppHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 p-4">
        <Link
          href="/dashboard"
          className="font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {siteConfig.shortName}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-3 text-sm md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={cn(
                'transition-colors hover:text-foreground',
                isActive(pathname, item.href)
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
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

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-foreground/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation panel — smooth open/close via grid-rows animation */}
      <div
        id="mobile-nav"
        className={cn(
          'grid overflow-hidden transition-all duration-300 ease-in-out md:hidden',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0">
          <nav className="mx-auto flex max-w-4xl flex-col gap-1 px-4 pb-4 text-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 transition-colors',
                  isActive(pathname, item.href)
                    ? 'bg-foreground/5 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
            <form action={signOut} className="mt-1">
              <button
                type="submit"
                className="w-full rounded-md border border-border px-3 py-2 text-left font-medium transition-colors hover:bg-foreground/5"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  )
}
