import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config
export default defineConfig({
  base: "https://castillojmw.github.io/",
  server: {
    host: true,
    // allowedHosts: ["localhost", "castillojmw.github.io/jmcw/"],
  },
  plugins: [react()],
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
