import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-calorias": {
        target: "https://caloriasporalimentoapi.herokuapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-calorias/, ""),
      },
    },
  },
});
