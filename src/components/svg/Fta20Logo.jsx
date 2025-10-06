import React from "react";

const Fta20Logo = ({ className = "w-16 h-16" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="FTA 20 anniversary logo"
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx="148" cy="100" r="40" />
        </clipPath>
      </defs>
      <rect width="200" height="200" fill="#0C2C73" />
      <g>
        <text
          x="20"
          y="120"
          fontFamily="Alegreya Sans, Arial, sans-serif"
          fontSize="90"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="2"
        >
          FTA
        </text>
        <g>
          <circle cx="148" cy="100" r="48" fill="#29ABE2" />
          <circle cx="148" cy="100" r="40" fill="#FFFFFF" />
          <g clipPath="url(#circleClip)">
            <circle cx="148" cy="100" r="40" fill="#00A651" />
            <circle cx="160" cy="96" r="12" fill="#000000" />
            <path d="M130 118c10-18 38-18 48 0" fill="none" stroke="#000000" strokeWidth="6" />
          </g>
          <text
            x="128"
            y="130"
            fontFamily="Exo 2, Arial, sans-serif"
            fontSize="44"
            fontWeight="700"
            fill="#FFFFFF"
          >
            20
          </text>
        </g>
      </g>
    </svg>
  );
};

export default Fta20Logo;


