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

// ── Attire mood board images ───────────────────────────────────────────────
// To add images:
//   1. Drop files into /public/moodboard/reception/ or /public/moodboard/rehearsal/
//   2. Add entries to the arrays below matching the filenames you used.
// caption is optional.

const RECEPTION_IMAGES: { src: string; caption?: string }[] = [
  { src: '/moodboard/reception/1.jpg' },
  { src: '/moodboard/reception/2.jpg' },
  { src: '/moodboard/reception/3.jpg' },
  { src: '/moodboard/reception/4.jpg' },
  { src: '/moodboard/reception/5.jpg' },
  { src: '/moodboard/reception/6.jpg' },
  { src: '/moodboard/reception/7.jpg' },
  { src: '/moodboard/reception/8.jpg' },
  { src: '/moodboard/reception/9.jpg' },
  { src: '/moodboard/reception/10.jpg' },
  { src: '/moodboard/reception/11.jpg' },
  { src: '/moodboard/reception/12.jpg' },
  { src: '/moodboard/reception/13.jpg' },
  { src: '/moodboard/reception/14.jpg' },
  { src: '/moodboard/reception/15.jpg' },
  { src: '/moodboard/reception/16.jpg' },
  { src: '/moodboard/reception/17.jpg' },
  { src: '/moodboard/reception/18.jpg' },
  { src: '/moodboard/reception/19.jpg' },
];

const REHEARSAL_IMAGES: { src: string; caption?: string }[] = [
  { src: '/moodboard/rehearsal/1.jpg' },
  { src: '/moodboard/rehearsal/2.jpg' },
  { src: '/moodboard/rehearsal/3.jpg' },
  { src: '/moodboard/rehearsal/4.jpg' },
  { src: '/moodboard/rehearsal/5.jpg' },
  { src: '/moodboard/rehearsal/6.jpg' },
];

function ImageGrid({ images }: { images: { src: string; caption?: string }[] }) {
  return (
    <div
      style={{
        columns: 'var(--columns)',
        columnGap: '12px',
        ['--columns' as string]: '3',
      }}
      className="moodboard-grid"
    >
      {images.map((img, i) => (
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
            alt={img.caption || `Attire inspiration ${i + 1}`}
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
  );
}

// ── Component ─────────────────────────────────────────────────────────────

export default function MoodBoardPage() {
  return (
    <div style={{ background: C.black, minHeight: '100vh', color: C.textLight, fontFamily: fonts.sans }}>

      <SiteNav />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px 100px' }}>

        {/* Page header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '16px' }}>
              What to Wear
            </p>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '24px' }}>
              Attire Guide
            </h1>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 24px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '480px', margin: '0 auto' }}>
              We want you to look and feel amazing. Here's the vibe we're going for — use these as inspiration as you get dressed for each event.
            </p>
          </div>
        </FadeIn>

        {/* ── Wedding Reception ── */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.gold, marginBottom: '12px' }}>
              Monday, October 19
            </p>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '12px' }}>
              Wedding Ceremony & Reception
            </h2>
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '420px', margin: '0 auto 48px' }}>
              Formal Wear & Elevated Cocktail — suits and elegant gowns. The setting is Consul House at night, and we want the room to feel as beautiful as the occasion. Dancing shoes encouraged.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ImageGrid images={RECEPTION_IMAGES} />
        </FadeIn>

        {/* Divider */}
        <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '80px auto' }} />

        {/* ── Rehearsal Dinner ── */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.gold, marginBottom: '12px' }}>
              Sunday, October 18
            </p>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '12px' }}>
              Rehearsal Dinner
            </h2>
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '420px', margin: '0 auto 48px' }}>
              Smart casual to cocktail — elevated and polished, but with a bit more room to breathe. Think cocktail dresses, blazers, and stylish separates. Still a special night.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ImageGrid images={REHEARSAL_IMAGES} />
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
