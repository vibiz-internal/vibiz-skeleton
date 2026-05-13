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
  // Primary: data-vibiz-src attribute injected by the Babel locator
  // plugin at build-time (works regardless of React version).
  let cur: HTMLElement | null = el;
  while (cur) {
    const v = cur.getAttribute && cur.getAttribute("data-vibiz-src");
    if (v) return v;
    cur = cur.parentElement;
  }
  // Fallback: legacy React fiber `_debugSource` (React ≤ 18).
  const fiberKey = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
  if (!fiberKey) return null;
  let fiber: any = (el as any)[fiberKey];
  while (fiber) {
    const ds = fiber._debugSource;
    if (ds && typeof ds.fileName === "string") {
      const rel = ds.fileName.split("/").slice(-4).join("/");
      return `${rel}:${ds.lineNumber}:${ds.columnNumber ?? 0}`;
    }
    fiber = fiber.return;
  }
  return null;
}

export function VibizEditorOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [selectedRect, setSelectedRect] = useState<DOMRect | null>(null);
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    // Reading window.location.search at render time would cause a
    // hydration mismatch (server renders without the URL), so we
    // intentionally setState from inside the mount effect here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (params.get("vibiz") === "edit") setEnabled(true);
  }, []);

  // Listen for a "clear-selection" command from the parent (sent after a
  // successful live edit so the user can immediately pick the next
  // element without leaving edit mode).
  useEffect(() => {
    if (!enabled) return;
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "vibiz/clear-selection") {
        setSelectedRect(null);
        setSelectedSrc(null);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [enabled]);

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
              "No data-vibiz-src on this element. Reload the dev server with the Babel locator plugin enabled.",
          },
          "*",
        );
        return;
      }
      const rect = el.getBoundingClientRect();
      setSelectedRect(rect);
      setSelectedSrc(src);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedRect) {
          setSelectedRect(null);
          setSelectedSrc(null);
          window.parent.postMessage({ type: "vibiz/cancel" }, "*");
        }
      }
    };
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [enabled, selectedRect]);

  if (!enabled) return null;
  const hovering = hoveredRect && !selectedRect;
  return (
    <>
      {hovering ? (
        <div
          style={{
            position: "fixed",
            top: hoveredRect.top,
            left: hoveredRect.left,
            width: hoveredRect.width,
            height: hoveredRect.height,
            outline: "1px dashed rgba(6,182,212,0.7)",
            outlineOffset: -1,
            background: "rgba(6,182,212,0.04)",
            pointerEvents: "none",
            zIndex: 999997,
            transition: "all 80ms ease-out",
          }}
        />
      ) : null}
      {selectedRect ? (
        <div
          style={{
            position: "fixed",
            top: selectedRect.top,
            left: selectedRect.left,
            width: selectedRect.width,
            height: selectedRect.height,
            outline: "2px solid #06b6d4",
            outlineOffset: -2,
            background: "rgba(6,182,212,0.08)",
            pointerEvents: "none",
            zIndex: 999998,
            boxShadow: "0 0 0 4px rgba(6,182,212,0.15)",
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
          background: selectedSrc
            ? "rgba(16,185,129,0.95)"
            : "rgba(6,182,212,0.95)",
          color: "white",
          fontSize: 12,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          borderRadius: 4,
          pointerEvents: "none",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        {selectedSrc ? "● Selezionato (Esc per annullare)" : "✎ Vibiz Edit mode"}
      </div>
    </>
  );
}
