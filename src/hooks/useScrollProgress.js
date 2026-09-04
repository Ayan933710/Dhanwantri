import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

/**
 * Reads the drei <ScrollControls> offset (0 -> 1 across the scrollable pages)
 * and exposes a ref that always holds the current, smoothed value so any
 * component can read it inside its own useFrame without re-rendering React.
 */
export function useScrollProgress(smoothing = 0.08) {
  const scroll = useScroll();
  const progress = useRef(0);

  useFrame(() => {
    const target = scroll.offset; // 0..1
    progress.current += (target - progress.current) * smoothing;
  });

  return progress;
}

// Maps a 0..1 progress value into a 0..1 value scoped to [start, end].
export function clampRange(value, start, end) {
  if (end === start) return value >= end ? 1 : 0;
  const t = (value - start) / (end - start);
  return Math.min(1, Math.max(0, t));
}
