import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 });
  }

  // Split query into tokens (first + last name)
  const tokens = q.toLowerCase().split(/\s+/);

  // Search guests whose first or last name match any token
  const { data: guests, error } = await getSupabase()
    .from('guests')
    .select('id, party_id, first_name, last_name, party:parties(id, name, invited_events)')
    .or(
      tokens
        .flatMap((t) => [
          `first_name.ilike.%${t}%`,
          `last_name.ilike.%${t}%`,
        ])
        .join(',')
    )
    .limit(20);

  if (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }

  // If multiple tokens, score results: prefer guests where BOTH first+last match
  let scored = (guests || []).map((g) => {
    const full = `${g.first_name} ${g.last_name}`.toLowerCase();
    const score = tokens.filter((t) => full.includes(t)).length;
    return { ...g, _score: score };
  });

  // Sort by score desc, filter out zero matches
  scored = scored.filter((g) => g._score > 0).sort((a, b) => b._score - a._score);

  return NextResponse.json({ guests: scored });
}
