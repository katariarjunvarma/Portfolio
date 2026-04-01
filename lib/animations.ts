// GSAP Animation presets for consistent motion across the site
export const EASE = {
  out: "power3.out",
  inOut: "power3.inOut",
  elastic: "back.out(1.7)",
  smooth: "power2.out",
} as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.2,
} as const;

export const fadeUp = {
  y: 40,
  opacity: 0,
  duration: DURATION.normal,
  ease: EASE.out,
} as const;

export const fadeIn = {
  opacity: 0,
  duration: DURATION.normal,
  ease: EASE.out,
} as const;

export const staggerCards = {
  y: 60,
  opacity: 0,
  duration: DURATION.normal,
  stagger: 0.1,
  ease: EASE.out,
} as const;

export const elasticPopIn = {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  stagger: 0.05,
  ease: EASE.elastic,
} as const;

export const lineReveal = {
  scaleX: 0,
  duration: DURATION.slow,
  ease: EASE.inOut,
} as const;
