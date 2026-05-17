// Design tokens for elinaomi.love
// Palette: cocktail lounge elegance — dark, warm, clean

export const colors = {
  black: '#111111',
  charcoal: '#1e1e1e',
  darkGrey: '#2a2a2a',
  gold: '#C9A96E',
  goldLight: '#d4bc8a',
  goldSoft: 'rgba(201, 169, 110, 0.25)',
  cream: '#FAF7F2',
  warmCream: '#f3ede3',
  ivory: '#FFFDF8',
  champagne: '#e8d5b0',
  textLight: '#e8e4dc',
  textMuted: '#8a857d',
  border: 'rgba(201, 169, 110, 0.2)',
} as const;

export const fonts = {
  serif: "'Cormorant Garamond', serif",
  serifSC: "'Cormorant SC', serif",
  sans: "'Montserrat', sans-serif",
} as const;

export const wedding = {
  date: new Date('2026-10-19T17:00:00'),
  venue: 'Consul House',
  venueAddress: 'HaTsorfim St 15, Tel Aviv-Yafo',
  dressCode: 'Formal Wear & Cocktail Attire',
  couple: {
    name1: 'Eli Samuel',
    name1Hebrew: 'שמואל יצחק',
    name2: 'Naomi Shira',
    name2Hebrew: 'נעמי שירה',
  },
  parents: {
    groom: 'Jayson Minsky and Jolene Risch',
    bride: 'Cliff and Laurie Alsberg',
  },
  events: [
    {
      key: 'rehearsal',
      name: 'Rehearsal Dinner',
      date: 'Sunday, October 18, 2026',
      time: '6:00 PM',
      venue: 'TBD',
      note: 'By invitation only',
    },
    {
      key: 'ceremony',
      name: 'Wedding Ceremony & Reception',
      date: 'Monday, October 19, 2026',
      time: '5:00 PM',
      venue: 'Consul House',
      note: 'Formal Wear & Cocktail Attire. Dancing shoes encouraged.',
    },
  ],
  rsvpDeadline: 'August 1, 2026',
} as const;
