import preact from "@preact/preset-vite";
import path from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  base: "",
  server: {
    port: 5175,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
