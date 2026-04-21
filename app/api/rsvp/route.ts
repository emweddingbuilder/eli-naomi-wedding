import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendRSVPConfirmation } from '@/lib/email';
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

  const { error } = await getSupabase()
    .from('rsvp_responses')
    .upsert(records, { onConflict: 'guest_id,event' });

  if (error) {
    console.error('RSVP error:', error);
    return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 });
  }

  // Send confirmation emails (one per guest who has an email on file)
  const guestIds = [...new Set(submissions.map((s) => s.guestId))];
  const { data: guests } = await getSupabase()
    .from('guests')
    .select('id, first_name, last_name, email')
    .in('id', guestIds);

  if (guests) {
    await Promise.allSettled(
      guests
        .filter((g) => g.email)
        .map((g) => {
          const guestSubmissions = submissions.filter((s) => s.guestId === g.id);
          const attending = guestSubmissions.some((s) => s.attending);
          return sendRSVPConfirmation({
            to: g.email!,
            guestName: `${g.first_name} ${g.last_name}`,
            attending,
          });
        })
    );
  }

  return NextResponse.json({ success: true });
}
