import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';

// Demo 3D model (animated cube, public domain)
// Replace with a superhero GLB/GLTF model link if available
const MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedCube/glTF-Binary/AnimatedCube.glb';

function SpidermanModel(props) {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} scale={1.2} {...props} />;
}

const SpidermanGuide = () => (
  <div style={{ position: 'fixed', bottom: 24, right: 24, width: 220, height: 260, zIndex: 100 }}>
    <div style={{ position: 'absolute', bottom: 180, right: 110, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0002', padding: '12px 18px', fontWeight: 500, fontSize: 15, color: '#232946', minWidth: 120 }}>
      <span role="img" aria-label="spiderman">🕷️</span> Scroll down to see my skills!
    </div>
    <Canvas camera={{ position: [0, 1, 4], fov: 40 }} style={{ background: 'none' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 2]} intensity={0.8} />
      <Suspense fallback={null}>
        <SpidermanModel position={[0, -1.1, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  </div>
);

export default SpidermanGuide; 