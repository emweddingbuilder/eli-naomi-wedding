'use client';

import { motion } from 'framer-motion';
import { colors, fonts } from '@/lib/tokens';
import SiteNav from './SiteNav';

const C = colors;

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// ── Mood board images ─────────────────────────────────────────────────────
// To add images: drop files into /public/moodboard/ and add entries here.
// caption is optional.

const IMAGES: { src: string; caption?: string; tall?: boolean }[] = [
  { src: '/moodboard/1.jpg', caption: 'Consul House' },
  { src: '/moodboard/2.jpg', tall: true },
  { src: '/moodboard/3.jpg', caption: 'Tel Aviv evenings' },
  { src: '/moodboard/4.jpg' },
  { src: '/moodboard/5.jpg', caption: 'Table setting' },
  { src: '/moodboard/6.jpg', tall: true },
  { src: '/moodboard/7.jpg' },
  { src: '/moodboard/8.jpg', caption: 'Florals' },
  { src: '/moodboard/9.jpg' },
];

// ── Component ─────────────────────────────────────────────────────────────

export default function MoodBoardPage() {
  return (
    <div style={{ background: C.black, minHeight: '100vh', color: C.textLight, fontFamily: fonts.sans }}>

      <SiteNav />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px 100px' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '16px' }}>
              The Vision
            </p>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '24px' }}>
              Mood Board
            </h1>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 24px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '480px', margin: '0 auto' }}>
              A glimpse into the evening we're creating — warm light, elegant details, and the energy of Tel Aviv at night.
            </p>
          </div>
        </FadeIn>

        {/* Masonry grid */}
        <FadeIn delay={0.1}>
          <div
            style={{
              columns: 'var(--columns)',
              columnGap: '12px',
              ['--columns' as string]: '3',
            }}
            className="moodboard-grid"
          >
            {IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: C.charcoal,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.caption || `Mood board image ${i + 1}`}
                  style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                {img.caption && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '24px 16px 14px',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
                    }}
                  >
                    <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      {img.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </FadeIn>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .moodboard-grid { --columns: 2 !important; }
        }
        @media (max-width: 480px) {
          .moodboard-grid { --columns: 1 !important; }
        }
      `}</style>

    </div>
  );
}
