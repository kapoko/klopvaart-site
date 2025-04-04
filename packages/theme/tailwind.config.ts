import type { Config } from "tailwindcss";

export default {
  content: [
    "./functions.php",
    "./src/**/*.{php,ts,tsx,js,css,scss}",
    "./patterns/**/*.php",
    "./parts/**/*.html",
    "./templates/**/*.html",
  ],
  safelist: ["hidden", "h-full"],
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
    screens: {
      sm: "640px",
      md: "782px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
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
