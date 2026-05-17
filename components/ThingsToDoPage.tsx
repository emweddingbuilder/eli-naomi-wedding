'use client';

import { motion } from 'framer-motion';
import { fonts } from '@/lib/tokens';
import SiteNav from './SiteNav';

const GOLD = '#C9A96E';
const CHARCOAL = '#1C1C1C';
const MUTED = '#8a857d';
const BG = '#F8F6F1';
const CARD_BG = '#FFFFFF';

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
// For place photos: drop images into /public/tel-aviv/ using the `photo` filename below.

const PLACES = [
  { name: 'Neve Tzedek', tags: ['Neighborhood', 'Charming'], photo: 'neve-tzedek.jpg', mapsQuery: 'Neve Tzedek Tel Aviv' },
  { name: 'Shuk HaCarmel', tags: ['Market', 'Food'], photo: 'shuk-hacarmel.jpg', mapsQuery: 'Shuk HaCarmel Tel Aviv' },
  { name: 'Old Jaffa', tags: ['History', 'Culture', 'Views'], photo: 'old-jaffa.jpg', mapsQuery: 'Old Jaffa Tel Aviv' },
  { name: 'Suzanne Dellal Centre', tags: ['Dance & Theatre'], photo: 'suzanne-dellal.jpg', mapsQuery: 'Suzanne Dellal Centre Tel Aviv' },
  { name: 'ANU Museum', tags: ['Museum', 'Culture'], photo: 'anu-museum.jpg', mapsQuery: 'ANU Museum of the Jewish People Tel Aviv' },
  { name: 'Bialik Square', tags: ['Architecture'], photo: 'bialik-square.jpg', mapsQuery: 'Bialik Square Tel Aviv' },
  { name: 'Gan Meir', tags: ['Park', 'Relaxed'], photo: 'gan-meir.jpg', mapsQuery: 'Gan Meir Park Tel Aviv' },
  { name: 'Frischman Beach', tags: ['Beach', 'Our Neighborhood'], photo: 'frischman-beach.jpg', mapsQuery: 'Frischman Beach Tel Aviv', highlight: true },
];

const RESTAURANTS = [
  { name: 'EatMeat', tags: ['Sandwiches'], mapsQuery: 'EatMeat Tel Aviv' },
  { name: 'Benz Brothers', tags: ['Burgers'], mapsQuery: 'Benz Brothers Tel Aviv' },
  { name: 'Thai 148', tags: ['Thai'], mapsQuery: 'Thai 148 Tel Aviv' },
  { name: 'Goshen', tags: ['Israeli', 'Dinner'], mapsQuery: 'Goshen Tel Aviv' },
  { name: 'Mifgash Rambam', tags: ['Shawarma'], mapsQuery: 'Mifgash Rambam Tel Aviv' },
  { name: 'Jazminos', tags: ['Mediterranean', 'Dinner'], mapsQuery: 'Jazminos Tel Aviv' },
];

const CAFES = [
  { name: 'Buckee', tags: ['Coffee', 'Breakfast'], mapsQuery: 'Buckee cafe Tel Aviv' },
  { name: 'Bialik Square Café', tags: ['Coffee', 'Outdoor Seating'], mapsQuery: 'Bialik Square Tel Aviv' },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: fonts.sans,
      fontSize: '8px',
      fontWeight: 500,
      letterSpacing: '1.5px',
      textTransform: 'uppercase' as const,
      color: MUTED,
      background: 'rgba(0,0,0,0.05)',
      padding: '3px 8px',
      borderRadius: '2px',
    }}>
      {label}
    </span>
  );
}

function ListItem({ name, tags, mapsQuery }: { name: string; tags: string[]; mapsQuery: string }) {
  return (
    <a
      href={`https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        background: CARD_BG,
        textDecoration: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        transition: 'background 0.15s',
        gap: '16px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F2ED')}
      onMouseLeave={(e) => (e.currentTarget.style.background = CARD_BG)}
    >
      <div>
        <p style={{ fontFamily: fonts.serif, fontSize: '18px', fontWeight: 400, fontStyle: 'italic', color: CHARCOAL, marginBottom: '6px' }}>
          {name}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      <span style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' as const, color: GOLD, whiteSpace: 'nowrap' as const }}>
        View Map →
      </span>
    </a>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ThingsToDoPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: CHARCOAL, fontFamily: fonts.sans }}>

      <SiteNav />

      {/* ── Hero ── uses /public/tel-aviv/hero.jpg if available */}
      <div style={{ width: '100%', height: 'clamp(280px, 38vw, 420px)', position: 'relative', overflow: 'hidden', marginTop: '56px', background: '#1C1C1C' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/tel-aviv/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          filter: 'brightness(0.72)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(248,246,241,0.97))' }} />
        <div style={{ position: 'absolute', bottom: '48px', left: 0, right: 0, textAlign: 'center' }}>
          <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '10px' }}>
            Tel Aviv-Yafo, Israel
          </p>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 300, fontStyle: 'italic', color: CHARCOAL, margin: 0 }}>
            Things to Do
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* Intro */}
        <FadeIn>
          <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: MUTED, lineHeight: 2, maxWidth: '520px', margin: '0 auto 80px', textAlign: 'center' }}>
            We've spent a lot of time in Tel Aviv — here are the places we keep coming back to.
            We'll keep adding to this as we get closer to the wedding.
          </p>
        </FadeIn>

        {/* ── Places photo grid ── */}
        <FadeIn>
          <div style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '10px' }}>
                Our Top Spots
              </p>
              <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 300, fontStyle: 'italic', color: CHARCOAL }}>
                Places Worth Visiting
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {PLACES.map((place, i) => (
                <motion.a
                  key={place.name}
                  href={`https://maps.google.com/?q=${encodeURIComponent(place.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.4, 0, 0.2, 1] }}
                  style={{ textDecoration: 'none', display: 'block', background: CARD_BG, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                >
                  {/* Photo */}
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#E8E4DE', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/tel-aviv/${place.photo}`}
                      alt={place.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    {'highlight' in place && place.highlight && (
                      <div style={{ position: 'absolute', top: '10px', left: '10px', background: GOLD, padding: '3px 8px' }}>
                        <span style={{ fontFamily: fonts.sans, fontSize: '7px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff' }}>
                          Our Neighborhood
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding: '14px 16px 16px' }}>
                    <p style={{ fontFamily: fonts.serif, fontSize: '16px', fontWeight: 400, fontStyle: 'italic', color: CHARCOAL, marginBottom: '8px' }}>
                      {place.name}
                    </p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' as const }}>
                      {place.tags.map((t) => <Tag key={t} label={t} />)}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Restaurants ── */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '10px' }}>
                Places to Eat
              </p>
              <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 300, fontStyle: 'italic', color: CHARCOAL }}>
                Restaurants We Love
              </h2>
            </div>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              {RESTAURANTS.map((r) => <ListItem key={r.name} {...r} />)}
            </div>
          </div>
        </FadeIn>

        {/* ── Cafes ── */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '10px' }}>
                Cafes We Love
              </p>
              <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 300, fontStyle: 'italic', color: CHARCOAL }}>
                Coffee & Morning Hours
              </h2>
            </div>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              {CAFES.map((c) => <ListItem key={c.name} {...c} />)}
            </div>
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.2}>
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 20px' }} />
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: MUTED, lineHeight: 1.9 }}>
              More recommendations coming soon — we'll keep updating this before October.
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
