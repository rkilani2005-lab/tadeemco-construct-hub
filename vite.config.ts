import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // vite-react-ssg reads ssgOptions from here. The admin CMS is a client-only
  // app (Supabase auth + browser storage) and must never be statically
  // prerendered. The crawler passes the *raw* route path strings (e.g. "about",
  // "settings") rather than fully-resolved URLs, so we whitelist the public
  // routes by their raw values — that guarantees only real pages reach dist/
  // and the admin pages (settings/content/menu/contractors/seo/login) are skipped.
  ssgOptions: {
    includedRoutes: (paths: string[]) => {
      const publicRoutes = new Set([
        "/",
        "about",
        "services",
        "projects",
        "equipment",
        "contact",
      ]);
      return paths.filter((p) => publicRoutes.has(p));
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
