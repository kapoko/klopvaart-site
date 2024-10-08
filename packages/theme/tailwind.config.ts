import type { Config } from "tailwindcss";

export default {
  content: [
    "./functions.php",
    "./src/**/*.{php,ts,tsx,js,css,scss}",
    "./patterns/**/*.php",
    "./parts/**/*.html",
    "./templates/**/*.html",
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
    container: {
      center: true,
      padding: "0.75rem",
    },
  },
  plugins: [
    ({ addBase, theme }) => {
      const screens = theme("screens");

      const variables = Object.keys(screens).reduce((acc, key) => {
        acc[`--breakpoint-${key}`] = screens[key];
        return acc;
      }, {});

      const { padding } = theme("container");
      variables["--container-padding"] = padding;

      addBase({
        ":root": variables,
      });
    },
  ],
} satisfies Config;
