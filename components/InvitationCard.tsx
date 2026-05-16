'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'envelope' | 'opening' | 'card';

const INK = '#2C2825';
const INK_MID = 'rgba(44,40,37,0.36)';
const INK_LIGHT = 'rgba(44,40,37,0.15)';
const INK_FAINT = 'rgba(44,40,37,0.07)';

// ── Arch geometry ─────────────────────────────────────────────────────────────
const G = 200;           // ground y
const OA = 46;           // outer apex y
const IA = 64;           // inner apex y

// Three arches: outer x1/x2, inner ix1/ix2, center cx
const ARCHES = [
  { cx: 66,  x1: 16,  x2: 116, ix1: 27,  ix2: 105 },
  { cx: 178, x1: 128, x2: 228, ix1: 139, ix2: 217 },
  { cx: 290, x1: 240, x2: 340, ix1: 251, ix2: 329 },
] as const;

// Cubic-bezier pointed arch — straight sides, gentle curve at crown
function archPath(x1: number, x2: number, cx: number, apexY: number): string {
  const c1y = G - 32;          // ctrl 1: close to foot → near-vertical start
  const c2y = apexY + 11;      // ctrl 2: just below apex → tight point
  return (
    `M ${x1},${G} ` +
    `C ${x1},${c1y} ${cx},${c2y} ${cx},${apexY} ` +
    `C ${cx},${c2y} ${x2},${c1y} ${x2},${G}`
  );
}

// ── Consul House SVG ──────────────────────────────────────────────────────────
function ConsulHouseSketch() {
  return (
    <svg
      viewBox="0 0 380 248"
      style={{ width: '100%', maxWidth: '320px', display: 'block', margin: '0 auto' }}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ── Warm interior fills ── */}
      {ARCHES.map(({ cx, ix1, ix2 }, i) => (
        <path
          key={`fill-${i}`}
          d={archPath(ix1, ix2, cx, IA) + ' Z'}
          fill={i === 1 ? 'rgba(255,198,105,0.16)' : 'rgba(255,198,105,0.11)'}
          stroke="none"
        />
      ))}

      {/* ── Outer stone arch surrounds ── */}
      {ARCHES.map(({ cx, x1, x2 }, i) => (
        <path
          key={`outer-${i}`}
          d={archPath(x1, x2, cx, OA)}
          fill="none" stroke={INK} strokeWidth="2.1"
        />
      ))}

      {/* ── Inner arch openings ── */}
      {ARCHES.map(({ cx, ix1, ix2 }, i) => (
        <path
          key={`inner-${i}`}
          d={archPath(ix1, ix2, cx, IA)}
          fill="none" stroke={INK} strokeWidth="0.85" opacity="0.6"
        />
      ))}

      {/* ── Cornice band above arches ── */}
      <path d={`M 0,${OA + 7} L 380,${OA + 7}`} stroke={INK} strokeWidth="0.8" fill="none" opacity="0.42" />
      <path d={`M 0,${OA + 14} L 380,${OA + 14}`} stroke={INK_LIGHT} strokeWidth="0.4" fill="none" />

      {/* ── Stone coursing — piers & end walls ── */}
      {[94, 110, 126, 142, 158, 174, 190].map(y => (
        <g key={`h-${y}`}>
          <path d={`M 0,${y} L 16,${y}`}   stroke={INK_MID} strokeWidth="0.4" fill="none" />
          <path d={`M 116,${y} L 128,${y}`} stroke={INK_MID} strokeWidth="0.4" fill="none" />
          <path d={`M 228,${y} L 240,${y}`} stroke={INK_MID} strokeWidth="0.4" fill="none" />
          <path d={`M 340,${y} L 380,${y}`} stroke={INK_MID} strokeWidth="0.4" fill="none" />
        </g>
      ))}

      {/* Pier vertical center joints */}
      <path d={`M 122,${OA + 7} L 122,${G}`} stroke={INK_LIGHT} strokeWidth="0.3" fill="none" />
      <path d={`M 234,${OA + 7} L 234,${G}`} stroke={INK_LIGHT} strokeWidth="0.3" fill="none" />

      {/* ── Interior: bar shelf (center arch) ── */}
      <path d="M 148,170 L 208,170" stroke={INK_LIGHT} strokeWidth="0.9" fill="none" />
      <path d="M 148,162 L 208,162" stroke={INK_FAINT} strokeWidth="0.5" fill="none" />
      {[155, 163, 171, 179, 187, 195, 203].map(x => (
        <path key={`bot-${x}`} d={`M ${x},162 L ${x},149`} stroke={INK_FAINT} strokeWidth="1.1" fill="none" />
      ))}

      {/* Interior: table line (side arches) */}
      <path d="M 34,186 L 98,186"  stroke={INK_FAINT} strokeWidth="0.8" fill="none" />
      <path d="M 258,186 L 322,186" stroke={INK_FAINT} strokeWidth="0.8" fill="none" />

      {/* ── Ground line ── */}
      <path d={`M 0,${G} L 380,${G}`} stroke={INK} strokeWidth="1.9" fill="none" opacity="0.78" />

      {/* Shallow step / platform */}
      <rect x="16" y={G} width="348" height="7" fill="rgba(44,40,37,0.04)" stroke={INK_MID} strokeWidth="0.45" />

      {/* ── Foreground plants ── */}
      {[
        { x: 56, h: 36, op: 0.25 }, { x: 63, h: 43, op: 0.23 },
        { x: 174, h: 31, op: 0.21 },
        { x: 280, h: 36, op: 0.25 }, { x: 287, h: 43, op: 0.23 },
      ].map(({ x, h, op }, i) => (
        <path
          key={`pl-${i}`}
          d={`M ${x},${G} C ${x - 2},${G - h * 0.38} ${x - 2},${G - h * 0.72} ${x},${G - h} C ${x + 2},${G - h * 0.72} ${x + 2},${G - h * 0.38} ${x},${G}`}
          fill={INK} opacity={op}
        />
      ))}

      {/* ── FOLIAGE — drawn last, appears in front ── */}

      {/* Left main mass */}
      <path
        d="M -4,54 C -4,28 16,6 38,14 C 32,-4 54,-12 68,6 C 70,-8 86,-10 92,8 C 106,-2 114,20 102,34 C 116,30 120,52 108,60 C 112,74 96,84 82,74 C 78,88 60,90 50,78 C 40,86 22,80 14,68 C 2,74 -4,58 -4,54 Z"
        fill={INK} opacity="0.70"
      />
      {/* Left trailing vines */}
      <path d="M 8,64 C 4,84 2,106 6,128 C 2,148 0,168 4,184" stroke={INK} strokeWidth="0.95" fill="none" opacity="0.34" />
      <path d="M 18,72 C 14,92 14,114 16,136" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.26" />
      <ellipse cx="5" cy="92"  rx="7" ry="4"   fill={INK} opacity="0.22" transform="rotate(-28 5 92)" />
      <ellipse cx="3" cy="120" rx="6" ry="3.5" fill={INK} opacity="0.19" transform="rotate(22 3 120)" />
      <ellipse cx="4" cy="154" rx="5.5" ry="3" fill={INK} opacity="0.15" transform="rotate(-16 4 154)" />

      {/* Left-center mass */}
      <path
        d="M 94,44 C 94,22 112,4 132,14 C 128,-4 146,-12 160,4 C 162,-8 178,-10 184,6 C 198,-2 206,18 194,30 C 208,26 212,48 200,56 C 204,70 188,80 176,68 C 172,82 156,84 146,72 C 136,80 120,72 116,58 C 106,64 94,48 94,44 Z"
        fill={INK} opacity="0.50"
      />
      <path d="M 112,56 C 108,76 106,98 110,118" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.24" />

      {/* Right-center mass */}
      <path
        d="M 230,42 C 230,20 248,2 268,12 C 264,-6 282,-14 296,4 C 298,-8 314,-10 320,6 C 334,-2 342,18 330,30 C 344,26 348,48 336,56 C 340,70 324,80 312,68 C 308,82 292,84 282,72 C 272,80 256,72 252,56 C 242,62 230,46 230,42 Z"
        fill={INK} opacity="0.52"
      />
      <path d="M 250,56 C 246,76 244,98 248,118" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.24" />

      {/* Right main mass */}
      <path
        d="M 320,52 C 320,28 336,8 356,16 C 352,-2 370,-12 384,6 C 386,-6 384,10 384,20 L 384,32 C 394,30 396,50 386,58 C 390,72 376,80 364,70 C 360,84 344,86 336,74 C 326,82 316,72 316,60 C 308,68 320,56 320,52 Z"
        fill={INK} opacity="0.65"
      />
      {/* Right trailing vines */}
      <path d="M 382,58 C 384,80 386,102 382,124 C 384,146 386,166 382,184" stroke={INK} strokeWidth="0.95" fill="none" opacity="0.32" />
      <path d="M 370,66 C 372,88 372,110 370,132" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.24" />
      <ellipse cx="383" cy="88"  rx="7" ry="4"   fill={INK} opacity="0.21" transform="rotate(28 383 88)" />
      <ellipse cx="381" cy="118" rx="6" ry="3.5" fill={INK} opacity="0.17" transform="rotate(-22 381 118)" />
      <ellipse cx="382" cy="152" rx="5.5" ry="3" fill={INK} opacity="0.14" transform="rotate(16 382 152)" />

    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function InvitationCard({ guestName, guestId }: { guestName?: string; guestId?: string }) {
  const [phase, setPhase] = useState<Phase>('envelope');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 1800);
    const t2 = setTimeout(() => setPhase('card'), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div suppressHydrationWarning style={{ background: '#F5F2EE', minHeight: '100vh' }}>

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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', padding: '44px 24px 56px' }}>
              <div style={{
                width: '100%',
                maxWidth: '400px',
                background: '#FAF8F4',
                textAlign: 'center',
                padding: '44px 36px 40px',
                boxShadow: '0 4px 48px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
              }}>

                {/* Venue sketch */}
                <div style={{ marginBottom: '32px' }}>
                  <ConsulHouseSketch />
                </div>

                {/* Names */}
                <p style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: 'clamp(22px, 5vw, 28px)',
                  fontWeight: 400,
                  color: INK,
                  letterSpacing: '0.20em',
                  lineHeight: 1.2,
                  marginBottom: '18px',
                }}>
                  NAOMI &amp; ELI
                </p>

                {/* Italic invitation copy */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15.5px',
                  fontStyle: 'italic',
                  color: 'rgba(44,40,37,0.62)',
                  lineHeight: 1.85,
                  marginBottom: '26px',
                }}>
                  together with their families<br />
                  invite you to celebrate their wedding day
                </p>

                {/* Thin rule */}
                <div style={{ width: '44px', height: '1px', background: 'rgba(44,40,37,0.22)', margin: '0 auto 26px' }} />

                {/* Day + date */}
                <p style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '12.5px',
                  fontWeight: 400,
                  color: INK,
                  letterSpacing: '0.24em',
                  marginBottom: '5px',
                }}>
                  MONDAY
                </p>
                <p style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '12.5px',
                  fontWeight: 400,
                  color: INK,
                  letterSpacing: '0.24em',
                  marginBottom: '22px',
                }}>
                  19 OCTOBER 2026
                </p>

                {/* Ceremony details */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: 'rgba(44,40,37,0.62)',
                  lineHeight: 1.95,
                  marginBottom: '26px',
                }}>
                  ceremony at four o&apos;clock in the evening<br />
                  Consul House · Tel Aviv-Yafo<br />
                  dinner &amp; dancing to follow
                </p>

                {/* Rule + dress code */}
                <div style={{ width: '44px', height: '1px', background: 'rgba(44,40,37,0.22)', margin: '0 auto 18px' }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '13px',
                  fontStyle: 'italic',
                  color: 'rgba(44,40,37,0.42)',
                  letterSpacing: '0.06em',
                }}>
                  Formal Wear
                </p>

              </div>
            </div>

            {/* ── Below-card area: links + RSVP ── */}
            <div style={{ textAlign: 'center', padding: '0 24px 64px' }}>

              {/* Calendar + Map */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <a
                  href="https://calendar.google.com/calendar/r/eventedit?text=Eli+%26+Naomi%27s+Wedding&dates=20261019T140000Z/20261020T000000Z&location=Consul+House,+Tel+Aviv-Yafo,+Israel"
                  target="_blank" rel="noopener noreferrer"
                  className="eyebrow"
                  style={{ color: INK, fontSize: '0.55rem', borderBottom: `1px solid ${INK}`, textDecoration: 'none', opacity: 0.55 }}
                >
                  Add to Calendar
                </a>
                <a
                  href="https://maps.google.com/?q=Consul+House+HaTsorfim+St+15+Tel+Aviv"
                  target="_blank" rel="noopener noreferrer"
                  className="eyebrow"
                  style={{ color: INK, fontSize: '0.55rem', borderBottom: `1px solid ${INK}`, textDecoration: 'none', opacity: 0.55 }}
                >
                  View Map
                </a>
              </div>

              {/* RSVP */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '1px', background: 'rgba(44,40,37,0.18)' }} />
                <p className="eyebrow" style={{ color: 'rgba(44,40,37,0.46)', fontSize: '0.58rem' }}>
                  Please RSVP here
                </p>
                <Link href={guestId ? `/rsvp?guestId=${guestId}` : '/rsvp'} className="btn-dark">RSVP</Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
