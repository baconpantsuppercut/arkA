// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "client/js/main.js",
  output: {
    file: "dist/client.bundle.js",
    format: "iife",
    sourcemap: true,
    name: "arkaClient"
  },
  plugins: [
    resolve({
      browser: true
    }),
      commonjs()
  ]
};