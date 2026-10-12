import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Tilt follows actual travel; returning to rest never changes the answer.
export default function useSliderFeedback(handleX, dragging) {
  const reducedMotion = useReducedMotion();
  const tilt = useMotionValue(0);
  const rotate = useSpring(tilt, { stiffness: 380, damping: 24 });
  useEffect(() => handleX.onChange((position) => {
    if (!dragging || reducedMotion) return;
    const delta = position - (handleX.getPrevious() ?? position);
    tilt.set(Math.max(-9, Math.min(9, delta * 1.5)));
  }), [handleX, dragging, reducedMotion, tilt]);
  useEffect(() => {
    if (!dragging || reducedMotion) tilt.set(0);
  }, [dragging, reducedMotion, tilt, rotate]);
  return { rotate: reducedMotion ? 0 : rotate, reducedMotion };
}
