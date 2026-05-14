// Babel config — used only in dev to inject `data-vibiz-src` attrs on
// JSX nodes for the Vibiz visual editor. In production Next.js uses
// SWC + the standard preset; this file is consulted but the plugin is
// a no-op for production builds.

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  presets: ["next/babel"],
  plugins: isDev ? [require.resolve("./babel-plugin-vibiz-locator.cjs")] : [],
};
