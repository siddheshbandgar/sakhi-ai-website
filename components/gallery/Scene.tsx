"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, RoundedBox, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { galleryApps } from "@/lib/data";

type View = "sphere" | "cylinder";

const logoFor = (name: string) => `/logos/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

/* ----------------------------- layout helpers ---------------------------- */
function sphereLayout(n: number, r: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const inc = Math.PI * (3 - Math.sqrt(5));
  const off = 2 / n;
  for (let i = 0; i < n; i++) {
    const y = i * off - 1 + off / 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push([Math.cos(phi) * rad * r, y * r, Math.sin(phi) * rad * r]);
  }
  return pts;
}

function cylinderLayout(n: number, r: number, h: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const cols = Math.ceil(Math.sqrt(n * 1.8));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const theta = (col / cols) * Math.PI * 2 + (row % 2) * (Math.PI / cols);
    const y = (row / Math.max(1, rows - 1) - 0.5) * h;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
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
    tmp.set(target[0], target[1] + Math.sin(t * 0.55 + phase) * 0.16, target[2]);
    g.position.lerp(tmp, 0.05);
    const s = hovered ? 1.18 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.15));
  });

  return (
    <group ref={group}>
      <Billboard>
        <RoundedBox
          args={[1.5, 1.5, 0.12]}
          radius={0.22}
          smoothness={5}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.05} />
        </RoundedBox>
        {/* logo */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[1.12, 1.12]} />
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
    () => (view === "sphere" ? sphereLayout(apps.length, 7.4) : cylinderLayout(apps.length, 6.2, 9)),
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
      camera={{ position: [0, 0, 17], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => e.preventDefault(),
          false
        );
      }}
    >
      {/* warm haze so distant tiles melt into the parchment background */}
      <fog attach="fog" args={["#f0e3cd", 19, 33]} />

      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 8, 8]} intensity={1.0} />
      <directionalLight position={[-6, -2, -4]} intensity={0.3} color="#e8b486" />

      <Suspense fallback={null}>
        <Gallery view={view} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={11}
        maxDistance={24}
        autoRotate
        autoRotateSpeed={0.5}
        rotateSpeed={0.5}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
}
