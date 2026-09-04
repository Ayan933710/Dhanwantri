import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import AnimalModel from './AnimalModel.jsx';
import DeviceCollar from './DeviceCollar.jsx';
import DeviceSmartCup from './DeviceSmartCup.jsx';
import { clampRange } from '../../hooks/useScrollProgress.js';

// Scroll phases (all expressed as fractions of the total scroll track):
// 0.00 – 0.28  zoom in on the cow
// 0.28 – 0.52  collar drops onto the cow's neck
// 0.42 – 0.72  zoom back out to the full cow
// 0.58 – 0.84  cup rises into position and stays there
export default function HeroScene() {
  const cowRef = useRef();
  const { size } = useThree();

  const progress = useRef(0);

  useFrame(({ camera, clock }) => {
    const heroHeight = Math.max(window.innerHeight, 760);
    const scrollProgress = Math.min(1, Math.max(0, window.scrollY / (heroHeight * 0.9)));
    const autoProgress = Math.min(1, clock.getElapsedTime() / 8);
    const targetProgress = Math.max(autoProgress, scrollProgress);
    progress.current += (targetProgress - progress.current) * 0.08;
    const p = progress.current;
    const zoomIn = clampRange(p, 0, 0.28);
    const zoomOut = clampRange(p, 0.42, 0.72);

    // Keep the cow centered while the camera handles the close-up and reveal.
    if (cowRef.current) {
      cowRef.current.position.x = 0;
      cowRef.current.position.z = 0;
      const s = 1.25 + zoomIn * 0.15;
      cowRef.current.scale.setScalar(s);
    }

    const targetZ = 5.4 - zoomIn * 1.55 + zoomOut * 1.55;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.y += (1.35 - camera.position.y) * 0.06;
    camera.lookAt(0, 0.75, 0);
  });

  return (
    <group
      position={[size.width < 700 ? 0.72 : 1.15, size.width < 700 ? -0.72 : -0.08, 0]}
      scale={size.width < 700 ? 0.58 : 1}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.4}
        color="#F0C878"
        castShadow
      />
      <Environment preset="sunset" />

      <group ref={cowRef} position={[0, 0, 0]}>
        <AnimalModel species="cow" focused />
        <DeviceCollar progressRef={progress} phaseStart={0.28} phaseEnd={0.52} anchor={[0.12, 1.42, 0]} />
        <DeviceSmartCup progressRef={progress} phaseStart={0.58} phaseEnd={0.84} anchor={[0.04, 0.38, 0.2]} />
      </group>

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.55}
        scale={10}
        blur={2.4}
        far={4}
      />
    </group>
  );
}
