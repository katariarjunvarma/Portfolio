"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicStatementProps {
  lines: string[];
  label?: string;
  /** If true, the last line renders in the primary (blue) accent colour */
  accentLast?: boolean;
}

/**
 * Full-bleed cinematic text section.
 * Each line clips in from the bottom — one by one — creating the
 * dramatic "SELECTED WORK"-style reveals from premium Awwwards portfolios.
 */
export function CinematicStatement({
  lines,
  label,
  accentLast = false,
}: CinematicStatementProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const lineEls = sec.querySelectorAll<HTMLElement>(".cs-line-inner");
    const divider  = sec.querySelector<HTMLElement>(".cs-divider");
    const labelEl  = sec.querySelector<HTMLElement>(".cs-label");

    // Divider line scales in from left
    if (divider) {
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          transformOrigin: "left center",
          immediateRender: false,
          scrollTrigger: { trigger: sec, start: "top 80%", once: true },
        }
      );
    }

    // Label fades in
    if (labelEl) {
      gsap.fromTo(
        labelEl,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sec, start: "top 82%", once: true },
        }
      );
    }

    // Lines — dramatic clip-path reveal from bottom, staggered
    const lineTween = gsap.fromTo(
      lineEls,
      {
        y: "108%",
        clipPath: "inset(0 0 100% 0)",
      },
      {
        y: "0%",
        clipPath: "inset(0 0 0% 0)",
        duration: 1.15,
        stagger: 0.11,
        ease: "cubic-bezier(0.76, 0, 0.24, 1)",
        immediateRender: false,
        scrollTrigger: {
          trigger: sec,
          start: "top 75%",
          once: true,
        },
      }
    );

    return () => {
      lineTween.scrollTrigger?.kill();
      lineTween.kill();
    };
  }, [lines, label]);

  return (
    <div ref={sectionRef} className="cinematic-stmt overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Thin divider line */}
        <div
          className="cs-divider h-px bg-border mb-10"
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        />

        {/* Optional label */}
        {label && (
          <p
            className="cs-label text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-6"
            style={{ opacity: 0 }}
          >
            {label}
          </p>
        )}

        {/* Giant lines */}
        <div className="cs-lines">
          {lines.map((line, i) => (
            <div key={i} className="cs-line-outer overflow-hidden leading-[0.88]">
              <div
                className={`cs-line-inner font-heading font-bold tracking-tight${
                  accentLast && i === lines.length - 1 ? " text-primary" : ""
                }`}
                style={{ fontSize: "clamp(3.8rem, 9.5vw, 9rem)", lineHeight: 0.88 }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
