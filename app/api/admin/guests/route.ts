import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function isAuthed() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('admin_auth');
  return cookie?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!await isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: guests, error } = await getSupabaseAdmin()
    .from('guests')
    .select('*, party:parties(name, invited_events), rsvps:rsvp_responses(event, attending, dietary_restrictions, song_request, message)')
    .order('last_name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guests: guests || [] });
}
