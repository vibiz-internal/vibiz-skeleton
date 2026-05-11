"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

// Vibiz visual editor overlay.
//
// Active only when the page is loaded with `?vibiz=edit` in the URL —
// no behavioural impact on normal users. When active:
//   • mouse move → outlines the element under the cursor
//   • click → postMessage to the parent Vibiz dashboard with the
//     element's React `_debugSource` (file:line:col), tag, text,
//     classes, and bounding rect. The dashboard reacts by opening a
//     side-chat where the user describes the change. The CTO agent
//     picks up the brief and modifies that exact location.
//
// Reads `_debugSource` from the React fiber tree (populated by
// Next.js's dev JSX transform). Zero build-time setup required.

type SelectionPayload = {
  type: "vibiz/select";
  src: string;
  tag: string;
  text: string;
  classNames: string;
  rect: { x: number; y: number; width: number; height: number };
};

function findDebugSource(el: HTMLElement): string | null {
  const fiberKey = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
  if (!fiberKey) return null;
  let cur: any = (el as any)[fiberKey];
  while (cur) {
    const ds = cur._debugSource;
    if (ds && typeof ds.fileName === "string") {
      const rel = ds.fileName.split("/").slice(-4).join("/");
      return `${rel}:${ds.lineNumber}:${ds.columnNumber ?? 0}`;
    }
    cur = cur.return;
  }
  return null;
}

export function VibizEditorOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("vibiz") === "edit") setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      setHoveredRect(el.getBoundingClientRect());
    };
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      const src = findDebugSource(el);
      if (!src) {
        window.parent.postMessage(
          {
            type: "vibiz/select-failed",
            reason:
              "No _debugSource on this element. Make sure the page is served by `next dev`.",
          },
          "*",
        );
        return;
      }
      const rect = el.getBoundingClientRect();
      const payload: SelectionPayload = {
        type: "vibiz/select",
        src,
        tag: el.tagName.toLowerCase(),
        text: (el.textContent ?? "").trim().slice(0, 240),
        classNames: typeof el.className === "string" ? el.className : "",
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      };
      window.parent.postMessage(payload, "*");
    };
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      {hoveredRect ? (
        <div
          style={{
            position: "fixed",
            top: hoveredRect.top,
            left: hoveredRect.left,
            width: hoveredRect.width,
            height: hoveredRect.height,
            outline: "2px solid #06b6d4",
            outlineOffset: -2,
            background: "rgba(6,182,212,0.06)",
            pointerEvents: "none",
            zIndex: 999998,
            transition: "all 60ms ease-out",
          }}
        />
      ) : null}
      <div
        style={{
          position: "fixed",
          top: 8,
          right: 8,
          zIndex: 999999,
          padding: "4px 10px",
          background: "rgba(6,182,212,0.95)",
          color: "white",
          fontSize: 12,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          borderRadius: 4,
          pointerEvents: "none",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        ✎ Vibiz Edit mode
      </div>
    </>
  );
}
