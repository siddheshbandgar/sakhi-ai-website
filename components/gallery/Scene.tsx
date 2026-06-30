"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, RoundedBox, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { galleryApps } from "@/lib/data";

type View = "sphere" | "cylinder";

const logoFor = (name: string) => `/logos/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/* ----------------------------- layouts ----------------------------------- */
// A sparse spherical shell with per-card depth jitter — cards surround the
// centre at varied distances, so orbiting gives real spatial parallax.
function sphereLayout(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const off = 2 / n;
  for (let i = 0; i < n; i++) {
    const yy = i * off - 1 + off / 2;
    const rad = Math.sqrt(Math.max(0, 1 - yy * yy));
    const phi = i * GOLDEN;
    const r = 10 + (rand(i + 3) - 0.5) * 5.5; // depth jitter
    pts.push([Math.cos(phi) * rad * r, yy * r, Math.sin(phi) * rad * r]);
  }
  return pts;
}

// A tall cylinder wrapping around the centre.
function cylinderLayout(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const height = 16;
  for (let i = 0; i < n; i++) {
    const ang = i * GOLDEN;
    const yy = (i / Math.max(1, n - 1) - 0.5) * height;
    const r = 8.5 + (rand(i + 7) - 0.5) * 3.2;
    pts.push([Math.cos(ang) * r, yy, Math.sin(ang) * r]);
  }
  return pts;
}

/* -------------------------------- one card ------------------------------- */
function Card({
  app,
  target,
  phase,
}: {
  app: { name: string; tint: string };
  target: [number, number, number];
  phase: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tex = useTexture(logoFor(app.name));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    tmp.set(target[0], target[1] + Math.sin(t * 0.5 + phase) * 0.22, target[2]);
    g.position.lerp(tmp, 0.05);
    const s = hovered ? 1.18 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.15));
  });

  return (
    <group ref={group}>
      <Billboard>
        <RoundedBox
          args={[1.7, 1.7, 0.14]}
          radius={0.26}
          smoothness={5}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "grab";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <meshStandardMaterial color="#fffdf9" roughness={0.62} metalness={0.04} />
        </RoundedBox>
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[1.22, 1.22]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} />
        </mesh>
      </Billboard>
    </group>
  );
}

/* ------------------------------- the gallery ----------------------------- */
function Gallery({ view }: { view: View }) {
  const apps = galleryApps;
  const targets = useMemo(
    () => (view === "sphere" ? sphereLayout(apps.length) : cylinderLayout(apps.length)),
    [view, apps.length]
  );
  return (
    <group>
      {apps.map((app, i) => (
        <Card key={app.name + i} app={app} target={targets[i]} phase={i * 1.7} />
      ))}
    </group>
  );
}

/* -------------------------------- the scene ------------------------------ */
export default function Scene({ view }: { view: View }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 18], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
        gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
      }}
    >
      <fog attach="fog" args={["#efe2cc", 20, 40]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 8, 8]} intensity={0.95} />
      <directionalLight position={[-6, -2, -4]} intensity={0.3} color="#e8b486" />

      <Suspense fallback={null}>
        <Gallery view={view} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={12}
        maxDistance={28}
        autoRotate
        autoRotateSpeed={0.45}
        rotateSpeed={0.55}
        dampingFactor={0.06}
        enableDamping
      />
    </Canvas>
  );
}
