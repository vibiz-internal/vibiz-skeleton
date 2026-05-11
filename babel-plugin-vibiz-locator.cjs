// Tiny Babel plugin: adds `data-vibiz-src="<relpath>:<line>:<col>"` to
// every JSX opening element when NODE_ENV === 'development'. The Vibiz
// dashboard overlay reads this attribute on click to know which file/
// line to edit.
//
// We use Babel (via `.babelrc.js`) for this single transform; Next.js
// auto-falls back to Babel when a `.babelrc.js` is present in the
// project root.

const path = require("node:path");

module.exports = function ({ types: t }) {
  return {
    name: "vibiz-locator",
    visitor: {
      JSXOpeningElement(p, state) {
        if (process.env.NODE_ENV === "production") return;
        const loc = p.node.loc;
        if (!loc) return;
        const file = state.file.opts.filename;
        if (!file) return;
        // Only annotate user code, never node_modules / .next.
        if (file.includes("/node_modules/") || file.includes("/.next/")) return;
        // Skip if already annotated (e.g. fragments).
        const already = p.node.attributes.some(
          (a) =>
            a.type === "JSXAttribute" &&
            a.name &&
            a.name.name === "data-vibiz-src",
        );
        if (already) return;
        const cwd = state.file.opts.root || process.cwd();
        const rel = path.relative(cwd, file).replace(/\\/g, "/");
        p.node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("data-vibiz-src"),
            t.stringLiteral(`${rel}:${loc.start.line}:${loc.start.column}`),
          ),
        );
      },
    },
  };
};
