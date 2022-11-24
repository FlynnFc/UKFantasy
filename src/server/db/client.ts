/* eslint-disable @typescript-eslint/no-non-null-assertion */


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wosipkxcwhwqrtnbwdxx.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
