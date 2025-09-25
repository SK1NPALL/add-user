import { createClient } from "@supabase/supabase-js";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZGViYnh3eWx6em5yaXludXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTUwOTYsImV4cCI6MjA3MzE3MTA5Nn0.j91zfpa-hvvJsUCC83923uqHb0_-Y-5N2nBkBpb5DHo'
const supabaseUrl = 'https://xodebbxwylzznriynuxl.supabase.co'

export const supabase = createClient(supabaseUrl,supabaseKey);