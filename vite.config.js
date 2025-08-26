import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/Commerce": {
        target: "https://scujxlc8zs397019114-rs.su.retail.dynamics.com",
        // target: "https://scu7n263itq55676110-rs.su.retail.dynamics.com",
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/Products/, "")
      }
    }
  }
});
