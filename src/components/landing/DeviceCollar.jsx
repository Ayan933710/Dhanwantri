import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
import DeviceTooltip from './DeviceTooltip.jsx';
import { DEVICES } from '../../data/devices.js';
import { clampRange } from '../../hooks/useScrollProgress.js';

/**
 * Animates in from above the frame and clips onto the cow's neck as the
 * live scroll-progress ref moves through [phaseStart, phaseEnd]. Reading
 * the ref inside useFrame (rather than a plain number prop, and toggling
 * Object3D.visible directly rather than React state) keeps this in sync
 * every frame without forcing re-renders. Hovering shows the spec sheet
 * as an HTML overlay anchored in 3D.
 */
export default function DeviceCollar({
  progressRef,
  phaseStart = 0.5,
  phaseEnd = 0.85,
  anchor = [0.4, 1.0, 0],
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const attachProgress = clampRange(progressRef.current ?? 0, phaseStart, phaseEnd);
    ref.current.visible = attachProgress > 0.01;
    if (!ref.current.visible) return;
    const startY = anchor[1] + 1.8;
    const y = startY + (anchor[1] - startY) * attachProgress;
    ref.current.position.set(anchor[0], y, anchor[2]);
    ref.current.rotation.z = (1 - attachProgress) * 1.2;
    const s = 0.82 + 0.18 * attachProgress + (hovered ? 0.08 : 0);
    ref.current.scale.set(s, s, s);
  });

  return (
    <group
      ref={ref}
      visible={false}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Collar band */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.045, 10, 24]} />
        <meshStandardMaterial
          color={hovered ? '#0EA5E9' : '#233A2F'}
          emissive={hovered ? '#0369A1' : '#000000'}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      {/* Sensor pod */}
      <mesh position={[0.2, -0.05, 0.05]}>
        <boxGeometry args={[0.12, 0.09, 0.06]} />
        <meshStandardMaterial color="#0f1a17" roughness={0.5} />
      </mesh>
      {/* Status LED */}
      <mesh position={[0.26, -0.05, 0.05]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial
          color="#4C8A68"
          emissive="#4C8A68"
          emissiveIntensity={hovered ? 2 : 0.8}
        />
      </mesh>

      <AnimatePresence>
        {hovered && (
          <Html distanceFactor={6} position={[0.3, 0.2, 0]} occlude>
            <DeviceTooltip device={DEVICES.collar} />
          </Html>
        )}
      </AnimatePresence>
    </group>
  );
}
