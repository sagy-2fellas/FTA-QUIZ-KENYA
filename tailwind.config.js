/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,jsx}"],
  mode: "jit",
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
        xs: "375px",
        ss: "620px",
        sm: "768px",
        md2: "1024px",
        md: "1060px",
        lg: "1200px",
        "2lg": "1500px",
        xl: "1700px",
      },
      fontFamily: {
        alegreya: ["Alegreya", "sans-serif"],
        exo: ["Exo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
