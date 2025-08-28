import React from "react";
function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      fill="none"
      viewBox="0 0 504 501"
    >
      <g filter="url(#filter0_d_12_13)">
        <path
          fill="#C1D42F"
          d="M500 248C500 111 389 0 252 0S4 111 4 248c0 123.78 90.69 226.38 209.25 245V319.69h-63V248h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V248h68.78l-11 71.69h-57.78V493C409.31 474.38 500 371.78 500 248z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_12_13"
          width="504"
          height="501"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_12_13"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_12_13"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
export default FacebookIcon;
