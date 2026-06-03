import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const supabaseUrl =
    env.VITE_SUPABASE_URL || env.SUPABASE_URL || "https://fzfnsfzlgquxwfubypro.supabase.co";
  const supabasePublishableKey =
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    env.SUPABASE_PUBLISHABLE_KEY ||
    env.SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Zm5zZnpsZ3F1eHdmdWJ5cHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0OTg3NjQsImV4cCI6MjA5MjA3NDc2NH0.Q6CHuxeXKjNkq_LKzmzhZoOFSB1niJFjHe2ek-j8A08";

  return {
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
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(supabasePublishableKey),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
