// eslint.config.js (Flat config for ESLint 9)
import js from "@eslint/js";
import globals from "globals";

export default [

  // ---------------------------
  // GLOBAL: Base rules
  // ---------------------------
  js.configs.recommended,

  // ---------------------------
  // Browser Client Code
  // ---------------------------
  {
    files: ["client/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,   // document, window, fetch, console, etc.
      },
    },
  },

  // ---------------------------
  // Node.js Scripts
  // ---------------------------
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,      // require, process, console, __dirname
      },
    },
  },

  // ---------------------------
  // Ignore build output
  // ---------------------------
  {
    ignores: ["dist/**"],
  },
];