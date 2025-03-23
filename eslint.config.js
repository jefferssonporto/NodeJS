
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
      "no-console": ["error", {allow: ["warn", "error", "log"] }] //Não vai dar error de console quando for WARN e ERROR
    },
  },
]);