import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Position references for smooth 60fps lerp
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only mount on desktop/fine-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Smooth trailing ring loop using Linear Interpolation (lerp = 0.16)
    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.16;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    // Hover detection for interactive targets
    const onMouseOver = (e) => {
      const target = e.target;
      const interactive = target.closest('a, button, [role="button"], input, .glass-card, .glass-gold, [data-cursor-interactive]');

      if (interactive) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="env-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="env-cursor-ring" aria-hidden="true" />
    </>
  );
}
