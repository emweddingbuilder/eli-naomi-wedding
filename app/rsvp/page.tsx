import { Suspense } from 'react';
import RSVPFlow from '@/components/RSVPFlow';

export const metadata = {
  title: 'RSVP — Eli & Naomi',
};

export default function RSVPPage() {
  return (
    <Suspense>
      <RSVPFlow />
    </Suspense>
  );
}
