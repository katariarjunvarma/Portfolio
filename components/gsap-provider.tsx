"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export function useLenis() { return useContext(LenisContext); }

export function GSAPProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenisRaf: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        syncTouch: false,
      });
      lenisRef.current = lenis;

      // ScrollTrigger updates from both Lenis AND window scroll
      lenis.on("scroll", ScrollTrigger.update);

      // Proxy ScrollTrigger so it reads Lenis' scrollTop
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value as number, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: "transform",
      });

      // Keep a reference so we can properly remove it in cleanup
      lenisRaf = (time: number) => { lenis.raf(time * 1000); };
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    // Early refresh: fires after child useGSAP hooks have registered their triggers
    // This ensures sections already past their trigger point on page load animate in
    const t0 = setTimeout(() => ScrollTrigger.refresh(), 150);
    // Always refresh ScrollTrigger after preloader (3.5s)
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 3600);
    // And again after fonts/images settle
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 5000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      // Remove ticker BEFORE destroying Lenis to prevent zombie RAF calls
      if (lenisRaf) {
        gsap.ticker.remove(lenisRaf);
        lenisRaf = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
