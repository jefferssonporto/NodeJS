import { defineConfig } from "eslint/config";
import globals, { node } from "globals";
import js from "@eslint/js";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
]);

module.exports = {
  env: {
    es6: true,
    node:true,
  },
  extends: [
  'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parseOption: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "class-methods-use-this": "off", //Não precisa o this nos métodos de classes
    "no-param-reassigh":  "off", 
    "camelcase": "off", 
    "no-unused-vars": ["error", {"argsIgnorePattern": "next"}]
  },

};