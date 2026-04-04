import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/jmcw/' : '/',
  server: {
    host: "0.0.0.0",
    allowedHosts: ["localhost", "wide-socks-wink.loca.lt"],
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
