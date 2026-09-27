import { defineConfig } from "astro/config";

// Site estático, sem integrações externas.
export default defineConfig({
  output: "static",
  build: { inlineStylesheets: "auto" },
});
