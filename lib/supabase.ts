import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client — for guest-facing RSVP (read guests, write RSVPs)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service client — for admin operations (upload guests, send invites)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
