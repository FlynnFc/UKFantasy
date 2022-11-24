
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wosipkxcwhwqrtnbwdxx.supabase.co"
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvc2lwa3hjd2h3cXJ0bmJ3ZHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMDEzOTYsImV4cCI6MTk4NDc3NzM5Nn0.nAUbNC0ZpQMEfsGfvgT_uINqbSfyAoZ62ITEklUl2Os'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
