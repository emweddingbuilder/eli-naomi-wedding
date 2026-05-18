import { Suspense } from 'react';
import RSVPFlow from '@/components/RSVPFlow';

export const metadata = {
  title: 'RSVP — Naomi & Eli',
};

export default function RSVPPage() {
  return (
    <Suspense>
      <RSVPFlow />
    </Suspense>
  );
}
