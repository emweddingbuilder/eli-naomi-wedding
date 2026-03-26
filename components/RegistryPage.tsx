'use client';

import { motion } from 'framer-motion';
import { colors, fonts } from '@/lib/tokens';
import SiteNav from './SiteNav';

const ZOLA_URL = 'https://www.zola.com/registry/eliandnaomi2026';

const FUNDS = [
  {
    title: 'Honeymoon Fund',
    description: 'Help us celebrate our first adventure as a married couple — wherever the journey takes us.',
    icon: '✈',
  },
  {
    title: 'First Apartment Fund',
    description: 'Help us turn our first home together into something special.',
    icon: '🏠',
  },
  {
    title: 'Experiences Fund',
    description: 'Cooking classes, ceramics, adventures around Tel Aviv — help us build memories together.',
    icon: '✦',
  },
];

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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 24px 100px' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '16px' }}>
              Registry
            </p>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '24px' }}>
              Gifts & Celebrations
            </h1>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 24px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '480px', margin: '0 auto' }}>
              Your presence at our wedding is the greatest gift. If you'd like to celebrate with something more, we've put together a few ideas below.
            </p>
          </div>
        </FadeIn>

        {/* Cash funds via Zola */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: '80px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.gold, textAlign: 'center', marginBottom: '40px' }}>
              Experience Funds
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: C.border }}>
              {FUNDS.map((fund, i) => (
                <a
                  key={i}
                  href={ZOLA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '28px 32px',
                    background: C.charcoal,
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    gap: '24px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = C.charcoal)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '20px', opacity: 0.7 }}>{fund.icon}</span>
                    <div>
                      <p style={{ fontFamily: fonts.serif, fontSize: '18px', fontWeight: 400, color: C.champagne, marginBottom: '4px' }}>
                        {fund.title}
                      </p>
                      <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.6 }}>
                        {fund.description}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap' }}>
                    Contribute →
                  </span>
                </a>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: '11px', color: C.textMuted, marginBottom: '12px' }}>
                Contributions are processed securely through Zola
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
                  padding: '12px 32px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.black; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.gold; }}
              >
                View on Zola
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '80px' }}>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
            <span style={{ fontFamily: fonts.serif, fontSize: '18px', color: C.gold, fontStyle: 'italic' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
          </div>
        </FadeIn>

        {/* Amazon registry */}
        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.gold, marginBottom: '20px' }}>
              Traditional Registry
            </p>
            <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '16px' }}>
              Amazon Registry
            </p>
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '400px', margin: '0 auto 28px' }}>
              For those who prefer a traditional gift — our Amazon registry ships to our family in the US.
            </p>
            <a
              href="https://www.amazon.com/wedding"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: fonts.sans,
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: C.textLight,
                border: `1px solid ${C.border}`,
                padding: '12px 32px',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.textLight; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
            >
              View Amazon Registry
            </a>
            <p style={{ fontFamily: fonts.sans, fontSize: '10px', color: C.textMuted, marginTop: '12px', opacity: 0.6 }}>
              Coming soon
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
