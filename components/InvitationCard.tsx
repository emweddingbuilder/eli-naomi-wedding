'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'envelope' | 'opening' | 'card';

export default function InvitationCard({ guestName }: { guestName?: string }) {
  const [phase, setPhase] = useState<Phase>('envelope');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 1800);
    const t2 = setTimeout(() => setPhase('card'), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>

      {/* ── Envelope overlay ── */}
      <AnimatePresence>
        {phase !== 'card' && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'fixed', inset: 0,
              background: '#111111',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div style={{ position: 'relative', width: '440px', perspective: '1200px' }}>
              {/* Envelope body */}
              <div style={{
                width: '440px', height: '300px',
                background: '#1C1C1C',
                border: '1px solid rgba(201,169,110,0.25)',
                position: 'relative',
              }}>
                {/* Guest name centered — positioned in lower half so flap doesn't cover it */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
                  <p style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: '34px',
                    fontWeight: 400,
                    color: '#FAF8F5',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}>
                    {guestName || 'Our Dear Guest'}
                  </p>
                </div>
              </div>

              {/* Envelope flap — opens with rotateX */}
              <motion.div
                animate={phase === 'opening' ? { rotateX: -178 } : { rotateX: 0 }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '300px',
                  background: '#252525',
                  clipPath: 'polygon(0 0, 100% 0, 50% 52%)',
                  transformOrigin: 'top center',
                  zIndex: 10,
                }}
              />

              {/* Stamp — above flap so always visible */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px',
                border: '2px solid rgba(201,169,110,0.55)',
                padding: '8px 12px',
                zIndex: 20,
                background: '#1C1C1C',
              }}>
                <p style={{ margin: 0, color: '#C9A96E', fontSize: '11px', letterSpacing: '2px', fontFamily: "'Cormorant Garamond', Georgia, serif", textAlign: 'center' }}>E & N</p>
                <p style={{ margin: '2px 0 0', color: 'rgba(201,169,110,0.55)', fontSize: '8px', letterSpacing: '1px', fontFamily: "'Cormorant Garamond', Georgia, serif", textAlign: 'center' }}>OCT 2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Invitation card — shown after animation ── */}
      <AnimatePresence>
        {phase === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Card */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 24px 0' }}>
              <div
                className="invitation-border"
                style={{ width: '100%', maxWidth: '480px', background: 'white', padding: '20px 52px', textAlign: 'center' }}
              >
                {/* Monogram */}
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '56px', fontWeight: 400, color: '#1C1C1C', lineHeight: 1 }}>
                    E
                  </span>
                  <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '34px', fontWeight: 400, color: '#C9A96E', lineHeight: 1, margin: '0 4px' }}>
                    &
                  </span>
                  <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '56px', fontWeight: 400, color: '#1C1C1C', lineHeight: 1 }}>
                    N
                  </span>
                </div>

                {/* Parents */}
                <p className="eyebrow" style={{ color: '#1C1C1C', fontSize: '0.6rem', marginBottom: '2px' }}>
                  Cliff and Laurie Alsberg
                </p>
                <p className="eyebrow" style={{ color: '#1C1C1C', fontSize: '0.6rem', marginBottom: '6px' }}>
                  Jayson Minsky and Jolene Risch
                </p>

                <p className="eyebrow" style={{ color: '#6B6560', fontSize: '0.6rem', lineHeight: 1.7, marginBottom: '7px' }}>
                  request the honour of your presence<br />
                  at the marriage of their children
                </p>

                <div className="divider" style={{ marginBottom: '7px' }} />

                {/* Naomi */}
                <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '46px', color: '#1C1C1C', lineHeight: 1.05, marginBottom: '2px' }}>
                  Naomi
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '13px', color: '#6B6560', letterSpacing: '2px', marginBottom: '4px', direction: 'rtl' }}>
                  נעמי אלסברג
                </p>

                <p className="eyebrow" style={{ color: '#6B6560', fontSize: '0.55rem', letterSpacing: '0.4em', marginBottom: '4px' }}>and</p>

                {/* Eli */}
                <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '46px', color: '#1C1C1C', lineHeight: 1.05, marginBottom: '2px' }}>
                  Eli
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '13px', color: '#6B6560', letterSpacing: '2px', marginBottom: '7px', direction: 'rtl' }}>
                  שמואל מינסקי
                </p>

                <div className="divider" style={{ marginBottom: '7px' }} />

                {/* Date */}
                <p className="eyebrow" style={{ color: '#1C1C1C', fontSize: '0.6rem', lineHeight: 1.7, marginBottom: '7px' }}>
                  Monday, the nineteenth of October<br />
                  two thousand and twenty-six<br />
                  the ceremony will begin at four o&apos;clock in the evening
                </p>

                <div className="divider" style={{ marginBottom: '7px' }} />

                {/* Venue */}
                <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '30px', color: '#1C1C1C', lineHeight: 1.2, marginBottom: '2px' }}>
                  Consul House
                </div>
                <p className="eyebrow" style={{ color: '#6B6560', fontSize: '0.6rem', marginBottom: '7px' }}>
                  Tel Aviv-Yafo, Israel
                </p>

                <div className="divider" style={{ marginBottom: '7px' }} />

                {/* Dress code */}
                <p className="eyebrow" style={{ color: '#6B6560', fontSize: '0.6rem' }}>
                  Fun Formal
                </p>
              </div>

              {/* ── Below card section ── */}
              <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', padding: '16px 24px 20px' }}>
                {guestName && (
                  <p className="eyebrow" style={{ color: '#6B6560', fontSize: '0.65rem', marginBottom: '12px' }}>
                    To: {guestName}
                  </p>
                )}

                {/* Date + venue info */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: '48px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <p className="eyebrow" style={{ color: '#C9A96E', fontSize: '0.55rem', marginBottom: '6px' }}>Date & Time</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#1C1C1C', marginBottom: '2px' }}>Monday, October 19, 2026</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#6B6560', marginBottom: '8px' }}>4:00 PM</p>
                    <a
                      href="https://calendar.google.com/calendar/r/eventedit?text=Eli+%26+Naomi%27s+Wedding&dates=20261019T140000Z/20261020T000000Z&location=Consul+House,+Tel+Aviv-Yafo,+Israel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow"
                      style={{ color: '#1C1C1C', fontSize: '0.55rem', borderBottom: '1px solid #1C1C1C', textDecoration: 'none' }}
                    >
                      Add to Calendar
                    </a>
                  </div>

                  <div style={{ width: '1px', background: 'rgba(0,0,0,0.12)', alignSelf: 'stretch', minHeight: '60px' }} />

                  <div>
                    <p className="eyebrow" style={{ color: '#C9A96E', fontSize: '0.55rem', marginBottom: '6px' }}>Venue</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#1C1C1C', marginBottom: '2px' }}>Consul House</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#6B6560', marginBottom: '8px' }}>Tel Aviv-Yafo, Israel</p>
                    <a
                      href="https://maps.google.com/?q=Consul+House+HaTsorfim+St+15+Tel+Aviv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow"
                      style={{ color: '#1C1C1C', fontSize: '0.55rem', borderBottom: '1px solid #1C1C1C', textDecoration: 'none' }}
                    >
                      View Map
                    </a>
                  </div>
                </div>

                <p className="eyebrow" style={{ color: '#6B6560', fontSize: '0.65rem', marginBottom: '10px' }}>
                  Please RSVP here
                </p>
                <Link href="/rsvp" className="btn-dark">
                  RSVP
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
