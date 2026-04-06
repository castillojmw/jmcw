import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vite.dev/config
export default defineConfig({
  base: "/jmcw/",
  server: {
    host: "0.0.0.0",
    allowedHosts: ["localhost"],
  },
  plugins: [
    react(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        const indexHtml = fs.readFileSync("dist/index.html", "utf-8");
        fs.writeFileSync("dist/404.html", indexHtml);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/breakpoints.css";`,
      },
      less: {
        additionalData: `@import "@/styles/breakpoints.css";`,
      },
    },
  },
});
