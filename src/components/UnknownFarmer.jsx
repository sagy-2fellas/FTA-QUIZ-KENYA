/** An intentionally unidentified grower, rather than a fictional portrait. */
export default function UnknownFarmer({ className }) {
  return (
    <svg className={className} viewBox="0 0 320 360" role="img" aria-label="Farmer silhouette with a question mark" focusable="false">
      <circle cx="160" cy="170" r="140" fill="#d4ff47" />
      <path d="M54 340v-38c0-60 47-99 106-99s106 39 106 99v38Z" fill="#001b6e" />
      <path d="M130 193h60v42c-17 20-43 20-60 0Z" fill="#001b6e" />
      <ellipse cx="160" cy="145" rx="55" ry="69" fill="#001b6e" />
      <path d="m105 110 16-53h78l16 53Z" fill="#001b6e" />
      <path d="M78 111c40-13 124-13 164 0l-6 14H84Z" fill="#001b6e" />
      <path d="M147 148c0-17 28-19 28-3 0 12-15 12-15 25" fill="none" stroke="#d4ff47" strokeWidth="9" strokeLinecap="round" />
      <circle cx="160" cy="187" r="5" fill="#d4ff47" />
    </svg>
  );
}
