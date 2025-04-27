import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fqavehdxosgoesacawwh.supabase.co'; // your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYXZlaGR4b3Nnb2VzYWNhd3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTAzMTYsImV4cCI6MjA2MDcyNjMxNn0.FRwYxx5N5fx35WpuYK-SFZ37nfcs_USicu58y8MCefU'; // your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);