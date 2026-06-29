'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

// Returns false during SSR / first client render and true once hydrated —
// without calling setState in an effect (keeps the React Compiler lint rules
// happy). useSyncExternalStore is hydration-safe: server and the first client
// render both read getServerSnapshot (false), so there is no mismatch; the
// switch to true happens in a post-hydration commit.
const subscribe = () => () => {}
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

const buttonClasses =
  'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-foreground/5'

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme()
  const hydrated = useHydrated()

  // Until hydrated the theme is unknown on the client, so render a stable,
  // theme-agnostic placeholder that matches the server output exactly.
  if (!hydrated) {
    return (
      <button type="button" aria-label="Toggle theme" className={cn(buttonClasses, className)}>
        <span className="h-4 w-4" aria-hidden="true" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(buttonClasses, className)}
    >
      {isDark ? (
        // Sun
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Moon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
