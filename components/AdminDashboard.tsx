'use client';

import { useState, useEffect } from 'react';
import Monogram from './Monogram';

interface RsvpRow {
  event: string;
  attending: boolean;
  dietary_restrictions: string | null;
  song_request: string | null;
  message: string | null;
  submitted_at: string | null;
}

interface GuestRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  party: { name: string; invited_events: string[] };
  rsvps: RsvpRow[];
  invited_at: string | null;
}

export default function AdminDashboard() {
  const [guests, setGuests] = useState<GuestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'guests' | 'dietary' | 'songs' | 'upload'>('overview');
  const [csvText, setCsvText] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [inviting, setInviting] = useState<string | null>(null);
  const [rsvpModal, setRsvpModal] = useState<'attending' | 'declined' | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/guests')
      .then((r) => r.json())
      .then((d) => { setGuests(d.guests || []); setLoading(false); });
  }, []);

  const hasRsvp = (g: GuestRow) => g.rsvps && g.rsvps.length > 0;
  const isAttending = (g: GuestRow) => g.rsvps?.some((r) => r.attending);
  const attending = guests.filter(isAttending).length;
  const declined = guests.filter((g) => hasRsvp(g) && !isAttending(g)).length;
  const pending = guests.filter((g) => !hasRsvp(g)).length;
  const invited = guests.filter((g) => g.invited_at).length;

  const rsvpStatus = (g: GuestRow) => {
    if (!hasRsvp(g)) return { label: 'Pending', color: 'var(--muted)' };
    const ceremony = g.rsvps.find((r) => r.event === 'ceremony');
    const rehearsal = g.rsvps.find((r) => r.event === 'rehearsal');
    const parts = [];
    if (ceremony) parts.push(`Ceremony: ${ceremony.attending ? '✓' : '✗'}`);
    if (rehearsal) parts.push(`Dinner: ${rehearsal.attending ? '✓' : '✗'}`);
    const anyAttending = g.rsvps.some((r) => r.attending);
    return { label: parts.join(' · '), color: anyAttending ? '#2d7a4f' : '#c0392b' };
  };

  async function handleSendAllUninvited() {
    const uninvited = guests.filter((g) => g.email && !g.invited_at);
    if (uninvited.length === 0) return;
    if (!window.confirm(`Send invitations to ${uninvited.length} uninvited guest${uninvited.length === 1 ? '' : 's'}?`)) return;
    for (const g of uninvited) {
      setInviting(g.id);
      try {
        const res = await fetch('/api/admin/invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guestId: g.id }),
        });
        const data = await res.json();
        if (res.ok) {
          setGuests((prev) => prev.map((p) => p.id === g.id ? { ...p, invited_at: new Date().toISOString() } : p));
        } else {
          console.error(`Failed to invite ${g.first_name} ${g.last_name}: ${data.error}`);
        }
      } catch {
        console.error(`Error inviting ${g.first_name} ${g.last_name}`);
      }
      setInviting(null);
      // Small delay to avoid hammering the email API
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  async function handleUpload() {
    if (!csvText.trim()) return;
    setUploading(true);
    setUploadStatus('');
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: csvText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const errorMsg = data.errors?.length ? ` Errors: ${data.errors.join('; ')}` : '';
      setUploadStatus(`✓ Uploaded ${data.count} guests successfully.${errorMsg}`);
      setCsvText('');
      // Refresh
      const r2 = await fetch('/api/admin/guests');
      const d2 = await r2.json();
      setGuests(d2.guests || []);
    } catch (err: unknown) {
      setUploadStatus(`Error: ${err instanceof Error ? err.message : 'Upload failed'}`);
    } finally {
      setUploading(false);
    }
  }

  function handleExportCsv() {
    // Group guests by party name
    const parties: Record<string, GuestRow[]> = {};
    for (const g of guests) {
      const key = g.party?.name || 'Unknown';
      if (!parties[key]) parties[key] = [];
      parties[key].push(g);
    }

    const rows: string[][] = [
      ['Party', 'Guest Name', 'Email', 'Ceremony', 'Rehearsal Dinner', 'Dietary Restrictions', 'Song Request', 'Message'],
    ];

    for (const [partyName, members] of Object.entries(parties)) {
      for (const g of members) {
        const ceremony = g.rsvps?.find((r) => r.event === 'ceremony');
        const rehearsal = g.rsvps?.find((r) => r.event === 'rehearsal');
        const rsvpFor = (r: RsvpRow | undefined) => !r ? 'Pending' : r.attending ? 'Yes' : 'No';
        const dietary = g.rsvps?.find((r) => r.dietary_restrictions)?.dietary_restrictions || '';
        const song = g.rsvps?.find((r) => r.song_request)?.song_request || '';
        const message = g.rsvps?.find((r) => r.message)?.message || '';
        rows.push([
          partyName,
          `${g.first_name} ${g.last_name}`,
          g.email || '',
          rsvpFor(ceremony),
          rsvpFor(rehearsal),
          dietary,
          song,
          message,
        ]);
      }
      // blank row between parties
      rows.push(['', '', '', '', '', '', '', '']);
    }

    const csv = rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete(guestId: string, name: string) {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    setDeleting(guestId);
    try {
      const res = await fetch('/api/admin/guests', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId }),
      });
      if (res.ok) {
        setGuests((prev) => prev.filter((g) => g.id !== guestId));
      } else {
        alert('Failed to delete guest.');
      }
    } finally {
      setDeleting(null);
    }
  }

  async function handleSendInvite(guestId: string) {
    setInviting(guestId);
    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGuests((prev) =>
        prev.map((g) => g.id === guestId ? { ...g, invited_at: new Date().toISOString() } : g)
      );
    } catch (err) {
      alert('Failed to send invite. Please try again.');
    } finally {
      setInviting(null);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="border-b py-6 px-8 flex items-center justify-between" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        <div className="flex items-center gap-4">
          <Monogram size={40} />
          <div>
            <p className="font-display-sc" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--charcoal)' }}>
              Admin Dashboard
            </p>
            <p className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>
              Naomi & Eli · October 19, 2026
            </p>
          </div>
        </div>
        <a href="/" className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.6rem', borderBottom: '1px solid var(--muted)' }}>
          View Site
        </a>
      </div>

      {/* Tabs */}
      <div className="px-8 pt-6 flex gap-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        {(['overview', 'guests', 'dietary', 'songs', 'upload'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="eyebrow pb-3"
            style={{
              color: tab === t ? 'var(--charcoal)' : 'var(--muted)',
              background: 'none',
              border: 'none',
              borderBottom: tab === t ? '2px solid var(--charcoal)' : '2px solid transparent',
              cursor: 'pointer',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: '0.65rem',
              padding: '0 0 0.75rem 0',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-8 py-8">
        {/* Overview Tab */}
        {tab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Total Invited', value: guests.length, key: null },
                { label: 'Attending', value: attending, key: 'attending' as const },
                { label: 'Declined', value: declined, key: 'declined' as const },
                { label: 'Awaiting RSVP', value: pending, key: null },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 text-center"
                  onClick={() => stat.key && setRsvpModal(stat.key)}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.08)',
                    cursor: stat.key ? 'pointer' : 'default',
                    transition: 'box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => { if (stat.key) (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  <p className="font-display" style={{ fontSize: '2.5rem', color: 'var(--charcoal)', lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p className="eyebrow mt-2" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>
                    {stat.label}{stat.key ? ' ↗' : ''}
                  </p>
                </div>
              ))}
            </div>

            {/* Attending / Declined modal */}
            {rsvpModal && (
              <div
                onClick={() => setRsvpModal(null)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ background: 'white', maxWidth: '480px', width: '100%', maxHeight: '70vh', overflowY: 'auto', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <p className="eyebrow" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--charcoal)' }}>
                      {rsvpModal === 'attending' ? 'Attending' : 'Declined'}
                    </p>
                    <button onClick={() => setRsvpModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
                  </div>
                  {guests
                    .filter(rsvpModal === 'attending' ? isAttending : (g) => hasRsvp(g) && !isAttending(g))
                    .map((g) => {
                      const ceremony = g.rsvps?.find((r) => r.event === 'ceremony');
                      const rehearsal = g.rsvps?.find((r) => r.event === 'rehearsal');
                      return (
                        <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                          <p className="font-display" style={{ fontSize: '0.95rem', color: 'var(--charcoal)' }}>
                            {g.first_name} {g.last_name}
                          </p>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {ceremony && (
                              <span className="eyebrow" style={{ fontSize: '0.5rem', padding: '2px 7px', background: ceremony.attending ? 'rgba(45,122,79,0.1)' : 'rgba(192,57,43,0.08)', color: ceremony.attending ? '#2d7a4f' : '#c0392b' }}>
                                Ceremony {ceremony.attending ? '✓' : '✗'}
                              </span>
                            )}
                            {rehearsal && (
                              <span className="eyebrow" style={{ fontSize: '0.5rem', padding: '2px 7px', background: rehearsal.attending ? 'rgba(45,122,79,0.1)' : 'rgba(192,57,43,0.08)', color: rehearsal.attending ? '#2d7a4f' : '#c0392b' }}>
                                Dinner {rehearsal.attending ? '✓' : '✗'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            )}

            {/* Recent RSVPs */}
            {(() => {
              const recentRsvps = guests
                .flatMap((g) => (g.rsvps || []).map((r) => ({ guest: g, rsvp: r })))
                .filter((x) => x.rsvp.submitted_at)
                .sort((a, b) => new Date(b.rsvp.submitted_at!).getTime() - new Date(a.rsvp.submitted_at!).getTime())
                .filter((x, i, arr) => arr.findIndex((y) => y.guest.id === x.guest.id) === i)
                .slice(0, 8);
              return recentRsvps.length > 0 ? (
                <div className="mb-10">
                  <p className="eyebrow mb-4" style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.25em' }}>
                    Recent RSVPs
                  </p>
                  <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
                    {recentRsvps.map(({ guest: g, rsvp: r }) => {
                      const submitted = new Date(r.submitted_at!);
                      const now = new Date();
                      const diffMs = now.getTime() - submitted.getTime();
                      const diffDays = Math.floor(diffMs / 86400000);
                      const diffHours = Math.floor(diffMs / 3600000);
                      const diffMins = Math.floor(diffMs / 60000);
                      const timeAgo = diffDays > 0 ? `${diffDays}d ago` : diffHours > 0 ? `${diffHours}h ago` : diffMins > 0 ? `${diffMins}m ago` : 'just now';
                      const anyAttending = g.rsvps.some((x) => x.attending);
                      return (
                        <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: anyAttending ? '#2d7a4f' : '#c0392b', flexShrink: 0 }} />
                            <p className="font-display" style={{ fontSize: '0.9rem', color: 'var(--charcoal)' }}>
                              {g.first_name} {g.last_name}
                            </p>
                          </div>
                          <p className="eyebrow" style={{ fontSize: '0.55rem', color: 'var(--muted)' }}>
                            {timeAgo}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null;
            })()}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.25em' }}>
                  Invitations Sent: {invited} / {guests.length}
                </p>
                {guests.filter((g) => g.email && !g.invited_at).length > 0 && (
                  <button
                    onClick={handleSendAllUninvited}
                    className="eyebrow"
                    disabled={!!inviting}
                    style={{
                      fontSize: '0.55rem',
                      color: 'white',
                      background: 'var(--charcoal)',
                      border: 'none',
                      padding: '0.4rem 1rem',
                      cursor: 'pointer',
                      letterSpacing: '0.15em',
                      opacity: inviting ? 0.5 : 1,
                    }}
                  >
                    Send All Uninvited ({guests.filter((g) => g.email && !g.invited_at).length})
                  </button>
                )}
              </div>
              <div className="w-full h-1 rounded" style={{ background: 'rgba(0,0,0,0.1)' }}>
                <div
                  className="h-1 rounded"
                  style={{ background: 'var(--charcoal)', width: guests.length ? `${(invited / guests.length) * 100}%` : '0%', transition: 'width 0.5s' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Guests Tab */}
        {tab === 'guests' && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleExportCsv}
                className="eyebrow"
                style={{
                  fontSize: '0.55rem',
                  color: 'var(--charcoal)',
                  background: 'none',
                  border: '1px solid var(--charcoal)',
                  padding: '0.4rem 1rem',
                  cursor: 'pointer',
                  letterSpacing: '0.15em',
                }}
              >
                Export CSV
              </button>
            </div>
            {loading ? (
              <p className="font-display" style={{ color: 'var(--muted)' }}>Loading...</p>
            ) : (
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
                    {['Name', 'Party', 'Email', 'Invited', 'RSVP', 'Dietary', 'Action'].map((h) => (
                      <th key={h} className="eyebrow text-left pb-3 pr-4" style={{ color: 'var(--muted)', fontSize: '0.55rem', letterSpacing: '0.2em', fontWeight: 400 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guests.map((g) => (
                    <tr key={g.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td className="font-display py-3 pr-4" style={{ fontSize: '0.95rem', color: 'var(--charcoal)' }}>
                        {g.first_name} {g.last_name}
                      </td>
                      <td className="eyebrow py-3 pr-4" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                        {g.party?.name || '—'}
                      </td>
                      <td className="eyebrow py-3 pr-4" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                        {g.email || '—'}
                      </td>
                      <td className="eyebrow py-3 pr-4" style={{ fontSize: '0.6rem', color: g.invited_at ? '#2d7a4f' : 'var(--muted)' }}>
                        {g.invited_at ? '✓ Sent' : 'Not sent'}
                      </td>
                      <td className="eyebrow py-3 pr-4" style={{ fontSize: '0.6rem', color: rsvpStatus(g).color }}>
                        {rsvpStatus(g).label}
                      </td>
                      <td className="eyebrow py-3 pr-4" style={{ fontSize: '0.6rem', color: 'var(--muted)', maxWidth: '160px' }}>
                        {g.rsvps?.find((r) => r.dietary_restrictions)?.dietary_restrictions || '—'}
                      </td>
                      <td className="py-3">
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {g.email && (
                            <button
                              onClick={() => handleSendInvite(g.id)}
                              className="eyebrow"
                              disabled={inviting === g.id}
                              style={{
                                fontSize: '0.55rem',
                                color: 'var(--charcoal)',
                                background: 'none',
                                border: '1px solid var(--charcoal)',
                                padding: '0.25rem 0.75rem',
                                cursor: 'pointer',
                                letterSpacing: '0.15em',
                                opacity: inviting === g.id ? 0.5 : 1,
                              }}
                            >
                              {inviting === g.id ? 'Sending...' : g.invited_at ? 'Resend' : 'Invite'}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(g.id, `${g.first_name} ${g.last_name}`)}
                            className="eyebrow"
                            disabled={deleting === g.id}
                            style={{
                              fontSize: '0.55rem',
                              color: '#c0392b',
                              background: 'none',
                              border: '1px solid #c0392b',
                              padding: '0.25rem 0.75rem',
                              cursor: 'pointer',
                              letterSpacing: '0.15em',
                              opacity: deleting === g.id ? 0.5 : 1,
                            }}
                          >
                            {deleting === g.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Dietary Tab */}
        {tab === 'dietary' && (
          <div>
            {loading ? (
              <p className="font-display" style={{ color: 'var(--muted)' }}>Loading...</p>
            ) : (() => {
              const dietaryGuests = guests.filter((g) => g.rsvps?.some((r) => r.dietary_restrictions));
              return dietaryGuests.length === 0 ? (
                <p className="font-display" style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>No dietary restrictions submitted yet.</p>
              ) : (
                <div>
                  <p className="eyebrow mb-6" style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                    {dietaryGuests.length} {dietaryGuests.length === 1 ? 'guest' : 'guests'} with restrictions
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {dietaryGuests.map((g) => {
                      const dietary = g.rsvps.find((r) => r.dietary_restrictions)?.dietary_restrictions;
                      return (
                        <div key={g.id} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                          <p className="font-display" style={{ fontSize: '0.95rem', color: 'var(--charcoal)', minWidth: '160px' }}>
                            {g.first_name} {g.last_name}
                          </p>
                          <p className="eyebrow" style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                            {dietary}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Songs Tab */}
        {tab === 'songs' && (
          <div>
            {loading ? (
              <p className="font-display" style={{ color: 'var(--muted)' }}>Loading...</p>
            ) : (() => {
              const songGuests = guests.filter((g) => g.rsvps?.some((r) => r.song_request));
              return songGuests.length === 0 ? (
                <p className="font-display" style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>No song requests yet.</p>
              ) : (
                <div>
                  <p className="eyebrow mb-6" style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                    {songGuests.length} {songGuests.length === 1 ? 'request' : 'requests'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {songGuests.map((g) => {
                      const song = g.rsvps.find((r) => r.song_request)?.song_request;
                      return (
                        <div key={g.id} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                          <p className="font-display" style={{ fontSize: '0.95rem', color: 'var(--charcoal)', minWidth: '160px' }}>
                            {g.first_name} {g.last_name}
                          </p>
                          <p className="font-display" style={{ fontSize: '0.9rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                            {song}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Upload Tab */}
        {tab === 'upload' && (
          <div className="max-w-2xl">
            <p className="font-display mb-2" style={{ fontSize: '1.1rem', color: 'var(--charcoal)' }}>
              Upload Guest List
            </p>
            <p className="font-display mb-6" style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              CSV columns: <code style={{ background: 'rgba(0,0,0,0.06)', padding: '0.1rem 0.3rem', borderRadius: '3px', fontSize: '0.8rem' }}>party_name, first_name, last_name, email, invited_events</code>
            </p>

            <div className="mb-6 p-4 rounded" style={{ background: 'rgba(0,0,0,0.04)', fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--muted)' }}>
              party_name,first_name,last_name,email,invited_events<br />
              Naomi & Eli,Naomi,Alsberg,,rehearsal,ceremony<br />
              Naomi & Eli,Eli,Minsky,eli@example.com,rehearsal,ceremony<br />
              Cohen Family,David,Cohen,david@example.com,ceremony
            </div>

            {/* File upload */}
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                border: '2px dashed rgba(0,0,0,0.15)',
                borderRadius: '6px',
                padding: '40px 24px',
                cursor: 'pointer',
                background: csvText ? 'rgba(45,122,79,0.04)' : 'white',
                transition: 'background 0.2s',
              }}
            >
              <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => setCsvText(ev.target?.result as string);
                  reader.readAsText(file);
                }}
              />
              {csvText ? (
                <p className="font-display" style={{ color: '#2d7a4f', fontSize: '0.95rem' }}>✓ File loaded — ready to upload</p>
              ) : (
                <>
                  <p className="font-display" style={{ color: 'var(--charcoal)', fontSize: '0.95rem' }}>Click to select your CSV file</p>
                  <p className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>or drag and drop</p>
                </>
              )}
            </label>

            {uploadStatus && (
              <p
                className="font-display mt-4"
                style={{ fontSize: '0.9rem', color: uploadStatus.startsWith('✓') ? '#2d7a4f' : '#c0392b' }}
              >
                {uploadStatus}
              </p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpload}
                className="btn-dark"
                disabled={uploading || !csvText.trim()}
              >
                {uploading ? 'Uploading...' : 'Upload Guests'}
              </button>
              {csvText && (
                <button
                  onClick={() => { setCsvText(''); setUploadStatus(''); }}
                  className="eyebrow"
                  style={{ color: 'var(--muted)', background: 'none', border: '1px solid rgba(0,0,0,0.15)', padding: '0 1.5rem', cursor: 'pointer', fontSize: '0.6rem' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
