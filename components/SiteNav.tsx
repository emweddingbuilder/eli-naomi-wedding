'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, fonts } from '@/lib/tokens';

const NAV_ITEMS = [
  { label: 'Our Story', href: '/#our-story' },
  { label: 'Events', href: '/#events' },
  { label: 'Registry', href: '/registry' },
  { label: 'Things to Do', href: '/things-to-do' },
  { label: 'Mood Board', href: '/moodboard' },
  { label: 'Hotel Block', href: '/hotel' },
  { label: 'RSVP', href: '/rsvp', accent: true },
];

export default function SiteNav({ transparentTop = false }: { transparentTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const C = colors;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 32px' : '18px 32px',
          background: menuOpen ? 'rgba(17,17,17,0.97)' : scrolled ? 'rgba(17,17,17,0.95)' : transparentTop ? 'transparent' : 'rgba(17,17,17,0.85)',
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
          onClick={() => setMenuOpen(false)}
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

        {/* Desktop links */}
        <div className="nav-desktop" style={{ gap: '24px', alignItems: 'center' }}>
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

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: C.textLight, transformOrigin: 'center' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: C.textLight }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: C.textLight, transformOrigin: 'center' }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: C.black,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: item.accent ? fonts.serif : fonts.sans,
                    fontSize: item.accent ? '28px' : '11px',
                    fontWeight: item.accent ? 300 : 500,
                    fontStyle: item.accent ? 'italic' : 'normal',
                    letterSpacing: item.accent ? '2px' : '4px',
                    textTransform: 'uppercase',
                    color: item.accent ? C.gold : C.textMuted,
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
