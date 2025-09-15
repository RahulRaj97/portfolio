import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/sections": path.resolve(__dirname, "./src/components/sections"),
      "@/common": path.resolve(__dirname, "./src/components/common"),
      "@/layout": path.resolve(__dirname, "./src/components/layout"),
      "@/visuals": path.resolve(__dirname, "./src/components/visuals"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/data": path.resolve(__dirname, "./src/data"),
      "@/config": path.resolve(__dirname, "./src/config"),
    },
  },
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui")) return "vendor-mui";
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("lucide-react")) return "vendor-icons";
            return "vendor";
          }
        },
      },
    },
  },
  publicDir: "public",
});
