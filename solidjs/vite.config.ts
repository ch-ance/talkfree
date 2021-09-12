import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import shl from "solid-hot-loader";

export default defineConfig({
  plugins: [solidPlugin(), shl()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
