// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        strict: true,
        project: "./tsconfig.json", // Recommended for type-aware linting
      },
    },
    rules: {
      "linebreak-style": ["warn", "windows"],
      semi: ["warn", "always"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          vars: "all", // Ensure all variables are checked
          caughtErrors: "all", // Check caught errors
          ignoreRestSiblings: false,
          // Include class methods in unused checks
          varsIgnorePattern: "^_", // Optional: Ignore variables starting with '_'
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/no-invalid-this": "off",
      "@typescript-eslint/typedef": [
        "error",
        {
          variableDeclaration: false,
          memberVariableDeclaration: true,
          parameter: false,
          propertyDeclaration: true,
        },
      ],
    },
  },
];
