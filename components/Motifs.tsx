// Restrained Indian motifs: a delicate line flourish, a sprout/sparkle mark,
// a fine wordmark glyph, and a soft lotus-dome illustration.

// Thin symmetric line flourish that sits above section labels.
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 28" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M110 6 C110 14 104 18 96 18 C104 18 110 22 110 26 C110 22 116 18 124 18 C116 18 110 14 110 6 Z" />
        <path d="M96 18 C78 18 70 12 56 12 C44 12 38 18 30 18" />
        <path d="M124 18 C142 18 150 12 164 12 C176 12 182 18 190 18" />
        <circle cx="26" cy="18" r="2.2" />
        <circle cx="194" cy="18" r="2.2" />
        <path d="M30 18 C26 14 22 14 18 18" />
        <path d="M190 18 C194 14 198 14 202 18" />
      </g>
    </svg>
  );
}

// Four-point sprout sparkle, the small accent beside feature points.
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1 C12.6 6.4 14.6 9.4 23 12 C14.6 14.6 12.6 17.6 12 23 C11.4 17.6 9.4 14.6 1 12 C9.4 9.4 11.4 6.4 12 1 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Fine chakra-inspired glyph for the wordmark; quiet, not loud.
export function Glyph({ className = "" }: { className?: string }) {
  const spokes = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="3" fill="none">
        <circle cx="50" cy="50" r="44" />
        {spokes.map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="14"
            x2="50"
            y2="26"
            transform={`rotate(${(360 / spokes.length) * i} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="7" fill="currentColor" />
    </svg>
  );
}

// Soft lotus-dome, a temple silhouette rendered in light strokes,
// used inside the lavender illustration panel.
export function LotusDome({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4">
        {/* concentric petals of the dome */}
        <path d="M200 70 C150 120 130 180 130 250 L270 250 C270 180 250 120 200 70 Z" />
        <path d="M200 110 C168 150 156 200 156 250 L244 250 C244 200 232 150 200 110 Z" />
        <path d="M200 150 C182 180 176 215 176 250 L224 250 C224 215 218 180 200 150 Z" />
        {/* finial */}
        <line x1="200" y1="44" x2="200" y2="70" />
        <circle cx="200" cy="38" r="6" />
        {/* base steps */}
        <path d="M104 250 L296 250" />
        <path d="M88 274 L312 274" />
        <path d="M72 298 L328 298" />
        {/* side lotus petals fanning out */}
        <path d="M130 250 C96 236 78 210 74 178 C104 184 126 206 138 240" />
        <path d="M270 250 C304 236 322 210 326 178 C296 184 274 206 262 240" />
      </g>
    </svg>
  );
}
