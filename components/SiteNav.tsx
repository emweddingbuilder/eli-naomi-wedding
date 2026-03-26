'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors, fonts } from '@/lib/tokens';

const NAV_ITEMS = [
  { label: 'Our Story', href: '/#our-story' },
  { label: 'Events', href: '/#events' },
  { label: 'Registry', href: '/registry' },
  { label: 'Travel', href: '/#travel' },
  { label: 'Things to Do', href: '/things-to-do' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'RSVP', href: '/rsvp', accent: true },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const C = colors;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 32px' : '18px 32px',
        background: scrolled ? 'rgba(17,17,17,0.95)' : 'rgba(17,17,17,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
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
  );
}
