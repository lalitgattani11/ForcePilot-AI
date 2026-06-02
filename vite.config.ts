import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import path from "path";

const previewRedirectPlugin = () => ({
  name: "preview-redirect",
  configurePreviewServer(server: any) {
    server.middlewares.stack.unshift({
      route: "",
      handle: (req: any, _res: any, next: any) => {
        if (req.url && !req.url.includes(".") && !req.url.startsWith("/@")) {
          const urlPath = req.url.split("?")[0];
          const fullPath = path.join(process.cwd(), "dist", urlPath, "index.html");
          if (fs.existsSync(fullPath)) {
            req.url = urlPath + "/index.html" + (req.url.includes("?") ? "?" + req.url.split("?")[1] : "");
          }
        }
        next();
      }
    });
  }
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    previewRedirectPlugin(),

    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        navigateFallbackDenylist: [
          /^\/robots\.txt$/,
          /^\/sitemap\.xml$/,
        ],
      },

      manifest: {
        name: "ForcePilot AI",
        short_name: "ForcePilot",
        description: "AI Salesforce Interview Intelligence Platform",

        theme_color: "#020617",
        background_color: "#020617",

        display: "standalone",
        orientation: "portrait",

        start_url: "/",

        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],

        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "1903x957",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshots/mobile.png",
            sizes: "873x1600",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  preview: {
    port: 4173,
  },
  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("react")) {
            return "react";
          }

          if (id.includes("framer-motion")) {
            return "motion";
          }

          if (id.includes("@supabase")) {
            return "supabase";
          }
        },
      },
    },
  },
});