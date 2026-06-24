import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cxgqiutgebdovtiralom.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_jem1oq7R50qNtyXvZ8zZAA_FF2KG9_9'

let supabase: SupabaseClient | null = null

export function getSupabase() {
  if (supabase) return supabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase configuration is missing')
    return null
  }

  supabase = createClient(supabaseUrl, supabaseKey)
  return supabase
}
