export default {
  content: [
    "./src/**/*.{php,ts,tsx,js}",
    "./patterns/**/*.php",
    "./parts/**/*.html",
    "./patterns/**/*.html",
  ],
  safelist: ["hidden"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
