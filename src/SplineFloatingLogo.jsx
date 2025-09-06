// src/components/SplineFloatingLogo.jsx
import React, { useEffect, useRef } from "react";

export default function SplineFloatingLogo({
  url = "https://prod.spline.design/kU5LFbV84Y97j40y/scene.splinecode",
  size = 130,
  right = 28,
  top = 72,
  interactive = false, // true => erlaubt Klick/Drag in Szene
}) {
  const wrapperRef = useRef(null);
  const posRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: null });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Startposition (rechts oben)
    const startX = window.innerWidth - right - size / 2;
    const startY = top + size / 2;
    posRef.current.cx = startX;
    posRef.current.cy = startY;
    posRef.current.tx = startX;
    posRef.current.ty = startY;

    const ease = 0.12;
    function lerp(a, b, t) { return a + (b - a) * t; }

    function frame() {
      const p = posRef.current;
      p.cx = lerp(p.cx, p.tx, ease);
      p.cy = lerp(p.cy, p.ty, ease);
      wrapper.style.transform = `translate3d(${p.cx - size / 2}px, ${p.cy - size / 2}px, 0)`;
      p.raf = requestAnimationFrame(frame);
    }
    p = posRef.current;
    p.raf = requestAnimationFrame(frame);

    function onPointerMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const offset = 40;
      posRef.current.tx = Math.min(window.innerWidth - size / 2, Math.max(size / 2, clientX + offset));
      posRef.current.ty = Math.min(window.innerHeight - size / 2, Math.max(size / 2, clientY + offset / 2));
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    function onResize() {
      posRef.current.tx = Math.min(window.innerWidth - size / 2, posRef.current.tx);
      posRef.current.ty = Math.min(window.innerHeight - size / 2, posRef.current.ty);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(posRef.current.raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("resize", onResize);
    };
  }, [right, top, size]);

  const wrapperStyle = {
    position: "fixed",
    zIndex: 60,
    width: size,
    height: size,
    right: 0,
    top: 0,
    transform: "translate3d(0,0,0)",
    transition: "transform 0.08s linear",
    pointerEvents: interactive ? "auto" : "none",
  };

  return (
    <div ref={wrapperRef} aria-hidden={!interactive} style={wrapperStyle}>
      <div style={{
        width: "100%",
        height: "100%",
        display: "block",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 6px 24px rgba(4,120,87,0.12)"
      }}>
        <spline-viewer
          style={{ width: "100%", height: "100%", display: "block" }}
          url={url}
          enable-scroll={interactive ? "true" : "false"}
          enable-drag={interactive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
