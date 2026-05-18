import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // CommonJS files (Babel plugins etc.) must use `require()`; the
  // TS rule that forbids it doesn't apply to them.
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Italian copy is full of apostrophes — escaping every one as
  // &apos; in JSX text is pure noise. The character renders fine.
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
