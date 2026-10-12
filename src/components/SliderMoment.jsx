// Small product-specific accents; the existing product artwork stays intact.
export default function SliderMoment({ kind, value }) {
  if (value <= 1) return null;
  return (
    <svg key={value} className={`slider-moment slider-moment-${kind}`} viewBox="0 0 100 120" aria-hidden="true" focusable="false">
      {(kind === "coffee" || kind === "tea") && [34, 50, 66].map((x, index) => (
        <path key={x} className="product-steam" style={{ "--stagger": `${index * 130}ms` }} d={`M${x} 45 C${x - 10} 34 ${x + 10} 27 ${x} 14`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ))}
      {kind === "wine" && [0, 1].map(index => (
        <ellipse key={index} className="product-swirl" style={{ "--stagger": `${index * 160}ms` }} cx="50" cy="60" rx="36" ry="12" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="65 120" />
      ))}
      {kind === "chocolate" && [0, 1, 2, 3].map(index => (
        <rect key={index} className="product-chocolate-piece" style={{ "--piece-x": `${(index - 1.5) * 22}px`, "--piece-turn": `${(index - 1.5) * 20}deg`, "--stagger": `${index * 55}ms` }} x="45" y="56" width="10" height="12" rx="1" fill="#542d22" stroke="#a56b43" strokeWidth="1.5" />
      ))}
    </svg>
  );
}
