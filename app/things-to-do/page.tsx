export const metadata = {
  title: 'Things to Do — Eli & Naomi',
};

export default function ThingsToDoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
      <div className="text-center">
        <p className="eyebrow" style={{ color: 'var(--gold)' }}>Coming Soon</p>
        <h1 className="font-display mt-4" style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 300, fontStyle: 'italic' }}>Tel Aviv</h1>
      </div>
    </main>
  );
}
