export default function Monogram({ size = 64 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', lineHeight: 1 }}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: size * 1.25,
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--charcoal)',
          lineHeight: 1,
          position: 'relative',
          zIndex: 2,
          marginRight: `-${size * 0.06}px`,
        }}
      >
        E
      </span>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: size * 0.72,
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--gold)',
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
          paddingBottom: `${size * 0.1}px`,
        }}
      >
        &
      </span>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: size * 1.25,
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--charcoal)',
          lineHeight: 1,
          position: 'relative',
          zIndex: 2,
          marginLeft: `-${size * 0.06}px`,
        }}
      >
        N
      </span>
    </div>
  );
}
