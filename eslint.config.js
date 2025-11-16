import js from "@eslint/js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    // Base recommended rules
    ...js.configs.recommended,

    // Ignore build artifacts
    ignores: ["dist/**", "node_modules/**"],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",

      // Tell ESLint which globals exist so "no-undef" stops shouting
      globals: {
        // Browser globals (client/js/main.js)
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        console: "readonly",

        // Node globals (scripts/*.js)
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },
  },
];