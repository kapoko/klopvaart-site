/** @type {import('tailwindcss').Config} */
export default {
    content: ["./**/*.{php,ts,tsx}", "./src/**/*.js"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
