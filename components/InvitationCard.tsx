'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'envelope' | 'opening' | 'card';

const INK = '#2C2825';
const INK_MID = 'rgba(44,40,37,0.42)';
const INK_LIGHT = 'rgba(44,40,37,0.2)';
const INK_WARM = 'rgba(44,40,37,0.1)';

// ── Consul House architectural sketch ────────────────────────────────────────
function ConsulHouseSketch() {
  return (
    <svg
      viewBox="0 0 300 205"
      style={{ width: '100%', maxWidth: '290px', display: 'block', margin: '0 auto' }}
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      {/* ── FOLIAGE ── */}
      {/* Left cluster */}
      <path
        d="M 0,44 C 0,28 10,16 24,20 C 20,8 34,2 44,10 C 44,2 56,0 60,10 C 70,4 76,14 70,22 C 80,20 84,30 76,38 C 80,46 72,54 62,50 C 60,58 48,60 42,52 C 34,58 22,54 16,46 C 8,50 0,46 0,44 Z"
        fill={INK} opacity="0.72"
      />
      {/* Left trailing vines */}
      <path d="M 14,50 C 10,62 6,76 4,92" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.45"/>
      <path d="M 22,54 C 20,66 18,80 20,94" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.38"/>
      {/* Small left leaves on vine */}
      <ellipse cx="10" cy="72" rx="5" ry="3" fill={INK} opacity="0.35" transform="rotate(-30 10 72)"/>
      <ellipse cx="6" cy="88" rx="4" ry="2.5" fill={INK} opacity="0.30" transform="rotate(20 6 88)"/>

      {/* Center-left cluster */}
      <path
        d="M 76,50 C 78,36 90,26 102,30 C 98,18 112,12 120,20 C 118,10 130,8 136,16 C 146,10 152,20 146,28 C 156,26 160,36 152,44 C 156,52 148,60 138,56 C 136,64 124,66 118,58 C 110,64 100,60 98,52 C 90,54 80,52 76,50 Z"
        fill={INK} opacity="0.60"
      />
      <path d="M 96,54 C 92,66 90,78 92,90" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.38"/>

      {/* Center cluster */}
      <path
        d="M 128,48 C 130,34 142,24 154,28 C 152,16 166,10 174,18 C 180,10 192,14 190,24 C 200,22 204,32 196,40 C 200,48 192,56 182,52 C 180,60 168,62 162,54 C 154,60 144,56 140,48 C 134,52 128,50 128,48 Z"
        fill={INK} opacity="0.55"
      />

      {/* Right cluster */}
      <path
        d="M 196,46 C 196,30 208,18 222,22 C 218,10 232,4 242,12 C 242,4 254,2 258,12 C 268,6 274,16 268,24 C 278,22 282,32 274,40 C 278,48 270,56 260,52 C 258,60 246,62 240,54 C 230,60 218,56 212,48 C 204,52 196,48 196,46 Z"
        fill={INK} opacity="0.68"
      />
      {/* Right trailing vines */}
      <path d="M 270,52 C 274,64 278,78 276,92" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.42"/>
      <path d="M 284,46 C 288,60 292,74 290,88" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.35"/>
      <ellipse cx="278" cy="72" rx="5" ry="3" fill={INK} opacity="0.32" transform="rotate(25 278 72)"/>

      {/* Far right wisp */}
      <path
        d="M 268,44 C 278,36 290,34 298,40 C 296,30 298,20 296,12 C 294,22 290,32 286,40 C 290,32 292,22 290,14 C 286,24 284,36 284,44 Z"
        fill={INK} opacity="0.42"
      />

      {/* ── TERRACE EDGE ── */}
      <path d="M 0,56 C 30,52 80,58 140,54 C 200,50 250,56 300,54"
        fill="none" stroke={INK} strokeWidth="1.4" opacity="0.7"/>
      <path d="M 0,60 L 300,60"
        fill="none" stroke={INK} strokeWidth="0.6" opacity="0.3"/>

      {/* ── STONE WALL (above arches) ── */}
      <path d="M 0,66 L 300,66" fill="none" stroke={INK_MID} strokeWidth="0.6"/>
      <path d="M 0,74 L 300,74" fill="none" stroke={INK_MID} strokeWidth="0.4"/>
      {/* Block joints */}
      {[32,68,94,106,145,194,206,245,278].map(x => (
        <path key={x} d={`M ${x},60 L ${x},76`} fill="none" stroke={INK_MID} strokeWidth="0.4"/>
      ))}

      {/* ── ARCH INTERIORS (warm glow) ── */}
      {/* Left */}
      <path d="M 13,172 L 13,88 C 13,48 50,38 50,38 C 50,38 87,48 87,88 L 87,172 Z"
        fill="rgba(255,210,140,0.11)" stroke="none"/>
      {/* Center */}
      <path d="M 113,172 L 113,88 C 113,48 150,38 150,38 C 150,38 187,48 187,88 L 187,172 Z"
        fill="rgba(255,210,140,0.14)" stroke="none"/>
      {/* Right */}
      <path d="M 213,172 L 213,88 C 213,48 250,38 250,38 C 250,38 287,48 287,88 L 287,172 Z"
        fill="rgba(255,210,140,0.11)" stroke="none"/>

      {/* ── STONE ARCH SURROUNDS (outer) ── */}
      <path d="M 5,172 L 5,82 C 5,36 50,26 50,26 C 50,26 95,36 95,82 L 95,172"
        fill="none" stroke={INK} strokeWidth="1.4"/>
      <path d="M 105,172 L 105,82 C 105,36 150,26 150,26 C 150,26 195,36 195,82 L 195,172"
        fill="none" stroke={INK} strokeWidth="1.4"/>
      <path d="M 205,172 L 205,82 C 205,36 250,26 250,26 C 250,26 295,36 295,82 L 295,172"
        fill="none" stroke={INK} strokeWidth="1.4"/>

      {/* ── ARCH INNER OPENINGS ── */}
      <path d="M 13,172 L 13,88 C 13,48 50,38 50,38 C 50,38 87,48 87,88 L 87,172"
        fill="none" stroke={INK} strokeWidth="0.9" opacity="0.75"/>
      <path d="M 113,172 L 113,88 C 113,48 150,38 150,38 C 150,38 187,48 187,88 L 187,172"
        fill="none" stroke={INK} strokeWidth="0.9" opacity="0.75"/>
      <path d="M 213,172 L 213,88 C 213,48 250,38 250,38 C 250,38 287,48 287,88 L 287,172"
        fill="none" stroke={INK} strokeWidth="0.9" opacity="0.75"/>

      {/* ── STONE TEXTURE on piers ── */}
      {[88,100,112,124,136,148,160].map(y => (
        <path key={y} d={`M 95,${y} L 105,${y}`} fill="none" stroke={INK_MID} strokeWidth="0.5"/>
      ))}
      {[88,100,112,124,136,148,160].map(y => (
        <path key={y} d={`M 195,${y} L 205,${y}`} fill="none" stroke={INK_MID} strokeWidth="0.5"/>
      ))}
      {/* Side wall texture */}
      {[88,100,112,124,136].map(y => (
        <path key={y} d={`M 0,${y} L 5,${y}`} fill="none" stroke={INK_MID} strokeWidth="0.5"/>
      ))}
      {[88,100,112,124,136].map(y => (
        <path key={y} d={`M 295,${y} L 300,${y}`} fill="none" stroke={INK_MID} strokeWidth="0.5"/>
      ))}

      {/* ── INTERIOR DETAILS (center arch = bar) ── */}
      <path d="M 118,155 L 182,155" fill="none" stroke={INK_LIGHT} strokeWidth="1"/>
      <path d="M 118,145 L 182,145" fill="none" stroke={INK_WARM} strokeWidth="0.6"/>
      {[122,126,130,134,138,142,146,150,154,158,162,166,170,174,178].map(x => (
        <path key={x} d={`M ${x},155 L ${x},143`} fill="none" stroke={INK_WARM} strokeWidth="0.8"/>
      ))}
      {/* Tables suggestion in side arches */}
      <path d="M 20,165 L 80,165" fill="none" stroke={INK_WARM} strokeWidth="0.8"/>
      <path d="M 220,165 L 280,165" fill="none" stroke={INK_WARM} strokeWidth="0.8"/>

      {/* ── GROUND LINE ── */}
      <path d="M 0,172 L 300,172" fill="none" stroke={INK} strokeWidth="1.6" opacity="0.8"/>

      {/* ── LOWER STONE ARCHES ── */}
      <path d="M 0,200 C 16,172 38,172 50,172 C 62,172 84,172 100,200"
        fill="none" stroke={INK} strokeWidth="0.9" opacity="0.38"/>
      <path d="M 100,200 C 116,172 138,172 150,172 C 162,172 184,172 200,200"
        fill="none" stroke={INK} strokeWidth="0.9" opacity="0.38"/>
      <path d="M 200,200 C 216,172 238,172 250,172 C 262,172 284,172 300,200"
        fill="none" stroke={INK} strokeWidth="0.9" opacity="0.38"/>

      {/* ── RAILING / TERRACE ── */}
      <path d="M 0,178 L 300,178" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.35"/>
      {[8,18,28,38,48,58,68,78,88,100,110,120,130,140,150,160,170,180,190,202,212,222,232,242,252,262,272,282,292].map(x => (
        <path key={x} d={`M ${x},172 L ${x},182`} fill="none" stroke={INK} strokeWidth="0.5" opacity="0.25"/>
      ))}

      {/* Small plants in front of arches */}
      <path d="M 44,172 C 44,162 46,154 44,148 C 42,154 42,162 44,172 Z" fill={INK} opacity="0.28"/>
      <path d="M 50,172 C 52,160 56,152 54,144 C 52,152 48,160 50,172 Z" fill={INK} opacity="0.28"/>
      <path d="M 155,172 C 156,162 158,152 156,145 C 154,152 153,162 155,172 Z" fill={INK} opacity="0.28"/>
      <path d="M 250,172 C 250,162 252,154 250,148 C 248,154 248,162 250,172 Z" fill={INK} opacity="0.25"/>

    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function InvitationCard({ guestName }: { guestName?: string }) {
  const [phase, setPhase] = useState<Phase>('envelope');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 1800);
    const t2 = setTimeout(() => setPhase('card'), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ background: '#F5F2EE', minHeight: '100vh' }}>

      {/* ── Envelope overlay ── */}
      <AnimatePresence>
        {phase !== 'card' && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{ position: 'fixed', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
          >
            <div style={{ position: 'relative', width: '440px', perspective: '1200px' }}>
              <div style={{ width: '440px', height: '300px', background: '#1C1C1C', border: '1px solid rgba(201,169,110,0.25)', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '34px', color: '#FAF8F5', textAlign: 'center', lineHeight: 1.4 }}>
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
                <p style={{ margin: 0, color: '#C9A96E', fontSize: '11px', letterSpacing: '2px', fontFamily: "'Cormorant Garamond', serif", textAlign: 'center' }}>E & N</p>
                <p style={{ margin: '2px 0 0', color: 'rgba(201,169,110,0.55)', fontSize: '8px', letterSpacing: '1px', fontFamily: "'Cormorant Garamond', serif", textAlign: 'center' }}>OCT 2026</p>
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
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 24px 60px' }}>
              <div style={{ width: '100%', maxWidth: '420px', background: '#FAF9F6', textAlign: 'center', padding: '48px 40px 40px', boxShadow: '0 2px 40px rgba(0,0,0,0.08)' }}>

                {/* Venue sketch */}
                <div style={{ marginBottom: '36px' }}>
                  <ConsulHouseSketch />
                </div>

                {/* Names */}
                <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 400, color: INK, letterSpacing: '0.18em', lineHeight: 1.3, marginBottom: '20px' }}>
                  NAOMI &amp; ELI
                </p>

                {/* Italic subtitle */}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontStyle: 'italic', color: 'rgba(44,40,37,0.65)', lineHeight: 1.8, marginBottom: '24px' }}>
                  together with their families<br />
                  invite you to celebrate their wedding day
                </p>

                {/* Divider */}
                <div style={{ width: '48px', height: '1px', background: 'rgba(44,40,37,0.25)', margin: '0 auto 24px' }} />

                {/* Day */}
                <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: '13px', fontWeight: 400, color: INK, letterSpacing: '0.22em', marginBottom: '6px' }}>
                  MONDAY
                </p>

                {/* Date */}
                <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: '13px', fontWeight: 400, color: INK, letterSpacing: '0.22em', marginBottom: '24px' }}>
                  19 OCTOBER 2026
                </p>

                {/* Ceremony details */}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontStyle: 'italic', color: 'rgba(44,40,37,0.65)', lineHeight: 1.9, marginBottom: '24px' }}>
                  ceremony at four o&apos;clock in the evening<br />
                  Consul House, Tel Aviv-Yafo<br />
                  dinner &amp; dancing to follow
                </p>

                {/* Divider */}
                <div style={{ width: '48px', height: '1px', background: 'rgba(44,40,37,0.25)', margin: '0 auto 20px' }} />

                {/* Dress code */}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontStyle: 'italic', color: 'rgba(44,40,37,0.45)', letterSpacing: '0.06em' }}>
                  Fun Formal
                </p>

              </div>
            </div>

            {/* ── Below card: links + RSVP ── */}
            <div style={{ textAlign: 'center', padding: '0 24px 60px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <a
                  href="https://calendar.google.com/calendar/r/eventedit?text=Eli+%26+Naomi%27s+Wedding&dates=20261019T140000Z/20261020T000000Z&location=Consul+House,+Tel+Aviv-Yafo,+Israel"
                  target="_blank" rel="noopener noreferrer"
                  className="eyebrow"
                  style={{ color: INK, fontSize: '0.55rem', borderBottom: `1px solid ${INK}`, textDecoration: 'none', opacity: 0.6 }}
                >
                  Add to Calendar
                </a>
                <a
                  href="https://maps.google.com/?q=Consul+House+HaTsorfim+St+15+Tel+Aviv"
                  target="_blank" rel="noopener noreferrer"
                  className="eyebrow"
                  style={{ color: INK, fontSize: '0.55rem', borderBottom: `1px solid ${INK}`, textDecoration: 'none', opacity: 0.6 }}
                >
                  View Map
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '1px', background: 'rgba(44,40,37,0.2)' }} />
                <p className="eyebrow" style={{ color: 'rgba(44,40,37,0.5)', fontSize: '0.6rem' }}>Please RSVP here</p>
                <Link href="/rsvp" className="btn-dark">RSVP</Link>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
