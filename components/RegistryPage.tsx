'use client';

import { motion } from 'framer-motion';
import { colors, fonts } from '@/lib/tokens';
import SiteNav from './SiteNav';

const ZOLA_URL = 'https://www.zola.com/registry/eliandnaomi2026';

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

export default function RegistryPage() {
  const C = colors;

  return (
    <div style={{ background: C.black, minHeight: '100vh', color: C.textLight, fontFamily: fonts.sans }}>

      <SiteNav />

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '100px 24px 100px', textAlign: 'center' }}>

        <FadeIn>
          <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '16px' }}>
            Registry
          </p>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '24px' }}>
            Gifts & Celebrations
          </h1>
          <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 32px' }} />
          <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 2, maxWidth: '480px', margin: '0 auto 40px' }}>
            Your presence at our wedding is the greatest gift. If you'd like to celebrate with something more, we've put together a few ideas below.
          </p>
          <a
            href={ZOLA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: fonts.sans,
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: C.gold,
              border: `1px solid ${C.gold}`,
              padding: '14px 40px',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.black; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.gold; }}
          >
            View Our Registry
          </a>
        </FadeIn>

      </div>
    </div>
  );
}
