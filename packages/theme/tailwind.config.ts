import type { Config } from "tailwindcss";

export default {
  content: [
    "./functions.php",
    "./src/**/*.{php,ts,tsx,js,css,scss}",
    "./patterns/**/*.php",
    "./parts/**/*.html",
    "./templates/**/*.html",
  ],
  safelist: ["hidden", "--breakpoint-xl"],
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
  plugins: [
    ({ addBase, theme }) => {
      const screens = theme("screens");
      const variables = Object.keys(screens).reduce((acc, key) => {
        acc[`--breakpoint-${key}`] = screens[key];
        return acc;
      }, {});
      addBase({
        ":root": variables,
      });
    },
  ],
} satisfies Config;
