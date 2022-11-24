import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const supabaseAnonKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);