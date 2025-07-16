import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  plugins: [react(), tailwindcss(), flowbiteReact()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["react-moment"])],
    },
  },
});
