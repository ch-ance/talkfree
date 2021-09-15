import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    rollupOptions: {
      treeshake: false,
      onwarn: (w) => {
        console.log(w);
      },
    },
  },
  optimizeDeps: {
    include: ["tweetnacl"],
    exclude: [
      "ipfs",
      "electron",
      "ipfs-core",
      "ipfs-core@0.10.6",
      "is-ipfs",
      "is-ipfs@6.0.2",
      "node-forge",
      "node-forge@0.10.0",
      "esbuild",
    ],
    esbuildOptions: {
      plugins: [esbuildCommonjs(["is-ipfs@6.0.2", "ipfs-core", "node-forge"])],
    },
  },
});
