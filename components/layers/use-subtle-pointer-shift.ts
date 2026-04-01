"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

type PointerShift = {
  pointerX: ReturnType<typeof useSpring>;
  pointerY: ReturnType<typeof useSpring>;
  enabled: boolean;
};

export function useSubtlePointerShift(intensity = 40): PointerShift {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 400, damping: 12, mass: 0.3 });
  const pointerY = useSpring(rawY, { stiffness: 400, damping: 12, mass: 0.3 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerMedia = window.matchMedia("(pointer: fine)");
    const mobileMedia = window.matchMedia("(max-width: 900px)");

    const updateEnabled = () => {
      const canUsePointer = pointerMedia.matches && !mobileMedia.matches;
      setEnabled(canUsePointer);
      if (!canUsePointer) {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!pointerMedia.matches || mobileMedia.matches) {
        return;
      }

      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;

      rawX.set(normalizedX * intensity);
      rawY.set(normalizedY * intensity);
    };

    updateEnabled();
    window.addEventListener("pointermove", onMove, { passive: true });
    pointerMedia.addEventListener("change", updateEnabled);
    mobileMedia.addEventListener("change", updateEnabled);

    return () => {
      window.removeEventListener("pointermove", onMove);
      pointerMedia.removeEventListener("change", updateEnabled);
      mobileMedia.removeEventListener("change", updateEnabled);
    };
  }, [intensity, rawX, rawY]);

  return {
    pointerX,
    pointerY,
    enabled
  };
}
