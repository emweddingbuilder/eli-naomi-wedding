import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const guestId = request.nextUrl.searchParams.get('guestId');
  if (!guestId) return NextResponse.json({ error: 'Missing guestId' }, { status: 400 });

  // Look up the guest to get their party_id
  const { data: guest, error: guestErr } = await getSupabase()
    .from('guests')
    .select('id, party_id, first_name, last_name, party:parties(id, invited_events)')
    .eq('id', guestId)
    .single();

  if (guestErr || !guest) {
    return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
  }

  // Fetch all guests in the same party
  const { data: partyGuests, error: partyErr } = await getSupabase()
    .from('guests')
    .select('id, party_id, first_name, last_name, party:parties(id, invited_events)')
    .eq('party_id', guest.party_id);

  if (partyErr) {
    return NextResponse.json({ error: 'Failed to load party' }, { status: 500 });
  }

  return NextResponse.json({ guests: partyGuests || [] });
}
