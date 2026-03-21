export default function Monogram({ size = 64 }: { size?: number }) {
  return (
    <div className="flex items-end justify-center" style={{ height: size, width: size * 1.1 }}>
      <span
        className="font-display"
        style={{
          fontSize: size * 0.55,
          lineHeight: 1,
          color: 'var(--charcoal)',
          fontWeight: 300,
          marginRight: -size * 0.12,
          zIndex: 1,
          position: 'relative',
        }}
      >
        E
      </span>
      <span
        className="font-script"
        style={{
          fontSize: size * 0.9,
          lineHeight: 1,
          color: 'var(--gold)',
          position: 'relative',
          zIndex: 2,
          marginBottom: -size * 0.05,
        }}
      >
        N
      </span>
    </div>
  );
}
