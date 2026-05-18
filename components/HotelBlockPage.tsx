'use client';

import { motion } from 'framer-motion';
import { colors, fonts } from '@/lib/tokens';
import SiteNav from './SiteNav';

const GOLD = '#C9A96E';
const CHARCOAL = '#1C1C1C';
const MUTED = '#8a857d';
const BG = '#F8F6F1';
const CARD_BG = '#FFFFFF';
const BORDER = 'rgba(0,0,0,0.08)';

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
  return (
    <div style={{ background: BG, minHeight: '100vh', color: CHARCOAL, fontFamily: fonts.sans }}>

      <SiteNav />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '100px 24px 100px', textAlign: 'center' }}>

        <FadeIn>
          <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: MUTED, marginBottom: '16px' }}>
            Where to Stay
          </p>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: CHARCOAL, marginBottom: '24px' }}>
            Hotel Details
          </h1>
          <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 32px' }} />
          <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: MUTED, lineHeight: 2, maxWidth: '520px', margin: '0 auto 56px' }}>
            We have arranged a room discount at the hotel Sam and Blondi. As most hotels in Tel Aviv don&apos;t offer a traditional &ldquo;room block&rdquo;, with the following code you will receive a discounted reservation — <span style={{ color: GOLD, fontWeight: 500 }}>ABCD</span>.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ border: `1px solid ${BORDER}`, overflow: 'hidden', background: CARD_BG, boxShadow: '0 1px 12px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
            {/* Hotel photos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {['/Sam and Blondi/samandblondi.jpg', '/Sam and Blondi/samandblondiroof.jpg'].map((src, i) => (
                <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#D8D3CC' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Sam and Blondi" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
            <div style={{ padding: '32px 36px', textAlign: 'left' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, marginBottom: '10px' }}>
                Recommended Hotel
              </p>
              <p style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 300, fontStyle: 'italic', color: CHARCOAL, marginBottom: '12px' }}>
                Sam and Blondi
              </p>
              <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: MUTED, lineHeight: 1.9, marginBottom: '8px' }}>
                Use discount code <span style={{ color: GOLD, fontWeight: 500 }}>ABCD</span> when booking to receive your discounted rate.
              </p>
              <p style={{ fontFamily: fonts.sans, fontSize: '11px', fontStyle: 'italic', color: MUTED, lineHeight: 1.8, marginBottom: '24px' }}>
                If you plan to reserve a room at Sam and Blondi, we highly recommend doing so soon — this is a discounted rate, not a room block.
              </p>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href="#"
                  style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: CHARCOAL, background: GOLD, padding: '10px 24px', textDecoration: 'none' }}
                >
                  Book Now →
                </a>
                <a
                  href="https://maps.google.com/?q=Sam+and+Blondi+Tel+Aviv"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, textDecoration: 'none' }}
                >
                  View on Map →
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ border: `1px solid ${BORDER}`, padding: '32px 36px', textAlign: 'left', background: CARD_BG, boxShadow: '0 1px 12px rgba(0,0,0,0.06)', marginBottom: '48px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, marginBottom: '12px' }}>
              A Note from Us
            </p>
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: MUTED, lineHeight: 2 }}>
              As many of our guests have visited Tel Aviv before, we encourage everyone to choose an accommodation most comfortable to them — at Sam and Blondi, or wherever feels right!
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 20px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: MUTED, lineHeight: 1.9 }}>
              Questions? Reach out at{' '}
              <a href="mailto:eli.naomi.gettingmarried@gmail.com" style={{ color: GOLD, textDecoration: 'none' }}>
                eli.naomi.gettingmarried@gmail.com
              </a>
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
