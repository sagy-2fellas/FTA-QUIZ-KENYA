import { useId } from "react";

export default function WineBottle({ value }) {
  const clipId = useId();
  const remaining = (5 - Math.max(1, Math.min(5, value))) / 4;
  return (
    <svg viewBox="623 -8 73 225" className="wine-level-bottle" aria-hidden="true" focusable="false" data-wine-remaining={remaining}>
      <defs><clipPath id={clipId}><path d="M686.72 208.72l-27.23.01h-27.27c-2.58.01-.04-89.69-.04-98.88 0-9.14 19.44-38.49 19.44-43.69 0-5.2-.02-51.46-.02-51.46h15.59s.02 46.25.02 51.45c0 5.2 19.47 34.53 19.48 43.67 0 9.19 2.62 98.89.04 98.89l-.01.01z" /></clipPath></defs>
      <path d="M686.72 208.72l-27.23.01h-27.27c-2.58.01-.04-89.69-.04-98.88 0-9.14 19.44-38.49 19.44-43.69 0-5.2-.02-51.46-.02-51.46h15.59s.02 46.25.02 51.45c0 5.2 19.47 34.53 19.48 43.67 0 9.19 2.62 98.89.04 98.89l-.01.01z" fill="#dfe7d9" stroke="#52624e" strokeWidth="3" />
      <g clipPath={`url(#${clipId})`}>
        <rect className="wine-level-liquid" x="629" y="15" width="62" height="194" fill="#791049" style={{ transform: `scaleY(${remaining})`, transformOrigin: "0px 209px" }} />
      </g>
      <path d="M642 112v77" stroke="white" strokeWidth="4" strokeLinecap="round" opacity=".55" />
      <path d="M650 1h19v16h-19z" fill="#0fc0fc" />
    </svg>
  );
}
