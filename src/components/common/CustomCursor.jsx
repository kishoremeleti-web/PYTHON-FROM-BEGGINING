import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState("default"); // "default" | "hover" | "code" | "active"
  const [visible, setVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check hovered element
      const target = e.target;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".topic-card") ||
        target.closest(".option-btn") ||
        target.closest(".trail-node") ||
        target.closest('[role="button"]')
      ) {
        setCursorType("hover");
      } else if (
        target.closest(".code-textarea") ||
        target.closest(".term-input-field") ||
        target.closest("pre") ||
        target.closest("code")
      ) {
        setCursorType("code");
      } else {
        setCursorType("default");
      }
    };

    const onMouseDown = () => setCursorType("active");
    const onMouseUp = () => setCursorType("default");
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth trailing animation for the ring
    const render = () => {
      // Linear interpolation (lerp)
      const ease = 0.22;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${cursorType} ${visible ? "visible" : ""}`}
      />
      {/* Smooth Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${cursorType} ${visible ? "visible" : ""}`}
      />
    </>
  );
}
