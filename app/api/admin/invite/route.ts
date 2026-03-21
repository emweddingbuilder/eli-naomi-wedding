import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendInviteEmail } from '@/lib/email';
import { cookies } from 'next/headers';

async function isAuthed() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('admin_auth');
  return cookie?.value === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!await isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { guestId } = await request.json();
  if (!guestId) return NextResponse.json({ error: 'No guestId' }, { status: 400 });

  const { data: guest, error } = await getSupabaseAdmin()
    .from('guests')
    .select('*')
    .eq('id', guestId)
    .single();

  if (error || !guest) {
    return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
  }

  if (!guest.email) {
    return NextResponse.json({ error: 'Guest has no email' }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const rsvpUrl = `${baseUrl}/rsvp`;
  const guestName = `${guest.first_name} ${guest.last_name}`;

  try {
    await sendInviteEmail({ to: guest.email, guestName, rsvpUrl });

    await getSupabaseAdmin()
      .from('guests')
      .update({ invited_at: new Date().toISOString() })
      .eq('id', guestId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
