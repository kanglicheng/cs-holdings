import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gyesgoqhxmpfhaqfvklq.supabase.co';

// eslint-disable-next-line no-undef
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export default createClient(supabaseUrl, supabaseKey);