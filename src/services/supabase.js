import { createClient } from '@supabase/supabase-js'


export const supabaseUrl = "https://jijswboodxckfqwcoder.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppanN3Ym9vZHhja2Zxd2NvZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjU4NzAsImV4cCI6MjA2ODI0MTg3MH0.Ca-MiA-xGaIH9ScZlsTcMWHbJYr8TWsd-yp86Bl4oeg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
