import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
// import purgecss from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: ["assets/js/main.js", "assets/js/editor-main.js"],
      watch: {
        include: "assets/js/**",
      },
    },
  },
  esbuild: {
    loader: "jsx",
  },
  server: {
    host: true,
    proxy: {
      "^/$": {
        target: "http://localhost:8080",
        changeOrigin: false,
        secure: false,
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        // purgecss({
        //   content: ["views/**/*.twig", "assets/js/**/*.jsx"],
        // }),
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  plugins: [react(), legacy()],
});
