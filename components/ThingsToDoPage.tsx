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

// ── Data ──────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    label: 'Our Top Spots',
    heading: 'Places Worth Visiting',
    description: 'Beyond the tourist trail — the spots we actually spend time in.',
    items: [
      { name: 'Neve Tzedek', tags: ['Neighborhood', 'Charming'], mapsQuery: 'Neve Tzedek Tel Aviv' },
      { name: 'Shabazi Street', tags: ['Shopping', 'Stroll'], mapsQuery: 'Shabazi Street Neve Tzedek Tel Aviv' },
      { name: 'Shuk HaCarmel', tags: ['Market', 'Food'], mapsQuery: 'Shuk HaCarmel Tel Aviv' },
      { name: 'Old Jaffa', tags: ['History', 'Culture', 'Views'], mapsQuery: 'Old Jaffa Tel Aviv' },
      { name: 'Suzanne Dellal Centre', tags: ['Culture', 'Dance & Theatre'], mapsQuery: 'Suzanne Dellal Centre Tel Aviv' },
      { name: 'ANU Museum of the Jewish People', tags: ['Museum', 'Culture'], mapsQuery: 'ANU Museum of the Jewish People Tel Aviv' },
      { name: 'Bialik Square', tags: ['Neighborhood', 'Architecture'], mapsQuery: 'Bialik Square Tel Aviv' },
      { name: 'Dizengoff Square', tags: ['City Life', 'Shopping'], mapsQuery: 'Dizengoff Square Tel Aviv' },
      { name: 'Gan Meir', tags: ['Park', 'Relaxed'], mapsQuery: 'Gan Meir Park Tel Aviv' },
      { name: 'Frischman Beach', tags: ['Beach', 'Our Neighborhood'], mapsQuery: 'Frischman Beach Tel Aviv', highlight: true },
    ],
  },
  {
    label: 'Places to Eat',
    heading: 'Restaurants We Love',
    description: 'Some of our favorite spots to sit down, eat well, and enjoy Tel Aviv.',
    items: [
      { name: 'EatMeat', tags: ['Sandwiches'], mapsQuery: 'EatMeat Tel Aviv' },
      { name: 'Benz Brothers', tags: ['Burgers'], mapsQuery: 'Benz Brothers Tel Aviv' },
      { name: 'Thai 148', tags: ['Thai'], mapsQuery: 'Thai 148 Tel Aviv' },
      { name: 'Goshen', tags: ['Israeli', 'Dinner'], mapsQuery: 'Goshen Tel Aviv' },
      { name: 'Mifgash Rambam', tags: ['Shawarma'], mapsQuery: 'Mifgash Rambam Tel Aviv' },
      { name: 'Jazminos', tags: ['Mediterranean', 'Dinner'], mapsQuery: 'Jazminos Tel Aviv' },
    ],
  },
  {
    label: 'Cafes We Love',
    heading: 'Coffee & Morning Hours',
    description: 'Start your day right. Tel Aviv does café culture as well as anyone.',
    items: [
      { name: 'Buckee', tags: ['Coffee', 'Breakfast'], mapsQuery: 'Buckee cafe Tel Aviv' },
      { name: 'Bialik Square Café', tags: ['Coffee', 'Outdoor Seating'], mapsQuery: 'Bialik Square Tel Aviv' },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────

export default function ThingsToDoPage() {
  return (
    <div style={{ background: C.black, minHeight: '100vh', color: C.textLight, fontFamily: fonts.sans }}>

      <SiteNav />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 24px 100px' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '16px' }}>
              Tel Aviv
            </p>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '24px' }}>
              Things to Do
            </h1>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 24px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '480px', margin: '0 auto' }}>
              We've spent a lot of time in Tel Aviv — here are the places we keep coming back to.
              We'll keep adding to this as we get closer to the wedding.
            </p>
          </div>
        </FadeIn>

        {/* Sections */}
        {SECTIONS.map((section, si) => (
          <FadeIn key={section.label} delay={si * 0.1}>
            <div style={{ marginBottom: '80px' }}>

              {/* Section header */}
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>
                  {section.label}
                </p>
                <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, marginBottom: '12px' }}>
                  {section.heading}
                </h2>
                <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.8 }}>
                  {section.description}
                </p>
              </div>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: C.border }}>
                {section.items.map((item) => (
                  <a
                    key={item.name}
                    href={`https://maps.google.com/?q=${encodeURIComponent(item.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-padding"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: '28px 32px',
                      background: C.charcoal,
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                      gap: '24px',
                      flexWrap: 'wrap',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2a2a')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = C.charcoal)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <p style={{ fontFamily: fonts.serif, fontSize: '19px', fontWeight: 400, color: C.champagne }}>
                          {item.name}
                        </p>
                        {'highlight' in item && item.highlight && (
                          <span style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, border: `1px solid ${C.gold}`, padding: '2px 8px' }}>
                            Our Neighborhood
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {item.tags.map((tag) => (
                          <span key={tag} style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.textMuted, background: 'rgba(255,255,255,0.04)', padding: '3px 8px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="card-arrow" style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap', paddingTop: '4px' }}>
                      View Map →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}

        {/* Footer note */}
        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 24px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9 }}>
              More recommendations coming soon — we'll keep updating this before October.
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
