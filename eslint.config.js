import js from "@eslint/js";

/**
 * ESLint flat config for arkA
 * - client/**/*.js   -> browser globals (document, window, fetch, console)
 * - scripts/**/*.js  -> node globals (console, process)
 */

export default [
  // Base recommended rules
  {
    ...js.configs.recommended,
    files: ["client/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly"
      }
    }
  },
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly"
      }
    },
    rules: {
      // In case recommended set adds browser-only assumptions later
    }
  }
];