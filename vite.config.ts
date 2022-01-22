import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
const path = require("path");

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "/index.ts"),
      name: "vue-contextmenu-next",
      fileName: (format) => `vue-contextmenu-next.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vueJsx(), vue()],
});
