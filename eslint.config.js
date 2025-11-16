// eslint.config.js
// Flat config for ESLint 9, using CommonJS so Node can load it without "type": "module".

const js = require("@eslint/js");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ...js.configs.recommended,
    files: ["client/**/*.js", "scripts/**/*.js"],
    ignores: ["dist/**", "node_modules/**"]
  }
];