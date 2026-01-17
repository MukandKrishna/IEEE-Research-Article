/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fix for React 18+ and R3F types where JSX namespace might be scoped to React
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      cylinderGeometry: any;
      meshBasicMaterial: any;
      group: any;
      ambientLight: any;
      pointLight: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      lineSegments: any;
      edgesGeometry: any;
      lineBasicMaterial: any;
    }
  }
}

// Fallback for global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      cylinderGeometry: any;
      meshBasicMaterial: any;
      group: any;
      ambientLight: any;
      pointLight: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      lineSegments: any;
      edgesGeometry: any;
      lineBasicMaterial: any;
    }
  }
}

const DataStreamParticles = () => {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y = state.clock.elapsedTime * 0.05;
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2563EB"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const ConnectionLines = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    })

    const lines = useMemo(() => {
        const l = [];
        for(let i=0; i<15; i++) {
            l.push(
                <mesh key={i} position={[(Math.random()-0.5)*10, (Math.random()-0.5)*5, (Math.random()-0.5)*5]} rotation={[Math.random()*Math.PI, Math.random()*Math.PI, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 5, 4]} />
                    <meshBasicMaterial color="#94A3B8" opacity={0.2} transparent />
                </mesh>
            )
        }
        return l;
    }, [])

    return <group ref={ref}>{lines}</group>
}

export const NetworkScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <DataStreamParticles />
            <ConnectionLines />
        </Float>
        {/* Environment removed to prevent 'Failed to fetch' crash */}
      </Canvas>
    </div>
  );
};

export const SurveillanceScene: React.FC = () => {
    // A simplified visual for the "Overview" section showing multiple feeds
    const Feed = ({ position, color, delay }: { position: [number, number, number], color: string, delay: number }) => {
        const ref = useRef<THREE.Mesh>(null);
        useFrame((state) => {
            if(ref.current) {
                const t = state.clock.elapsedTime;
                ref.current.scale.setScalar(1 + Math.sin(t * 2 + delay) * 0.05);
            }
        });
        
        return (
            <mesh position={position} ref={ref}>
                <planeGeometry args={[1.6, 0.9]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={0.8} transparent />
                <lineSegments>
                    <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.9)]} />
                    <lineBasicMaterial color="white" opacity={0.5} transparent />
                </lineSegments>
            </mesh>
        )
    }

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        
        <group position={[0, 0, 0]}>
            {/* Main Center Feed */}
            <Feed position={[0, 0.2, 0]} color="#1E293B" delay={0} />
            
            {/* Background Feeds */}
            <group position={[-1.2, -0.5, -1]}>
                <Feed position={[0, 0, 0]} color="#0F172A" delay={1} />
            </group>
            <group position={[1.2, -0.5, -1]}>
                <Feed position={[0, 0, 0]} color="#0F172A" delay={2} />
            </group>
            <group position={[0, 1.2, -1.5]}>
                <Feed position={[0, 0, 0]} color="#0F172A" delay={3} />
            </group>
            
            {/* Scanning Line */}
            <mesh position={[0, 0.2, 0.01]}>
                 <planeGeometry args={[1.6, 0.02]} />
                 <meshBasicMaterial color="#2563EB" transparent opacity={0.8} />
            </mesh>
        </group>
        
        <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}