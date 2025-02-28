import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL= "https://hvqrsutsvovnizmipksd.supabase.co"
const SUPABASE_ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXJzdXRzdm92bml6bWlwa3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MjMwNjAsImV4cCI6MjA1Mjk5OTA2MH0.Dr0fvzfUNaH3AdhGhsOP11kFW5t4KFL999Oetog0wWY"


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
