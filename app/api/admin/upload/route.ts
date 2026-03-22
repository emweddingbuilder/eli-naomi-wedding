import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function isAuthed() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('admin_auth');
  return cookie?.value === process.env.ADMIN_PASSWORD;
}

function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text: string) {
  const lines = text.trim().split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row');

  const headers = splitCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/['"]/g, '').trim());
  const required = ['party_name', 'first_name', 'last_name'];
  for (const r of required) {
    if (!headers.includes(r)) throw new Error(`Missing required column: ${r}`);
  }

  return lines.slice(1).map((line) => {
    const vals = splitCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = vals[i] || ''; });
    return row;
  });
}

export async function POST(request: NextRequest) {
  if (!await isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { csv } = await request.json();
  if (!csv) return NextResponse.json({ error: 'No CSV provided' }, { status: 400 });

  let rows: Record<string, string>[];
  try {
    rows = parseCSV(csv);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'CSV parse error' }, { status: 400 });
  }

  // Group by party_name
  const partyMap = new Map<string, typeof rows>();
  for (const row of rows) {
    if (!row.party_name || !row.first_name || !row.last_name) continue;
    const key = row.party_name;
    if (!partyMap.has(key)) partyMap.set(key, []);
    partyMap.get(key)!.push(row);
  }

  let totalGuests = 0;
  const errors: string[] = [];

  for (const [partyName, members] of partyMap) {
    const rawEvents = members[0]?.invited_events || 'ceremony';
    const invitedEvents = rawEvents.split(',').map((e: string) => e.trim()).filter(Boolean);

    const { data: party, error: partyErr } = await getSupabaseAdmin()
      .from('parties')
      .upsert({ name: partyName, max_guests: members.length, invited_events: invitedEvents }, { onConflict: 'name' })
      .select()
      .single();

    if (partyErr || !party) {
      errors.push(`Party "${partyName}": ${partyErr?.message || 'unknown error'}`);
      continue;
    }

    const guestRecords = members.map((m) => ({
      party_id: party.id,
      first_name: m.first_name,
      last_name: m.last_name,
      email: m.email || null,
      phone: m.phone || null,
    }));

    const { error: guestErr } = await getSupabaseAdmin()
      .from('guests')
      .upsert(guestRecords, { onConflict: 'first_name,last_name' });

    if (guestErr) {
      errors.push(`Guests for "${partyName}": ${guestErr.message}`);
      continue;
    }

    totalGuests += members.length;
  }

  return NextResponse.json({ success: true, count: totalGuests, errors });
}
