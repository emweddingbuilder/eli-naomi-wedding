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

const HOTELS = [
  {
    name: 'Hotel Details Coming Soon',
    description: "We're finalizing our hotel block arrangements. Check back soon for booking information and our negotiated rates.",
    tag: 'Coming Soon',
  },
];

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
            Hotel Block
          </h1>
          <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 32px' }} />
          <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 2, maxWidth: '520px', margin: '0 auto 56px' }}>
            We have arranged room blocks at nearby hotels in Tel Aviv-Yafo for our guests. Details and booking links will be available here soon — please check back as we get closer to October.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ border: `1px solid ${C.border}`, padding: '40px 36px', marginBottom: '48px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>
                  Hotel Block
                </p>
                <p style={{ fontFamily: fonts.serif, fontSize: '22px', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '12px' }}>
                  Coming Soon
                </p>
                <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9 }}>
                  We&apos;re finalizing our hotel block arrangements and rates for guests traveling from abroad. Details including hotel names, booking links, and our group rates will be posted here shortly.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ border: `1px solid ${C.border}`, padding: '32px 36px', textAlign: 'left' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, marginBottom: '12px' }}>
              Getting to Tel Aviv
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.textLight, marginBottom: '6px' }}>
                  Airport
                </p>
                <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9 }}>
                  Ben Gurion International Airport (TLV) is approximately 20–30 minutes from central Tel Aviv by taxi or train.
                </p>
              </div>
              <div style={{ width: '100%', height: '1px', background: C.border }} />
              <div>
                <p style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.textLight, marginBottom: '6px' }}>
                  Venue
                </p>
                <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9 }}>
                  The wedding will be held at Consul House — HaTsorfim St 15, Tel Aviv-Yafo. We recommend staying in central Tel Aviv or the Neve Tzedek / Jaffa area for easy access.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ marginTop: '48px' }}>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 20px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9 }}>
              Questions? Reach out at{' '}
              <a href="mailto:eliandnaomiwedding@gmail.com" style={{ color: C.gold, textDecoration: 'none' }}>
                eliandnaomiwedding@gmail.com
              </a>
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
