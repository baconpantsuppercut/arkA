import js from "@eslint/js";
import globals from "globals";

export default [
  // Base: ignore build output
  {
    ignores: ["dist/**"]
  },

  // Browser-side client code
  {
    files: ["client/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        console: true
      }
    },
    rules: {
      "no-console": "off"
    }
  },

  // Node-side scripts (schema validation, etc.)
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        console: true,
        process: true
      }
    },
    rules: {
      "no-console": "off"
    }
  },

  // Fallback (if anything else gets picked up)
  {
    ...js.configs.recommended
  }
];