import { getSupabase } from '@/lib/supabase';
import InvitationCard from '@/components/InvitationCard';

export const metadata = {
  title: "You're Invited — Eli & Naomi",
};

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<{ guestId?: string }>;
}) {
  const { guestId } = await searchParams;

  let guestName: string | undefined;

  if (guestId) {
    const { data } = await getSupabase()
      .from('guests')
      .select('first_name, last_name')
      .eq('id', guestId)
      .single();

    if (data) {
      guestName = `${data.first_name} ${data.last_name}`;
    }
  }

  return <InvitationCard guestName={guestName} guestId={guestId} />;
}
