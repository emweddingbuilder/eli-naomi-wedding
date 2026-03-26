'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAVY = '#1C3461';
const GOLD = '#C9A96E';
const CREAM = '#FAF8F5';

type Phase = 'envelope' | 'opening' | 'card';

export default function InvitationCard({ guestName }: { guestName?: string }) {
  const [phase, setPhase] = useState<Phase>('envelope');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 1800);
    const t2 = setTimeout(() => setPhase('card'), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>

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
              <div style={{ width: '440px', height: '300px', background: '#1C1C1C', border: '1px solid rgba(201,169,110,0.25)', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '34px', fontWeight: 400, color: CREAM, textAlign: 'center', lineHeight: 1.4 }}>
                    {guestName || 'Our Dear Guest'}
                  </p>
                </div>
              </div>
              <motion.div
                animate={phase === 'opening' ? { rotateX: -178 } : { rotateX: 0 }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '300px', background: '#252525', clipPath: 'polygon(0 0, 100% 0, 50% 52%)', transformOrigin: 'top center', zIndex: 10 }}
              />
              <div style={{ position: 'absolute', top: '16px', right: '16px', border: '2px solid rgba(201,169,110,0.55)', padding: '8px 12px', zIndex: 20, background: '#1C1C1C' }}>
                <p style={{ margin: 0, color: GOLD, fontSize: '11px', letterSpacing: '2px', fontFamily: "'Cormorant Garamond', Georgia, serif", textAlign: 'center' }}>E & N</p>
                <p style={{ margin: '2px 0 0', color: 'rgba(201,169,110,0.55)', fontSize: '8px', letterSpacing: '1px', fontFamily: "'Cormorant Garamond', Georgia, serif", textAlign: 'center' }}>OCT 2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Invitation card ── */}
      <AnimatePresence>
        {phase === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px 40px' }}>

              {/* ── Navy card ── */}
              <div style={{ width: '100%', maxWidth: '420px', background: NAVY, padding: '28px 20px 40px', position: 'relative', textAlign: 'center', overflow: 'hidden' }}>

                {/* Botanical SVG border */}
                <svg
                  viewBox="0 0 420 640"
                  preserveAspectRatio="none"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                >
                  {/* Left vine stem */}
                  <path d="M 26 90 C 20 160 16 240 22 320 C 26 390 18 460 24 530" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.6"/>
                  {/* Left leaves */}
                  <path d="M 25 125 C 10 116 2 104 9 94 C 16 85 24 92 25 125" fill={GOLD} opacity="0.45"/>
                  <path d="M 23 175 C 7 167 0 154 8 144 C 15 136 22 142 23 175" fill={GOLD} opacity="0.45"/>
                  <path d="M 25 225 C 9 217 2 204 10 194 C 17 186 23 192 25 225" fill={GOLD} opacity="0.45"/>
                  <path d="M 23 280 C 7 272 0 259 8 249 C 15 241 22 247 23 280" fill={GOLD} opacity="0.45"/>
                  <path d="M 25 335 C 9 327 2 314 10 304 C 17 296 23 302 25 335" fill={GOLD} opacity="0.45"/>
                  <path d="M 23 385 C 7 377 0 364 8 354 C 15 346 22 352 23 385" fill={GOLD} opacity="0.45"/>
                  <path d="M 25 435 C 9 427 2 414 10 404 C 17 396 23 402 25 435" fill={GOLD} opacity="0.45"/>
                  {/* Left berries */}
                  <circle cx="7" cy="95" r="3" fill={GOLD} opacity="0.65"/>
                  <circle cx="6" cy="146" r="2.5" fill={GOLD} opacity="0.65"/>
                  <circle cx="8" cy="196" r="3" fill={GOLD} opacity="0.65"/>
                  <circle cx="6" cy="251" r="2.5" fill={GOLD} opacity="0.65"/>
                  <circle cx="8" cy="306" r="3" fill={GOLD} opacity="0.65"/>
                  <circle cx="6" cy="356" r="2.5" fill={GOLD} opacity="0.65"/>

                  {/* Right vine stem */}
                  <path d="M 394 90 C 400 160 404 240 398 320 C 394 390 402 460 396 530" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.6"/>
                  {/* Right leaves */}
                  <path d="M 395 125 C 410 116 418 104 411 94 C 404 85 396 92 395 125" fill={GOLD} opacity="0.45"/>
                  <path d="M 397 175 C 413 167 420 154 412 144 C 405 136 398 142 397 175" fill={GOLD} opacity="0.45"/>
                  <path d="M 395 225 C 411 217 418 204 410 194 C 403 186 397 192 395 225" fill={GOLD} opacity="0.45"/>
                  <path d="M 397 280 C 413 272 420 259 412 249 C 405 241 398 247 397 280" fill={GOLD} opacity="0.45"/>
                  <path d="M 395 335 C 411 327 418 314 410 304 C 403 296 397 302 395 335" fill={GOLD} opacity="0.45"/>
                  <path d="M 397 385 C 413 377 420 364 412 354 C 405 346 398 352 397 385" fill={GOLD} opacity="0.45"/>
                  <path d="M 395 435 C 411 427 418 414 410 404 C 403 396 397 402 395 435" fill={GOLD} opacity="0.45"/>
                  {/* Right berries */}
                  <circle cx="413" cy="95" r="3" fill={GOLD} opacity="0.65"/>
                  <circle cx="414" cy="146" r="2.5" fill={GOLD} opacity="0.65"/>
                  <circle cx="412" cy="196" r="3" fill={GOLD} opacity="0.65"/>
                  <circle cx="414" cy="251" r="2.5" fill={GOLD} opacity="0.65"/>
                  <circle cx="412" cy="306" r="3" fill={GOLD} opacity="0.65"/>
                  <circle cx="414" cy="356" r="2.5" fill={GOLD} opacity="0.65"/>

                  {/* Top-left corner branch */}
                  <path d="M 26 90 C 55 52 95 26 138 14" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.6"/>
                  <path d="M 58 62 C 63 46 72 38 84 34" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5"/>
                  <circle cx="86" cy="32" r="3" fill={GOLD} opacity="0.65"/>
                  <path d="M 88 36 C 98 22 110 16 124 13" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5"/>
                  <circle cx="126" cy="11" r="2.5" fill={GOLD} opacity="0.65"/>

                  {/* Top-right corner branch */}
                  <path d="M 394 90 C 365 52 325 26 282 14" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.6"/>
                  <path d="M 362 62 C 357 46 348 38 336 34" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5"/>
                  <circle cx="334" cy="32" r="3" fill={GOLD} opacity="0.65"/>
                  <path d="M 332 36 C 322 22 310 16 296 13" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5"/>
                  <circle cx="294" cy="11" r="2.5" fill={GOLD} opacity="0.65"/>

                  {/* Bottom corners */}
                  <path d="M 24 530 C 55 568 95 586 135 592" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4"/>
                  <circle cx="137" cy="593" r="2.5" fill={GOLD} opacity="0.5"/>
                  <path d="M 396 530 C 365 568 325 586 285 592" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4"/>
                  <circle cx="283" cy="593" r="2.5" fill={GOLD} opacity="0.5"/>
                </svg>

                {/* Arch */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  margin: '0 auto',
                  width: '264px',
                  borderLeft: `1.5px solid ${GOLD}`,
                  borderRight: `1.5px solid ${GOLD}`,
                  borderTop: `1.5px solid ${GOLD}`,
                  borderTopLeftRadius: '132px',
                  borderTopRightRadius: '132px',
                  padding: '32px 20px 20px',
                }}>

                  {/* Star of David */}
                  <div style={{ color: GOLD, fontSize: '20px', marginBottom: '12px', lineHeight: 1 }}>✡</div>

                  {/* Hebrew */}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '13px', color: CREAM, direction: 'rtl', lineHeight: 1.7, marginBottom: '4px', opacity: 0.9 }}>
                    הצטרפו אלינו לחתונה של
                  </p>

                  {/* English subtitle */}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '11px', fontStyle: 'italic', color: 'rgba(250,248,245,0.55)', marginBottom: '14px', letterSpacing: '0.04em' }}>
                    please join us for the wedding of
                  </p>

                  <div style={{ width: '36px', height: '1px', background: GOLD, margin: '0 auto 14px', opacity: 0.7 }} />

                  {/* Names */}
                  <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: '26px', fontWeight: 400, color: GOLD, letterSpacing: '0.08em', marginBottom: '2px', lineHeight: 1.1 }}>
                    Naomi
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: CREAM, fontStyle: 'italic', marginBottom: '2px', opacity: 0.75 }}>
                    &
                  </p>
                  <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: '26px', fontWeight: 400, color: GOLD, letterSpacing: '0.08em', marginBottom: '14px', lineHeight: 1.1 }}>
                    Eli
                  </p>

                  <div style={{ width: '36px', height: '1px', background: GOLD, margin: '0 auto 12px', opacity: 0.7 }} />

                  {/* Hebrew names */}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: CREAM, direction: 'rtl', letterSpacing: '1px', marginBottom: '12px', opacity: 0.75 }}>
                    נעמי שירה &amp; שמואל יצחק
                  </p>

                  {/* Date */}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '13px', color: CREAM, lineHeight: 1.6, marginBottom: '2px', opacity: 0.9 }}>
                    Monday, October 19, 2026
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: 'rgba(250,248,245,0.55)', marginBottom: '10px' }}>
                    4:00 PM
                  </p>

                  {/* Venue */}
                  <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: '13px', color: CREAM, letterSpacing: '0.05em', marginBottom: '2px', opacity: 0.9 }}>
                    Consul House
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: 'rgba(250,248,245,0.55)', marginBottom: '12px' }}>
                    Tel Aviv-Yafo, Israel
                  </p>

                  <div style={{ width: '36px', height: '1px', background: GOLD, margin: '0 auto 10px', opacity: 0.7 }} />

                  {/* Dress code */}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '11px', fontStyle: 'italic', color: 'rgba(250,248,245,0.45)', letterSpacing: '0.1em' }}>
                    Fun Formal
                  </p>
                </div>

                {/* Bottom botanical breathing room */}
                <div style={{ height: '52px' }} />
              </div>

              {/* ── Below card ── */}
              <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center', padding: '24px 24px 32px' }}>

                {/* Date + venue */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '48px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <p className="eyebrow" style={{ color: GOLD, fontSize: '0.55rem', marginBottom: '6px' }}>Date & Time</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#1C1C1C', marginBottom: '2px' }}>Monday, October 19, 2026</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#6B6560', marginBottom: '8px' }}>4:00 PM</p>
                    <a href="https://calendar.google.com/calendar/r/eventedit?text=Eli+%26+Naomi%27s+Wedding&dates=20261019T140000Z/20261020T000000Z&location=Consul+House,+Tel+Aviv-Yafo,+Israel" target="_blank" rel="noopener noreferrer" className="eyebrow" style={{ color: '#1C1C1C', fontSize: '0.55rem', borderBottom: '1px solid #1C1C1C', textDecoration: 'none' }}>
                      Add to Calendar
                    </a>
                  </div>

                  <div style={{ width: '1px', background: 'rgba(0,0,0,0.12)', alignSelf: 'stretch', minHeight: '60px' }} />

                  <div>
                    <p className="eyebrow" style={{ color: GOLD, fontSize: '0.55rem', marginBottom: '6px' }}>Venue</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#1C1C1C', marginBottom: '2px' }}>Consul House</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#6B6560', marginBottom: '8px' }}>Tel Aviv-Yafo, Israel</p>
                    <a href="https://maps.google.com/?q=Consul+House+HaTsorfim+St+15+Tel+Aviv" target="_blank" rel="noopener noreferrer" className="eyebrow" style={{ color: '#1C1C1C', fontSize: '0.55rem', borderBottom: '1px solid #1C1C1C', textDecoration: 'none' }}>
                      View Map
                    </a>
                  </div>
                </div>

                {/* RSVP */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '48px', height: '1px', background: 'rgba(0,0,0,0.15)' }} />
                  <p className="eyebrow" style={{ color: '#6B6560', fontSize: '0.6rem' }}>Please RSVP here</p>
                  <Link href="/rsvp" className="btn-dark">RSVP</Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
