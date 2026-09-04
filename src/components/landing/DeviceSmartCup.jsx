import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import DeviceTooltip from './DeviceTooltip.jsx';
import { DEVICES } from '../../data/devices.js';
import { clampRange } from '../../hooks/useScrollProgress.js';

export default function DeviceSmartCup({
  progressRef,
  phaseStart = 0.55,
  phaseEnd = 0.9,
  anchor = [0, 0.18, 0.12],
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const attachProgress = clampRange(progressRef.current ?? 0, phaseStart, phaseEnd);
    ref.current.visible = attachProgress > 0.01;
    if (!ref.current.visible) return;
    const startY = anchor[1] - 1.4;
    const y = startY + (anchor[1] - startY) * attachProgress;
    const bob = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.01 * (1 - attachProgress);
    ref.current.position.set(anchor[0], y + bob, anchor[2]);
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
      {/* Cup body */}
      <mesh>
        <cylinderGeometry args={[0.11, 0.09, 0.16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#E3A23C' : '#F6F2E7'}
          roughness={0.35}
        />
      </mesh>
      {/* OLED screen */}
      <mesh position={[0, 0.05, 0.1]}>
        <boxGeometry args={[0.08, 0.05, 0.01]} />
        <meshStandardMaterial color="#0f1a17" emissive="#2F5D46" emissiveIntensity={0.6} />
      </mesh>
      {/* Probe tip */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.03, 0.02, 0.08, 8]} />
        <meshStandardMaterial color="#233A2F" metalness={0.5} roughness={0.4} />
      </mesh>

      {hovered && (
        <Html distanceFactor={6} position={[0.18, 0.1, 0]} occlude>
          <DeviceTooltip device={DEVICES.cup} />
        </Html>
      )}
    </group>
  );
}
