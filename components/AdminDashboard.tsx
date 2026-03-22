'use client';

import { useState, useEffect } from 'react';
import Monogram from './Monogram';

interface RsvpRow {
  event: string;
  attending: boolean;
  dietary_restrictions: string | null;
  song_request: string | null;
  message: string | null;
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
  const [tab, setTab] = useState<'overview' | 'guests' | 'upload'>('overview');
  const [csvText, setCsvText] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [inviting, setInviting] = useState<string | null>(null);

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
      setUploadStatus(`✓ Uploaded ${data.count} guests successfully.`);
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
              Eli & Naomi · October 19, 2026
            </p>
          </div>
        </div>
        <a href="/" className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.6rem', borderBottom: '1px solid var(--muted)' }}>
          View Site
        </a>
      </div>

      {/* Tabs */}
      <div className="px-8 pt-6 flex gap-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        {(['overview', 'guests', 'upload'] as const).map((t) => (
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
                { label: 'Total Invited', value: guests.length },
                { label: 'Attending', value: attending },
                { label: 'Declined', value: declined },
                { label: 'Awaiting RSVP', value: pending },
              ].map((stat) => (
                <div key={stat.label} className="p-6 text-center" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <p className="font-display" style={{ fontSize: '2.5rem', color: 'var(--charcoal)', lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p className="eyebrow mt-2" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <p className="eyebrow mb-4" style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.25em' }}>
                Invitations Sent: {invited} / {guests.length}
              </p>
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
            {loading ? (
              <p className="font-display" style={{ color: 'var(--muted)' }}>Loading...</p>
            ) : (
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
                    {['Name', 'Party', 'Email', 'Invited', 'RSVP', 'Action'].map((h) => (
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
                      <td className="py-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
              Eli & Naomi,Eli,Minsky,eli@example.com,rehearsal,ceremony<br />
              Eli & Naomi,Naomi,Alsberg,,rehearsal,ceremony<br />
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
