import { getSupabase } from '@/lib/supabase';
import InvitationCard from '@/components/InvitationCard';
import { buildPartyDisplayName } from '@/lib/partyName';

export const metadata = {
  title: "You're Invited — Naomi & Eli",
};

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<{ guestId?: string }>;
}) {
  const { guestId } = await searchParams;

  let guestName: string | undefined;

  if (guestId) {
    // Fetch the guest to get their party_id
    const { data: guest } = await getSupabase()
      .from('guests')
      .select('first_name, last_name, party_id')
      .eq('id', guestId)
      .single();

    if (guest) {
      // Fetch all party members in CSV order for combined display name
      const { data: partyMembers } = await getSupabase()
        .from('guests')
        .select('first_name, last_name')
        .eq('party_id', guest.party_id)
        .order('created_at', { ascending: true });

      guestName = partyMembers && partyMembers.length > 0
        ? buildPartyDisplayName(partyMembers)
        : `${guest.first_name} ${guest.last_name}`;
    }
  }

  return <InvitationCard guestName={guestName} guestId={guestId} />;
}
