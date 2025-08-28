/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "ft-blue": "#00B2E2",
        "ft-dark-green": "#C1D42F",
        "ft-light-green": "#D4FF46",
        "ft-grey": "#E0E0E0",
        "ft-bg": "#f2f2f2",
      },
      screens: {
        xs: "320px", // Small phones
        sm: "375px", // Standard phones
        md: "414px", // Large phones
        lg: "768px", // Tablets
        xl: "1024px", // Small laptops
        "2xl": "1200px", // Large screens
      },
      fontFamily: {
        alegreya: ["Alegreya", "sans-serif"],
        exo: ["Exo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
