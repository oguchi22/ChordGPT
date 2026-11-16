import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works on GitHub Pages (/ChordGPT/) as well as at the root.
  base: "./",
  // Keep the existing REACT_APP_* variable names in .env working.
  envPrefix: "REACT_APP_",
  server: { port: 3000 },
  build: { outDir: "build" },
});
