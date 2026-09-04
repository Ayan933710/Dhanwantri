import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import DeviceTooltip from '../landing/DeviceTooltip.jsx';
import { DEVICES } from '../../data/devices.js';

function CollarMesh({ hovered }) {
  return (
    <group rotation={[0.15, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.1, 12, 32]} />
        <meshStandardMaterial color={hovered ? '#E3A23C' : '#233A2F'} emissive={hovered ? '#5c3d10' : '#000000'} roughness={0.4} metalness={0.35} />
      </mesh>
      <mesh position={[0.45, -0.12, 0.1]}>
        <boxGeometry args={[0.26, 0.2, 0.14]} />
        <meshStandardMaterial color="#0f1a17" roughness={0.5} />
      </mesh>
      <mesh position={[0.6, -0.12, 0.1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#4C8A68" emissive="#4C8A68" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

function CupMesh({ hovered }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.34, 0.28, 0.5, 24]} />
        <meshStandardMaterial color={hovered ? '#F0C878' : '#F6F2E7'} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.16, 0.31]}>
        <boxGeometry args={[0.24, 0.15, 0.02]} />
        <meshStandardMaterial color="#0f1a17" emissive="#2F5D46" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.09, 0.06, 0.24, 12]} />
        <meshStandardMaterial color="#233A2F" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function HubMesh({ hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.82, 0.58, 0.3]} />
        <meshStandardMaterial color={hovered ? '#E3A23C' : '#233A2F'} roughness={0.38} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0.03, 0.16]}>
        <boxGeometry args={[0.42, 0.16, 0.018]} />
        <meshStandardMaterial color="#0f1a17" emissive="#2F5D46" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[-0.28, -0.18, 0.16]}>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshStandardMaterial color="#6FC58D" emissive="#6FC58D" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.18, -0.18, 0.16]}>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshStandardMaterial color="#E3A23C" emissive="#E3A23C" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.28, 0.42, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.34, 10]} />
        <meshStandardMaterial color="#CFC9B8" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function InteractiveDevice({ type }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (hovered ? 0.018 : 0.006);
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.04;
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.12 : 1}
    >
      {type === 'collar' ? <CollarMesh hovered={hovered} /> : type === 'cup' ? <CupMesh hovered={hovered} /> : <HubMesh hovered={hovered} />}
      {hovered && <Html position={[0.72, 0.35, 0]} distanceFactor={8} transform={false} className="device-tooltip-anchor"><DeviceTooltip device={DEVICES[type]} compact /></Html>}
    </group>
  );
}

export default function MiniDeviceViewer({ type }) {
  return (
    <div className="h-56 w-full sm:h-64">
      <Canvas camera={{ position: [1.4, 0.8, 1.6], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 3, 2]} intensity={1.2} color="#F0C878" />
          <Environment preset="sunset" />
          <Bounds fit clip observe margin={1.25}>
            <InteractiveDevice type={type} />
          </Bounds>
          <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={4} blur={2} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={2.2}
            enableZoom={false}
            enablePan={false}
            enableRotate
            minPolarAngle={Math.PI / 2.6}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
