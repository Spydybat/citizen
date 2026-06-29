/**
 * Supabase connection verifier.
 *
 * Run with:  pnpm verify:supabase
 * (which loads .env.local via Node's --env-file flag)
 *
 * Checks, in order:
 *   1. Required env vars are present and not still placeholders.
 *   2. The Auth endpoint is reachable.
 *   3. The Database is reachable AND the schema/migrations are applied
 *      (public read of the `reports` table works under RLS).
 */
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function fail(message, hint) {
  console.error(`\n❌ ${message}`)
  if (hint) console.error(`   → ${hint}`)
  process.exit(1)
}

// 1. Env presence + placeholder detection.
if (!url || url.includes('YOUR_PROJECT_REF')) {
  fail(
    'NEXT_PUBLIC_SUPABASE_URL is missing or still a placeholder.',
    'Paste your Project URL into .env.local (Supabase → Settings → API).',
  )
}
if (!anon || anon.includes('your-anon')) {
  fail(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or still a placeholder.',
    'Paste your anon public key into .env.local (Supabase → Settings → API).',
  )
}

console.log(`• Project URL: ${url}`)

const supabase = createClient(url, anon)

// 2. Auth endpoint reachable.
const { error: authErr } = await supabase.auth.getSession()
if (authErr) fail(`Auth endpoint check failed: ${authErr.message}`)
console.log('✓ Auth endpoint reachable')

// 3. Database + schema check (public RLS read of reports).
const { count, error: dbErr } = await supabase
  .from('reports')
  .select('*', { count: 'exact', head: true })

if (dbErr) {
  fail(
    `Database/schema check failed: ${dbErr.message}`,
    'Have you run supabase/migrations/0001 → 0003 in the SQL Editor?',
  )
}
console.log(`✓ Database reachable — "reports" table present (rows: ${count ?? 0})`)

console.log('\n✅ Supabase connection verified. You are ready for Phase 1.\n')
