import js from "@eslint/js";

export default [
  // Base recommended rules
  js.configs.recommended,

  // Browser/client code
  {
    files: ["client/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        URL: "readonly"
      }
    },
    rules: {
      // We *want* console in a small demo client
      "no-console": "off"
    }
  },

  // Node scripts (validation, etc.)
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
        console: "readonly"
      }
    },
    rules: {
      "no-console": "off"
    }
  }
];