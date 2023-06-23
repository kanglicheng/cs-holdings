import { createClient } from '@supabase/supabase-js';

import { Database } from './schema';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

// eslint-disable-next-line no-undef
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export default createClient<Database>(supabaseUrl, supabaseKey);
