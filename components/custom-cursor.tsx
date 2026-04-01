"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos      = useRef({ x: -200, y: -200 });
  const ring     = useRef({ x: -200, y: -200 });
  const rafRef   = useRef<number>(0);
  const visible  = useRef(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 901px)").matches;
    if (!isDesktop) return;

    document.body.classList.add("custom-cursor-enabled");

    const dot  = dotRef.current!;
    const circ = ringRef.current!;
    const lbl  = labelRef.current!;

    // ── Lerp RAF loop ─────────────────────────────────────────
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      gsap.set(dot,  { x: pos.current.x, y: pos.current.y });
      gsap.set(circ, { x: ring.current.x, y: ring.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // ── Mouse move ────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        gsap.to([dot, circ], { opacity: 1, duration: 0.3 });
      }
      checkMagnetic(e.clientX, e.clientY);
    };

    // ── Magnetic effect ───────────────────────────────────────
    let activeMagnet: HTMLElement | null = null;

    const checkMagnetic = (mx: number, my: number) => {
      const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      let found: HTMLElement | null = null;

      magnets.forEach((el) => {
        const r  = el.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = 100;

        if (dist < threshold) {
          found = el;
          const strength = (1 - dist / threshold) * 0.4;
          gsap.to(el, {
            x: dx * strength,
            y: dy * strength,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        } else if (el === activeMagnet) {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)", overwrite: true });
        }
      });

      if (!found && activeMagnet) {
        gsap.to(activeMagnet, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)", overwrite: true });
      }
      activeMagnet = found;
    };

    // ── Hover states ──────────────────────────────────────────
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      circ.classList.remove("cur-link", "cur-card", "cur-text");

      if (t.closest("input, textarea")) {
        circ.classList.remove("cur-link", "cur-card", "cur-text");
        gsap.to(dot,  { opacity: 0, duration: 0.15 });
        gsap.to(circ, { opacity: 0.4, duration: 0.2 });
        return;
      }
      gsap.to([dot, circ], { opacity: 1, duration: 0.2 });

      const card = t.closest<HTMLElement>(".project-card");
      if (card) {
        const cardLabel = card.dataset.cursorLabel || "VIEW";
        lbl.textContent = cardLabel === "SOON" ? "COMING SOON" : "VIEW";
        circ.classList.add("cur-card");
        gsap.to(lbl, { opacity: 1, scale: 1, duration: 0.25 });
      } else if (t.closest("a, button, .btn-primary, .btn-secondary, .nav-link")) {
        circ.classList.add("cur-link");
        gsap.to(lbl, { opacity: 0, scale: 0.8, duration: 0.2 });
      } else {
        gsap.to(lbl, { opacity: 0, scale: 0.8, duration: 0.2 });
      }
    };

    const onLeave = () => {
      gsap.to([dot, circ], { opacity: 0, duration: 0.25 });
      visible.current = false;
    };
    const onEnter = () => {
      gsap.to([dot, circ], { opacity: 1, duration: 0.25 });
      visible.current = true;
    };

    window.addEventListener("mousemove",    onMove,  { passive: true });
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      // Reset any magnetic elements
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        gsap.set(el, { x: 0, y: 0 });
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }}>
        <span ref={labelRef} className="cursor-label" style={{ opacity: 0, transform: "scale(0.8)" }}>
          VIEW
        </span>
      </div>
    </>
  );
}
