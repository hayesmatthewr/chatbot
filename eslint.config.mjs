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
    // Reference-only material captured during reconnaissance (mirrored
    // theme CSS/JS from the cloned site, research scripts) — not shipped
    // app code, shouldn't be linted as such.
    "docs/**",
    "scripts/research-tools/**",
  ]),
]);

export default eslintConfig;
