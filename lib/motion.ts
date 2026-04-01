export const wopEase = [0.12, 0.23, 0.5, 1] as const;
export const wopExitEase = [0.5, 0, 0.88, 0.77] as const;

export const wopPageEnter = {
  duration: 0.6,
  delay: 0.08,
  ease: wopEase
} as const;

export const wopPageExit = {
  duration: 0.6,
  delay: 0,
  ease: wopExitEase
} as const;

export const wopAppearSpring = {
  type: "spring",
  stiffness: 200,
  damping: 64,
  mass: 1,
  delay: 0.4
} as const;

export const wopHoverSpring = {
  type: "spring",
  stiffness: 500,
  damping: 60,
  mass: 1
} as const;
