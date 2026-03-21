export const metadata = {
  title: 'Events — Eli & Naomi',
};

export default function EventsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
      <div className="text-center">
        <p className="eyebrow" style={{ color: 'var(--gold)' }}>Coming Soon</p>
        <h1 className="font-display mt-4" style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic' }}>Events</h1>
      </div>
    </main>
  );
}
