'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors, fonts, wedding } from '@/lib/tokens';
import SiteNav from './SiteNav';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

function useCountdown(targetDate: Date): TimeLeft {
  const getTimeLeft = (): TimeLeft => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return timeLeft;
}

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

const GoldDivider = () => (
  <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`, margin: '0 auto' }} />
);

const GoldDot = () => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.gold }} />
  </div>
);

const STORY_SECTIONS = [
  {
    label: 'The Beginning',
    title: 'A Shabbat in Israel',
    text: 'It was a warm summer night — Shabbat in Israel. Eli had just finished a Birthright trip with his childhood friends from Dallas, and Naomi and her friends offered to host them for a meal at her apartment. On that rooftop in Herzliyah, it was love at first sight. Feeling this new and fresh connection, both of them separately reached out to the same friend for each other\'s phone numbers. A date was planned, and then another, and then another.',
  },
  {
    label: 'The Distance',
    title: 'Oceans Apart',
    text: 'What followed was FaceTime call after FaceTime call — and the connection just grew stronger. A few weeks before his job started, Eli booked a flight back to Israel (refundable within 24 hours, just in case). After a long phone call and Naomi\'s now-famous Pro-Con list, she declared "net positive, you should come back to visit." Only for Eli to tell her the flight was already booked. Those weeks together marked the beginning of an official relationship — and the start of ten months of long-distance dating, made all the more meaningful by October 7th bringing them unexpected time together and a deeper certainty that this was the real deal.',
  },
  {
    label: 'The Proposal',
    title: 'A Hilltop in Italy',
    text: 'A year after the war began, Naomi welcomed Eli to life in Israel. And about a year after finally being in the same place, the next big question followed — on a hilltop in Italy, Eli proposed, and Naomi emphatically said yes. Now together in the heart of Tel Aviv, you can find them in their apartment on Rashi Street — hosting Shabbat dinners, spending time at the beach, and building a life together with intention, love, and a desire to never stop exploring.',
  },
];

// Light section palette
const L = { bg: '#F8F6F1', text: '#1C1C1C', muted: '#8a857d', card: '#FFFFFF', border: 'rgba(201,169,110,0.18)' };

function RsvpButton({ href, label, dark = false, style = {} }: { href: string; label: string; dark?: boolean; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        fontFamily: fonts.sans,
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: hovered ? (dark ? colors.black : '#fff') : colors.gold,
        background: hovered ? colors.gold : 'transparent',
        border: `1px solid ${colors.gold}`,
        padding: '14px 48px',
        textDecoration: 'none',
        transition: 'all 0.4s ease',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

export default function LandingPage() {
  const countdown = useCountdown(new Date(wedding.date));
  const C = colors;

  return (
    <div style={{ fontFamily: fonts.sans, minHeight: '100vh' }}>

      <SiteNav transparentTop />

      {/* ── HERO — dark ── */}
      <section id="home" style={{ background: C.black }}>
        <div style={{ width: '100%', height: '95vh', minHeight: '600px', position: 'relative', overflow: 'hidden', marginTop: '56px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 35%', backgroundRepeat: 'no-repeat', filter: 'brightness(0.75)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: `linear-gradient(transparent, ${C.black})` }} />
          <div style={{ position: 'absolute', bottom: '48px', left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
            <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(13px, 2.5vw, 17px)', fontWeight: 300, letterSpacing: 'clamp(6px, 2vw, 14px)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>Naomi Alsberg</p>
            <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: 300, fontStyle: 'italic', color: C.gold, margin: '4px 0' }}>&</p>
            <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(13px, 2.5vw, 17px)', fontWeight: 300, letterSpacing: 'clamp(6px, 2vw, 14px)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>Eli Minsky</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '48px 24px 72px' }}>
          <GoldDivider />
          <p style={{ fontFamily: fonts.sans, fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', color: C.textMuted, marginTop: '28px', lineHeight: 2.4 }}>
            October 19, 2026<br />Tel Aviv-Yafo, Israel
          </p>
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              {[{ val: countdown.days, label: 'Days' }, { val: countdown.hours, label: 'Hours' }, { val: countdown.minutes, label: 'Min' }, { val: countdown.seconds, label: 'Sec' }].map(({ val, label }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'center', padding: '0 clamp(10px, 2.5vw, 24px)' }}>
                    <div style={{ fontFamily: fonts.serif, fontSize: 'clamp(52px, 9vw, 80px)', fontWeight: 300, color: C.gold, lineHeight: 1 }}>{String(val).padStart(2, '0')}</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.textMuted, marginTop: '12px' }}>{label}</div>
                  </div>
                  {i < 3 && <div style={{ fontFamily: fonts.serif, fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 300, color: 'rgba(201,169,110,0.2)', lineHeight: 1, paddingTop: '6px', userSelect: 'none' }}>·</div>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '40px' }}><RsvpButton href="/rsvp" label="RSVP" /></div>
        </div>
      </section>

      {/* ── OUR STORY — light ── */}
      <section id="our-story" style={{ background: L.bg, padding: '100px 24px', borderTop: `1px solid ${L.border}` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: L.muted, textAlign: 'center', marginBottom: '12px' }}>Our Story</p>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 300, fontStyle: 'italic', color: L.text, textAlign: 'center', marginBottom: '48px' }}>How It All Started</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '80px' }}>
              {['/couple/1.jpg', '/couple/2.jpg', '/couple/3.jpg'].map((src, i) => (
                <div key={i} style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#D8D3CC' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          </FadeIn>
          {STORY_SECTIONS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: 'center', padding: '0 clamp(0px, 4vw, 40px)' }}>
                <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>{item.label}</p>
                <h3 style={{ fontFamily: fonts.serif, fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: L.text, marginBottom: '14px' }}>{item.title}</h3>
                <p style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 400, color: L.text, lineHeight: 2, maxWidth: '560px', margin: '0 auto', opacity: 0.75 }}>{item.text}</p>
              </div>
              {i < STORY_SECTIONS.length - 1 && <GoldDot />}
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EVENTS — dark ── */}
      <section id="events" style={{ background: C.black, padding: '100px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: C.textMuted, textAlign: 'center', marginBottom: '12px' }}>The Celebration</p>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne, textAlign: 'center', marginBottom: '48px' }}>Wedding Weekend</h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {wedding.events.map((evt, i) => (
              <FadeIn key={evt.key} delay={i * 0.15}>
                <div className="event-card-padding" style={{ background: C.charcoal, borderLeft: `3px solid ${C.gold}`, padding: '36px 40px' }}>
                  <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.gold, marginBottom: '14px' }}>{evt.date}</p>
                  <h3 style={{ fontFamily: fonts.serif, fontSize: 'clamp(22px, 4.5vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.champagne, marginBottom: '10px' }}>{evt.name}</h3>
                  <p style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 400, letterSpacing: '1.5px', color: C.textLight, marginBottom: '10px' }}>{evt.time} · {evt.venue}</p>
                  <p style={{ fontFamily: fonts.serif, fontSize: '13px', fontStyle: 'italic', color: C.textMuted }}>{evt.note}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTRY — light ── */}
      <section id="registry" style={{ background: L.bg, padding: '100px 24px', textAlign: 'center', borderTop: `1px solid ${L.border}` }}>
        <FadeIn>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: L.muted, textAlign: 'center', marginBottom: '12px' }}>Registry</p>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 300, fontStyle: 'italic', color: L.text, textAlign: 'center', marginBottom: '20px' }}>Gifts & Celebrations</h2>
            <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: L.muted, lineHeight: 1.9, marginBottom: '36px' }}>
              Your presence is the greatest gift. If you'd like to celebrate with something more, we've put together a few ideas.
            </p>
            <Link href="/registry" style={{ display: 'inline-block', fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.gold, border: `1px solid ${C.gold}`, padding: '12px 32px', textDecoration: 'none' }}>
              View Registry
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── RSVP CTA — dark ── */}
      <section id="rsvp" style={{ background: C.black, padding: '120px 24px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 7vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne }}>We'd Love to Have You</h2>
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.8, maxWidth: '400px' }}>
              Kindly let us know if you'll be joining us in Tel Aviv.<br />
              Please respond by {wedding.rsvpDeadline}.
            </p>
            <RsvpButton href="/rsvp" label="RSVP Now" style={{ marginTop: '8px' }} />
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER — dark ── */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', background: C.black, borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 300, letterSpacing: '4px', color: C.textLight, marginBottom: '12px' }}>
          N <span style={{ color: C.gold, fontStyle: 'italic', fontSize: '18px' }}>&</span> E
        </div>
        <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', color: C.textMuted, opacity: 0.5 }}>
          October 19, 2026 · Tel Aviv-Yafo
        </p>
      </footer>

    </div>
  );
}
