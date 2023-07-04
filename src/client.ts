import { createClient } from '@supabase/supabase-js';

import { Database } from './schema';

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export default createClient<Database>(supabaseUrl, supabaseKey);
