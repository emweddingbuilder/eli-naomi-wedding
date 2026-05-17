'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Monogram from './Monogram';
import type { GuestWithParty, RSVPSubmission } from '@/lib/types';

const EVENT_LABELS: Record<string, { name: string; date: string; time: string; venue: string }> = {
  rehearsal: {
    name: 'Rehearsal Dinner',
    date: 'Sunday, October 18, 2026',
    time: '6:00 PM',
    venue: 'TBD',
  },
  ceremony: {
    name: 'Wedding Ceremony & Reception',
    date: 'Monday, October 19, 2026',
    time: '5:00 PM',
    venue: 'Consul House',
  },
};

type Step = 'search' | 'select' | 'form' | 'done' | 'loading';

interface GuestFormState {
  guestId: string;
  name: string;
  events: Record<string, boolean | null>; // eventKey → attending | null
  dietaryRestrictions: string;
  songRequest: string;
  message: string;
}

export default function RSVPFlow() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(searchParams.get('guestId') ? 'loading' : 'search');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GuestWithParty[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [selectedParty, setSelectedParty] = useState<GuestWithParty[]>([]);
  const [guestForms, setGuestForms] = useState<GuestFormState[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Auto-load party when arriving from an invite link (?guestId=...)
  useEffect(() => {
    const guestId = searchParams.get('guestId');
    if (!guestId) return;
    fetch(`/api/guests/party?guestId=${encodeURIComponent(guestId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.guests?.length) {
          handleSelectParty(data.guests);
        } else {
          setStep('search');
        }
      })
      .catch(() => setStep('search'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const groupedResults = results.reduce<Record<string, GuestWithParty[]>>((acc, guest) => {
    const key = guest.party_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(guest);
    return acc;
  }, {});

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setSearchError('');
    setResults([]);

    try {
      const res = await fetch(`/api/guests/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      setResults(data.guests || []);
      if ((data.guests || []).length === 0) {
        setSearchError("We couldn't find that name. Please try your first and last name, or contact us directly.");
      } else {
        setStep('select');
      }
    } catch {
      setSearchError('Something went wrong. Please try again.');
    } finally {
      setSearching(false);
    }
  }

  function handleSelectParty(partyGuests: GuestWithParty[]) {
    const invitedEvents = partyGuests[0]?.party?.invited_events || ['ceremony'];
    setSelectedParty(partyGuests);
    setGuestForms(
      partyGuests.map((g) => ({
        guestId: g.id,
        name: `${g.first_name} ${g.last_name}`,
        events: Object.fromEntries(invitedEvents.map((e) => [e, null])),
        dietaryRestrictions: '',
        songRequest: '',
        message: '',
      }))
    );
    setStep('form');
  }

  function updateEventResponse(guestIndex: number, eventKey: string, attending: boolean) {
    setGuestForms((prev) =>
      prev.map((f, i) =>
        i === guestIndex ? { ...f, events: { ...f.events, [eventKey]: attending } } : f
      )
    );
  }

  function updateGuestField(index: number, field: 'dietaryRestrictions' | 'songRequest' | 'message', value: string) {
    setGuestForms((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  }

  const canSubmit = guestForms.every((f) => Object.values(f.events).every((v) => v !== null));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      setSubmitError('Please respond to all events for each guest.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    try {
      const submissions: RSVPSubmission[] = guestForms.flatMap((f) =>
        Object.entries(f.events).map(([eventKey, attending]) => ({
          guestId: f.guestId,
          event: eventKey,
          attending: attending as boolean,
          dietaryRestrictions: f.dietaryRestrictions || undefined,
          songRequest: f.songRequest || undefined,
          message: f.message || undefined,
        }))
      );

      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissions }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStep('done');
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  const anyAttending = guestForms.some((f) => Object.values(f.events).some((v) => v === true));

  return (
    <div className="flex flex-col items-center min-h-screen py-12 px-4" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Monogram size={64} />
        </div>
        <h1 className="font-display-sc" style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--charcoal)' }}>
          Eli & Naomi's Wedding
        </h1>
        <p className="eyebrow mt-1" style={{ color: 'var(--gold)' }}>
          October 19, 2026 · Tel Aviv-Yafo, Israel
        </p>
      </div>

      {/* ── Loading (arriving from invite link) ── */}
      {step === 'loading' && (
        <p className="font-display" style={{ fontSize: '1rem', color: 'var(--muted)' }}>
          Loading your invitation…
        </p>
      )}

      {/* ── Search ── */}
      {step === 'search' && (
        <div className="w-full max-w-xl rounded-3xl p-12 text-center" style={{ background: 'var(--cream-dark)' }}>
          <p className="font-display mb-2" style={{ fontSize: '1.3rem', color: 'var(--charcoal)' }}>
            Please enter the first and last name
          </p>
          <p className="font-display mb-8" style={{ fontSize: '1.3rem', color: 'var(--charcoal)' }}>
            of one member of your party.
          </p>
          <p className="eyebrow mb-8" style={{ color: 'var(--muted)' }}>
            If you&apos;re responding for a group, you&apos;ll be able to RSVP
            <br />for your entire party on the next page.
          </p>
          <form onSubmit={handleSearch} className="flex flex-col items-center gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSearchError(''); }}
              placeholder="Ex. Eli Minsky"
              className="w-full max-w-sm px-4 py-3 bg-white border border-gray-200 rounded text-center font-display"
              style={{ fontSize: '1rem', color: 'var(--charcoal)', outline: 'none' }}
            />
            <p className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
              Enter a first and last name (not &quot;The Minsky Family&quot;)
            </p>
            {searchError && (
              <p className="font-display" style={{ color: '#c0392b', fontSize: '0.9rem', maxWidth: '20rem' }}>
                {searchError}
              </p>
            )}
            <button type="submit" className="btn-dark mt-2" disabled={searching}>
              {searching ? 'Searching...' : 'Continue'}
            </button>
          </form>
        </div>
      )}

      {/* ── Select party ── */}
      {step === 'select' && (
        <div className="w-full max-w-xl">
          <p className="font-display text-center mb-2" style={{ fontSize: '1.2rem', color: 'var(--charcoal)' }}>
            Select your info below or{' '}
            <button
              onClick={() => { setStep('search'); setResults([]); setQuery(''); }}
              style={{ color: 'var(--gold-dark)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            >
              try searching again
            </button>.
          </p>
          <div className="mt-6">
            {Object.values(groupedResults).map((partyGuests) => (
              <div key={partyGuests[0].party_id} className="py-5" style={{ borderBottom: '1px solid var(--charcoal)' }}>
                <div style={{ borderTop: '1px solid var(--charcoal)', paddingTop: '1.25rem' }} className="flex items-center justify-between">
                  <div>
                    {partyGuests[0].party?.name && (
                      <p className="eyebrow mb-1" style={{ color: 'var(--muted)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                        {partyGuests[0].party.name}
                      </p>
                    )}
                    {partyGuests.map((g) => (
                      <p key={g.id} className="font-display" style={{ fontSize: '1.1rem', color: 'var(--charcoal)' }}>
                        {g.first_name} {g.last_name}
                      </p>
                    ))}
                  </div>
                  <button className="btn-dark" onClick={() => handleSelectParty(partyGuests)} style={{ padding: '0.75rem 2rem' }}>
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RSVP Form ── */}
      {step === 'form' && (
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <p className="eyebrow" style={{ color: 'var(--muted)', letterSpacing: '0.3em' }}>Your RSVP</p>
            <div className="divider mt-4" style={{ background: 'var(--gold)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            {guestForms.map((guestForm, i) => (
              <div key={guestForm.guestId} className="py-8" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <p className="font-display mb-6" style={{ fontSize: '1.3rem', color: 'var(--charcoal)' }}>
                  {guestForm.name}
                </p>

                {/* Per-event selection */}
                {Object.keys(guestForm.events).map((eventKey) => {
                  const evt = EVENT_LABELS[eventKey];
                  const attending = guestForm.events[eventKey];
                  return (
                    <div key={eventKey} className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <p className="font-display mb-1" style={{ fontSize: '1.1rem', color: 'var(--charcoal)' }}>
                        {evt?.name}
                      </p>
                      <p className="eyebrow mb-4" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                        {evt?.date} · {evt?.time} · {evt?.venue}
                      </p>
                      <div className="flex flex-wrap gap-3">
                                        <button
                          type="button"
                          onClick={() => updateEventResponse(i, eventKey, true)}
                          className="eyebrow px-5 py-2"
                          style={{
                            border: attending === true ? '1px solid var(--gold)' : '1px solid var(--charcoal)',
                            background: attending === true ? 'var(--charcoal)' : 'transparent',
                            color: attending === true ? 'var(--gold)' : 'var(--charcoal)',
                            cursor: 'pointer',
                            letterSpacing: '0.15em',
                            transition: 'all 0.15s',
                          }}
                        >
                          ✓ Joyfully Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => updateEventResponse(i, eventKey, false)}
                          className="eyebrow px-5 py-2"
                          style={{
                            border: '1px solid var(--charcoal)',
                            background: attending === false ? 'var(--charcoal)' : 'transparent',
                            color: attending === false ? 'var(--cream)' : 'var(--charcoal)',
                            cursor: 'pointer',
                            letterSpacing: '0.15em',
                            transition: 'all 0.15s',
                          }}
                        >
                          Regretfully Decline
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Extra fields — only show if attending at least one event */}
                {Object.values(guestForm.events).some((v) => v === true) && (
                  <div className="flex flex-col gap-4 mt-2">
                    <div>
                      <label className="eyebrow block mb-1" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                        Dietary Restrictions (optional)
                      </label>
                      <input
                        type="text"
                        value={guestForm.dietaryRestrictions}
                        onChange={(e) => updateGuestField(i, 'dietaryRestrictions', e.target.value)}
                        placeholder="e.g. Vegetarian, nut allergy..."
                        className="w-full max-w-md px-3 py-2 bg-white border border-gray-200 rounded font-display"
                        style={{ fontSize: '0.95rem', color: 'var(--charcoal)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                        Song Request (optional)
                      </label>
                      <input
                        type="text"
                        value={guestForm.songRequest}
                        onChange={(e) => updateGuestField(i, 'songRequest', e.target.value)}
                        placeholder="What song will get you on the dance floor?"
                        className="w-full max-w-md px-3 py-2 bg-white border border-gray-200 rounded font-display"
                        style={{ fontSize: '0.95rem', color: 'var(--charcoal)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                        Message to Eli & Naomi (optional)
                      </label>
                      <textarea
                        value={guestForm.message}
                        onChange={(e) => updateGuestField(i, 'message', e.target.value)}
                        placeholder="Share your wishes..."
                        rows={3}
                        className="w-full max-w-md px-3 py-2 bg-white border border-gray-200 rounded font-display resize-none"
                        style={{ fontSize: '0.95rem', color: 'var(--charcoal)', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {submitError && (
              <p className="font-display mt-4 text-center" style={{ color: '#c0392b', fontSize: '0.9rem' }}>
                {submitError}
              </p>
            )}

            <div className="text-center mt-10">
              <button type="submit" className="btn-dark" disabled={submitting || !canSubmit}>
                {submitting ? 'Submitting...' : 'Submit RSVP'}
              </button>
              {!canSubmit && (
                <p className="eyebrow mt-3" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                  Please respond to all events for each guest
                </p>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ── Done ── */}
      {step === 'done' && (
        <div className="w-full max-w-xl text-center py-12">
          <p className="eyebrow mb-6" style={{ color: 'var(--muted)', letterSpacing: '0.3em' }}>Your RSVP Response</p>
          <div className="divider mb-10" />

          {guestForms.map((f) => (
            <div key={f.guestId} className="py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <p className="font-display mb-3" style={{ fontSize: '1.2rem', color: 'var(--charcoal)' }}>{f.name}</p>
              {Object.entries(f.events).map(([eventKey, attending]) => (
                <div key={eventKey} className="flex items-center justify-between py-1">
                  <p className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                    {EVENT_LABELS[eventKey]?.name}
                  </p>
                  <p className="font-display" style={{ fontSize: '0.9rem', color: attending ? '#2d7a4f' : 'var(--muted)' }}>
                    {attending ? '✓ Attending' : 'Declining'}
                  </p>
                </div>
              ))}
            </div>
          ))}

          <div className="mt-12">
            <p className="font-display" style={{ fontSize: '1.2rem', color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
              {anyAttending ? 'Thank you! We can\'t wait to celebrate with you.' : 'We\'ll miss you — thank you for letting us know.'}
            </p>
            {!anyAttending && (
              <p className="eyebrow mb-6" style={{ color: 'var(--muted)', fontSize: '0.6rem', lineHeight: 1.8 }}>
                If you'd still like to celebrate with us from afar,<br />
                <a href="/registry" style={{ color: 'var(--charcoal)', borderBottom: '1px solid currentColor', textDecoration: 'none' }}>
                  our registry
                </a>{' '}is always open.
              </p>
            )}
            <a href="/" className="btn-dark">
              Visit Our Website
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
