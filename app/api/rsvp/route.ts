import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { RSVPSubmission } from '@/lib/types';

export async function POST(request: NextRequest) {
  let body: { submissions: RSVPSubmission[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { submissions } = body;

  if (!Array.isArray(submissions) || submissions.length === 0) {
    return NextResponse.json({ error: 'No submissions provided' }, { status: 400 });
  }

  // Upsert RSVPs (one per guest, allow re-submission)
  const records = submissions.map((s) => ({
    guest_id: s.guestId,
    event: s.event,
    attending: s.attending,
    dietary_restrictions: s.dietaryRestrictions || null,
    song_request: s.songRequest || null,
    message: s.message || null,
    submitted_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('rsvp_responses')
    .upsert(records, { onConflict: 'guest_id,event' });

  if (error) {
    console.error('RSVP error:', error);
    return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
