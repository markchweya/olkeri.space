import { Pool } from 'pg'

// Reuse one pool across hot reloads and serverless invocations in the
// same runtime. Keep max low: serverless platforms run many instances.
const globalForDb = globalThis as unknown as { olkeriPool?: Pool }

function buildSsl() {
  // DATABASE_SSL: 'require' (default; encrypted, no CA verification —
  // what most managed Postgres providers expect), 'verify' (encrypted
  // and CA-verified), or 'disable' (private-network connections).
  const mode = process.env.DATABASE_SSL ?? 'require'

  if (mode === 'disable') return undefined
  if (mode === 'verify') return { rejectUnauthorized: true }

  return { rejectUnauthorized: false }
}

export function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) return null

  if (!globalForDb.olkeriPool) {
    globalForDb.olkeriPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      ssl: buildSsl(),
    })
  }

  return globalForDb.olkeriPool
}

// Parameterized query helper. Returns null when the database is not
// configured or unreachable so public pages degrade instead of crashing.
export async function dbQuery<T>(
  text: string,
  params: unknown[] = []
): Promise<T[] | null> {
  const pool = getPool()

  if (!pool) return null

  try {
    const result = await pool.query(text, params)
    return result.rows as T[]
  } catch (error) {
    console.error('Database query failed:', error)
    return null
  }
}
