import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 'https://wosipkxcwhwqrtnbwdxx.supabase.co'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const supabaseKey = process.env.NEXT_PUBLIC_SUBABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseKey);