'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors, fonts, wedding } from '@/lib/tokens';

// ── Types ──────────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ── Hooks ──────────────────────────────────────────────────────────────────

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

// ── Shared sub-components ──────────────────────────────────────────────────

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

// ── Data ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Events', href: '#events' },
  { label: 'Travel', href: '#travel' },
  { label: 'Things to Do', href: '/things-to-do' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'RSVP', href: '/rsvp', accent: true },
];

const STORY_SECTIONS = [
  {
    label: 'The Beginning',
    title: 'How We Met',
    text: 'Add your story here — how you met, what you noticed first, the moment you knew. Keep it short and warm.',
  },
  {
    label: 'The Adventures',
    title: 'What Came Next',
    text: 'The trips, the inside jokes, the first apartment. Whatever chapter matters most to you as a couple.',
  },
  {
    label: 'The Proposal',
    title: 'The Big Question',
    text: 'Where it happened, how it happened, what was said. This is the one guests love to read.',
  },
];

const TRAVEL_CARDS = [
  {
    title: 'The Venue',
    lines: ['Consul House', 'HaTsorfim St 15', 'Tel Aviv-Yafo, Israel'],
    link: 'View Map',
    href: 'https://maps.google.com/?q=Consul+House+HaTsorfim+St+15+Tel+Aviv',
    external: true,
  },
  {
    title: 'Hotel Block',
    lines: ["Details coming soon.", "We're securing a room block", 'near the venue.'],
    link: 'View Hotels',
    href: '#',
    external: false,
  },
  {
    title: 'Tel Aviv Life',
    lines: ['Restaurants, beaches,', 'neighborhoods, nightlife —', 'our guide to the city.'],
    link: 'Explore',
    href: '/things-to-do',
    external: false,
  },
  {
    title: 'Events',
    lines: ['Rehearsal dinner, ceremony,', 'and reception — everything', 'you need to know.'],
    link: 'View Schedule',
    href: '#events',
    external: false,
  },
];

const FAQ_ITEMS = [
  {
    q: 'What is the wedding attire?',
    a: 'Fun Black Tie — tuxedos, evening gowns, cocktail dresses. Think elegant with personality. Dancing shoes encouraged.',
  },
  {
    q: 'What is the closest airport?',
    a: 'Ben Gurion International Airport (TLV). About 20 minutes from central Tel Aviv by taxi or Gett.',
  },
  {
    q: 'How do I get around Tel Aviv?',
    a: "Gett (Israeli rideshare) and taxis are easy and affordable. The city is also very walkable, especially along the coast. We'll share a getting-around guide closer to the date.",
  },
  {
    q: "What's the weather like in October?",
    a: 'Warm and sunny — expect highs in the mid-70s°F (~24°C) with pleasant evenings. Light layers for any outdoor portions.',
  },
  {
    q: 'Can I bring a plus one?',
    a: "We can only accommodate guests named on the invitation. If you've been given a plus one, it will be noted on your RSVP.",
  },
  {
    q: 'Will there be transportation to the venue?',
    a: "We're arranging shuttles between the hotel block and Consul House. Details will be shared closer to the wedding.",
  },
  {
    q: 'Do I need a visa to enter Israel?',
    a: "US citizens do not need a visa for stays under 90 days. Check with your country's foreign affairs office if you hold a different passport.",
  },
  {
    q: 'What should I do with extra days in Tel Aviv?',
    a: "We'll have a full Tel Aviv guide on the Things to Do page — beaches, restaurants, neighborhoods, day trips to Jerusalem. You won't be bored.",
  },
];

// ── Typography helpers ─────────────────────────────────────────────────────

const sectionLabel = {
  fontFamily: fonts.sans,
  fontSize: '9px',
  fontWeight: 500,
  letterSpacing: '4px',
  textTransform: 'uppercase' as const,
  color: colors.textMuted,
  textAlign: 'center' as const,
  marginBottom: '12px',
};

const sectionHeading = {
  fontFamily: fonts.serif,
  fontSize: 'clamp(28px, 6vw, 42px)',
  fontWeight: 300,
  fontStyle: 'italic' as const,
  color: colors.champagne,
  textAlign: 'center' as const,
  marginBottom: '48px',
};

// ── RsvpButton (inline hover state) ───────────────────────────────────────

function RsvpButton({ href, label, style = {} }: { href: string; label: string; style?: React.CSSProperties }) {
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
        color: hovered ? colors.black : colors.gold,
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

// ── Main Component ─────────────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const countdown = useCountdown(new Date(wedding.date));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const C = colors;

  return (
    <div style={{ background: C.black, color: C.textLight, fontFamily: fonts.sans, minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════
          NAV
          ══════════════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 32px' : '18px 32px',
          background: scrolled ? 'rgba(17,17,17,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
          transition: 'all 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: C.textLight,
            textDecoration: 'none',
          }}
        >
          Eli <span style={{ color: C.gold }}>&</span> Naomi
        </Link>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: fonts.sans,
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: item.accent ? C.gold : C.textMuted,
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════════ */}
      <section id="home">
        {/* Full-bleed photo with overlay */}
        <div style={{ width: '100%', height: '95vh', minHeight: '600px', position: 'relative', overflow: 'hidden', marginTop: '56px' }}>
          {/* Photo */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: "url('/hero.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 15%',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.75)',
            }}
          />
          {/* Subtle dark overlay for readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
          {/* Fade to black at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: `linear-gradient(transparent, ${C.black})` }} />

          {/* Monogram overlaid on photo */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, gap: '0' }}>
            <div style={{ fontFamily: fonts.serif, fontSize: 'clamp(80px, 18vw, 160px)', fontWeight: 300, color: 'rgba(255,255,255,0.18)', letterSpacing: '8px', lineHeight: 1 }}>
              E <span style={{ fontStyle: 'italic', color: `rgba(201,169,110,0.22)` }}>&</span> N
            </div>
          </div>

          {/* Names + date at bottom of photo */}
          <div style={{ position: 'absolute', bottom: '48px', left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
            <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(13px, 2.5vw, 17px)', fontWeight: 300, letterSpacing: 'clamp(6px, 2vw, 14px)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
              Eli Minsky
            </p>
            <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: 300, fontStyle: 'italic', color: C.gold, margin: '4px 0' }}>&</p>
            <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(13px, 2.5vw, 17px)', fontWeight: 300, letterSpacing: 'clamp(6px, 2vw, 14px)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>
              Naomi Alsberg
            </p>
          </div>
        </div>

        {/* Date + countdown + RSVP below photo */}
        <div style={{ textAlign: 'center', padding: '48px 24px 72px' }}>
          <GoldDivider />

          <p style={{ fontFamily: fonts.sans, fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', color: C.textMuted, marginTop: '28px', lineHeight: 2.4 }}>
            October 19, 2026<br />Tel Aviv-Yafo, Israel
          </p>

          {/* Countdown */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 5vw, 40px)', marginTop: '36px' }}>
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.minutes, label: 'Min' },
              { val: countdown.seconds, label: 'Sec' },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.serif, fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 300, color: C.gold, lineHeight: 1, animation: 'countPulse 2s ease-in-out infinite' }}>
                  {String(val).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: '8px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.textMuted, marginTop: '8px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <RsvpButton href="/rsvp" label="RSVP" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          OUR STORY
          ══════════════════════════════════════════════════════════════ */}
      <section id="our-story" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <p style={sectionLabel}>Our Story</p>
            <h2 style={sectionHeading}>How It All Started</h2>
          </FadeIn>

          {STORY_SECTIONS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: 'center', padding: '0 clamp(0px, 4vw, 40px)' }}>
                <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>
                  {item.label}
                </p>
                <h3 style={{ fontFamily: fonts.serif, fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.champagne, marginBottom: '14px' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textMuted, lineHeight: 1.9, maxWidth: '500px', margin: '0 auto' }}>
                  {item.text}
                </p>
              </div>
              {i < STORY_SECTIONS.length - 1 && <GoldDot />}
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EVENTS
          ══════════════════════════════════════════════════════════════ */}
      <section id="events" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <p style={sectionLabel}>The Celebration</p>
            <h2 style={sectionHeading}>Wedding Weekend</h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {wedding.events.map((evt, i) => (
              <FadeIn key={evt.key} delay={i * 0.15}>
                <div style={{ background: C.charcoal, border: `1px solid ${C.border}`, padding: '36px 32px', textAlign: 'center' }}>
                  <h3 style={{ fontFamily: fonts.serif, fontSize: 'clamp(22px, 4.5vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.champagne, marginBottom: '16px' }}>
                    {evt.name}
                  </h3>
                  <p style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', color: C.textLight, lineHeight: 2, marginBottom: '8px' }}>
                    {evt.date}<br />{evt.time} · {evt.venue}
                  </p>
                  <p style={{ fontFamily: fonts.serif, fontSize: '14px', fontStyle: 'italic', color: C.textMuted }}>
                    {evt.note}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRAVEL & STAY
          ══════════════════════════════════════════════════════════════ */}
      <section id="travel" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <p style={sectionLabel}>Getting There</p>
            <h2 style={sectionHeading}>Travel & Stay</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {TRAVEL_CARDS.map((card, i) => (
                <div key={i} style={{ background: C.charcoal, border: `1px solid ${C.border}`, padding: '28px 20px', textAlign: 'center' }}>
                  <h3 style={{ fontFamily: fonts.serif, fontSize: '20px', fontWeight: 500, fontStyle: 'italic', color: C.champagne, marginBottom: '14px' }}>
                    {card.title}
                  </h3>
                  {card.lines.map((line, j) => (
                    <p key={j} style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.8 }}>
                      {line}
                    </p>
                  ))}
                  <Link
                    href={card.href}
                    target={card.external ? '_blank' : undefined}
                    rel={card.external ? 'noopener noreferrer' : undefined}
                    style={{ display: 'inline-block', marginTop: '16px', fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, textDecoration: 'none' }}
                  >
                    {card.link}
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '100px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeIn>
            <p style={sectionLabel}>Questions</p>
            <h2 style={sectionHeading}>FAQ</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {FAQ_ITEMS.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1px 1fr',
                    alignItems: 'start',
                    borderBottom: i < FAQ_ITEMS.length - 1 ? `1px solid ${C.border}` : 'none',
                    paddingBottom: i < FAQ_ITEMS.length - 1 ? '40px' : '0',
                  }}
                >
                  <div style={{ paddingRight: '28px', textAlign: 'center' }}>
                    <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '12px' }}>Question</p>
                    <p style={{ fontFamily: fonts.serif, fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.champagne, lineHeight: 1.6 }}>
                      {faq.q}
                    </p>
                  </div>
                  <div style={{ background: C.border, width: '1px', alignSelf: 'stretch' }} />
                  <div style={{ paddingLeft: '28px' }}>
                    <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: C.textMuted, marginBottom: '12px' }}>Answer</p>
                    <p style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 300, color: C.textLight, lineHeight: 1.8 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RSVP CTA
          ══════════════════════════════════════════════════════════════ */}
      <section id="rsvp" style={{ padding: '120px 24px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 7vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.champagne }}>
              We'd Love to Have You
            </h2>
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 300, color: C.textMuted, lineHeight: 1.8, maxWidth: '400px' }}>
              Kindly let us know if you'll be joining us in Tel Aviv.<br />
              Please respond by {wedding.rsvpDeadline}.
            </p>
            <RsvpButton href="/rsvp" label="RSVP Now" style={{ marginTop: '8px' }} />
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 300, letterSpacing: '4px', color: C.textLight, marginBottom: '12px' }}>
          E <span style={{ color: C.gold, fontStyle: 'italic', fontSize: '18px' }}>&</span> N
        </div>
        <p style={{ fontFamily: fonts.sans, fontSize: '9px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', color: C.textMuted, opacity: 0.5 }}>
          October 19, 2026 · Tel Aviv-Yafo
        </p>
      </footer>

    </div>
  );
}
