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

const FAQ_ITEMS = [
  {
    q: 'What is the dress code?',
    a: 'Fun Formal — suits and nice gowns. Think elegant with personality. Dancing shoes encouraged.',
  },
  {
    q: 'Is there a hotel block?',
    a: "We're securing a room block near the venue and will share details soon. Stay tuned — we'll update this page as soon as it's confirmed.",
  },
  {
    q: "What's the weather like in October?",
    a: "Expect warm, sunny days and pleasant evenings. October in Tel Aviv is beautiful — highs around 80°F (27°C) with low humidity and virtually no rain. Evenings cool down slightly, so a light layer for any outdoor moments is a good idea. It's one of the best times of year to be in the city.",
  },
];

export default function FAQPage() {
  return (
    <div style={{ background: C.black, minHeight: '100vh', color: C.textLight, fontFamily: fonts.sans }}>

      <SiteNav />

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '100px 24px 100px' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '16px' }}>
              FAQ
            </p>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '24px' }}>
              Good to Know
            </h1>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto' }} />
          </div>
        </FadeIn>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: C.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card-padding" style={{ background: C.charcoal, padding: '32px' }}>
                <p style={{ fontFamily: fonts.serif, fontSize: '19px', fontWeight: 400, color: C.champagne, marginBottom: '10px' }}>
                  {item.q}
                </p>
                <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.8 }}>
                  {item.a}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
}
