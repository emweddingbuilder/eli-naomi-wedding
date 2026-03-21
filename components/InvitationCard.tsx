'use client';

import Link from 'next/link';
import Monogram from './Monogram';

interface InvitationCardProps {
  guestName?: string;
}

export default function InvitationCard({ guestName }: InvitationCardProps) {
  return (
    <div className="flex flex-col items-center min-h-screen py-12 px-4" style={{ background: 'var(--cream)' }}>
      {/* Invitation Card */}
      <div
        className="invitation-border w-full max-w-md bg-white"
        style={{ padding: '3.5rem 3rem', textAlign: 'center' }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Monogram */}
          <div className="flex justify-center mb-8">
            <Monogram size={80} />
          </div>

          {/* Parents line — optional formal touch */}
          <p className="eyebrow mb-1" style={{ color: 'var(--muted)' }}>
            Together with their families
          </p>

          <div className="divider my-5" />

          {/* Request line */}
          <p className="eyebrow mb-8" style={{ color: 'var(--charcoal)' }}>
            request the honour of your presence
            <br />
            at the marriage of their children
          </p>

          {/* Names */}
          <div className="font-script mb-1" style={{ fontSize: '3.2rem', lineHeight: 1.1, color: 'var(--charcoal)' }}>
            Eli
          </div>

          {/* Hebrew name */}
          <p className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '1rem' }}>
            אֱלִי
          </p>

          <p className="eyebrow mb-4" style={{ color: 'var(--muted)', letterSpacing: '0.3em' }}>and</p>

          <div className="font-script mb-1" style={{ fontSize: '3.2rem', lineHeight: 1.1, color: 'var(--charcoal)' }}>
            Naomi
          </div>

          {/* Hebrew name */}
          <p className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '2rem' }}>
            נָעֳמִי
          </p>

          <div className="divider my-5" />

          {/* Date */}
          <p className="eyebrow mt-6" style={{ color: 'var(--charcoal)' }}>
            Sunday, the nineteenth of October
          </p>
          <p className="eyebrow mt-1" style={{ color: 'var(--charcoal)' }}>
            two thousand and twenty-five
          </p>
          <p className="font-display mt-2" style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
            Ceremony begins at six o&apos;clock in the evening
          </p>

          <div className="divider my-5" />

          {/* Venue */}
          <p className="font-script mb-1" style={{ fontSize: '1.8rem', color: 'var(--charcoal)' }}>
            Consul House
          </p>
          <p className="eyebrow" style={{ color: 'var(--muted)' }}>
            Tel Aviv-Yafo, Israel
          </p>

          <div className="divider my-6" />

          {/* Dress code */}
          <p className="eyebrow" style={{ color: 'var(--muted)' }}>
            Black Tie
          </p>
        </div>
      </div>

      {/* RSVP Section — below the card */}
      <div className="mt-16 text-center">
        <p className="eyebrow mb-6" style={{ color: 'var(--muted)', letterSpacing: '0.3em' }}>
          Please RSVP here
        </p>
        <Link href="/rsvp" className="btn-dark">
          RSVP
        </Link>
      </div>

      {/* Date + venue info strip */}
      <div
        className="w-full mt-16 py-10 text-center"
        style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}
      >
        <div className="flex flex-col md:flex-row justify-center gap-12 max-w-xl mx-auto px-4">
          <div>
            <p className="font-display-sc" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '0.5rem' }}>
              Date & Time
            </p>
            <p className="font-display" style={{ fontSize: '1.1rem' }}>Sunday, October 19, 2025</p>
            <p className="font-display" style={{ fontSize: '0.9rem', opacity: 0.7 }}>6:00 PM</p>
            <a
              href="https://calendar.google.com/calendar/r/eventedit?text=Eli+%26+Naomi%27s+Wedding&dates=20251019T160000Z/20251020T000000Z&location=Consul+House,+Tel+Aviv-Yafo,+Israel"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-2 inline-block"
              style={{ color: 'var(--gold)', borderBottom: '1px solid var(--gold)' }}
            >
              Add to Calendar
            </a>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)' }} className="hidden md:block" />
          <div>
            <p className="font-display-sc" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '0.5rem' }}>
              Venue
            </p>
            <p className="font-display" style={{ fontSize: '1.1rem' }}>Consul House</p>
            <p className="font-display" style={{ fontSize: '0.9rem', opacity: 0.7 }}>Tel Aviv-Yafo, Israel</p>
            <a
              href="https://maps.google.com/?q=Consul+House+Tel+Aviv"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-2 inline-block"
              style={{ color: 'var(--gold)', borderBottom: '1px solid var(--gold)' }}
            >
              View Map
            </a>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="mt-10 flex gap-8">
        <Link href="/details" className="eyebrow" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--muted)' }}>
          Wedding Details
        </Link>
        <Link href="/rsvp" className="eyebrow" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--muted)' }}>
          RSVP
        </Link>
      </div>
    </div>
  );
}
