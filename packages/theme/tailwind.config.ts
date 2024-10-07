import type { Config } from "tailwindcss";

export default {
  content: [
    "./*.php",
    "./src/**/*.{php,ts,tsx,js}",
    "./patterns/**/*.php",
    "./parts/**/*.html",
    "./patterns/**/*.html",
  ],
  safelist: ["hidden"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      "0": "0",
      "2": "2px",
      "3": "3px",
      "4": "4px",
      "6": "6px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
