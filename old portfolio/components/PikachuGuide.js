import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const poses = [
  { section: 'introduction', label: 'Welcome!' },
  { section: 'skills', label: 'You are in Skills' },
  { section: 'learning-journey', label: 'You are in Learning' },
  { section: 'download', label: 'You are in Downloads' },
  { section: 'contact', label: 'You are in Contact' },
  { section: 'video-section', label: 'You are in Video' },
];

function getSectionInView() {
  const scrollY = window.scrollY;
  const sections = [
    { id: 'skills', top: 0 },
    { id: 'learning-journey', top: 0 },
    { id: 'download', top: 0 },
    { id: 'contact', top: 0 },
    { id: 'video-section', top: 0 },
  ];
  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) s.top = el.offsetTop;
    else s.top = 999999;
  });
  sections.sort((a, b) => a.top - b.top);
  let current = 'introduction';
  for (let i = 0; i < sections.length; i++) {
    if (scrollY + 120 >= sections[i].top) {
      current = sections[i].id;
    }
  }
  return current;
}

function PikachuModel(props) {
  const geometry = useLoader(STLLoader, '/pikachu.stl');
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
    }
  });
  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      scale={0.18}
      position={[0, 1.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
      {...props}
    >
      <meshStandardMaterial color="#ffe066" metalness={0.1} roughness={0.4} emissive="#fff200" emissiveIntensity={0.18} />
    </mesh>
  );
}

const PikachuGuide = () => {
  const [section, setSection] = useState('introduction');
  useEffect(() => {
    const onScroll = () => {
      setSection(getSectionInView());
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const pose = poses.find(p => p.section === section) || poses[0];
  return (
    <div className="pikachu-guide">
      <div className="pikachu-speech">
        <span role="img" aria-label="pikachu">⚡</span> Pika Pika!<br/>{pose.label}
      </div>
      <Canvas camera={{ position: [0, 0.2, 2.2], fov: 40 }} style={{ background: 'none' }} shadows>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 2]} intensity={0.9} />
        <Suspense fallback={null}>
          <PikachuModel position={[0, 0.3, 0]} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.1} />
      </Canvas>
    </div>
  );
};

export default PikachuGuide; 