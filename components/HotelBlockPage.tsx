'use client';

import { motion } from 'framer-motion';
import { colors, fonts } from '@/lib/tokens';
import SiteNav from './SiteNav';

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

export default function HotelBlockPage() {
  const C = colors;

  return (
    <div style={{ background: C.black, minHeight: '100vh', color: C.textLight, fontFamily: fonts.sans }}>

      <SiteNav />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '100px 24px 100px', textAlign: 'center' }}>

        <FadeIn>
          <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '16px' }}>
            Where to Stay
          </p>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '24px' }}>
            Hotel Details
          </h1>
          <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 32px' }} />
          <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 2, maxWidth: '520px', margin: '0 auto 56px' }}>
            We have arranged a room discount at the hotel Sam and Blondi. As most hotels in Tel Aviv don&apos;t offer a traditional &ldquo;room block&rdquo;, with the following code you will receive a discounted reservation — <span style={{ color: C.gold, fontWeight: 500 }}>ABCD</span>.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ border: `1px solid ${C.border}`, overflow: 'hidden', marginBottom: '48px' }}>
            {/* Hotel photos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {['/Sam and Blondi/samandblondi.jpg', '/Sam and Blondi/samandblondiroof.jpg'].map((src, i) => (
                <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', background: C.charcoal }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt="Sam and Blondi"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ padding: '32px 36px', textAlign: 'left' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>
                Recommended Hotel
              </p>
              <p style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '12px' }}>
                Sam and Blondi
              </p>
              <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, marginBottom: '20px' }}>
                Use discount code <span style={{ color: C.gold, fontWeight: 500 }}>ABCD</span> when booking to receive your discounted rate.
              </p>
              <a
                href="https://maps.google.com/?q=Sam+and+Blondi+Tel+Aviv"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, textDecoration: 'none' }}
              >
                View on Map →
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ border: `1px solid ${C.border}`, padding: '32px 36px', textAlign: 'left', marginBottom: '48px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, marginBottom: '12px' }}>
              A Note from Us
            </p>
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 2 }}>
              As many of our guests have visited Tel Aviv before, we encourage everyone to choose an accommodation most comfortable to them — at Sam and Blondi, or wherever feels right!
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 20px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9 }}>
              Questions? Reach out at{' '}
              <a href="mailto:eli.naomi.gettingmarried@gmail.com" style={{ color: C.gold, textDecoration: 'none' }}>
                eli.naomi.gettingmarried@gmail.com
              </a>
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
