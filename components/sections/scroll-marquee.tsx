"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollMarqueeProps {
  items: string[];
  direction?: "left" | "right";
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Scrub-driven horizontal text marquee.
 * As the user scrolls through this section, text moves left or right.
 * This creates the cinematic "statement strip" seen in Awwwards portfolios.
 */
export function ScrollMarquee({
  items,
  direction = "left",
  size = "lg",
  className = "",
}: ScrollMarqueeProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Animate 18% of track width across the scroll window
    const dist = track.scrollWidth * 0.18;

    const tween = gsap.fromTo(
      track,
      { x: direction === "left" ? 0 : -dist },
      {
        x: direction === "left" ? -dist : 0,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction]);

  // Quadruple so text fills screen at all viewport widths
  const repeated = [...items, ...items, ...items, ...items];
  const fontSize = size === "lg"
    ? "clamp(4rem, 10vw, 9.5rem)"
    : "clamp(2.5rem, 6vw, 6rem)";

  return (
    <div
      ref={outerRef}
      className={`scroll-mrq-outer overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className="scroll-mrq-track will-change-transform"
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="scroll-mrq-item font-heading font-bold whitespace-nowrap select-none"
            style={{ fontSize, lineHeight: 1, padding: `0 clamp(0.8rem, 2.5vw, 2.5rem)` }}
          >
            <span className="text-primary mr-[0.3em]" style={{ fontSize: "0.3em" }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
